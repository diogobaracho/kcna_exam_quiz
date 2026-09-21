import { ProgressBar } from 'react-bootstrap';
import type { QuizMode } from '../../domain/types';

interface Props {
  mode: QuizMode;
  answered: number;
  correct: number;
  total: number;
}

export function QuizProgress({ mode, answered, correct, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((answered / total) * 100);
  return (
    <div className="mb-3" data-testid="quiz-progress">
      <div className="d-flex justify-content-between small text-muted mb-1">
        <span>
          Answered {answered} / {total}
        </span>
        {mode === 'practice' && (
          <span>
            Score so far: {correct} / {answered}
          </span>
        )}
      </div>
      <ProgressBar now={pct} label={`${pct}%`} visuallyHidden={pct < 10} />
    </div>
  );
}
