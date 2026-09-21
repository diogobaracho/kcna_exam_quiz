import { CATEGORY_IDS, isCategoryId } from '../domain/categories';
import type { CategoryId, Distribution, QuizMode } from '../domain/types';
import { defaultStorage, isCorrupt, readJson, writeJson, type SaveResult, type StorageLike } from './storage';

export const SETTINGS_KEY = 'kcna-quiz:settings:v1';
export const SETTINGS_VERSION = 1;

export interface QuizSettings {
  mode: QuizMode;
  count: number;
  categories: CategoryId[];
  /** Topic keys ("category/topic") or null for all. */
  topics: string[] | null;
  distribution: Distribution;
  timerEnabled: boolean;
}

export const MAX_COUNT = 500;

export const DEFAULT_SETTINGS: QuizSettings = {
  mode: 'practice',
  count: 20,
  categories: [...CATEGORY_IDS],
  topics: null,
  distribution: 'weighted',
  timerEnabled: false,
};

/** Field-by-field validation: anything invalid falls back to the default. */
export function sanitizeSettings(value: unknown): QuizSettings {
  const base = { ...DEFAULT_SETTINGS, categories: [...DEFAULT_SETTINGS.categories] };
  if (!value || typeof value !== 'object') return base;
  const raw = value as Record<string, unknown>;
  const result: QuizSettings = { ...base };

  if (raw.mode === 'practice' || raw.mode === 'exam') result.mode = raw.mode;
  if (typeof raw.count === 'number' && Number.isInteger(raw.count) && raw.count >= 1 && raw.count <= MAX_COUNT) {
    result.count = raw.count;
  }
  if (Array.isArray(raw.categories)) {
    const categories = raw.categories.filter((c): c is CategoryId => typeof c === 'string' && isCategoryId(c));
    result.categories = [...new Set(categories)];
  }
  if (raw.topics === null) {
    result.topics = null;
  } else if (Array.isArray(raw.topics)) {
    const topics = raw.topics.filter((t): t is string => typeof t === 'string' && t.includes('/'));
    result.topics = topics.length > 0 ? [...new Set(topics)] : null;
  }
  if (raw.distribution === 'weighted' || raw.distribution === 'uniform') result.distribution = raw.distribution;
  if (typeof raw.timerEnabled === 'boolean') result.timerEnabled = raw.timerEnabled;
  return result;
}

export function loadSettings(storage: StorageLike | null = defaultStorage()): QuizSettings {
  const raw = readJson(storage, SETTINGS_KEY);
  if (raw === undefined || isCorrupt(raw)) return sanitizeSettings(undefined);
  return sanitizeSettings(raw);
}

export function saveSettings(settings: QuizSettings, storage: StorageLike | null = defaultStorage()): SaveResult {
  return writeJson(storage, SETTINGS_KEY, { version: SETTINGS_VERSION, ...settings });
}
