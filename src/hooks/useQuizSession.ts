import { useCallback, useMemo, useReducer } from 'react';
import type { AnswerMap, AnswerState, Session } from '../domain/types';

export interface QuizState {
  session: Session;
  answers: AnswerMap;
  currentIndex: number;
  status: 'running' | 'finished';
  finishedAt: string | null;
}

export type QuizAction =
  | { type: 'select'; index: number }
  | { type: 'confirm' }
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'goto'; index: number }
  | { type: 'toggleFlag' }
  | { type: 'finish'; at?: string };

export const EMPTY_ANSWER: AnswerState = { chosenIndex: null, confirmed: false, flagged: false };

export function initQuizState(session: Session): QuizState {
  const answers: AnswerMap = {};
  for (const item of session.questions) {
    answers[item.question.id] = { ...EMPTY_ANSWER };
  }
  return { session, answers, currentIndex: 0, status: 'running', finishedAt: null };
}

function currentId(state: QuizState): string {
  return state.session.questions[state.currentIndex].question.id;
}

function withAnswer(state: QuizState, id: string, patch: Partial<AnswerState>): QuizState {
  return {
    ...state,
    answers: { ...state.answers, [id]: { ...(state.answers[id] ?? EMPTY_ANSWER), ...patch } },
  };
}

function finish(state: QuizState, at?: string): QuizState {
  if (state.status === 'finished') return state;
  return { ...state, status: 'finished', finishedAt: at ?? new Date().toISOString() };
}

/**
 * Pure state machine for a running quiz. Practice mode locks an answer on
 * confirm and only moves forward; exam mode allows free navigation and
 * flagging with no feedback until finish.
 */
export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  if (state.status === 'finished') return state;
  const { mode } = state.session;
  const total = state.session.questions.length;
  if (total === 0) return action.type === 'finish' ? finish(state, action.at) : state;
  const id = currentId(state);
  const answer = state.answers[id] ?? EMPTY_ANSWER;

  switch (action.type) {
    case 'select': {
      if (mode === 'practice' && answer.confirmed) return state;
      if (action.index < 0 || action.index >= state.session.questions[state.currentIndex].options.length) {
        return state;
      }
      return withAnswer(state, id, { chosenIndex: action.index });
    }
    case 'confirm': {
      if (mode !== 'practice' || answer.confirmed || answer.chosenIndex === null) return state;
      return withAnswer(state, id, { confirmed: true });
    }
    case 'next': {
      if (mode === 'practice') {
        if (!answer.confirmed) return state;
        if (state.currentIndex === total - 1) return finish(state);
      } else if (state.currentIndex === total - 1) {
        return state;
      }
      return { ...state, currentIndex: state.currentIndex + 1 };
    }
    case 'prev': {
      if (mode !== 'exam' || state.currentIndex === 0) return state;
      return { ...state, currentIndex: state.currentIndex - 1 };
    }
    case 'goto': {
      if (mode !== 'exam' || action.index < 0 || action.index >= total) return state;
      return { ...state, currentIndex: action.index };
    }
    case 'toggleFlag': {
      if (mode !== 'exam') return state;
      return withAnswer(state, id, { flagged: !answer.flagged });
    }
    case 'finish':
      return finish(state, action.at);
    default:
      return state;
  }
}

export function useQuizSession(session: Session) {
  const [state, dispatch] = useReducer(quizReducer, session, initQuizState);

  const select = useCallback((index: number) => dispatch({ type: 'select', index }), []);
  const confirm = useCallback(() => dispatch({ type: 'confirm' }), []);
  const next = useCallback(() => dispatch({ type: 'next' }), []);
  const prev = useCallback(() => dispatch({ type: 'prev' }), []);
  const goto = useCallback((index: number) => dispatch({ type: 'goto', index }), []);
  const toggleFlag = useCallback(() => dispatch({ type: 'toggleFlag' }), []);
  const finishNow = useCallback((at?: string) => dispatch({ type: 'finish', at }), []);

  const current = state.session.questions[state.currentIndex];
  const answer = current ? state.answers[current.question.id] ?? EMPTY_ANSWER : EMPTY_ANSWER;

  const answeredCount = useMemo(
    () =>
      state.session.questions.filter((item) => {
        const a = state.answers[item.question.id];
        return a && a.chosenIndex !== null && (state.session.mode === 'exam' || a.confirmed);
      }).length,
    [state.answers, state.session],
  );

  const correctCount = useMemo(
    () =>
      state.session.questions.filter((item) => {
        const a = state.answers[item.question.id];
        return a && a.confirmed && a.chosenIndex === item.correctIndex;
      }).length,
    [state.answers, state.session],
  );

  return {
    state,
    current,
    answer,
    answeredCount,
    correctCount,
    isLast: state.currentIndex === state.session.questions.length - 1,
    select,
    confirm,
    next,
    prev,
    goto,
    toggleFlag,
    finish: finishNow,
  };
}
