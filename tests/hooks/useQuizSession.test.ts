import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { initQuizState, quizReducer, useQuizSession, type QuizState } from '../../src/hooks/useQuizSession';
import { makeQuestion, makeSession } from '../helpers/fixtures';

const questions = [makeQuestion({ id: 'q1' }), makeQuestion({ id: 'q2' }), makeQuestion({ id: 'q3' })];

function run(state: QuizState, ...actions: Parameters<typeof quizReducer>[1][]): QuizState {
  return actions.reduce(quizReducer, state);
}

describe('quizReducer – practice mode', () => {
  const initial = initQuizState(makeSession(questions, 'practice'));

  it('initialises with empty answers', () => {
    expect(initial.currentIndex).toBe(0);
    expect(initial.status).toBe('running');
    expect(initial.answers.q1).toEqual({ chosenIndex: null, confirmed: false, flagged: false });
  });

  it('selects, then locks the answer on confirm', () => {
    const selected = run(initial, { type: 'select', index: 2 });
    expect(selected.answers.q1.chosenIndex).toBe(2);
    const confirmed = run(selected, { type: 'confirm' });
    expect(confirmed.answers.q1.confirmed).toBe(true);
    const changed = run(confirmed, { type: 'select', index: 0 });
    expect(changed.answers.q1.chosenIndex).toBe(2);
  });

  it('cannot confirm without a selection', () => {
    expect(run(initial, { type: 'confirm' })).toBe(initial);
  });

  it('cannot move forward before confirming, and never backwards', () => {
    expect(run(initial, { type: 'next' })).toBe(initial);
    expect(run(initial, { type: 'prev' })).toBe(initial);
    expect(run(initial, { type: 'goto', index: 2 })).toBe(initial);
    expect(run(initial, { type: 'toggleFlag' })).toBe(initial);
    const after = run(initial, { type: 'select', index: 0 }, { type: 'confirm' }, { type: 'next' });
    expect(after.currentIndex).toBe(1);
    expect(run(after, { type: 'prev' }).currentIndex).toBe(1);
  });

  it('finishes when moving past the last confirmed question', () => {
    let state = initial;
    for (let i = 0; i < 3; i += 1) {
      state = run(state, { type: 'select', index: 0 }, { type: 'confirm' }, { type: 'next' });
    }
    expect(state.status).toBe('finished');
    expect(state.currentIndex).toBe(2);
    expect(state.finishedAt).toBeTruthy();
    expect(run(state, { type: 'select', index: 1 })).toBe(state);
  });

  it('ignores out-of-range selections', () => {
    expect(run(initial, { type: 'select', index: 9 })).toBe(initial);
    expect(run(initial, { type: 'select', index: -1 })).toBe(initial);
  });

  it('can be finished at any time (timer expiry)', () => {
    const state = run(initial, { type: 'finish', at: '2026-09-21T11:00:00.000Z' });
    expect(state.status).toBe('finished');
    expect(state.finishedAt).toBe('2026-09-21T11:00:00.000Z');
  });
});

describe('quizReducer – exam mode', () => {
  const initial = initQuizState(makeSession(questions, 'exam'));

  it('allows free navigation and changing answers', () => {
    let state = run(initial, { type: 'select', index: 1 }, { type: 'next' });
    expect(state.currentIndex).toBe(1);
    state = run(state, { type: 'prev' });
    expect(state.currentIndex).toBe(0);
    state = run(state, { type: 'select', index: 3 });
    expect(state.answers.q1.chosenIndex).toBe(3);
    state = run(state, { type: 'goto', index: 2 });
    expect(state.currentIndex).toBe(2);
    expect(run(state, { type: 'goto', index: 5 })).toBe(state);
  });

  it('does not finish on next at the last question', () => {
    const state = run(initial, { type: 'goto', index: 2 }, { type: 'next' });
    expect(state.currentIndex).toBe(2);
    expect(state.status).toBe('running');
  });

  it('ignores confirm and toggles flags', () => {
    const state = run(initial, { type: 'select', index: 0 }, { type: 'confirm' });
    expect(state.answers.q1.confirmed).toBe(false);
    const flagged = run(state, { type: 'toggleFlag' });
    expect(flagged.answers.q1.flagged).toBe(true);
    expect(run(flagged, { type: 'toggleFlag' }).answers.q1.flagged).toBe(false);
  });

  it('finishes with unanswered questions', () => {
    const state = run(initial, { type: 'select', index: 0 }, { type: 'finish' });
    expect(state.status).toBe('finished');
    expect(state.answers.q2.chosenIndex).toBeNull();
  });
});

describe('useQuizSession hook', () => {
  it('exposes derived counters and actions', () => {
    const { result } = renderHook(() => useQuizSession(makeSession(questions, 'practice')));
    expect(result.current.current.question.id).toBe('q1');
    expect(result.current.answeredCount).toBe(0);

    act(() => result.current.select(0));
    expect(result.current.answer.chosenIndex).toBe(0);
    expect(result.current.answeredCount).toBe(0);

    act(() => result.current.confirm());
    expect(result.current.answeredCount).toBe(1);
    expect(result.current.correctCount).toBe(1);
    expect(result.current.isLast).toBe(false);

    act(() => result.current.next());
    expect(result.current.current.question.id).toBe('q2');

    act(() => result.current.select(1));
    act(() => result.current.confirm());
    expect(result.current.correctCount).toBe(1);
    expect(result.current.answeredCount).toBe(2);

    act(() => result.current.finish());
    expect(result.current.state.status).toBe('finished');
  });

  it('counts exam selections as answered without confirmation', () => {
    const { result } = renderHook(() => useQuizSession(makeSession(questions, 'exam')));
    act(() => result.current.select(2));
    expect(result.current.answeredCount).toBe(1);
    act(() => result.current.toggleFlag());
    expect(result.current.answer.flagged).toBe(true);
    act(() => result.current.goto(2));
    expect(result.current.isLast).toBe(true);
  });
});
