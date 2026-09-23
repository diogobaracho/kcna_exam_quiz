import { useMemo, useState, type FormEvent } from 'react';
import { Alert, Button, ButtonGroup, Card, Collapse, Form } from 'react-bootstrap';
import { orderedCategories } from '../../domain/categories';
import { countFor, topicsByCategory } from '../../domain/questionBank';
import type { CategoryId, Question, SessionConfig } from '../../domain/types';
import { MAX_COUNT, type QuizSettings } from '../../storage/settingsStore';
import { COUNT_PRESETS, topicLabel } from '../../utils/format';

interface Props {
  bank: Question[];
  initial: QuizSettings;
  onStart: (config: SessionConfig) => void;
  onChange?: (settings: QuizSettings) => void;
}

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return b.every((item) => set.has(item));
}

export function SetupForm({ bank, initial, onStart, onChange }: Props) {
  const topics = useMemo(() => topicsByCategory(bank), [bank]);
  const categories = orderedCategories();

  const allKeysFor = (ids: CategoryId[]) => ids.flatMap((id) => topics[id].map((t) => t.key));

  /** Keep categories in display order, drop empty ones, collapse "all topics" to null. */
  const normalize = (next: QuizSettings): QuizSettings => {
    const ordered = categories
      .map((c) => c.id)
      .filter((id) => next.categories.includes(id) && topics[id].length > 0);
    let nextTopics = next.topics;
    if (nextTopics && sameSet(nextTopics, allKeysFor(ordered))) nextTopics = null;
    return { ...next, categories: ordered, topics: nextTopics };
  };

  const [settings, setSettings] = useState<QuizSettings>(() => normalize(initial));
  const [countText, setCountText] = useState(String(initial.count));
  const [expanded, setExpanded] = useState<Partial<Record<CategoryId, boolean>>>({});

  const update = (patch: Partial<QuizSettings>) => {
    const next = normalize({ ...settings, ...patch });
    setSettings(next);
    onChange?.(next);
  };

  const setCount = (count: number) => {
    setCountText(String(count));
    update({ count });
  };

  const handleCountInput = (raw: string) => {
    setCountText(raw);
    const parsed = Number.parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed >= 1) update({ count: Math.min(MAX_COUNT, parsed) });
  };

  const toggleCategory = (id: CategoryId) => {
    const selected = settings.categories.includes(id);
    const nextCategories = selected
      ? settings.categories.filter((c) => c !== id)
      : [...settings.categories, id];
    let nextTopics = settings.topics;
    if (nextTopics) {
      const keys = topics[id].map((t) => t.key);
      nextTopics = selected ? nextTopics.filter((k) => !keys.includes(k)) : [...nextTopics, ...keys];
    }
    update({ categories: nextCategories, topics: nextTopics });
  };

  const toggleTopic = (id: CategoryId, key: string) => {
    const current = settings.topics ?? allKeysFor(settings.categories);
    const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
    let nextCategories = settings.categories.includes(id)
      ? settings.categories
      : [...settings.categories, id];
    nextCategories = nextCategories.filter((c) => topics[c].some((t) => next.includes(t.key)));
    update({ categories: nextCategories, topics: next });
  };

  const isTopicChecked = (id: CategoryId, key: string) =>
    settings.categories.includes(id) && (settings.topics === null || settings.topics.includes(key));

  const available = countFor(settings.categories, settings.topics, bank);
  const effectiveCount = Math.min(settings.count, available);
  const canStart = settings.categories.length > 0 && effectiveCount > 0;
  const isExam = settings.mode === 'exam';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canStart) return;
    onStart({
      mode: settings.mode,
      count: effectiveCount,
      categories: settings.categories,
      topics: settings.topics,
      distribution: settings.distribution,
      timerEnabled: isExam ? true : settings.timerEnabled,
    });
  };

  return (
    <Form onSubmit={handleSubmit} data-testid="setup-form">
      <Card className="mb-3">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Mode</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                id="mode-practice"
                name="mode"
                label="Practice — feedback after each answer"
                checked={settings.mode === 'practice'}
                onChange={() => update({ mode: 'practice' })}
              />
              <Form.Check
                inline
                type="radio"
                id="mode-exam"
                name="mode"
                label="Exam — timed, results at the end"
                checked={isExam}
                onChange={() => update({ mode: 'exam' })}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" htmlFor="count-input">
              Number of questions
            </Form.Label>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <ButtonGroup aria-label="Question count presets">
                {COUNT_PRESETS.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant={settings.count === preset ? 'primary' : 'outline-primary'}
                    active={settings.count === preset}
                    onClick={() => setCount(preset)}
                  >
                    {preset}
                  </Button>
                ))}
              </ButtonGroup>
              <Form.Control
                id="count-input"
                type="number"
                min={1}
                max={MAX_COUNT}
                style={{ maxWidth: '7rem' }}
                value={countText}
                aria-label="Custom number of questions"
                onChange={(event) => handleCountInput(event.target.value)}
                onBlur={() => setCountText(String(settings.count))}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Domains</Form.Label>
            {categories.map((category) => {
              const categoryCount = countFor([category.id], null, bank);
              const categoryTopics = topics[category.id];
              const open = Boolean(expanded[category.id]);
              return (
                <div key={category.id} className="mb-1">
                  <div className="d-flex align-items-center gap-2">
                    <Form.Check
                      type="checkbox"
                      id={`category-${category.id}`}
                      label={`${category.name} (${categoryCount})`}
                      checked={settings.categories.includes(category.id)}
                      disabled={categoryCount === 0}
                      onChange={() => toggleCategory(category.id)}
                    />
                    <span className="text-muted small">{category.weight}%</span>
                    {categoryTopics.length > 0 && (
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="p-0"
                        aria-expanded={open}
                        aria-controls={`topics-${category.id}`}
                        aria-label={`${open ? 'Hide' : 'Show'} topics for ${category.name}`}
                        onClick={() => setExpanded({ ...expanded, [category.id]: !open })}
                      >
                        {open ? 'hide topics' : 'topics'}
                      </Button>
                    )}
                  </div>
                  <Collapse in={open}>
                    <div id={`topics-${category.id}`} className="ps-4">
                      {categoryTopics.map((topic) => (
                        <Form.Check
                          key={topic.key}
                          type="checkbox"
                          id={`topic-${topic.key}`}
                          label={`${topicLabel(topic.id)} (${topic.count})`}
                          checked={isTopicChecked(category.id, topic.key)}
                          onChange={() => toggleTopic(category.id, topic.key)}
                        />
                      ))}
                    </div>
                  </Collapse>
                </div>
              );
            })}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Distribution across domains</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                id="dist-weighted"
                name="distribution"
                label="Exam-weighted (46/22/16/8/8)"
                checked={settings.distribution === 'weighted'}
                disabled={settings.categories.length < 2}
                onChange={() => update({ distribution: 'weighted' })}
              />
              <Form.Check
                inline
                type="radio"
                id="dist-uniform"
                name="distribution"
                label="Uniform"
                checked={settings.distribution === 'uniform'}
                disabled={settings.categories.length < 2}
                onChange={() => update({ distribution: 'uniform' })}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="timer-enabled"
              label={isExam ? 'Timer (always on in exam mode, 90 s per question)' : 'Timer (90 s per question)'}
              checked={isExam ? true : settings.timerEnabled}
              disabled={isExam}
              onChange={(event) => update({ timerEnabled: event.target.checked })}
            />
          </Form.Group>

          {settings.categories.length === 0 && (
            <Alert variant="warning" className="py-2">
              Select at least one domain to start.
            </Alert>
          )}
          {settings.categories.length > 0 && available === 0 && (
            <Alert variant="warning" className="py-2">
              No questions match this selection.
            </Alert>
          )}
          {available > 0 && settings.count > available && (
            <Alert variant="info" className="py-2" data-testid="cap-notice">
              Only {available} questions are available for this selection; your session will have {available}.
            </Alert>
          )}
          <p className="text-muted small mb-0" data-testid="available-count">
            {available} questions available for this selection.
          </p>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <Button type="submit" size="lg" disabled={!canStart}>
            Start {isExam ? 'exam' : 'practice'} ({effectiveCount} questions)
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
}
