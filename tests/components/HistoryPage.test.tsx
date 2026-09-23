import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildFocusReport } from '../../src/domain/focus';
import { scoreSession } from '../../src/domain/scoring';
import { HistoryPage } from '../../src/pages/HistoryPage';
import { answersFor, makeQuestion, makeSession } from '../helpers/fixtures';

const questions = [
  makeQuestion({ id: 's1', topic: 'scheduling' }),
  makeQuestion({ id: 's2', topic: 'scheduling' }),
  makeQuestion({ id: 's3', topic: 'scheduling' }),
  makeQuestion({ id: 'a1', topic: 'architecture' }),
];
const bank = questions;

function makeAttempt(id: string, chosen: number[]) {
  const session = makeSession(questions, 'practice', { id });
  return scoreSession(session, answersFor(session, chosen));
}

const weakAttempt = makeAttempt('weak', [1, 1, 0, 0]); // scheduling 1/3, architecture 1/1
const strongAttempt = makeAttempt('strong', [0, 0, 0, 0]);

describe('HistoryPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('lists attempts, aggregates accuracy and shows focus suggestions', () => {
    const attempts = [strongAttempt, weakAttempt];
    render(
      <HistoryPage
        bank={bank}
        attempts={attempts}
        corrupt={false}
        focusReport={buildFocusReport(attempts)}
        onDelete={vi.fn()}
        onClear={vi.fn()}
        onApplyFocus={vi.fn()}
      />,
    );
    expect(screen.getAllByTestId('attempt-row')).toHaveLength(2);
    expect(screen.getByTestId('domain-accuracy')).toHaveTextContent('Kubernetes Fundamentals6 / 875%');
    expect(screen.getByTestId('domain-accuracy')).toHaveTextContent('Overall6 / 875%');
    expect(screen.getByTestId('weak-topic')).toHaveTextContent('Kubernetes Fundamentals · Scheduling');
    expect(screen.getByTestId('weak-topic')).toHaveTextContent('66.7% (4/6)');
    expect(screen.getByTestId('focus-start')).toBeInTheDocument();
  });

  it('shows the insufficient-data message and no clear button when empty', () => {
    render(
      <HistoryPage
        bank={bank}
        attempts={[]}
        corrupt={true}
        focusReport={buildFocusReport([])}
        onDelete={vi.fn()}
        onClear={vi.fn()}
        onApplyFocus={vi.fn()}
      />,
    );
    expect(screen.getByText(/No attempts yet/)).toBeInTheDocument();
    expect(screen.getByTestId('focus-insufficient')).toBeInTheDocument();
    expect(screen.getByTestId('corrupt-warning')).toBeInTheDocument();
    expect(screen.queryByTestId('clear-all')).not.toBeInTheDocument();
  });

  it('deletes one attempt and clears all after confirmation', async () => {
    const onDelete = vi.fn();
    const onClear = vi.fn();
    const onApplyFocus = vi.fn();
    const confirm = vi.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true);
    render(
      <HistoryPage
        bank={bank}
        attempts={[weakAttempt]}
        corrupt={false}
        focusReport={buildFocusReport([weakAttempt])}
        onDelete={onDelete}
        onClear={onClear}
        onApplyFocus={onApplyFocus}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /Delete attempt/ }));
    expect(onDelete).toHaveBeenCalledWith('weak');

    await userEvent.click(screen.getByTestId('clear-all'));
    expect(onClear).not.toHaveBeenCalled();
    await userEvent.click(screen.getByTestId('clear-all'));
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(confirm).toHaveBeenCalledTimes(2);

    await userEvent.click(screen.getByTestId('focus-start'));
    expect(onApplyFocus).toHaveBeenCalled();
  });
});
