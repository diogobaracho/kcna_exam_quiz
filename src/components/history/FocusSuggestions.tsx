import { Button, Card, ListGroup } from 'react-bootstrap';
import { getCategory } from '../../domain/categories';
import { FOCUS_MIN_ANSWERED, FOCUS_THRESHOLD, focusToSelection } from '../../domain/focus';
import { getQuestionById } from '../../domain/questionBank';
import type { FocusReport, Question } from '../../domain/types';
import { topicLabel } from '../../utils/format';

interface Props {
  report: FocusReport;
  bank: Question[];
  onStartFocused: () => void;
}

export function FocusSuggestions({ report, bank, onStartFocused }: Props) {
  const selection = focusToSelection(report);
  return (
    <Card data-testid="focus-suggestions">
      <Card.Header className="fw-semibold">Where to focus</Card.Header>
      <Card.Body>
        {!report.enoughData && (
          <p className="text-muted mb-0" data-testid="focus-insufficient">
            Not enough data yet. Answer at least {FOCUS_MIN_ANSWERED} questions in a topic to get suggestions.
          </p>
        )}
        {report.enoughData && !selection && (
          <p className="text-success mb-0">
            Every topic with enough answers is at or above {FOCUS_THRESHOLD}%. Keep it up!
          </p>
        )}
        {report.weakTopics.length > 0 && (
          <>
            <h6>Weak topics (below {FOCUS_THRESHOLD}%)</h6>
            <ListGroup variant="flush" className="mb-3">
              {report.weakTopics.map((topic) => (
                <ListGroup.Item key={topic.key} className="d-flex justify-content-between px-0" data-testid="weak-topic">
                  <span>
                    {getCategory(topic.category).name} · {topicLabel(topic.topic)}
                  </span>
                  <span className="text-danger">
                    {topic.accuracyPct}% ({topic.correct}/{topic.total})
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
        {report.weakCategories.length > 0 && (
          <>
            <h6>Weak domains</h6>
            <ListGroup variant="flush" className="mb-3">
              {report.weakCategories.map((category) => (
                <ListGroup.Item key={category.category} className="d-flex justify-content-between px-0" data-testid="weak-category">
                  <span>{getCategory(category.category).name}</span>
                  <span className="text-danger">
                    {category.accuracyPct}% ({category.correct}/{category.total})
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
        {report.mostMissed.length > 0 && (
          <>
            <h6>Most missed questions</h6>
            <ListGroup variant="flush" className="mb-3">
              {report.mostMissed.slice(0, 10).map((missed) => {
                const question = getQuestionById(missed.questionId, bank);
                return (
                  <ListGroup.Item key={missed.questionId} className="px-0" data-testid="most-missed">
                    <span className="text-muted small me-2">{missed.questionId}</span>
                    {question ? question.prompt : '(question no longer in the bank)'}
                    <span className="text-danger ms-2 small">
                      missed {missed.misses}/{missed.attempts}
                    </span>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </>
        )}
        {selection && (
          <Button onClick={onStartFocused} data-testid="focus-start">
            Focus on my weak areas
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
