import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { ATTEMPTS_KEY } from '../src/storage/attemptsStore';

function renderApp(path = '/') {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
  return userEvent.setup();
}

describe('App (end to end with the real question bank)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('runs a practice session, shows results and stores the attempt', async () => {
    const user = renderApp();

    // Only Kubernetes Fundamentals, 2 questions.
    for (const label of [
      /Container Orchestration \(/,
      /Cloud Native Architecture \(/,
      /Cloud Native Observability \(/,
      /Cloud Native Application Delivery \(/,
    ]) {
      const box = screen.getByLabelText(label);
      if ((box as HTMLInputElement).checked) await user.click(box);
    }
    const input = screen.getByLabelText('Custom number of questions');
    await user.clear(input);
    await user.type(input, '2');
    await user.click(screen.getByRole('button', { name: /Start practice \(2 questions\)/ }));

    // Question 1
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    await user.click(screen.getByTestId('option-0'));
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(screen.getByTestId('feedback-badge')).toBeInTheDocument();
    expect(screen.getByText('Explanation')).toBeInTheDocument();
    expect(screen.getByText('Explicação para criança')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));

    // Question 2
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
    await user.click(screen.getByTestId('option-1'));
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    await user.click(screen.getByRole('button', { name: 'Finish' }));

    // Results
    expect(screen.getByTestId('results-summary')).toBeInTheDocument();
    expect(screen.getByTestId('pass-badge')).toBeInTheDocument();
    expect(screen.getAllByTestId('review-item')).toHaveLength(2);
    expect(screen.getByTestId('breakdown-table')).toHaveTextContent('Kubernetes Fundamentals');

    // Persisted
    const stored = JSON.parse(window.localStorage.getItem(ATTEMPTS_KEY)!);
    expect(stored.attempts).toHaveLength(1);
    expect(stored.attempts[0].total).toBe(2);
    expect(stored.attempts[0].mode).toBe('practice');

    // History shows it
    await user.click(screen.getByRole('link', { name: 'History' }));
    expect(screen.getAllByTestId('attempt-row')).toHaveLength(1);
  });

  it('runs an exam session with no feedback until finish, then allows retrying wrong ones', async () => {
    const user = renderApp();
    await user.click(screen.getByLabelText(/Exam — timed/));
    const input = screen.getByLabelText('Custom number of questions');
    await user.clear(input);
    await user.type(input, '3');
    await user.click(screen.getByRole('button', { name: /Start exam \(3 questions\)/ }));

    expect(screen.getByTestId('timer')).toBeInTheDocument();
    expect(screen.getByTestId('navigator')).toBeInTheDocument();
    await user.click(screen.getByTestId('option-0'));
    expect(screen.queryByTestId('feedback-badge')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByTestId('option-1'));
    expect(screen.getByTestId('nav-0')).toHaveAttribute('data-state', 'answered');

    await user.click(screen.getByTestId('finish-exam'));
    expect(screen.getByText(/1 question still unanswered/)).toBeInTheDocument();
    await user.click(screen.getByTestId('confirm-finish'));

    expect(screen.getByTestId('results-summary')).toBeInTheDocument();
    const review = screen.getAllByTestId('review-item');
    expect(review).toHaveLength(3);
    expect(review[2]).toHaveTextContent('Not answered');

    const retryWrong = screen.getByTestId('retry-wrong');
    if (!(retryWrong as HTMLButtonElement).disabled) {
      await user.click(retryWrong);
      expect(screen.getByText(/Question 1 of/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    }
  });

  it('redirects /quiz and /results to home when there is no session', () => {
    renderApp('/results');
    expect(screen.getByTestId('setup-form')).toBeInTheDocument();
  });

  it('applies focus suggestions from history to the setup form', async () => {
    const attempt = {
      id: 'old',
      startedAt: '2026-09-20T10:00:00.000Z',
      finishedAt: '2026-09-20T10:10:00.000Z',
      mode: 'practice',
      categories: ['container-orchestration'],
      topics: null,
      total: 3,
      correct: 0,
      scorePct: 0,
      passed: false,
      durationSec: 600,
      perCategory: { 'container-orchestration': { correct: 0, total: 3 } },
      perTopic: { 'container-orchestration/runtime': { correct: 0, total: 3 } },
      answers: [],
    };
    window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ version: 1, attempts: [attempt] }));
    const user = renderApp('/history');
    expect(within(screen.getByTestId('focus-suggestions')).getByTestId('weak-topic')).toHaveTextContent('Runtime');
    await user.click(screen.getByTestId('focus-start'));
    expect(screen.getByTestId('setup-form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Container Orchestration \(/)).toBeChecked();
    expect(screen.getByLabelText(/Kubernetes Fundamentals \(/)).not.toBeChecked();
  });
});
