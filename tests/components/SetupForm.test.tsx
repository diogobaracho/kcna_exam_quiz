import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SetupForm } from '../../src/components/setup/SetupForm';
import { DEFAULT_SETTINGS } from '../../src/storage/settingsStore';
import { makeQuestions } from '../helpers/fixtures';

const bank = [
  ...makeQuestions(12, 'kubernetes-fundamentals', 'architecture'),
  ...makeQuestions(8, 'kubernetes-fundamentals', 'workloads'),
  ...makeQuestions(5, 'container-orchestration', 'runtime'),
  ...makeQuestions(2, 'cloud-native-observability', 'telemetry-fundamentals'),
];

function setup(initial = DEFAULT_SETTINGS) {
  const onStart = vi.fn();
  const onChange = vi.fn();
  render(<SetupForm bank={bank} initial={initial} onStart={onStart} onChange={onChange} />);
  return { onStart, onChange, user: userEvent.setup() };
}

describe('SetupForm', () => {
  it('shows available counts and starts with the chosen config', async () => {
    const { onStart, user } = setup();
    expect(screen.getByTestId('available-count')).toHaveTextContent('27 questions available');
    expect(screen.getByLabelText('Kubernetes Fundamentals (20)')).toBeChecked();
    expect(screen.getByLabelText('Cloud Native Architecture (0)')).toBeDisabled();

    await user.click(screen.getByRole('button', { name: '10' }));
    await user.click(screen.getByRole('button', { name: /Start practice \(10 questions\)/ }));
    // Domains without questions are dropped from the selection.
    expect(onStart).toHaveBeenCalledWith({
      mode: 'practice',
      count: 10,
      categories: ['kubernetes-fundamentals', 'container-orchestration', 'cloud-native-observability'],
      topics: null,
      distribution: 'weighted',
      timerEnabled: false,
    });
  });

  it('caps the count to the available questions and says so', async () => {
    const { onStart, user } = setup();
    await user.click(screen.getByRole('button', { name: '60' }));
    expect(screen.getByTestId('cap-notice')).toHaveTextContent('Only 27 questions are available');
    await user.click(screen.getByRole('button', { name: /Start practice \(27 questions\)/ }));
    expect(onStart).toHaveBeenCalledWith(expect.objectContaining({ count: 27 }));
  });

  it('disables start when no domain is selected', async () => {
    const { user } = setup();
    for (const label of ['Kubernetes Fundamentals (20)', 'Container Orchestration (5)', 'Cloud Native Observability (2)']) {
      await user.click(screen.getByLabelText(label));
    }
    expect(screen.getByText('Select at least one domain to start.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start practice/ })).toBeDisabled();
  });

  it('exam mode forces the timer on and reports it in the config', async () => {
    const { onStart, user } = setup();
    await user.click(screen.getByLabelText(/Exam — timed/));
    expect(screen.getByLabelText(/Timer \(always on/)).toBeChecked();
    expect(screen.getByLabelText(/Timer \(always on/)).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /Start exam/ }));
    expect(onStart).toHaveBeenCalledWith(expect.objectContaining({ mode: 'exam', timerEnabled: true }));
  });

  it('lets the learner narrow down to topics', async () => {
    const { onStart, onChange, user } = setup({ ...DEFAULT_SETTINGS, categories: ['kubernetes-fundamentals'] });
    await user.click(screen.getByRole('button', { name: 'Show topics for Kubernetes Fundamentals' }));
    const topicsPanel = document.getElementById('topics-kubernetes-fundamentals')!;
    await user.click(within(topicsPanel).getByLabelText('Architecture (12)'));
    expect(screen.getByTestId('available-count')).toHaveTextContent('8 questions available');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ categories: ['kubernetes-fundamentals'], topics: ['kubernetes-fundamentals/workloads'] }),
    );

    // Re-checking the topic returns to "all topics" (null)
    await user.click(within(topicsPanel).getByLabelText('Architecture (12)'));
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ topics: null }));

    // Unchecking every topic of the only category disables start
    await user.click(within(topicsPanel).getByLabelText('Architecture (12)'));
    await user.click(within(topicsPanel).getByLabelText('Workloads (8)'));
    expect(screen.getByRole('button', { name: /Start practice/ })).toBeDisabled();

    // Selecting a topic of an unselected category selects that category with only that topic
    await user.click(screen.getByRole('button', { name: 'Show topics for Container Orchestration' }));
    const coPanel = document.getElementById('topics-container-orchestration')!;
    await user.click(within(coPanel).getByLabelText('Runtime (5)'));
    expect(screen.getByLabelText('Container Orchestration (5)')).toBeChecked();
    await user.click(screen.getByRole('button', { name: /Start practice \(5 questions\)/ }));
    expect(onStart).toHaveBeenCalledWith(
      expect.objectContaining({ categories: ['container-orchestration'], topics: null, count: 5 }),
    );
  });

  it('accepts a custom count from the number input', async () => {
    const { onStart, user } = setup();
    const input = screen.getByLabelText('Custom number of questions');
    await user.clear(input);
    await user.type(input, '7');
    await user.click(screen.getByRole('button', { name: /Start practice \(7 questions\)/ }));
    expect(onStart).toHaveBeenCalledWith(expect.objectContaining({ count: 7 }));
  });
});
