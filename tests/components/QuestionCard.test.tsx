import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { QuestionCard } from '../../src/components/quiz/QuestionCard';
import type { QuizMode, Session } from '../../src/domain/types';
import { useQuizSession } from '../../src/hooks/useQuizSession';
import { makeQuestion, makeSession } from '../helpers/fixtures';

const questions = [
  makeQuestion({
    id: 'q1',
    prompt: 'What stores cluster state?',
    options: [
      { text: 'kube-scheduler', correct: false },
      { text: 'etcd', correct: true },
      { text: 'kubelet', correct: false },
    ],
    explanationEn: 'etcd holds the state.',
    explanationPt: 'O etcd é o caderno do cluster.',
  }),
  makeQuestion({ id: 'q2' }),
];

/** Drives the real reducer so the card is tested with true lock semantics. */
function Harness({ session, onFinished }: { session: Session; onFinished?: () => void }) {
  const quiz = useQuizSession(session);
  if (quiz.state.status === 'finished') {
    onFinished?.();
    return <div>finished</div>;
  }
  return (
    <QuestionCard
      item={quiz.current}
      answer={quiz.answer}
      mode={session.mode}
      index={quiz.state.currentIndex}
      total={session.questions.length}
      onSelect={quiz.select}
      onConfirm={quiz.confirm}
      onNext={quiz.next}
      onPrev={quiz.prev}
      onToggleFlag={quiz.toggleFlag}
    />
  );
}

function setup(mode: QuizMode) {
  const onFinished = vi.fn();
  render(<Harness session={makeSession(questions, mode)} onFinished={onFinished} />);
  return { user: userEvent.setup(), onFinished };
}

describe('QuestionCard – practice mode', () => {
  it('shows the prompt, options and a disabled Confirm until an option is chosen', () => {
    setup('practice');
    expect(screen.getByText('What stores cluster state?')).toBeInTheDocument();
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByTestId('option-0')).toHaveTextContent('A.kube-scheduler');
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeDisabled();
    expect(screen.queryByTestId('explanation-panel')).not.toBeInTheDocument();
  });

  it('reveals correctness and both explanations after confirming a wrong answer, then locks', async () => {
    const { user } = setup('practice');
    await user.click(screen.getByTestId('option-0'));
    expect(screen.getByTestId('option-0')).toHaveClass('active');
    expect(screen.queryByTestId('feedback-badge')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(screen.getByTestId('feedback-badge')).toHaveTextContent('Incorrect');
    expect(screen.getByText(/Correct answer:/)).toHaveTextContent('B');
    expect(screen.getByTestId('option-1')).toHaveClass('list-group-item-success');
    expect(screen.getByTestId('option-0')).toHaveClass('list-group-item-danger');
    expect(screen.getByText('Explanation')).toBeInTheDocument();
    expect(screen.getByText('etcd holds the state.')).toBeInTheDocument();
    expect(screen.getByText('Explicação para criança')).toBeInTheDocument();
    expect(screen.getByText('O etcd é o caderno do cluster.')).toBeInTheDocument();

    expect(screen.getByTestId('option-2')).toHaveAttribute('aria-disabled', 'true');
    await user.click(screen.getByTestId('option-2'));
    expect(screen.getByTestId('option-0')).toHaveClass('list-group-item-danger');
    expect(screen.getByTestId('option-2')).not.toHaveClass('active');
    expect(screen.queryByRole('button', { name: 'Confirm' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('shows Correct! for the right answer and Finish on the last question', async () => {
    const { user, onFinished } = setup('practice');
    await user.click(screen.getByTestId('option-1'));
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(screen.getByTestId('feedback-badge')).toHaveTextContent('Correct!');
    expect(screen.queryByText(/Correct answer:/)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
    await user.click(screen.getByTestId('option-0'));
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    await user.click(screen.getByRole('button', { name: 'Finish' }));
    expect(onFinished).toHaveBeenCalled();
  });
});

describe('QuestionCard – exam mode', () => {
  it('gives no feedback after selecting and allows navigation and flagging', async () => {
    const { user } = setup('exam');
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Confirm' })).not.toBeInTheDocument();

    await user.click(screen.getByTestId('option-0'));
    expect(screen.queryByTestId('feedback-badge')).not.toBeInTheDocument();
    expect(screen.queryByTestId('explanation-panel')).not.toBeInTheDocument();
    expect(screen.getByTestId('option-0')).not.toHaveClass('list-group-item-danger');
    expect(screen.getByTestId('option-0')).toHaveClass('active');

    await user.click(screen.getByTestId('option-2'));
    expect(screen.getByTestId('option-2')).toHaveClass('active');

    await user.click(screen.getByRole('button', { name: 'Flag for review' }));
    expect(screen.getByRole('button', { name: 'Flagged' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByTestId('option-2')).toHaveClass('active');
  });
});
