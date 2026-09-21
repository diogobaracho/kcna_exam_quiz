import { Badge, Button, Table } from 'react-bootstrap';
import { getCategory } from '../../domain/categories';
import type { Attempt } from '../../domain/types';
import { formatDate } from '../../utils/format';

interface Props {
  attempts: Attempt[];
  onDelete: (id: string) => void;
}

function abbreviate(attempt: Attempt): string {
  if (attempt.categories.length === 5) return 'All domains';
  return attempt.categories.map((id) => getCategory(id).prefix.toUpperCase()).join(', ');
}

export function AttemptsTable({ attempts, onDelete }: Props) {
  if (attempts.length === 0) {
    return <p className="text-muted">No attempts yet. Finish a quiz and it will show up here.</p>;
  }
  return (
    <Table size="sm" responsive hover className="align-middle" data-testid="attempts-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Mode</th>
          <th className="text-end">Questions</th>
          <th className="text-end">Score</th>
          <th>Result</th>
          <th>Domains</th>
          <th aria-label="Actions" />
        </tr>
      </thead>
      <tbody>
        {attempts.map((attempt) => (
          <tr key={attempt.id} data-testid="attempt-row">
            <td>{formatDate(attempt.finishedAt)}</td>
            <td className="text-capitalize">{attempt.mode}</td>
            <td className="text-end">{attempt.total}</td>
            <td className="text-end">{attempt.scorePct}%</td>
            <td>
              <Badge bg={attempt.passed ? 'success' : 'danger'}>{attempt.passed ? 'PASS' : 'FAIL'}</Badge>
            </td>
            <td className="small text-muted">{abbreviate(attempt)}</td>
            <td className="text-end">
              <Button
                variant="outline-danger"
                size="sm"
                aria-label={`Delete attempt from ${formatDate(attempt.finishedAt)}`}
                onClick={() => onDelete(attempt.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
