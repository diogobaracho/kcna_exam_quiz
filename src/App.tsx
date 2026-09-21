import { useCallback, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppNavbar } from './components/layout/AppNavbar';
import { buildFocusReport, focusToSelection } from './domain/focus';
import { getBank } from './domain/questionBank';
import { buildSession } from './domain/selectQuestions';
import type { AnswerMap, Attempt, Session, SessionConfig } from './domain/types';
import { useAttempts } from './hooks/useAttempts';
import { HistoryPage } from './pages/HistoryPage';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage, type QuizResult } from './pages/ResultsPage';
import { loadSettings, saveSettings, type QuizSettings } from './storage/settingsStore';

export default function App() {
  const navigate = useNavigate();
  const bank = useMemo(() => getBank(), []);
  const attempts = useAttempts();
  const [settings, setSettings] = useState<QuizSettings>(() => loadSettings());
  const [formKey, setFormKey] = useState(0);
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [saveWarning, setSaveWarning] = useState<string | null>(null);

  const focusReport = useMemo(() => buildFocusReport(attempts.attempts), [attempts.attempts]);

  const updateSettings = useCallback((next: QuizSettings) => {
    setSettings(next);
    saveSettings(next);
  }, []);

  const startSession = useCallback(
    (config: SessionConfig) => {
      const next = buildSession(config, bank);
      if (next.questions.length === 0) return;
      setSession(next);
      setResult(null);
      setSaveWarning(null);
      navigate('/quiz');
    },
    [bank, navigate],
  );

  const handleFinish = useCallback(
    (finished: Session, answers: AnswerMap, attempt: Attempt) => {
      const saved = attempts.save(attempt);
      setSaveWarning(saved.ok ? null : saved.reason);
      setResult({ session: finished, answers, attempt });
      setSession(null);
      navigate('/results');
    },
    [attempts, navigate],
  );

  const handleQuit = useCallback(() => {
    setSession(null);
    navigate('/');
  }, [navigate]);

  const applyFocus = useCallback(() => {
    const selection = focusToSelection(focusReport);
    if (!selection) return;
    updateSettings({ ...settings, mode: 'practice', categories: selection.categories, topics: selection.topics });
    setFormKey((k) => k + 1);
    navigate('/');
  }, [focusReport, navigate, settings, updateSettings]);

  const retrySame = useCallback(() => {
    if (!result) return;
    startSession({
      ...result.session.config,
      seed: undefined,
      questionIds: result.session.questions.map((q) => q.question.id),
    });
  }, [result, startSession]);

  const retryWrong = useCallback(() => {
    if (!result) return;
    const wrongIds = result.attempt.answers.filter((a) => !a.correct).map((a) => a.questionId);
    if (wrongIds.length === 0) return;
    startSession({
      ...result.session.config,
      mode: 'practice',
      timerEnabled: false,
      seed: undefined,
      questionIds: wrongIds,
    });
  }, [result, startSession]);

  return (
    <>
      <AppNavbar />
      <Container className="pb-5">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                bank={bank}
                settings={settings}
                formKey={formKey}
                focusReport={focusReport}
                onSettingsChange={updateSettings}
                onStart={startSession}
                onApplyFocus={applyFocus}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              session ? (
                <QuizPage key={session.id} session={session} onFinish={handleFinish} onQuit={handleQuit} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/results"
            element={
              result ? (
                <ResultsPage
                  result={result}
                  saveWarning={saveWarning}
                  onRetrySame={retrySame}
                  onRetryWrong={retryWrong}
                  onNewQuiz={() => navigate('/')}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage
                bank={bank}
                attempts={attempts.attempts}
                corrupt={attempts.corrupt}
                focusReport={focusReport}
                onDelete={attempts.remove}
                onClear={attempts.clear}
                onApplyFocus={applyFocus}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
}
