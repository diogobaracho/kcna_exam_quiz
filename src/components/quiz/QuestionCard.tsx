import { Badge, Button, Card, ListGroup } from 'react-bootstrap';
import { getCategory } from '../../domain/categories';
import type { AnswerState, QuizMode, SessionQuestion } from '../../domain/types';
import { OPTION_LETTERS, topicLabel } from '../../utils/format';
import { RichText } from '../common/RichText';
import { ExplanationPanel } from './ExplanationPanel';

interface Props {
  item: SessionQuestion;
  answer: AnswerState;
  mode: QuizMode;
  index: number;
  total: number;
  onSelect: (index: number) => void;
  onConfirm: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleFlag: () => void;
}

export function QuestionCard({
  item,
  answer,
  mode,
  index,
  total,
  onSelect,
  onConfirm,
  onNext,
  onPrev,
  onToggleFlag,
}: Props) {
  const { question } = item;
  const revealed = mode === 'practice' && answer.confirmed;
  const isCorrect = answer.chosenIndex === item.correctIndex;
  const isLast = index === total - 1;

  const variantFor = (optionIndex: number): string | undefined => {
    if (!revealed) return undefined;
    if (optionIndex === item.correctIndex) return 'success';
    if (optionIndex === answer.chosenIndex) return 'danger';
    return undefined;
  };

  return (
    <Card data-testid="question-card">
      <Card.Header className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span className="fw-semibold">
          Question {index + 1} of {total}
        </span>
        <small className="text-muted">
          {getCategory(question.category).name} · {topicLabel(question.topic)} · {question.difficulty}
        </small>
      </Card.Header>
      <Card.Body>
        <RichText className="question-prompt fs-5" text={question.prompt} />
        <ListGroup className="mt-3" role="group" aria-label="Answer options">
          {item.options.map((option, optionIndex) => (
            <ListGroup.Item
              key={optionIndex}
              action
              as="button"
              className="option-item text-start"
              data-testid={`option-${optionIndex}`}
              active={!revealed && answer.chosenIndex === optionIndex}
              variant={variantFor(optionIndex)}
              disabled={revealed}
              aria-pressed={answer.chosenIndex === optionIndex}
              onClick={() => onSelect(optionIndex)}
            >
              <strong className="me-2">{OPTION_LETTERS[optionIndex]}.</strong>
              {option.text}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {revealed && (
          <div className="mt-3">
            <Badge bg={isCorrect ? 'success' : 'danger'} className="fs-6" data-testid="feedback-badge">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </Badge>
            {!isCorrect && (
              <span className="ms-2">
                Correct answer: <strong>{OPTION_LETTERS[item.correctIndex]}</strong>
              </span>
            )}
            <ExplanationPanel
              explanationEn={question.explanationEn}
              explanationPt={question.explanationPt}
            />
          </div>
        )}
      </Card.Body>
      <Card.Footer className="d-flex flex-wrap gap-2 justify-content-between">
        {mode === 'practice' ? (
          revealed ? (
            <Button className="ms-auto" onClick={onNext}>
              {isLast ? 'Finish' : 'Next'}
            </Button>
          ) : (
            <Button className="ms-auto" onClick={onConfirm} disabled={answer.chosenIndex === null}>
              Confirm
            </Button>
          )
        ) : (
          <>
            <Button variant="outline-secondary" onClick={onPrev} disabled={index === 0}>
              Previous
            </Button>
            <Button
              variant={answer.flagged ? 'warning' : 'outline-warning'}
              onClick={onToggleFlag}
              aria-pressed={answer.flagged}
            >
              {answer.flagged ? 'Flagged' : 'Flag for review'}
            </Button>
            <Button onClick={onNext} disabled={isLast}>
              Next
            </Button>
          </>
        )}
      </Card.Footer>
    </Card>
  );
}
