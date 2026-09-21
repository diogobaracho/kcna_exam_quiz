import { useState } from 'react';
import { Badge, Card, Form } from 'react-bootstrap';
import { evaluateAnswer } from '../../domain/scoring';
import type { AnswerMap, Session } from '../../domain/types';
import { RichText } from '../common/RichText';
import { ExplanationPanel } from '../quiz/ExplanationPanel';

interface Props {
  session: Session;
  answers: AnswerMap;
}

/** Per-question review with both explanations; filterable to wrong answers. */
export function ReviewList({ session, answers }: Props) {
  const [wrongOnly, setWrongOnly] = useState(false);
  const rows = session.questions.map((item, index) => ({
    item,
    index,
    evaluation: evaluateAnswer(session.mode, item, answers[item.question.id]),
  }));
  const visible = wrongOnly ? rows.filter((row) => !row.evaluation.correct) : rows;

  return (
    <div data-testid="review-list">
      <Form.Check
        type="switch"
        id="review-wrong-only"
        label="Show wrong answers only"
        checked={wrongOnly}
        onChange={(event) => setWrongOnly(event.target.checked)}
        className="mb-3"
      />
      {visible.length === 0 && <p className="text-muted">Nothing to show. Well done!</p>}
      {visible.map(({ item, index, evaluation }) => (
        <Card key={item.question.id} className="mb-3" data-testid="review-item">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start gap-2">
              <strong>Q{index + 1}</strong>
              <Badge bg={evaluation.correct ? 'success' : 'danger'}>
                {evaluation.correct ? 'Correct' : evaluation.counted ? 'Incorrect' : 'Not answered'}
              </Badge>
            </div>
            <RichText text={item.question.prompt} className="mt-2" />
            <ul className="list-unstyled mb-0">
              <li>
                Your answer: <strong>{evaluation.chosenText ?? '—'}</strong>
              </li>
              <li>
                Correct answer: <strong>{evaluation.correctText}</strong>
              </li>
            </ul>
            <ExplanationPanel
              explanationEn={item.question.explanationEn}
              explanationPt={item.question.explanationPt}
            />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
