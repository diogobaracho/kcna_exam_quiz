import { describe, expect, it } from 'vitest';
import { QuestionParseError, folderPartsOf, normalizeHeading, parseQuestion } from '../../src/domain/parseQuestion';

interface Parts {
  frontmatter?: string;
  question?: string;
  options?: string;
  explanation?: string;
  explanationPt?: string;
  headingPt?: string;
}

const DEFAULT_FRONTMATTER = `id: kf-arch-001
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [control-plane, etcd]
source: LFS158 ch.4`;

function md(parts: Parts = {}): string {
  const {
    frontmatter = DEFAULT_FRONTMATTER,
    question = 'Which control plane component stores the entire cluster state?',
    options = `- [ ] kube-scheduler
- [x] etcd
- [ ] kube-proxy
- [ ] kubelet`,
    explanation = 'etcd is the key-value store that holds all cluster state.',
    explanationPt = 'O etcd é o caderno onde o Kubernetes anota tudo.',
    headingPt = 'Explicação para criança',
  } = parts;
  return `---
${frontmatter}
---

# Question

${question}

## Options

${options}

## Explanation

${explanation}

## ${headingPt}

${explanationPt}
`;
}

const PATH = 'data/questions/kubernetes-fundamentals/architecture/001-etcd.md';

function expectError(markdown: string, detail: string, filePath = PATH) {
  let caught: unknown;
  try {
    parseQuestion(markdown, filePath);
  } catch (error) {
    caught = error;
  }
  expect(caught).toBeInstanceOf(QuestionParseError);
  const err = caught as QuestionParseError;
  expect(err.detail).toBe(detail);
  expect(err.message).toBe(`${filePath}: ${detail}`);
  expect(err.filePath).toBe(filePath);
}

