import type {
  AnswerMap,
  CategoryId,
  Question,
  QuizMode,
  Session,
  SessionQuestion,
} from '../../src/domain/types';

let counter = 0;

export function makeQuestion(overrides: Partial<Question> = {}): Question {
  counter += 1;
  const id = overrides.id ?? `q-${counter}`;
  return {
    id,
    category: 'kubernetes-fundamentals',
    topic: 'architecture',
    difficulty: 'medium',
    tags: [],
    prompt: `Prompt for ${id}?`,
    options: [
      { text: `${id} correct`, correct: true },
      { text: `${id} wrong 1`, correct: false },
      { text: `${id} wrong 2`, correct: false },
      { text: `${id} wrong 3`, correct: false },
    ],
    explanationEn: `English explanation for ${id}.`,
    explanationPt: `Explicação em português para ${id}.`,
    filePath: `data/questions/${overrides.category ?? 'kubernetes-fundamentals'}/${overrides.topic ?? 'architecture'}/${id}.md`,
    ...overrides,
  };
}

/** Build n questions for a category/topic. */
export function makeQuestions(
  n: number,
  category: CategoryId,
  topic = 'architecture',
  prefix = category,
): Question[] {
  return Array.from({ length: n }, (_, i) => makeQuestion({ id: `${prefix}-${topic}-${i + 1}`, category, topic }));
}

/** Session question keeping the file order (correct option is at index 0 in fixtures). */
export function makeSessionQuestion(question: Question): SessionQuestion {
  return {
    question,
    options: question.options.map((o, originalIndex) => ({ text: o.text, originalIndex })),
    correctIndex: question.options.findIndex((o) => o.correct),
  };
}

export function makeSession(
  questions: Question[],
  mode: QuizMode = 'practice',
  overrides: Partial<Session> = {},
): Session {
  const categories = [...new Set(questions.map((q) => q.category))];
  return {
    id: 'session-1',
    mode,
    config: {
      mode,
      count: questions.length,
      categories,
      topics: null,
      distribution: 'weighted',
      timerEnabled: false,
    },
    questions: questions.map(makeSessionQuestion),
    startedAt: '2026-09-21T10:00:00.000Z',
    timerSeconds: mode === 'exam' ? questions.length * 90 : null,
    ...overrides,
  };
}

export function answersFor(session: Session, chosen: (number | null)[], confirmed = true): AnswerMap {
  const answers: AnswerMap = {};
  session.questions.forEach((item, index) => {
    answers[item.question.id] = {
      chosenIndex: chosen[index] ?? null,
      confirmed: confirmed && chosen[index] !== null && chosen[index] !== undefined,
      flagged: false,
    };
  });
  return answers;
}
