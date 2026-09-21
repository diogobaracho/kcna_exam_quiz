import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../../src/domain/random';
import {
  SECONDS_PER_QUESTION,
  allocateCounts,
  buildSession,
  selectQuestions,
  shuffleOptions,
} from '../../src/domain/selectQuestions';
import type { Question, SessionConfig } from '../../src/domain/types';
import { makeQuestion, makeQuestions } from '../helpers/fixtures';

const bank: Question[] = [
  ...makeQuestions(50, 'kubernetes-fundamentals', 'architecture'),
  ...makeQuestions(30, 'kubernetes-fundamentals', 'workloads'),
  ...makeQuestions(40, 'container-orchestration', 'runtime'),
  ...makeQuestions(30, 'cloud-native-architecture', 'fundamentals'),
  ...makeQuestions(15, 'cloud-native-observability', 'telemetry-fundamentals'),
  ...makeQuestions(15, 'cloud-native-application-delivery', 'gitops'),
];

const ALL: SessionConfig['categories'] = [
  'kubernetes-fundamentals',
  'container-orchestration',
  'cloud-native-architecture',
  'cloud-native-observability',
  'cloud-native-application-delivery',
];

function config(overrides: Partial<SessionConfig> = {}): SessionConfig {
  return {
    mode: 'practice',
    count: 20,
    categories: ALL,
    topics: null,
    distribution: 'weighted',
    timerEnabled: false,
    seed: 1,
    ...overrides,
  };
}

describe('allocateCounts', () => {
  it('follows KCNA weights with largest-remainder rounding for 60 questions', () => {
    const result = allocateCounts(
      {
        'kubernetes-fundamentals': 100,
        'container-orchestration': 100,
        'cloud-native-architecture': 100,
        'cloud-native-observability': 100,
        'cloud-native-application-delivery': 100,
      },
      60,
      'weighted',
    );
    // 27.6 / 13.2 / 9.6 / 4.8 / 4.8 -> floors 27/13/9/4/4 = 57, +3 to the largest fractions:
    // .8 (cno), .8 (cnad), then the .6 tie between kf and cna goes to the heavier weight (kf).
    expect(result).toEqual({
      'kubernetes-fundamentals': 28,
      'container-orchestration': 13,
      'cloud-native-architecture': 9,
      'cloud-native-observability': 5,
      'cloud-native-application-delivery': 5,
    });
    expect(Object.values(result).reduce((a, b) => a + b, 0)).toBe(60);
  });

  it('splits evenly for uniform distribution', () => {
    const result = allocateCounts(
      { 'kubernetes-fundamentals': 100, 'container-orchestration': 100, 'cloud-native-architecture': 100 },
      10,
      'uniform',
    );
    expect(Object.values(result).sort()).toEqual([3, 3, 4]);
  });

  it('caps at availability and redistributes the excess', () => {
    const result = allocateCounts(
      { 'kubernetes-fundamentals': 2, 'container-orchestration': 100 },
      20,
      'weighted',
    );
    expect(result).toEqual({ 'kubernetes-fundamentals': 2, 'container-orchestration': 18 });
  });

  it('never exceeds the total available', () => {
    const result = allocateCounts({ 'kubernetes-fundamentals': 3, 'container-orchestration': 2 }, 50, 'weighted');
    expect(result).toEqual({ 'kubernetes-fundamentals': 3, 'container-orchestration': 2 });
  });

  it('returns an empty allocation when nothing is available or count is 0', () => {
    expect(allocateCounts({}, 10, 'weighted')).toEqual({});
    expect(allocateCounts({ 'kubernetes-fundamentals': 0 }, 10, 'weighted')).toEqual({});
    expect(allocateCounts({ 'kubernetes-fundamentals': 10 }, 0, 'weighted')).toEqual({});
  });
});

