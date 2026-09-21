import { getCategory } from './categories';
import { filterBank, getQuestionById } from './questionBank';
import { mulberry32, randomSeed, sample, shuffle, type Rng } from './random';
import type {
  CategoryId,
  Distribution,
  Question,
  Session,
  SessionConfig,
  SessionQuestion,
  ShuffledOption,
} from './types';

/** The real exam gives 90 minutes for 60 questions. */
export const SECONDS_PER_QUESTION = 90;

interface Bucket {
  id: CategoryId;
  available: number;
  assigned: number;
  fraction: number;
  weight: number;
  order: number;
}

/**
 * Decide how many questions to take from each category.
 *
 * "weighted" follows the official KCNA weights, "uniform" splits evenly.
 * Uses largest-remainder rounding, then caps each category at what is
 * available and redistributes the excess to categories with spare questions.
 */
export function allocateCounts(
  available: Partial<Record<CategoryId, number>>,
  count: number,
  distribution: Distribution,
): Partial<Record<CategoryId, number>> {
  const result: Partial<Record<CategoryId, number>> = {};
  const buckets: Bucket[] = (Object.entries(available) as [CategoryId, number][])
    .filter(([, n]) => n > 0)
    .map(([id, n]) => {
      const category = getCategory(id);
      return {
        id,
        available: n,
        assigned: 0,
        fraction: 0,
        weight: distribution === 'weighted' ? category.weight : 1,
        order: category.order,
      };
    });

  const capacity = buckets.reduce((sum, b) => sum + b.available, 0);
  const target = Math.max(0, Math.min(count, capacity));
  if (buckets.length === 0 || target === 0) {
    return result;
  }

  const totalWeight = buckets.reduce((sum, b) => sum + b.weight, 0);
  for (const bucket of buckets) {
    const exact = (target * bucket.weight) / totalWeight;
    bucket.assigned = Math.floor(exact);
    bucket.fraction = exact - bucket.assigned;
  }

  let assigned = buckets.reduce((sum, b) => sum + b.assigned, 0);
  const byRemainder = [...buckets].sort(
    (a, b) => b.fraction - a.fraction || b.weight - a.weight || a.order - b.order,
  );
  for (const bucket of byRemainder) {
    if (assigned >= target) break;
    bucket.assigned += 1;
    assigned += 1;
  }

  let excess = 0;
  for (const bucket of buckets) {
    if (bucket.assigned > bucket.available) {
      excess += bucket.assigned - bucket.available;
      bucket.assigned = bucket.available;
    }
  }
  while (excess > 0) {
    const withRoom = buckets
      .filter((b) => b.assigned < b.available)
      .sort((a, b) => b.weight - a.weight || a.order - b.order);
    if (withRoom.length === 0) break;
    for (const bucket of withRoom) {
      if (excess === 0) break;
      bucket.assigned += 1;
      excess -= 1;
    }
  }

  for (const bucket of buckets) {
    result[bucket.id] = bucket.assigned;
  }
  return result;
}

/** Pick the questions for a session (unshuffled options). */
export function selectQuestions(bank: Question[], config: SessionConfig, rng: Rng): Question[] {
  if (config.questionIds) {
    const questions = config.questionIds
      .map((id) => getQuestionById(id, bank))
      .filter((q): q is Question => Boolean(q));
    return shuffle(questions, rng);
  }

  const pool = filterBank(bank, config.categories, config.topics);
  const byCategory = new Map<CategoryId, Question[]>();
  for (const question of pool) {
    const list = byCategory.get(question.category) ?? [];
    list.push(question);
    byCategory.set(question.category, list);
  }

  const available: Partial<Record<CategoryId, number>> = {};
  for (const [id, list] of byCategory) {
    available[id] = list.length;
  }
  const allocation = allocateCounts(available, config.count, config.distribution);

  const picked: Question[] = [];
  for (const [id, list] of byCategory) {
    const n = allocation[id] ?? 0;
    if (n > 0) {
      picked.push(...sample(list, n, rng));
    }
  }
  return shuffle(picked, rng);
}

/** Shuffle the options of one question, remembering where the correct one went. */
export function shuffleOptions(
  question: Question,
  rng: Rng,
): { options: ShuffledOption[]; correctIndex: number } {
  const options = shuffle(
    question.options.map((option, originalIndex) => ({ text: option.text, originalIndex })),
    rng,
  );
  const correctIndex = options.findIndex((o) => question.options[o.originalIndex].correct);
  return { options, correctIndex };
}

/** Build a complete session from a config and the bank. */
export function buildSession(config: SessionConfig, bank: Question[], now: Date = new Date()): Session {
  const seed = config.seed ?? randomSeed();
  const rng = mulberry32(seed);
  const questions: SessionQuestion[] = selectQuestions(bank, config, rng).map((question) => ({
    question,
    ...shuffleOptions(question, rng),
  }));
  const count = questions.length;
  const timed = config.mode === 'exam' || config.timerEnabled;
  return {
    id: `${now.getTime()}-${Math.floor(rng() * 1e9).toString(36)}`,
    mode: config.mode,
    config: { ...config, seed, count },
    questions,
    startedAt: now.toISOString(),
    timerSeconds: timed && count > 0 ? count * SECONDS_PER_QUESTION : null,
  };
}
