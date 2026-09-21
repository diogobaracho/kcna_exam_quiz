import { Alert, Button, Col, Row } from 'react-bootstrap';
import { SetupForm } from '../components/setup/SetupForm';
import { focusToSelection } from '../domain/focus';
import type { FocusReport, Question, SessionConfig } from '../domain/types';
import type { QuizSettings } from '../storage/settingsStore';

interface Props {
  bank: Question[];
  settings: QuizSettings;
  /** Changes whenever a preset is applied so the form re-initialises. */
  formKey: number;
  focusReport: FocusReport;
  onSettingsChange: (settings: QuizSettings) => void;
  onStart: (config: SessionConfig) => void;
  onApplyFocus: () => void;
}

export function HomePage({ bank, settings, formKey, focusReport, onSettingsChange, onStart, onApplyFocus }: Props) {
  const focusSelection = focusToSelection(focusReport);
  return (
    <Row className="justify-content-center">
      <Col lg={8}>
        <h1 className="h3 mb-1">Set up your quiz</h1>
        <p className="text-muted">
          {bank.length} questions across the five KCNA domains. Every answer comes with an explanation in English and
          a simple one in Portuguese.
        </p>
        {focusSelection && (
          <Alert variant="warning" className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <span>Your history shows some weak areas.</span>
            <Button variant="warning" size="sm" onClick={onApplyFocus} data-testid="home-focus">
              Focus on my weak areas
            </Button>
          </Alert>
        )}
        <SetupForm key={formKey} bank={bank} initial={settings} onStart={onStart} onChange={onSettingsChange} />
      </Col>
    </Row>
  );
}
