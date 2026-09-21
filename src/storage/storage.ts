/** Minimal subset of the Web Storage API, injectable for tests. */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export type SaveResult = { ok: true } | { ok: false; reason: string };

/** localStorage, or null when unavailable (private mode, disabled, SSR). */
export function defaultStorage(): StorageLike | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readJson(storage: StorageLike | null, key: string): unknown {
  if (!storage) return undefined;
  try {
    const raw = storage.getItem(key);
    if (raw === null) return undefined;
    return JSON.parse(raw);
  } catch {
    return Symbol.for('corrupt');
  }
}

export function isCorrupt(value: unknown): boolean {
  return value === Symbol.for('corrupt');
}

export function writeJson(storage: StorageLike | null, key: string, value: unknown): SaveResult {
  if (!storage) {
    return { ok: false, reason: 'Local storage is not available in this browser.' };
  }
  try {
    storage.setItem(key, JSON.stringify(value));
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : 'Could not write to local storage.' };
  }
}
