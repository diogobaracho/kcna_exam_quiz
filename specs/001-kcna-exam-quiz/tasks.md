# Tasks: KCNA Exam Quiz

**Input**: Design documents from `/specs/001-kcna-exam-quiz/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Requested explicitly by the spec (FR-018) and the constitution (Principle V). Test
tasks are included and written before or alongside the code they cover.

**Organization**: Tasks are grouped by user story so each story is an independently testable
increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 practice quiz, US2 history + focus, US3 exam mode, US4 extensibility
- Paths are relative to the repository root

## Path Conventions

Single frontend project: `src/`, `tests/`, `data/questions/`, `docs/` at the repository root.

---

## Phase 1: Setup

- [X] T001 Create `package.json` with scripts (dev, build, preview, test, test:run, test:coverage, validate:questions, typecheck, lint) and Node-18-compatible dependency versions per research.md R5
- [X] T002 [P] Create `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts` (React plugin + vitest config with jsdom, `tests/setup.ts`, coverage) and `index.html`
- [X] T003 [P] Create `.eslintrc.cjs`, `.editorconfig`, `.gitignore`, `.dockerignore`
- [X] T004 [P] Create `Dockerfile` (base/dev/build/prod stages), `docker-compose.yml` (dev, prod, test services) and `docker/nginx.conf` with SPA fallback
- [X] T005 [P] Create `src/main.tsx`, `src/App.tsx` (BrowserRouter + placeholder routes), `src/styles.css` importing Bootstrap, and `tests/setup.ts` (jest-dom)
- [X] T006 Run `npm install` and verify `npm run dev` and `npm run test:run` start cleanly

---

## Phase 2: Foundational (blocking prerequisites)

- [X] T007 [P] Define domain types in `src/domain/types.ts` per data-model.md (Category, Question, SessionConfig, Session, SessionQuestion, AnswerState, Attempt, FocusReport)
- [X] T008 [P] Create category manifest in `src/domain/categories.ts` (5 categories with id, name, namePt, weight, order, prefix) and helpers `getCategory`, `CATEGORY_IDS`
- [X] T009 [P] Implement seeded PRNG and shuffle in `src/domain/random.ts` (mulberry32, `shuffle(array, rng)`, `randomSeed()`)
- [X] T010 [P] Write parser tests in `tests/domain/parseQuestion.test.ts` covering every error code from contracts/question-file-format.md plus happy path, accent-insensitive heading, tags parsing, default difficulty
- [X] T011 Implement `src/domain/parseQuestion.ts` (`parseQuestion(markdown, filePath)`, `QuestionParseError`, `normalizeHeading`) to make T010 pass
- [X] T012 Implement `src/domain/questionBank.ts` (`import.meta.glob` loader, `loadQuestionBank()` collecting all errors, `getBank()` memoised, `topicsByCategory()`, `countFor(categories, topics)`, `getQuestionById`)
- [X] T013 Write bank validation test in `tests/domain/questionBank.test.ts` asserting zero parse errors, unique ids, folder/frontmatter consistency, ≥ 250 questions total, per-category share within ±3 pts of weights, and printing counts per category
- [X] T014 Create `docs/question-format.md` from contracts/question-file-format.md (spec, prefixes table `kf/co/cna/cno/cnad` + topic prefixes, annotated example, error list) and add one seed question per topic folder (23 files) under `data/questions/` so the loader and tests have real input

**Checkpoint**: `npm run validate:questions` runs (bank count assertion may still fail until Phase 5 content is complete; all other assertions pass).

---

## Phase 3: User Story 1 - Practice quiz with instant feedback (Priority: P1) 🎯 MVP

**Goal**: Configure a practice session (count + categories/topics), answer with confirm-reveal
feedback showing both explanations, see a final score.

**Independent Test**: quickstart.md scenarios 1–3.

### Tests for User Story 1

- [X] T015 [P] [US1] Write selection tests in `tests/domain/selectQuestions.test.ts` (count respected, category/topic filters, weighted vs uniform allocation, largest-remainder rounding, shortfall fill, seed determinism, option shuffle tracks correct index, cap when bank smaller)
- [X] T016 [P] [US1] Write scoring tests in `tests/domain/scoring.test.ts` (score %, pass threshold 75, per-category/per-topic tallies, unanswered counts as wrong, duration)
- [X] T017 [P] [US1] Write reducer tests in `tests/hooks/useQuizSession.test.ts` for practice mode (select, confirm locks, next only after confirm, finish after last)
- [X] T018 [P] [US1] Write component test `tests/components/QuestionCard.test.tsx` (practice: confirm reveals badge, highlights correct, shows EN and PT explanation, options disabled after confirm)
- [X] T019 [P] [US1] Write component test `tests/components/SetupForm.test.tsx` (count capped to available with notice, start disabled with zero categories, presets, topic sub-selection)

### Implementation for User Story 1

- [X] T020 [P] [US1] Implement `src/domain/selectQuestions.ts` (`allocateCounts`, `selectQuestions(bank, config, rng)` returning `SessionQuestion[]`, `buildSession(config, bank, seed?)`)
- [X] T021 [P] [US1] Implement `src/domain/scoring.ts` (`PASS_THRESHOLD`, `scoreSession(session, answers, finishedAt): Attempt`)
- [X] T022 [US1] Implement `src/hooks/useQuizSession.ts` reducer + hook (`quizReducer`, actions select/confirm/next/prev/goto/toggleFlag/finish) for both modes' rules per data-model.md
- [X] T023 [P] [US1] Implement `src/components/quiz/ExplanationPanel.tsx` (two Bootstrap Alerts: "Explanation" and "Explicação para criança") and `src/components/quiz/QuizProgress.tsx`
- [X] T024 [US1] Implement `src/components/quiz/QuestionCard.tsx` (ListGroup options, Confirm/Next buttons, correct/incorrect styling, uses ExplanationPanel in practice mode when confirmed)
- [X] T025 [US1] Implement `src/components/setup/SetupForm.tsx` (mode radio, count presets + custom, category checkboxes with counts, collapsible topics, distribution radio, timer toggle, Start)
- [X] T026 [P] [US1] Implement `src/components/results/ResultsSummary.tsx` (score, correct/total, PASS/FAIL badge, duration) and `src/components/results/BreakdownTable.tsx`
- [X] T027 [US1] Implement `src/components/layout/AppNavbar.tsx` and pages `src/pages/HomePage.tsx`, `src/pages/QuizPage.tsx`, `src/pages/ResultsPage.tsx`; wire session state in `src/App.tsx` (redirect `/quiz` without session, quit with confirm)
- [X] T028 [US1] Run `npm run test:run`, `npm run typecheck`, `npm run lint`; manually verify quickstart scenarios 1–3 in `docker compose up dev`

**Checkpoint**: Practice mode is fully usable end to end.

---

## Phase 4: User Story 2 - Local history and focus suggestions (Priority: P2)

**Goal**: Persist finished attempts, show history, compute and act on focus suggestions.

**Independent Test**: quickstart.md scenarios 4–5.

### Tests for User Story 2

- [X] T029 [P] [US2] Write `tests/storage/attemptsStore.test.ts` (roundtrip, newest first, missing key, corrupt JSON, wrong version, non-array, delete one, clear, setItem throwing → `{ok:false}`)
- [X] T030 [P] [US2] Write `tests/storage/settingsStore.test.ts` (roundtrip, field-by-field fallback to defaults)
- [X] T031 [P] [US2] Write `tests/domain/focus.test.ts` (weak topics < 75 with ≥ 3 answered, ordering weakest first then weight, weak categories, most-missed ≥ 2, `enoughData` false on empty history)
- [X] T032 [P] [US2] Write `tests/components/HistoryPage.test.tsx` (lists attempts, delete one, clear all with confirm, focus suggestions rendered, insufficient-data message)

### Implementation for User Story 2

- [X] T033 [P] [US2] Implement `src/storage/attemptsStore.ts` per contracts/local-storage-schema.md (`loadAttempts`, `saveAttempt`, `deleteAttempt`, `clearAttempts`, injectable storage for tests)
- [X] T034 [P] [US2] Implement `src/storage/settingsStore.ts` (`loadSettings`, `saveSettings`, `DEFAULT_SETTINGS`)
- [X] T035 [P] [US2] Implement `src/domain/focus.ts` (`buildFocusReport(attempts, categories): FocusReport`, `focusToSessionConfig(report)`)
- [X] T036 [US2] Implement `src/hooks/useAttempts.ts` (state + actions wrapping attemptsStore, `saveWarning` flag)
- [X] T037 [US2] Implement `src/components/history/AttemptsTable.tsx` and `src/components/history/FocusSuggestions.tsx`, and `src/pages/HistoryPage.tsx`
- [X] T038 [US2] Wire persistence: save attempt on finish in `src/App.tsx`/`ResultsPage`, remember settings in `SetupForm`, add "Focus on my weak areas" button on `HomePage` that pre-fills the form, show save warning on Results
- [X] T039 [US2] Run full checks and verify quickstart scenarios 4–5 (including reload persistence)

**Checkpoint**: History persists across reloads and suggestions drive a new session.

---

## Phase 5: User Story 3 - Exam simulation (Priority: P3)

**Goal**: Timed exam mode with navigation, flags, no feedback until finish, full review, retry
wrong ones.

**Independent Test**: quickstart.md scenarios 6–8.

### Tests for User Story 3

- [X] T040 [P] [US3] Write `tests/hooks/useTimer.test.ts` (fake timers: counts down, calls onExpire once, pause/resume, wall-clock based)
- [X] T041 [P] [US3] Extend `tests/hooks/useQuizSession.test.ts` for exam mode (free navigation, change answer, toggle flag, finish with unanswered)
- [X] T042 [P] [US3] Write `tests/components/QuestionCard.exam.test.tsx` (no correctness feedback after select, Next/Previous enabled) and `tests/components/ReviewList.test.tsx` (chosen vs correct, both explanations, wrong-only filter)
- [X] T043 [P] [US3] Write `tests/components/QuestionNavigator.test.tsx` (answered/flagged/unanswered states, click navigates)

### Implementation for User Story 3

- [X] T044 [P] [US3] Implement `src/hooks/useTimer.ts`
- [X] T045 [P] [US3] Implement `src/components/quiz/TimerBadge.tsx` and `src/components/quiz/QuestionNavigator.tsx`
- [X] T046 [US3] Extend `src/components/quiz/QuestionCard.tsx` for exam mode (no feedback, Previous/Next/Flag, Finish button with confirm modal)
- [X] T047 [US3] Implement `src/components/results/ReviewList.tsx` with wrong-only filter and integrate into `src/pages/ResultsPage.tsx` with "Retry same set", "Retry wrong ones", "New quiz"
- [X] T048 [US3] Wire timer into `src/pages/QuizPage.tsx` (exam: always on, 90 s/question, auto-finish on expiry; practice: optional) and weighted distribution default in `SetupForm`
- [X] T049 [US3] Run full checks and verify quickstart scenarios 6–8

**Checkpoint**: Exam mode complete.

---

## Phase 6: User Story 4 - Extensible question bank and full content (Priority: P4)

**Goal**: 250 validated questions, contributor documentation, validation command.

**Independent Test**: quickstart.md scenarios 9–10 and the bank test count assertion.

- [X] T050 [P] [US4] Author `data/questions/kubernetes-fundamentals/architecture/` (25 questions, ids `kf-arch-001…025`)
- [X] T051 [P] [US4] Author `data/questions/kubernetes-fundamentals/api-and-objects/` (25, `kf-api-`)
- [X] T052 [P] [US4] Author `data/questions/kubernetes-fundamentals/workloads/` (30, `kf-wl-`)
- [X] T053 [P] [US4] Author `data/questions/kubernetes-fundamentals/containers-and-images/` (15, `kf-img-`)
- [X] T054 [P] [US4] Author `data/questions/kubernetes-fundamentals/scheduling/` (20, `kf-sched-`)
- [X] T055 [P] [US4] Author `data/questions/container-orchestration/` topics: orchestration-fundamentals 8 (`co-fund-`), runtime 8 (`co-rt-`), security 12 (`co-sec-`), networking 12 (`co-net-`), service-mesh 7 (`co-mesh-`), storage 8 (`co-sto-`)
- [X] T056 [P] [US4] Author `data/questions/cloud-native-architecture/` topics: fundamentals 8 (`cna-fund-`), autoscaling 8 (`cna-scale-`), serverless 6 (`cna-sls-`), community-and-governance 8 (`cna-gov-`), roles-and-personas 5 (`cna-role-`), open-standards 5 (`cna-std-`)
- [X] T057 [P] [US4] Author `data/questions/cloud-native-observability/` topics: telemetry-fundamentals 8 (`cno-tel-`), prometheus-and-tooling 8 (`cno-prom-`), cost-management 4 (`cno-cost-`)
- [X] T058 [P] [US4] Author `data/questions/cloud-native-application-delivery/` topics: delivery-fundamentals 7 (`cnad-fund-`), gitops 7 (`cnad-gitops-`), ci-cd-tooling 6 (`cnad-cicd-`)
- [X] T059 [US4] Run `npm run validate:questions` and fix every reported file until 250+ pass with weights within tolerance
- [X] T060 [P] [US4] Write `docs/how-to-extend.md` (copy template, naming/ids, folder placement, writing distractors and both explanations with PT "kid" checklist, validate, add topic, add category via `src/domain/categories.ts`)
- [X] T061 [P] [US4] Write `docs/how-to-run.md` (Docker dev/prod/test commands, ports, without Docker, npm scripts, troubleshooting)
- [X] T062 [P] [US4] Write `docs/kcna-domains.md` (domain → folder → LFS158/LFS250 chapter mapping) and `docs/README.md` index
- [X] T063 [US4] Write root `README.md` (overview, quick start, links to docs and spec)

---

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T064 [P] Responsive pass: verify phone-width layout for setup, quiz, results, history; fix wrapping of long options
- [X] T065 [P] Accessibility pass: option buttons keyboard-navigable, badges have text, timer has `aria-live`
- [X] T066 Run `npm run typecheck && npm run lint && npm run test:run`, `docker compose up --build prod` deep-link check, `docker compose run --rm test`
- [X] T067 Final review of tasks against spec FR-001…FR-020; mark all tasks `[X]`

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 → (Phase 3 → Phase 4 → Phase 5) → Phase 6 → Phase 7.
- US2 depends on US1 (needs finished sessions). US3 depends on US1 (extends QuestionCard and
  ResultsPage). US4 content (T050–T058) depends only on Phase 2 and can be authored in parallel
  with Phases 3–5.
- Within a story: tests → domain → hooks → components → pages → verification.

## Parallel Example: User Story 1

```
# Tests together:
T015 selectQuestions.test.ts | T016 scoring.test.ts | T017 useQuizSession.test.ts | T018 QuestionCard.test.tsx | T019 SetupForm.test.tsx
# Then domain together:
T020 selectQuestions.ts | T021 scoring.ts
# Then components together:
T023 ExplanationPanel + QuizProgress | T026 ResultsSummary + BreakdownTable
```

## Implementation Strategy

1. **MVP** = Phases 1–3 (practice mode with seed questions).
2. Add history/focus (Phase 4), then exam mode (Phase 5).
3. Content authoring (Phase 6) runs in topic batches with validation after each batch.
4. Polish and final verification (Phase 7).
