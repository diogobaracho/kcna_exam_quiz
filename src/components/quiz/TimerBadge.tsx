import { Badge } from 'react-bootstrap';
import { formatClock } from '../../utils/format';

interface Props {
  secondsLeft: number;
}

const WARNING_SECONDS = 5 * 60;

export function TimerBadge({ secondsLeft }: Props) {
  return (
    <Badge
      bg={secondsLeft <= WARNING_SECONDS ? 'danger' : 'dark'}
      className="fs-6 font-monospace"
      aria-live="polite"
      aria-label={`Time left ${formatClock(secondsLeft)}`}
      data-testid="timer"
    >
      {formatClock(secondsLeft)}
    </Badge>
  );
}
