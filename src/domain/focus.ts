import { getCategory } from './categories';
import { PASS_THRESHOLD, percentage } from './scoring';
import type {
  Attempt,
  CategoryId,
  FocusReport,
  MissedQuestion,
  Tally,
  WeakCategory,
  WeakTopic,
} from './types';

/** A topic/domain needs at least this many answered questions to be judged. */
export const FOCUS_MIN_ANSWERED = 3;
/** Accuracy below this percentage marks a weak area. */
export const FOCUS_THRESHOLD = PASS_THRESHOLD;
/** A question missed at least this many times is listed. */
export const FOCUS_MIN_MISSES = 2;

export interface AggregatedTallies {
  perCategory: Partial<Record<CategoryId, Tally>>;
  perTopic: Record<string, Tally>;
  totalAnswered: number;
  totalCorrect: number;
}

function add(target: Tally | undefined, tally: Tally): Tally {
  return { correct: (target?.correct ?? 0) + tally.correct, total: (target?.total ?? 0) + tally.total };
}

/** Sum per-category and per-topic tallies across all attempts. */
export function aggregateTallies(attempts: Attempt[]): AggregatedTallies {
  const perCategory: Partial<Record<CategoryId, Tally>> = {};
  const perTopic: Record<string, Tally> = {};
  let totalAnswered = 0;
  let totalCorrect = 0;
  for (const attempt of attempts) {
    totalAnswered += attempt.total;
    totalCorrect += attempt.correct;
    for (const [id, tally] of Object.entries(attempt.perCategory) as [CategoryId, Tally][]) {
      perCategory[id] = add(perCategory[id], tally);
    }
    for (const [key, tally] of Object.entries(attempt.perTopic)) {
      perTopic[key] = add(perTopic[key], tally);
    }
  }
  return { perCategory, perTopic, totalAnswered, totalCorrect };
}

function byWeakness(a: { accuracyPct: number; category: CategoryId; key?: string }, b: typeof a): number {
  return (
    a.accuracyPct - b.accuracyPct ||
    getCategory(b.category).weight - getCategory(a.category).weight ||
    (a.key ?? a.category).localeCompare(b.key ?? b.category)
  );
}

/** Derive focus suggestions from the attempt history. */
export function buildFocusReport(attempts: Attempt[]): FocusReport {
  const { perCategory, perTopic } = aggregateTallies(attempts);

  const weakTopics: WeakTopic[] = Object.entries(perTopic)
    .filter(([, tally]) => tally.total >= FOCUS_MIN_ANSWERED)
    .map(([key, tally]) => {
      const [category, topic] = key.split('/') as [CategoryId, string];
      return { key, category, topic, correct: tally.correct, total: tally.total, accuracyPct: percentage(tally.correct, tally.total) };
    })
    .filter((t) => t.accuracyPct < FOCUS_THRESHOLD)
    .sort(byWeakness);

  const weakCategories: WeakCategory[] = (Object.entries(perCategory) as [CategoryId, Tally][])
    .filter(([, tally]) => tally.total >= FOCUS_MIN_ANSWERED)
    .map(([category, tally]) => ({ category, correct: tally.correct, total: tally.total, accuracyPct: percentage(tally.correct, tally.total) }))
    .filter((c) => c.accuracyPct < FOCUS_THRESHOLD)
    .sort(byWeakness);

  const missCounts = new Map<string, MissedQuestion>();
  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const entry = missCounts.get(answer.questionId) ?? { questionId: answer.questionId, misses: 0, attempts: 0 };
      entry.attempts += 1;
      if (!answer.correct) entry.misses += 1;
      missCounts.set(answer.questionId, entry);
    }
  }
  const mostMissed = [...missCounts.values()]
    .filter((m) => m.misses >= FOCUS_MIN_MISSES)
    .sort((a, b) => b.misses - a.misses || a.attempts - b.attempts || a.questionId.localeCompare(b.questionId));

  const enoughData = Object.values(perTopic).some((t) => t.total >= FOCUS_MIN_ANSWERED);
  return { enoughData, weakTopics, weakCategories, mostMissed };
}

export interface FocusSelection {
  categories: CategoryId[];
  topics: string[] | null;
}

/** Turn a report into a setup pre-selection, or null when there is nothing to focus on. */
export function focusToSelection(report: FocusReport): FocusSelection | null {
  if (report.weakTopics.length > 0) {
    const categories = [...new Set(report.weakTopics.map((t) => t.category))];
    return { categories, topics: report.weakTopics.map((t) => t.key) };
  }
  if (report.weakCategories.length > 0) {
    return { categories: report.weakCategories.map((c) => c.category), topics: null };
  }
  return null;
}
