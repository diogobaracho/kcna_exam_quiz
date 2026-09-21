import { topicKey } from './questionBank';
import type {
  AnswerMap,
  AnswerState,
  Attempt,
  AttemptAnswer,
  CategoryId,
  QuizMode,
  Session,
  SessionQuestion,
  Tally,
} from './types';

/** KCNA pass mark in percent. */
export const PASS_THRESHOLD = 75;

export interface AnswerEvaluation {
  chosenIndex: number | null;
  /** Whether the choice counts as an answer (practice requires confirmation). */
  counted: boolean;
  correct: boolean;
  chosenText: string | null;
  correctText: string;
}

export function evaluateAnswer(
  mode: QuizMode,
  item: SessionQuestion,
  answer: AnswerState | undefined,
): AnswerEvaluation {
  const chosenIndex = answer?.chosenIndex ?? null;
  const counted = chosenIndex !== null && (mode === 'exam' || Boolean(answer?.confirmed));
  const correct = counted && chosenIndex === item.correctIndex;
  return {
    chosenIndex,
    counted,
    correct,
    chosenText: counted && chosenIndex !== null ? item.options[chosenIndex].text : null,
    correctText: item.options[item.correctIndex].text,
  };
}

/** Percentage rounded to one decimal; 0 when total is 0. */
export function percentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 1000) / 10;
}

function bump(tally: Tally | undefined, correct: boolean): Tally {
  return { correct: (tally?.correct ?? 0) + (correct ? 1 : 0), total: (tally?.total ?? 0) + 1 };
}

/** Turn a finished session into a persistable Attempt. Unanswered = wrong. */
export function scoreSession(session: Session, answers: AnswerMap, finishedAt: Date = new Date()): Attempt {
  const perCategory: Partial<Record<CategoryId, Tally>> = {};
  const perTopic: Record<string, Tally> = {};
  const attemptAnswers: AttemptAnswer[] = [];
  let correctCount = 0;

  for (const item of session.questions) {
    const { question } = item;
    const evaluation = evaluateAnswer(session.mode, item, answers[question.id]);
    if (evaluation.correct) correctCount += 1;
    perCategory[question.category] = bump(perCategory[question.category], evaluation.correct);
    const key = topicKey(question.category, question.topic);
    perTopic[key] = bump(perTopic[key], evaluation.correct);
    attemptAnswers.push({
      questionId: question.id,
      category: question.category,
      topic: question.topic,
      chosenText: evaluation.chosenText,
      correctText: evaluation.correctText,
      correct: evaluation.correct,
    });
  }

  const total = session.questions.length;
  const scorePct = percentage(correctCount, total);
  const startedMs = Date.parse(session.startedAt);
  return {
    id: session.id,
    startedAt: session.startedAt,
    finishedAt: finishedAt.toISOString(),
    mode: session.mode,
    categories: session.config.categories,
    topics: session.config.topics,
    total,
    correct: correctCount,
    scorePct,
    passed: scorePct >= PASS_THRESHOLD,
    durationSec: Math.max(0, Math.round((finishedAt.getTime() - startedMs) / 1000)),
    perCategory,
    perTopic,
    answers: attemptAnswers,
  };
}
