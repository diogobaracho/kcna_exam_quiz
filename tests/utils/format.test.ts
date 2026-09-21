import { describe, expect, it } from 'vitest';
import { formatClock, formatDate, formatDuration, topicLabel } from '../../src/utils/format';

describe('format helpers', () => {
  it('formatClock pads minutes and seconds', () => {
    expect(formatClock(5400)).toBe('90:00');
    expect(formatClock(65)).toBe('01:05');
    expect(formatClock(-3)).toBe('00:00');
  });

  it('formatDuration is human friendly', () => {
    expect(formatDuration(45)).toBe('45s');
    expect(formatDuration(125)).toBe('2m 5s');
  });

  it('topicLabel turns kebab-case into a label', () => {
    expect(topicLabel('api-and-objects')).toBe('Api and objects');
  });

  it('formatDate falls back to the raw value when invalid', () => {
    expect(formatDate('not a date')).toBe('not a date');
    expect(formatDate('2026-09-21T10:00:00.000Z')).toMatch(/2026/);
  });
});
