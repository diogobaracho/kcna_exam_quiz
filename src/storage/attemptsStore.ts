import type { Attempt } from '../domain/types';
import { defaultStorage, isCorrupt, readJson, writeJson, type SaveResult, type StorageLike } from './storage';

export const ATTEMPTS_KEY = 'kcna-quiz:attempts:v1';
export const ATTEMPTS_VERSION = 1;

export interface AttemptsLoadResult {
  attempts: Attempt[];
  /** True when stored data existed but could not be used (parse error, wrong version, bad shape). */
  corrupt: boolean;
}

function isAttempt(value: unknown): value is Attempt {
  if (!value || typeof value !== 'object') return false;
  const a = value as Record<string, unknown>;
  return (
    typeof a.id === 'string' &&
    typeof a.startedAt === 'string' &&
    typeof a.finishedAt === 'string' &&
    (a.mode === 'practice' || a.mode === 'exam') &&
    Array.isArray(a.categories) &&
    typeof a.total === 'number' &&
    typeof a.correct === 'number' &&
    typeof a.scorePct === 'number' &&
    typeof a.passed === 'boolean' &&
    typeof a.perCategory === 'object' &&
    typeof a.perTopic === 'object' &&
    Array.isArray(a.answers)
  );
}

export function loadAttempts(storage: StorageLike | null = defaultStorage()): AttemptsLoadResult {
  const raw = readJson(storage, ATTEMPTS_KEY);
  if (raw === undefined) return { attempts: [], corrupt: false };
  if (isCorrupt(raw) || !raw || typeof raw !== 'object') return { attempts: [], corrupt: true };
  const envelope = raw as { version?: unknown; attempts?: unknown };
  if (envelope.version !== ATTEMPTS_VERSION || !Array.isArray(envelope.attempts)) {
    return { attempts: [], corrupt: true };
  }
  const attempts = envelope.attempts.filter(isAttempt);
  return { attempts, corrupt: attempts.length !== envelope.attempts.length };
}

function write(attempts: Attempt[], storage: StorageLike | null): SaveResult {
  return writeJson(storage, ATTEMPTS_KEY, { version: ATTEMPTS_VERSION, attempts });
}

/** Prepend the attempt (newest first). Existing corrupt data is replaced. */
export function saveAttempt(attempt: Attempt, storage: StorageLike | null = defaultStorage()): SaveResult {
  const { attempts } = loadAttempts(storage);
  return write([attempt, ...attempts.filter((a) => a.id !== attempt.id)], storage);
}

export function deleteAttempt(id: string, storage: StorageLike | null = defaultStorage()): SaveResult {
  const { attempts } = loadAttempts(storage);
  return write(
    attempts.filter((a) => a.id !== id),
    storage,
  );
}

export function clearAttempts(storage: StorageLike | null = defaultStorage()): SaveResult {
  if (!storage) return { ok: false, reason: 'Local storage is not available in this browser.' };
  try {
    storage.removeItem(ATTEMPTS_KEY);
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : 'Could not clear local storage.' };
  }
}
