import { describe, expect, it } from 'vitest';
import {
  ATTEMPTS_KEY,
  clearAttempts,
  deleteAttempt,
  loadAttempts,
  saveAttempt,
} from '../../src/storage/attemptsStore';
import type { StorageLike } from '../../src/storage/storage';
import { scoreSession } from '../../src/domain/scoring';
import { answersFor, makeQuestion, makeSession } from '../helpers/fixtures';

function memoryStorage(initial: Record<string, string> = {}): StorageLike & { data: Record<string, string> } {
  const data = { ...initial };
  return {
    data,
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = value;
    },
    removeItem: (key) => {
      delete data[key];
    },
  };
}

function attempt(id: string) {
  const session = makeSession([makeQuestion({ id: `${id}-q` })], 'practice', { id });
  return scoreSession(session, answersFor(session, [0]));
}

describe('attemptsStore', () => {
  it('returns an empty, non-corrupt list when nothing is stored', () => {
    expect(loadAttempts(memoryStorage())).toEqual({ attempts: [], corrupt: false });
  });

  it('round-trips attempts newest first', () => {
    const storage = memoryStorage();
    expect(saveAttempt(attempt('first'), storage)).toEqual({ ok: true });
    expect(saveAttempt(attempt('second'), storage)).toEqual({ ok: true });
    const loaded = loadAttempts(storage);
    expect(loaded.corrupt).toBe(false);
    expect(loaded.attempts.map((a) => a.id)).toEqual(['second', 'first']);
    expect(JSON.parse(storage.data[ATTEMPTS_KEY]).version).toBe(1);
  });

  it('replaces an attempt with the same id instead of duplicating it', () => {
    const storage = memoryStorage();
    saveAttempt(attempt('same'), storage);
    saveAttempt(attempt('same'), storage);
    expect(loadAttempts(storage).attempts).toHaveLength(1);
  });

  it('deletes one and clears all', () => {
    const storage = memoryStorage();
    saveAttempt(attempt('a'), storage);
    saveAttempt(attempt('b'), storage);
    expect(deleteAttempt('a', storage)).toEqual({ ok: true });
    expect(loadAttempts(storage).attempts.map((a) => a.id)).toEqual(['b']);
    expect(clearAttempts(storage)).toEqual({ ok: true });
    expect(loadAttempts(storage)).toEqual({ attempts: [], corrupt: false });
  });

  it.each([
    ['corrupt JSON', '{not json'],
    ['wrong version', JSON.stringify({ version: 2, attempts: [] })],
    ['non-array attempts', JSON.stringify({ version: 1, attempts: {} })],
    ['non-object', JSON.stringify(42)],
  ])('degrades to an empty list on %s', (_label, raw) => {
    const result = loadAttempts(memoryStorage({ [ATTEMPTS_KEY]: raw }));
    expect(result).toEqual({ attempts: [], corrupt: true });
  });

  it('drops malformed entries but keeps valid ones', () => {
    const storage = memoryStorage({
      [ATTEMPTS_KEY]: JSON.stringify({ version: 1, attempts: [attempt('ok'), { id: 'broken' }] }),
    });
    const result = loadAttempts(storage);
    expect(result.attempts.map((a) => a.id)).toEqual(['ok']);
    expect(result.corrupt).toBe(true);
  });

  it('recovers from corrupt data on the next save', () => {
    const storage = memoryStorage({ [ATTEMPTS_KEY]: 'garbage' });
    saveAttempt(attempt('new'), storage);
    expect(loadAttempts(storage)).toMatchObject({ corrupt: false });
    expect(loadAttempts(storage).attempts).toHaveLength(1);
  });

  it('reports write failures without throwing', () => {
    const storage = memoryStorage();
    storage.setItem = () => {
      throw new Error('QuotaExceededError');
    };
    expect(saveAttempt(attempt('x'), storage)).toEqual({ ok: false, reason: 'QuotaExceededError' });
  });

  it('handles an unavailable storage', () => {
    expect(loadAttempts(null)).toEqual({ attempts: [], corrupt: false });
    expect(saveAttempt(attempt('x'), null).ok).toBe(false);
    expect(clearAttempts(null).ok).toBe(false);
  });

  it('uses window.localStorage by default', () => {
    saveAttempt(attempt('default'));
    expect(loadAttempts().attempts.map((a) => a.id)).toEqual(['default']);
    expect(window.localStorage.getItem(ATTEMPTS_KEY)).toContain('"default"');
  });
});
