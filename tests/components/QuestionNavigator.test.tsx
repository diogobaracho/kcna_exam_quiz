import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { QuestionNavigator } from '../../src/components/quiz/QuestionNavigator';
import { makeQuestion, makeSession } from '../helpers/fixtures';

describe('QuestionNavigator', () => {
  const session = makeSession([makeQuestion({ id: 'a' }), makeQuestion({ id: 'b' }), makeQuestion({ id: 'c' })], 'exam');

  it('renders answered, flagged and unanswered states and navigates on click', async () => {
    const onGoto = vi.fn();
    render(
      <QuestionNavigator
        questions={session.questions}
        answers={{
          a: { chosenIndex: 1, confirmed: false, flagged: false },
          b: { chosenIndex: null, confirmed: false, flagged: true },
          c: { chosenIndex: null, confirmed: false, flagged: false },
        }}
        currentIndex={0}
        onGoto={onGoto}
      />,
    );
    expect(screen.getByTestId('nav-0')).toHaveAttribute('data-state', 'answered');
    expect(screen.getByTestId('nav-1')).toHaveAttribute('data-state', 'flagged');
    expect(screen.getByTestId('nav-2')).toHaveAttribute('data-state', 'unanswered');
    expect(screen.getByTestId('nav-0')).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'Question 2, unanswered, flagged' })).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('nav-2'));
    expect(onGoto).toHaveBeenCalledWith(2);
  });
});
