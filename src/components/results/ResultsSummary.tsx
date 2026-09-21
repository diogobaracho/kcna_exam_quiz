import { Badge, Card } from 'react-bootstrap';
import { PASS_THRESHOLD } from '../../domain/scoring';
import type { Attempt } from '../../domain/types';
import { formatDuration } from '../../utils/format';

interface Props {
  attempt: Attempt;
}

export function ResultsSummary({ attempt }: Props) {
  return (
    <Card className="text-center" data-testid="results-summary">
      <Card.Body>
        <div className="display-4 fw-bold">{attempt.scorePct}%</div>
        <Badge bg={attempt.passed ? 'success' : 'danger'} className="fs-6" data-testid="pass-badge">
          {attempt.passed ? 'PASS' : 'FAIL'}
        </Badge>
        <p className="mt-2 mb-1">
          {attempt.correct} of {attempt.total} correct · pass mark {PASS_THRESHOLD}%
        </p>
        <small className="text-muted">
          {attempt.mode === 'exam' ? 'Exam mode' : 'Practice mode'} · {formatDuration(attempt.durationSec)}
        </small>
      </Card.Body>
    </Card>
  );
}
