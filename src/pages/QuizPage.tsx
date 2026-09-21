import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { QuestionNavigator } from '../components/quiz/QuestionNavigator';
import { QuizProgress } from '../components/quiz/QuizProgress';
import { TimerBadge } from '../components/quiz/TimerBadge';
import { scoreSession } from '../domain/scoring';
import type { AnswerMap, Attempt, Session } from '../domain/types';
import { useQuizSession } from '../hooks/useQuizSession';
import { useTimer } from '../hooks/useTimer';

interface Props {
  session: Session;
  onFinish: (session: Session, answers: AnswerMap, attempt: Attempt) => void;
  onQuit: () => void;
}

export function QuizPage({ session, onFinish, onQuit }: Props) {
  const quiz = useQuizSession(session);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const reported = useRef(false);
  const isExam = session.mode === 'exam';

  const handleExpire = useCallback(() => quiz.finish(), [quiz]);
  const timer = useTimer(session.timerSeconds, handleExpire, quiz.state.status === 'running');

  useEffect(() => {
    if (quiz.state.status === 'finished' && !reported.current) {
      reported.current = true;
      const finishedAt = quiz.state.finishedAt ? new Date(quiz.state.finishedAt) : new Date();
      onFinish(session, quiz.state.answers, scoreSession(session, quiz.state.answers, finishedAt));
    }
  }, [quiz.state.status, quiz.state.finishedAt, quiz.state.answers, session, onFinish]);

  const handleQuit = () => {
    if (window.confirm('Quit this quiz? Nothing will be saved.')) onQuit();
  };

  if (!quiz.current) {
    return <p className="text-muted">This session has no questions.</p>;
  }

  const unanswered = session.questions.length - quiz.answeredCount;

  return (
    <Row className="g-4">
      <Col lg={isExam ? 8 : 12} className={isExam ? '' : 'mx-auto'} style={isExam ? undefined : { maxWidth: '58rem' }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1 className="h5 mb-0">{isExam ? 'Exam simulation' : 'Practice'}</h1>
          <div className="d-flex align-items-center gap-2">
            {timer.active && <TimerBadge secondsLeft={timer.secondsLeft} />}
            <Button variant="outline-secondary" size="sm" onClick={handleQuit}>
              Quit
            </Button>
          </div>
        </div>
        <QuizProgress
          mode={session.mode}
          answered={quiz.answeredCount}
          correct={quiz.correctCount}
          total={session.questions.length}
        />
        <QuestionCard
          item={quiz.current}
          answer={quiz.answer}
          mode={session.mode}
          index={quiz.state.currentIndex}
          total={session.questions.length}
          onSelect={quiz.select}
          onConfirm={quiz.confirm}
          onNext={quiz.next}
          onPrev={quiz.prev}
          onToggleFlag={quiz.toggleFlag}
        />
      </Col>
      {isExam && (
        <Col lg={4}>
          <QuestionNavigator
            questions={session.questions}
            answers={quiz.state.answers}
            currentIndex={quiz.state.currentIndex}
            onGoto={quiz.goto}
          />
          <div className="d-grid mt-3">
            <Button variant="success" onClick={() => setShowFinishModal(true)} data-testid="finish-exam">
              Finish exam
            </Button>
          </div>
          <Modal show={showFinishModal} onHide={() => setShowFinishModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Finish the exam?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {unanswered > 0
                ? `${unanswered} question${unanswered === 1 ? '' : 's'} still unanswered. Unanswered questions count as wrong.`
                : 'All questions answered.'}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowFinishModal(false)}>
                Keep going
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  setShowFinishModal(false);
                  quiz.finish();
                }}
                data-testid="confirm-finish"
              >
                Finish and see results
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      )}
    </Row>
  );
}
