import { Alert, Button, Col, Row } from 'react-bootstrap';
import { BreakdownTable } from '../components/results/BreakdownTable';
import { ResultsSummary } from '../components/results/ResultsSummary';
import { ReviewList } from '../components/results/ReviewList';
import type { AnswerMap, Attempt, Session } from '../domain/types';

export interface QuizResult {
  session: Session;
  answers: AnswerMap;
  attempt: Attempt;
}

interface Props {
  result: QuizResult;
  saveWarning: string | null;
  onRetrySame: () => void;
  onRetryWrong: () => void;
  onNewQuiz: () => void;
}

export function ResultsPage({ result, saveWarning, onRetrySame, onRetryWrong, onNewQuiz }: Props) {
  const wrongCount = result.attempt.total - result.attempt.correct;
  return (
    <Row className="g-4">
      <Col lg={4}>
        <ResultsSummary attempt={result.attempt} />
        {saveWarning && (
          <Alert variant="warning" className="mt-3 py-2" data-testid="save-warning">
            This attempt could not be saved to your history: {saveWarning}
          </Alert>
        )}
        <div className="d-grid gap-2 mt-3">
          <Button onClick={onNewQuiz}>New quiz</Button>
          <Button variant="outline-primary" onClick={onRetryWrong} disabled={wrongCount === 0} data-testid="retry-wrong">
            Retry wrong ones ({wrongCount})
          </Button>
          <Button variant="outline-secondary" onClick={onRetrySame} data-testid="retry-same">
            Retry the same set
          </Button>
        </div>
        <h2 className="h6 mt-4">Breakdown</h2>
        <BreakdownTable attempt={result.attempt} />
      </Col>
      <Col lg={8}>
        <h2 className="h5">Review</h2>
        <ReviewList session={result.session} answers={result.answers} />
      </Col>
    </Row>
  );
}
