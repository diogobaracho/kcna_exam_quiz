import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ReviewList } from '../../src/components/results/ReviewList';
import { answersFor, makeQuestion, makeSession } from '../helpers/fixtures';

describe('ReviewList', () => {
  const session = makeSession(
    [makeQuestion({ id: 'r1' }), makeQuestion({ id: 'r2' }), makeQuestion({ id: 'r3' })],
    'exam',
  );
  const answers = answersFor(session, [0, 2, null]);

  it('lists every question with chosen/correct answers and both explanations', () => {
    render(<ReviewList session={session} answers={answers} />);
    const items = screen.getAllByTestId('review-item');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Correct');
    expect(items[0]).toHaveTextContent('Your answer: r1 correct');
    expect(items[1]).toHaveTextContent('Incorrect');
    expect(items[1]).toHaveTextContent('Your answer: r2 wrong 2');
    expect(items[1]).toHaveTextContent('Correct answer: r2 correct');
    expect(items[2]).toHaveTextContent('Not answered');
    expect(items[2]).toHaveTextContent('Your answer: —');
    expect(screen.getAllByText('Explanation')).toHaveLength(3);
    expect(screen.getAllByText('Explicação para criança')).toHaveLength(3);
    expect(screen.getByText('English explanation for r2.')).toBeInTheDocument();
    expect(screen.getByText('Explicação em português para r2.')).toBeInTheDocument();
  });

  it('filters to wrong answers only', async () => {
    render(<ReviewList session={session} answers={answers} />);
    await userEvent.click(screen.getByLabelText('Show wrong answers only'));
    const items = screen.getAllByTestId('review-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Q2');
    expect(items[1]).toHaveTextContent('Q3');
  });

  it('shows a friendly message when nothing matches the filter', async () => {
    render(<ReviewList session={session} answers={answersFor(session, [0, 0, 0])} />);
    await userEvent.click(screen.getByLabelText('Show wrong answers only'));
    expect(screen.getByText(/Nothing to show/)).toBeInTheDocument();
  });
});
