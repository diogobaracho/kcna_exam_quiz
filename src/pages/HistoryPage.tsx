import { Alert, Button, Col, Row, Table } from 'react-bootstrap';
import { AttemptsTable } from '../components/history/AttemptsTable';
import { FocusSuggestions } from '../components/history/FocusSuggestions';
import { orderedCategories } from '../domain/categories';
import { aggregateTallies } from '../domain/focus';
import { percentage } from '../domain/scoring';
import type { Attempt, FocusReport, Question } from '../domain/types';

interface Props {
  bank: Question[];
  attempts: Attempt[];
  corrupt: boolean;
  focusReport: FocusReport;
  onDelete: (id: string) => void;
  onClear: () => void;
  onApplyFocus: () => void;
}

export function HistoryPage({ bank, attempts, corrupt, focusReport, onDelete, onClear, onApplyFocus }: Props) {
  const totals = aggregateTallies(attempts);
  const handleClear = () => {
    if (window.confirm('Delete all attempts? This cannot be undone.')) onClear();
  };
  return (
    <Row className="g-4">
      <Col lg={8}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1 className="h4 mb-0">History</h1>
          {attempts.length > 0 && (
            <Button variant="outline-danger" size="sm" onClick={handleClear} data-testid="clear-all">
              Clear all
            </Button>
          )}
        </div>
        {corrupt && (
          <Alert variant="warning" className="py-2" data-testid="corrupt-warning">
            Some previously stored data could not be read and was ignored.
          </Alert>
        )}
        <AttemptsTable attempts={attempts} onDelete={onDelete} />

        {attempts.length > 0 && (
          <>
            <h2 className="h6 mt-4">Accuracy by domain (all attempts)</h2>
            <Table size="sm" responsive data-testid="domain-accuracy">
              <thead>
                <tr>
                  <th>Domain</th>
                  <th className="text-end">Correct</th>
                  <th className="text-end">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {orderedCategories()
                  .filter((category) => totals.perCategory[category.id])
                  .map((category) => {
                    const tally = totals.perCategory[category.id]!;
                    return (
                      <tr key={category.id}>
                        <td>{category.name}</td>
                        <td className="text-end">
                          {tally.correct} / {tally.total}
                        </td>
                        <td className="text-end">{percentage(tally.correct, tally.total)}%</td>
                      </tr>
                    );
                  })}
                <tr className="table-light fw-semibold">
                  <td>Overall</td>
                  <td className="text-end">
                    {totals.totalCorrect} / {totals.totalAnswered}
                  </td>
                  <td className="text-end">{percentage(totals.totalCorrect, totals.totalAnswered)}%</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Col>
      <Col lg={4}>
        <FocusSuggestions report={focusReport} bank={bank} onStartFocused={onApplyFocus} />
      </Col>
    </Row>
  );
}