describe('parseQuestion', () => {
  it('parses a valid file', () => {
    const question = parseQuestion(md(), PATH);
    expect(question).toMatchObject({
      id: 'kf-arch-001',
      category: 'kubernetes-fundamentals',
      topic: 'architecture',
      difficulty: 'easy',
      tags: ['control-plane', 'etcd'],
      source: 'LFS158 ch.4',
      prompt: 'Which control plane component stores the entire cluster state?',
      explanationEn: 'etcd is the key-value store that holds all cluster state.',
      explanationPt: 'O etcd é o caderno onde o Kubernetes anota tudo.',
      filePath: PATH,
    });
    expect(question.options).toEqual([
      { text: 'kube-scheduler', correct: false },
      { text: 'etcd', correct: true },
      { text: 'kube-proxy', correct: false },
      { text: 'kubelet', correct: false },
    ]);
  });

  it('defaults difficulty to medium and tags to empty', () => {
    const question = parseQuestion(
      md({ frontmatter: 'id: kf-arch-002\ncategory: kubernetes-fundamentals\ntopic: architecture' }),
      PATH,
    );
    expect(question.difficulty).toBe('medium');
    expect(question.tags).toEqual([]);
    expect(question.source).toBeUndefined();
  });

  it('accepts the Portuguese heading without accents and in any case', () => {
    expect(parseQuestion(md({ headingPt: 'EXPLICACAO PARA CRIANCA' }), PATH).explanationPt).toContain(
      'caderno',
    );
  });

  it('preserves paragraph breaks and inline code in sections', () => {
    const question = parseQuestion(
      md({ explanation: 'First paragraph with `kubectl get pods`.\n\nSecond paragraph.' }),
      PATH,
    );
    expect(question.explanationEn).toBe('First paragraph with `kubectl get pods`.\n\nSecond paragraph.');
  });

  it('ignores headings inside fenced code blocks', () => {
    const question = parseQuestion(
      md({ explanation: 'Look:\n\n```yaml\n# a comment that is not a heading\nkind: Pod\n```' }),
      PATH,
    );
    expect(question.explanationEn).toContain('# a comment');
    expect(question.explanationPt).toContain('caderno');
  });

  it('accepts uppercase X and asterisk bullets for options', () => {
    const question = parseQuestion(
      md({ options: '* [ ] a\n* [X] b\n* [ ] c' }),
      PATH,
    );
    expect(question.options.map((o) => o.correct)).toEqual([false, true, false]);
  });

  it('skips folder checks when the path is not a bank path', () => {
    expect(() => parseQuestion(md(), 'anything.md')).not.toThrow();
  });

  describe('errors', () => {
    it('rejects a file without frontmatter', () => {
      expectError('# Question\n\nx', 'missing or unterminated frontmatter');
    });

    it('rejects unterminated frontmatter', () => {
      expectError('---\nid: x\n# Question\n', 'missing or unterminated frontmatter');
    });

    it('rejects an invalid frontmatter line', () => {
      expectError(md({ frontmatter: `${DEFAULT_FRONTMATTER}\nnot a field` }), 'invalid frontmatter line "not a field"');
    });

    it.each(['id', 'category', 'topic'])('requires frontmatter field %s', (field) => {
      const frontmatter = DEFAULT_FRONTMATTER.split('\n')
        .filter((line) => !line.startsWith(`${field}:`))
        .join('\n');
      expectError(md({ frontmatter }), `frontmatter field "${field}" is required`);
    });

    it('rejects an invalid id', () => {
      expectError(
        md({ frontmatter: DEFAULT_FRONTMATTER.replace('kf-arch-001', 'KF ARCH 1') }),
        'frontmatter field "id" has invalid value "KF ARCH 1"',
      );
    });

    it('rejects an unknown category', () => {
      expectError(
        md({ frontmatter: DEFAULT_FRONTMATTER.replace('kubernetes-fundamentals', 'nope') }),
        'category "nope" is not declared in src/domain/categories.ts',
        'nope.md',
      );
    });

    it('rejects an invalid difficulty', () => {
      expectError(
        md({ frontmatter: DEFAULT_FRONTMATTER.replace('easy', 'impossible') }),
        'frontmatter field "difficulty" has invalid value "impossible"',
      );
    });

    it('rejects a missing Question section', () => {
      const text = md().replace('# Question', '# Pergunta');
      expectError(text, 'missing section "Question"');
    });

    it('rejects a missing Options section', () => {
      expectError(md().replace('## Options', '## Choices'), 'missing section "Options"');
    });

    it('rejects a missing English explanation', () => {
      expectError(md().replace('## Explanation\n', '## Why\n'), 'missing section "Explanation"');
    });

    it('rejects a missing Portuguese explanation', () => {
      expectError(md({ headingPt: 'Explicação' }), 'missing section "Explicação para criança"');
    });

    it('rejects an empty Portuguese explanation', () => {
      expectError(md({ explanationPt: '   ' }), 'section "Explicação para criança" is empty');
    });

    it('rejects an empty question', () => {
      expectError(md({ question: '' }), 'section "Question" is empty');
    });

    it('rejects an invalid option line', () => {
      expectError(md({ options: '- [ ] a\n- [x] b\n- c' }), 'invalid option line "- c"');
    });

    it('rejects too few options', () => {
      expectError(md({ options: '- [ ] a\n- [x] b' }), 'expected 3-5 options, found 2');
    });

    it('rejects too many options', () => {
      expectError(
        md({ options: '- [ ] a\n- [x] b\n- [ ] c\n- [ ] d\n- [ ] e\n- [ ] f' }),
        'expected 3-5 options, found 6',
      );
    });

    it('rejects zero correct options', () => {
      expectError(md({ options: '- [ ] a\n- [ ] b\n- [ ] c' }), 'expected exactly 1 correct option, found 0');
    });

    it('rejects two correct options', () => {
      expectError(md({ options: '- [x] a\n- [x] b\n- [ ] c' }), 'expected exactly 1 correct option, found 2');
    });

    it('rejects a category that does not match the folder', () => {
      expectError(
        md(),
        'category "kubernetes-fundamentals" does not match folder "container-orchestration"',
        'data/questions/container-orchestration/architecture/001.md',
      );
    });

    it('rejects a topic that does not match the folder', () => {
      expectError(
        md(),
        'topic "architecture" does not match folder "workloads"',
        'data/questions/kubernetes-fundamentals/workloads/001.md',
      );
    });
  });
});

describe('normalizeHeading', () => {
  it('strips accents, case and extra spaces', () => {
    expect(normalizeHeading('  Explicação   PARA criança ')).toBe('explicacao para crianca');
  });
});

describe('folderPartsOf', () => {
  it('extracts category and topic from a bank path', () => {
    expect(folderPartsOf('/data/questions/a/b/001-x.md')).toEqual({ category: 'a', topic: 'b' });
    expect(folderPartsOf('data\\questions\\a\\b\\001-x.md')).toEqual({ category: 'a', topic: 'b' });
  });

  it('returns null for other paths', () => {
    expect(folderPartsOf('fixture.md')).toBeNull();
  });
});
