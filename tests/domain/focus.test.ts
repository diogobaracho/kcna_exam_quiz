import { describe, expect, it } from 'vitest';
import { aggregateTallies, buildFocusReport, focusToSelection } from '../../src/domain/focus';
import type { Attempt } from '../../src/domain/types';

function attempt(
  id: string,
  perTopic: Record<string, { correct: number; total: number }>,
  answers: { questionId: string; correct: boolean }[] = [],
): Attempt {
  const perCategory: Attempt['perCategory'] = {};
  for (const [key, tally] of Object.entries(perTopic)) {
    const category = key.split('/')[0] as keyof Attempt['perCategory'];
    const existing = perCategory[category] ?? { correct: 0, total: 0 };
    perCategory[category] = { correct: existing.correct + tally.correct, total: existing.total + tally.total };
  }
  const total = Object.values(perTopic).reduce((s, t) => s + t.total, 0);
  const correct = Object.values(perTopic).reduce((s, t) => s + t.correct, 0);
  return {
    id,
    startedAt: '2026-09-21T10:00:00.000Z',
    finishedAt: '2026-09-21T10:10:00.000Z',
    mode: 'practice',
    categories: Object.keys(perCategory) as Attempt['categories'],
    topics: null,
    total,
    correct,
    scorePct: total ? Math.round((correct / total) * 1000) / 10 : 0,
    passed: false,
    durationSec: 600,
    perCategory,
    perTopic,
    answers: answers.map((a) => ({
      questionId: a.questionId,
      category: 'kubernetes-fundamentals',
      topic: 'architecture',
      chosenText: a.correct ? 'right' : 'wrong',
      correctText: 'right',
      correct: a.correct,
    })),
  };
}

describe('aggregateTallies', () => {
  it('sums across attempts', () => {
    const totals = aggregateTallies([
      attempt('1', { 'kubernetes-fundamentals/architecture': { correct: 1, total: 2 } }),
      attempt('2', { 'kubernetes-fundamentals/architecture': { correct: 2, total: 2 }, 'container-orchestration/runtime': { correct: 0, total: 1 } }),
    ]);
    expect(totals).toEqual({
      perCategory: {
        'kubernetes-fundamentals': { correct: 3, total: 4 },
        'container-orchestration': { correct: 0, total: 1 },
      },
      perTopic: {
        'kubernetes-fundamentals/architecture': { correct: 3, total: 4 },
        'container-orchestration/runtime': { correct: 0, total: 1 },
      },
      totalAnswered: 5,
      totalCorrect: 3,
    });
  });
});

describe('buildFocusReport', () => {
  it('reports insufficient data for an empty history', () => {
    expect(buildFocusReport([])).toEqual({ enoughData: false, weakTopics: [], weakCategories: [], mostMissed: [] });
    expect(focusToSelection(buildFocusReport([]))).toBeNull();
  });

  it('ignores topics with fewer than 3 answers', () => {
    const report = buildFocusReport([attempt('1', { 'kubernetes-fundamentals/architecture': { correct: 0, total: 2 } })]);
    expect(report.enoughData).toBe(false);
    expect(report.weakTopics).toEqual([]);
  });

  it('lists weak topics weakest first, ties broken by domain weight', () => {
    const report = buildFocusReport([
      attempt('1', {
        'kubernetes-fundamentals/scheduling': { correct: 1, total: 4 }, // 25%
        'cloud-native-observability/prometheus-and-tooling': { correct: 1, total: 4 }, // 25%, lower weight
        'container-orchestration/security': { correct: 2, total: 4 }, // 50%
        'kubernetes-fundamentals/workloads': { correct: 3, total: 4 }, // 75% -> not weak
        'cloud-native-architecture/serverless': { correct: 0, total: 2 }, // too few
      }),
    ]);
    expect(report.enoughData).toBe(true);
    expect(report.weakTopics.map((t) => t.key)).toEqual([
      'kubernetes-fundamentals/scheduling',
      'cloud-native-observability/prometheus-and-tooling',
      'container-orchestration/security',
    ]);
    expect(report.weakTopics[0]).toEqual({
      key: 'kubernetes-fundamentals/scheduling',
      category: 'kubernetes-fundamentals',
      topic: 'scheduling',
      correct: 1,
      total: 4,
      accuracyPct: 25,
    });
    expect(report.weakCategories.map((c) => c.category)).toEqual([
      'cloud-native-observability',
      'kubernetes-fundamentals',
      'container-orchestration',
    ]);
    expect(focusToSelection(report)).toEqual({
      categories: ['kubernetes-fundamentals', 'cloud-native-observability', 'container-orchestration'],
      topics: [
        'kubernetes-fundamentals/scheduling',
        'cloud-native-observability/prometheus-and-tooling',
        'container-orchestration/security',
      ],
    });
  });

  it('falls back to weak categories when no single topic has enough data', () => {
    const report = buildFocusReport([
      attempt('1', {
        'kubernetes-fundamentals/a': { correct: 0, total: 2 },
        'kubernetes-fundamentals/b': { correct: 0, total: 2 },
      }),
    ]);
    expect(report.weakTopics).toEqual([]);
    expect(report.weakCategories).toHaveLength(1);
    expect(focusToSelection(report)).toEqual({ categories: ['kubernetes-fundamentals'], topics: null });
  });

  it('counts most-missed questions across attempts', () => {
    const report = buildFocusReport([
      attempt('1', { 'kubernetes-fundamentals/architecture': { correct: 1, total: 3 } }, [
        { questionId: 'q1', correct: false },
        { questionId: 'q2', correct: false },
        { questionId: 'q3', correct: true },
      ]),
      attempt('2', { 'kubernetes-fundamentals/architecture': { correct: 2, total: 3 } }, [
        { questionId: 'q1', correct: false },
        { questionId: 'q2', correct: true },
        { questionId: 'q3', correct: true },
      ]),
      attempt('3', { 'kubernetes-fundamentals/architecture': { correct: 2, total: 3 } }, [
        { questionId: 'q1', correct: true },
        { questionId: 'q2', correct: false },
        { questionId: 'q4', correct: false },
      ]),
    ]);
    expect(report.mostMissed).toEqual([
      { questionId: 'q1', misses: 2, attempts: 3 },
      { questionId: 'q2', misses: 2, attempts: 3 },
    ]);
  });

  it('returns no selection when everything is above the threshold', () => {
    const report = buildFocusReport([attempt('1', { 'kubernetes-fundamentals/architecture': { correct: 4, total: 4 } })]);
    expect(report.enoughData).toBe(true);
    expect(focusToSelection(report)).toBeNull();
  });
});
