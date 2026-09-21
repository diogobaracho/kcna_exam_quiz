import { describe, expect, it } from 'vitest';
import { CATEGORIES, CATEGORY_IDS } from '../../src/domain/categories';
import {
  countFor,
  filterBank,
  getQuestionById,
  loadQuestionBank,
  topicKey,
  topicsByCategory,
} from '../../src/domain/questionBank';
import { folderPartsOf } from '../../src/domain/parseQuestion';

const MIN_QUESTIONS = 250;
const WEIGHT_TOLERANCE_PTS = 3;

const VALID = (id: string, category = 'kubernetes-fundamentals', topic = 'architecture') => `---
id: ${id}
category: ${category}
topic: ${topic}
---

# Question

Q ${id}?

## Options

- [x] right
- [ ] wrong
- [ ] wrong too

## Explanation

Because.

## Explicação para criança

Porque sim.
`;

describe('loadQuestionBank (fixtures)', () => {
  it('collects every error instead of stopping at the first', () => {
    const result = loadQuestionBank({
      '/data/questions/kubernetes-fundamentals/architecture/001.md': VALID('kf-arch-001'),
      '/data/questions/kubernetes-fundamentals/architecture/002.md': 'not a question',
      '/data/questions/kubernetes-fundamentals/workloads/003.md': VALID('kf-wl-003', 'kubernetes-fundamentals', 'architecture'),
    });
    expect(result.questions.map((q) => q.id)).toEqual(['kf-arch-001']);
    expect(result.errors.map((e) => e.message)).toEqual([
      'data/questions/kubernetes-fundamentals/architecture/002.md: missing or unterminated frontmatter',
      'data/questions/kubernetes-fundamentals/workloads/003.md: topic "architecture" does not match folder "workloads"',
    ]);
  });

  it('reports duplicate ids', () => {
    const result = loadQuestionBank({
      '/data/questions/kubernetes-fundamentals/architecture/001.md': VALID('kf-arch-001'),
      '/data/questions/kubernetes-fundamentals/architecture/002.md': VALID('kf-arch-001'),
    });
    expect(result.questions).toHaveLength(1);
    expect(result.errors[0].detail).toBe(
      'duplicate id "kf-arch-001" also used by data/questions/kubernetes-fundamentals/architecture/001.md',
    );
  });

  it('indexes topics and filters by category and topic', () => {
    const { questions } = loadQuestionBank({
      '/data/questions/kubernetes-fundamentals/architecture/001.md': VALID('a1'),
      '/data/questions/kubernetes-fundamentals/workloads/001.md': VALID('w1', 'kubernetes-fundamentals', 'workloads'),
      '/data/questions/container-orchestration/runtime/001.md': VALID('r1', 'container-orchestration', 'runtime'),
    });
    const topics = topicsByCategory(questions);
    expect(topics['kubernetes-fundamentals']).toEqual([
      { id: 'architecture', key: 'kubernetes-fundamentals/architecture', count: 1 },
      { id: 'workloads', key: 'kubernetes-fundamentals/workloads', count: 1 },
    ]);
    expect(topics['cloud-native-observability']).toEqual([]);
    expect(filterBank(questions, ['kubernetes-fundamentals'], null).map((q) => q.id)).toEqual(['a1', 'w1']);
    expect(filterBank(questions, ['kubernetes-fundamentals'], ['kubernetes-fundamentals/workloads']).map((q) => q.id)).toEqual(['w1']);
    expect(countFor(['container-orchestration'], null, questions)).toBe(1);
    expect(getQuestionById('r1', questions)?.topic).toBe('runtime');
    expect(getQuestionById('zzz', questions)).toBeUndefined();
    expect(topicKey('container-orchestration', 'runtime')).toBe('container-orchestration/runtime');
  });
});

describe('question bank (real files under data/questions)', () => {
  const result = loadQuestionBank();

  it('has no invalid files', () => {
    const report = result.errors.map((e) => `  - ${e.message}`).join('\n');
    expect(result.errors, `Invalid question files:\n${report}`).toHaveLength(0);
  });

  it('has unique ids', () => {
    const ids = result.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps frontmatter consistent with the folder structure', () => {
    for (const question of result.questions) {
      const folders = folderPartsOf(question.filePath);
      expect(folders, question.filePath).not.toBeNull();
      expect(folders?.category).toBe(question.category);
      expect(folders?.topic).toBe(question.topic);
    }
  });

  it('only uses declared categories', () => {
    for (const question of result.questions) {
      expect(CATEGORY_IDS).toContain(question.category);
    }
  });

  it(`has at least ${MIN_QUESTIONS} questions, distributed close to the KCNA weights`, () => {
    const total = result.questions.length;
    const lines: string[] = [`Total questions: ${total}`];
    const failures: string[] = [];
    for (const category of CATEGORIES) {
      const count = result.questions.filter((q) => q.category === category.id).length;
      const share = total ? (count / total) * 100 : 0;
      lines.push(`  ${category.id}: ${count} (${share.toFixed(1)}%, target ${category.weight}%)`);
      if (Math.abs(share - category.weight) > WEIGHT_TOLERANCE_PTS) {
        failures.push(`${category.id} share ${share.toFixed(1)}% is more than ${WEIGHT_TOLERANCE_PTS} pts from ${category.weight}%`);
      }
    }
    console.info(lines.join('\n'));
    expect(total, lines.join('\n')).toBeGreaterThanOrEqual(MIN_QUESTIONS);
    expect(failures, failures.join('\n')).toHaveLength(0);
  });
});
