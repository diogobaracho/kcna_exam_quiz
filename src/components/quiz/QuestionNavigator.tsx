import { Button } from 'react-bootstrap';
import type { AnswerMap, SessionQuestion } from '../../domain/types';

interface Props {
  questions: SessionQuestion[];
  answers: AnswerMap;
  currentIndex: number;
  onGoto: (index: number) => void;
}

/** Exam-mode grid of question numbers showing answered/flagged state. */
export function QuestionNavigator({ questions, answers, currentIndex, onGoto }: Props) {
  return (
    <div>
      <div className="navigator-grid" role="group" aria-label="Question navigator" data-testid="navigator">
        {questions.map((item, index) => {
          const answer = answers[item.question.id];
          const answered = answer?.chosenIndex !== null && answer?.chosenIndex !== undefined;
          const flagged = Boolean(answer?.flagged);
          let variant = 'outline-secondary';
          if (flagged) variant = 'warning';
          else if (answered) variant = 'success';
          const isCurrent = index === currentIndex;
          return (
            <Button
              key={item.question.id}
              size="sm"
              variant={variant}
              active={isCurrent}
              aria-current={isCurrent ? 'true' : undefined}
              aria-label={`Question ${index + 1}${answered ? ', answered' : ', unanswered'}${flagged ? ', flagged' : ''}`}
              data-testid={`nav-${index}`}
              data-state={flagged ? 'flagged' : answered ? 'answered' : 'unanswered'}
              onClick={() => onGoto(index)}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
      <div className="small text-muted mt-2">
        <span className="badge bg-success me-1">&nbsp;</span>answered
        <span className="badge bg-warning ms-3 me-1">&nbsp;</span>flagged
        <span className="badge border text-muted ms-3 me-1">&nbsp;</span>unanswered
      </div>
    </div>
  );
}
