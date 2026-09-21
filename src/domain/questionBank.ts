import { CATEGORY_IDS } from './categories';
import { QuestionParseError, parseQuestion } from './parseQuestion';
import type { CategoryId, Question, TopicSummary } from './types';

/**
 * Every Markdown file under data/questions is bundled as a raw string at build
 * time. The key is the project-relative path ("/data/questions/<cat>/<topic>/<file>.md").
 */
const bankFiles = import.meta.glob('/data/questions/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface BankLoadResult {
  questions: Question[];
  errors: QuestionParseError[];
}

export function topicKey(category: CategoryId, topic: string): string {
  return `${category}/${topic}`;
}

/**
 * Parse every file. All errors are collected (not just the first) so a
 * contributor sees the full list in one validation run.
 */
export function loadQuestionBank(files: Record<string, string> = bankFiles): BankLoadResult {
  const questions: Question[] = [];
  const errors: QuestionParseError[] = [];
  const seenIds = new Map<string, string>();

  for (const filePath of Object.keys(files).sort()) {
    const relativePath = filePath.replace(/^\//, '');
    try {
      const question = parseQuestion(files[filePath], relativePath);
      const previous = seenIds.get(question.id);
      if (previous) {
        errors.push(
          new QuestionParseError(
            relativePath,
            `duplicate id "${question.id}" also used by ${previous}`,
          ),
        );
        continue;
      }
      seenIds.set(question.id, relativePath);
      questions.push(question);
    } catch (error) {
      if (error instanceof QuestionParseError) {
        errors.push(error);
      } else {
        errors.push(new QuestionParseError(relativePath, String(error)));
      }
    }
  }
  return { questions, errors };
}

let cachedBank: Question[] | null = null;

/** The parsed bank (valid questions only), memoised for the app lifetime. */
export function getBank(): Question[] {
  if (!cachedBank) {
    cachedBank = loadQuestionBank().questions;
  }
  return cachedBank;
}

export function getQuestionById(id: string, bank: Question[] = getBank()): Question | undefined {
  return bank.find((q) => q.id === id);
}

export function topicsByCategory(bank: Question[] = getBank()): Record<CategoryId, TopicSummary[]> {
  const result = {} as Record<CategoryId, TopicSummary[]>;
  for (const id of CATEGORY_IDS) {
    result[id] = [];
  }
  const counts = new Map<string, number>();
  for (const question of bank) {
    const key = topicKey(question.category, question.topic);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  for (const [key, count] of counts) {
    const [category, topic] = key.split('/') as [CategoryId, string];
    result[category].push({ id: topic, key, count });
  }
  for (const id of CATEGORY_IDS) {
    result[id].sort((a, b) => a.id.localeCompare(b.id));
  }
  return result;
}

/** Questions matching the selected categories and (optionally) topic keys. */
export function filterBank(
  bank: Question[],
  categories: CategoryId[],
  topics: string[] | null,
): Question[] {
  const categorySet = new Set(categories);
  const topicSet = topics ? new Set(topics) : null;
  return bank.filter((question) => {
    if (!categorySet.has(question.category)) return false;
    if (topicSet && !topicSet.has(topicKey(question.category, question.topic))) return false;
    return true;
  });
}

export function countFor(
  categories: CategoryId[],
  topics: string[] | null,
  bank: Question[] = getBank(),
): number {
  return filterBank(bank, categories, topics).length;
}
