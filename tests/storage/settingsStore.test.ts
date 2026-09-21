import { describe, expect, it } from 'vitest';
import {
  DEFAULT_SETTINGS,
  SETTINGS_KEY,
  loadSettings,
  sanitizeSettings,
  saveSettings,
} from '../../src/storage/settingsStore';

describe('settingsStore', () => {
  it('returns defaults when nothing is stored', () => {
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('round-trips settings', () => {
    const settings = {
      mode: 'exam' as const,
      count: 60,
      categories: ['container-orchestration' as const],
      topics: ['container-orchestration/runtime'],
      distribution: 'uniform' as const,
      timerEnabled: true,
    };
    expect(saveSettings(settings)).toEqual({ ok: true });
    expect(loadSettings()).toEqual(settings);
  });

  it('falls back field by field', () => {
    const result = sanitizeSettings({
      mode: 'weird',
      count: 0,
      categories: ['nope', 'kubernetes-fundamentals', 'kubernetes-fundamentals'],
      topics: ['no-slash', 'kubernetes-fundamentals/workloads'],
      distribution: 5,
      timerEnabled: 'yes',
    });
    expect(result).toEqual({
      ...DEFAULT_SETTINGS,
      categories: ['kubernetes-fundamentals'],
      topics: ['kubernetes-fundamentals/workloads'],
    });
  });

  it('treats an empty topic list as "all topics"', () => {
    expect(sanitizeSettings({ topics: [] }).topics).toBeNull();
    expect(sanitizeSettings({ topics: 'x' }).topics).toBeNull();
  });

  it('returns defaults for corrupt JSON', () => {
    window.localStorage.setItem(SETTINGS_KEY, '{{');
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('does not share the default categories array', () => {
    const a = sanitizeSettings(undefined);
    a.categories.pop();
    expect(sanitizeSettings(undefined).categories).toHaveLength(5);
  });
});
