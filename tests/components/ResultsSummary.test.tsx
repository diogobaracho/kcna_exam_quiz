import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BreakdownTable } from '../../src/components/results/BreakdownTable';
import { ResultsSummary } from '../../src/components/results/ResultsSummary';
import { scoreSession } from '../../src/domain/scoring';
import { answersFor, makeQuestion, makeSession } from '../helpers/fixtures';

const session = makeSession(
  [
    makeQuestion({ id: 'a1', category: 'kubernetes-fundamentals', topic: 'architecture' }),
    makeQuestion({ id: 'a2', category: 'kubernetes-fundamentals', topic: 'scheduling' }),
    makeQuestion({ id: 'r1', category: 'container-orchestration', topic: 'runtime' }),
    makeQuestion({ id: 'r2', category: 'container-orchestration', topic: 'runtime' }),
  ],
  'exam',
);

describe('ResultsSummary', () => {
  it('renders a failing score', () => {
    const attempt = scoreSession(session, answersFor(session, [0, 1, 1, 1]), new Date('2026-09-21T10:02:05.000Z'));
    render(<ResultsSummary attempt={attempt} />);
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByTestId('pass-badge')).toHaveTextContent('FAIL');
    expect(screen.getByText('1 of 4 correct · pass mark 75%')).toBeInTheDocument();
    expect(screen.getByText('Exam mode · 2m 5s')).toBeInTheDocument();
  });

  it('renders a passing score', () => {
    const attempt = scoreSession(session, answersFor(session, [0, 0, 0, 1]));
    render(<ResultsSummary attempt={attempt} />);
    expect(screen.getByTestId('pass-badge')).toHaveTextContent('PASS');
  });
});

describe('BreakdownTable', () => {
  it('shows per-domain rows with nested topics', () => {
    const attempt = scoreSession(session, answersFor(session, [0, 1, 0, 0]));
    render(<BreakdownTable attempt={attempt} />);
    const rows = screen.getAllByRole('row').slice(1);
    expect(rows.map((row) => row.textContent)).toEqual([
      'Kubernetes Fundamentals1 / 250%',
      'Architecture1 / 1100%',
      'Scheduling0 / 10%',
      'Container Orchestration2 / 2100%',
      'Runtime2 / 2100%',
    ]);
  });
});
