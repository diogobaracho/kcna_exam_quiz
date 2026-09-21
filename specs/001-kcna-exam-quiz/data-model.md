# Data Model: KCNA Exam Quiz

All types live in `src/domain/types.ts`. Everything is plain data (no classes) so it can be
serialised to `localStorage` and compared in tests.

## Category (KCNA domain)

Declared in `src/domain/categories.ts` (the only manifest).

| Field | Type | Notes |
|---|---|---|
| id | `CategoryId` (string union) | Equals the folder name under `data/questions/` |
| name | string | Display name, e.g. "Kubernetes Fundamentals" |
| namePt | string | Portuguese display name (used in explanations header only) |
| weight | number | Official exam weight in percent; all weights sum to 100 |
| order | number | Display order |
| prefix | string | ID prefix, e.g. `kf` |

Initial values: `kubernetes-fundamentals` 46 (`kf`), `container-orchestration` 22 (`co`),
`cloud-native-architecture` 16 (`cna`), `cloud-native-observability` 8 (`cno`),
`cloud-native-application-delivery` 8 (`cnad`).

## Topic

Not declared anywhere: derived from the second-level folder name. `questionBank.ts` exposes
`topicsByCategory(): Record<CategoryId, TopicSummary[]>` with `{ id, count }`.

## Question

Produced by `parseQuestion(markdown, filePath)`.

| Field | Type | Validation |
|---|---|---|
| id | string | required, unique across bank, `^[a-z0-9-]+$` |
| category | CategoryId | required, must exist in manifest and equal folder |
| topic | string | required, `^[a-z0-9-]+$`, must equal folder |
| difficulty | `'easy' \| 'medium' \| 'hard'` | default `medium` |
| tags | string[] | optional, default `[]` |
| source | string | optional |
| prompt | string | `# Question` body, non-empty |
| options | `{ text: string; correct: boolean }[]` | 3–5 items, exactly one `correct` |
| explanationEn | string | `## Explanation` body, non-empty |
| explanationPt | string | `## Explicação para criança` body, non-empty |
| filePath | string | relative path, for error messages |

`QuestionParseError { filePath, message }` is thrown for any violation; the bank validator
collects all errors before failing so a contributor sees everything at once.

## Session (in-memory only)

| Field | Type |
|---|---|
| id | string (uuid-ish, `Date.now()+random`) |
| mode | `'practice' \| 'exam'` |
| config | SessionConfig (below) |
| questions | `SessionQuestion[]` |
| startedAt | ISO string |
| timerSeconds | number \| null |

`SessionConfig = { mode, count, categories: CategoryId[], topics: string[] | null,
distribution: 'weighted' | 'uniform', timerEnabled: boolean, seed?: number }`

`SessionQuestion = { question: Question, options: ShuffledOption[], correctIndex: number }` where
`ShuffledOption = { text: string, originalIndex: number }`.

## Quiz state (reducer in `useQuizSession`)

`QuizState = { session, currentIndex, answers: Record<questionId, AnswerState>, status: 'running' | 'finished', finishedAt? }`

`AnswerState = { chosenIndex: number | null, confirmed: boolean, flagged: boolean }`

Transitions:

| Action | Practice | Exam |
|---|---|---|
| `select(i)` | allowed until confirmed | always allowed while running |
| `confirm()` | locks answer, reveals feedback | n/a (exam uses `next`) |
| `next()` / `prev()` / `goto(i)` | next only after confirm; no prev | free navigation |
| `toggleFlag()` | n/a | toggles flag |
| `finish()` | after last confirm | manual or on timer expiry |

## Attempt (persisted)

| Field | Type |
|---|---|
| id | string |
| startedAt / finishedAt | ISO strings |
| mode | `'practice' \| 'exam'` |
| categories | CategoryId[] |
| topics | string[] \| null |
| total / correct | number |
| scorePct | number (0–100, one decimal) |
| passed | boolean (`scorePct >= 75`) |
| perCategory | `Record<CategoryId, { correct: number; total: number }>` |
| perTopic | `Record<string /* category/topic */, { correct: number; total: number }>` |
| answers | `{ questionId, category, topic, chosenText: string \| null, correctText: string, correct: boolean }[]` |
| durationSec | number |

Stored envelope: `{ version: 1, attempts: Attempt[] }` (see contracts/local-storage-schema.md).

## FocusSuggestion (derived)

```
FocusReport = {
  enoughData: boolean,               // at least 1 attempt and ≥3 answered in some topic
  weakTopics: { key, category, topic, correct, total, accuracyPct }[],   // accuracy < 75, total ≥ 3, weakest first, tie → higher category weight first
  weakCategories: { category, correct, total, accuracyPct }[],           // same rule
  mostMissed: { questionId, misses, attempts }[]                          // misses ≥ 2, sorted desc
}
```

## Scoring (derived)

`scoreAttempt(session, answers): Attempt` computes totals, per-category, per-topic and pass/fail.
Unanswered questions count as incorrect. `PASS_THRESHOLD = 75`.
