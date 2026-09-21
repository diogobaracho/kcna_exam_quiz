import { describe, expect, it } from 'vitest';
import { PASS_THRESHOLD, evaluateAnswer, percentage, scoreSession } from '../../src/domain/scoring';
import { answersFor, makeQuestion, makeSession } from '../helpers/fixtures';

describe('percentage', () => {
  it('rounds to one decimal and handles zero', () => {
    expect(percentage(2, 3)).toBe(66.7);
    expect(percentage(0, 0)).toBe(0);
    expect(percentage(3, 4)).toBe(75);
  });
});

describe('evaluateAnswer', () => {
  const question = makeQuestion({ id: 'e1' });
  const session = makeSession([question], 'practice');
  const item = session.questions[0];

  it('does not count an unconfirmed practice choice', () => {
    const result = evaluateAnswer('practice', item, { chosenIndex: 0, confirmed: false, flagged: false });
    expect(result).toMatchObject({ counted: false, correct: false, chosenText: null, correctText: 'e1 correct' });
  });

  it('counts a confirmed practice choice', () => {
    expect(evaluateAnswer('practice', item, { chosenIndex: 0, confirmed: true, flagged: false }).correct).toBe(true);
    expect(evaluateAnswer('practice', item, { chosenIndex: 1, confirmed: true, flagged: false })).toMatchObject({
      correct: false,
      chosenText: 'e1 wrong 1',
    });
  });

  it('counts any exam choice, confirmed or not', () => {
    expect(evaluateAnswer('exam', item, { chosenIndex: 0, confirmed: false, flagged: false }).correct).toBe(true);
    expect(evaluateAnswer('exam', item, undefined).counted).toBe(false);
  });
});

describe('scoreSession', () => {
  const questions = [
    makeQuestion({ id: 'a1', category: 'kubernetes-fundamentals', topic: 'architecture' }),
    makeQuestion({ id: 'a2', category: 'kubernetes-fundamentals', topic: 'architecture' }),
    makeQuestion({ id: 'w1', category: 'kubernetes-fundamentals', topic: 'workloads' }),
    makeQuestion({ id: 'r1', category: 'container-orchestration', topic: 'runtime' }),
  ];

  it('computes totals, breakdowns, pass/fail and duration', () => {
    const session = makeSession(questions, 'practice');
    const answers = answersFor(session, [0, 1, 0, null]);
    const attempt = scoreSession(session, answers, new Date('2026-09-21T10:05:30.000Z'));

    expect(attempt).toMatchObject({
      id: 'session-1',
      mode: 'practice',
      total: 4,
      correct: 2,
      scorePct: 50,
      passed: false,
      durationSec: 330,
      categories: ['kubernetes-fundamentals', 'container-orchestration'],
      topics: null,
    });
    expect(attempt.perCategory).toEqual({
      'kubernetes-fundamentals': { correct: 2, total: 3 },
      'container-orchestration': { correct: 0, total: 1 },
    });
    expect(attempt.perTopic).toEqual({
      'kubernetes-fundamentals/architecture': { correct: 1, total: 2 },
      'kubernetes-fundamentals/workloads': { correct: 1, total: 1 },
      'container-orchestration/runtime': { correct: 0, total: 1 },
    });
    expect(attempt.answers).toEqual([
      { questionId: 'a1', category: 'kubernetes-fundamentals', topic: 'architecture', chosenText: 'a1 correct', correctText: 'a1 correct', correct: true },
      { questionId: 'a2', category: 'kubernetes-fundamentals', topic: 'architecture', chosenText: 'a2 wrong 1', correctText: 'a2 correct', correct: false },
      { questionId: 'w1', category: 'kubernetes-fundamentals', topic: 'workloads', chosenText: 'w1 correct', correctText: 'w1 correct', correct: true },
      { questionId: 'r1', category: 'container-orchestration', topic: 'runtime', chosenText: null, correctText: 'r1 correct', correct: false },
    ]);
  });

  it('passes at exactly the threshold', () => {
    const session = makeSession(questions, 'exam');
    const attempt = scoreSession(session, answersFor(session, [0, 0, 0, 1]));
    expect(attempt.scorePct).toBe(PASS_THRESHOLD);
    expect(attempt.passed).toBe(true);
  });

  it('treats unconfirmed practice answers as unanswered', () => {
    const session = makeSession(questions, 'practice');
    const attempt = scoreSession(session, answersFor(session, [0, 0, 0, 0], false));
    expect(attempt.correct).toBe(0);
    expect(attempt.answers.every((a) => a.chosenText === null)).toBe(true);
  });

  it('handles an empty session', () => {
    const attempt = scoreSession(makeSession([], 'practice'), {});
    expect(attempt).toMatchObject({ total: 0, correct: 0, scorePct: 0, passed: false });
  });
});