describe('selectQuestions', () => {
  it('respects the requested count and category filter', () => {
    const picked = selectQuestions(bank, config({ count: 10, categories: ['container-orchestration'] }), mulberry32(1));
    expect(picked).toHaveLength(10);
    expect(picked.every((q) => q.category === 'container-orchestration')).toBe(true);
    expect(new Set(picked.map((q) => q.id)).size).toBe(10);
  });

  it('respects the topic filter', () => {
    const picked = selectQuestions(
      bank,
      config({ count: 10, categories: ['kubernetes-fundamentals'], topics: ['kubernetes-fundamentals/workloads'] }),
      mulberry32(1),
    );
    expect(picked).toHaveLength(10);
    expect(picked.every((q) => q.topic === 'workloads')).toBe(true);
  });

  it('caps the count to what is available', () => {
    const picked = selectQuestions(bank, config({ count: 500, categories: ['cloud-native-observability'] }), mulberry32(1));
    expect(picked).toHaveLength(15);
  });

  it('uses the weighted distribution across all categories', () => {
    const picked = selectQuestions(bank, config({ count: 60 }), mulberry32(3));
    const count = (id: string) => picked.filter((q) => q.category === id).length;
    expect(picked).toHaveLength(60);
    expect(count('kubernetes-fundamentals')).toBe(28);
    expect(count('container-orchestration')).toBe(13);
    expect(count('cloud-native-architecture')).toBe(9);
    expect(count('cloud-native-observability')).toBe(5);
    expect(count('cloud-native-application-delivery')).toBe(5);
  });

  it('is deterministic for the same seed and different for another', () => {
    const a = selectQuestions(bank, config(), mulberry32(9)).map((q) => q.id);
    const b = selectQuestions(bank, config(), mulberry32(9)).map((q) => q.id);
    const c = selectQuestions(bank, config(), mulberry32(10)).map((q) => q.id);
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
  });

  it('builds from explicit question ids for retry flows, ignoring unknown ids', () => {
    const picked = selectQuestions(
      bank,
      config({ questionIds: ['kubernetes-fundamentals-architecture-1', 'container-orchestration-runtime-2', 'nope'] }),
      mulberry32(1),
    );
    expect(picked.map((q) => q.id).sort()).toEqual([
      'container-orchestration-runtime-2',
      'kubernetes-fundamentals-architecture-1',
    ]);
  });
});

describe('shuffleOptions', () => {
  it('tracks the correct answer after shuffling', () => {
    const question = makeQuestion({
      options: [
        { text: 'a', correct: false },
        { text: 'b', correct: false },
        { text: 'c', correct: true },
        { text: 'd', correct: false },
      ],
    });
    for (let seed = 0; seed < 20; seed += 1) {
      const { options, correctIndex } = shuffleOptions(question, mulberry32(seed));
      expect(options).toHaveLength(4);
      expect(options[correctIndex].text).toBe('c');
      expect(options[correctIndex].originalIndex).toBe(2);
    }
  });
});

describe('buildSession', () => {
  it('creates a timed exam session with shuffled options and normalised count', () => {
    const now = new Date('2026-09-21T10:00:00.000Z');
    const session = buildSession(config({ mode: 'exam', count: 12 }), bank, now);
    expect(session.mode).toBe('exam');
    expect(session.questions).toHaveLength(12);
    expect(session.config.count).toBe(12);
    expect(session.config.seed).toBe(1);
    expect(session.startedAt).toBe(now.toISOString());
    expect(session.timerSeconds).toBe(12 * SECONDS_PER_QUESTION);
    for (const item of session.questions) {
      expect(item.options[item.correctIndex].text).toBe(`${item.question.id} correct`);
    }
  });

  it('has no timer in practice mode unless enabled, and normalises a capped count', () => {
    const untimed = buildSession(config({ count: 100, categories: ['cloud-native-observability'] }), bank);
    expect(untimed.timerSeconds).toBeNull();
    expect(untimed.config.count).toBe(15);
    const timed = buildSession(config({ count: 4, timerEnabled: true }), bank);
    expect(timed.timerSeconds).toBe(4 * SECONDS_PER_QUESTION);
  });

  it('assigns a random seed when none is given', () => {
    const session = buildSession(config({ seed: undefined }), bank);
    expect(typeof session.config.seed).toBe('number');
  });
});
