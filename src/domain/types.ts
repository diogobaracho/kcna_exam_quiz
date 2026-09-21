/**
 * Core domain types. Plain data only (no classes) so everything can be
 * serialised to localStorage and compared structurally in tests.
 */

export type CategoryId =
  | 'kubernetes-fundamentals'
  | 'container-orchestration'
  | 'cloud-native-architecture'
  | 'cloud-native-observability'
  | 'cloud-native-application-delivery';

export interface Category {
  id: CategoryId;
  /** English display name. */
  name: string;
  /** Portuguese display name. */
  namePt: string;
  /** Official KCNA exam weight in percent. All weights sum to 100. */
  weight: number;
  /** Display order (1 = first). */
  order: number;
  /** Short prefix used in question ids, e.g. "kf". */
  prefix: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuestionOption {
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  category: CategoryId;
  topic: string;
  difficulty: Difficulty;
  tags: string[];
  source?: string;
  /** The question stem (body of "# Question"). */
  prompt: string;
  /** 3–5 options, exactly one correct. Original file order. */
  options: QuestionOption[];
  /** Body of "## Explanation" (English, technical). */
  explanationEn: string;
  /** Body of "## Explicação para criança" (Portuguese, simple). */
  explanationPt: string;
  /** Path of the source file, for error messages. */
  filePath: string;
}

export interface TopicSummary {
  /** Topic folder name, e.g. "scheduling". */
  id: string;
  /** "category/topic" key used for selection. */
  key: string;
  count: number;
}

export type QuizMode = 'practice' | 'exam';
export type Distribution = 'weighted' | 'uniform';

export interface SessionConfig {
  mode: QuizMode;
  count: number;
  categories: CategoryId[];
  /** Topic keys ("category/topic") or null for all topics of the selected categories. */
  topics: string[] | null;
  distribution: Distribution;
  timerEnabled: boolean;
  /** Optional PRNG seed for reproducible sessions (tests). */
  seed?: number;
  /** When set, the session is built from exactly these question ids (retry flows). */
  questionIds?: string[];
}

export interface ShuffledOption {
  text: string;
  originalIndex: number;
}

export interface SessionQuestion {
  question: Question;
  /** Options in the order shown to the learner for this session. */
  options: ShuffledOption[];
  /** Index inside `options` of the correct answer. */
  correctIndex: number;
}

export interface Session {
  id: string;
  mode: QuizMode;
  config: SessionConfig;
  questions: SessionQuestion[];
  startedAt: string;
  /** Countdown length in seconds, or null when no timer. */
  timerSeconds: number | null;
}

export interface AnswerState {
  chosenIndex: number | null;
  confirmed: boolean;
  flagged: boolean;
}

/** questionId -> answer state */
export type AnswerMap = Record<string, AnswerState>;

export interface Tally {
  correct: number;
  total: number;
}

export interface AttemptAnswer {
  questionId: string;
  category: CategoryId;
  topic: string;
  chosenText: string | null;
  correctText: string;
  correct: boolean;
}

export interface Attempt {
  id: string;
  startedAt: string;
  finishedAt: string;
  mode: QuizMode;
  categories: CategoryId[];
  topics: string[] | null;
  total: number;
  correct: number;
  /** 0–100 with one decimal. */
  scorePct: number;
  passed: boolean;
  durationSec: number;
  perCategory: Partial<Record<CategoryId, Tally>>;
  /** keyed by "category/topic" */
  perTopic: Record<string, Tally>;
  answers: AttemptAnswer[];
}

export interface WeakTopic {
  key: string;
  category: CategoryId;
  topic: string;
  correct: number;
  total: number;
  accuracyPct: number;
}

export interface WeakCategory {
  category: CategoryId;
  correct: number;
  total: number;
  accuracyPct: number;
}

export interface MissedQuestion {
  questionId: string;
  misses: number;
  attempts: number;
}

export interface FocusReport {
  enoughData: boolean;
  weakTopics: WeakTopic[];
  weakCategories: WeakCategory[];
  mostMissed: MissedQuestion[];
}
