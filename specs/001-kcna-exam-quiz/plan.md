# Implementation Plan: KCNA Exam Quiz

**Branch**: `001-kcna-exam-quiz` | **Date**: 2026-09-21 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-kcna-exam-quiz/spec.md`

## Summary

A fully client-side React single-page app that simulates the KCNA exam. Questions live as
Markdown files (one per question) under `data/questions/<category>/<topic>/`, are bundled at build
time with Vite's `import.meta.glob` and parsed by a small custom parser. Two modes (Practice with
immediate bilingual feedback, Exam with timer and end-of-session review), local attempt history in
`localStorage`, and focus suggestions computed from that history. Shipped with ~250 questions,
Vitest unit/behaviour tests, Docker dev/prod services and contributor docs.

## Technical Context

**Language/Version**: TypeScript 5.5 on Node 18+ (local) / Node 20 (Docker image)

**Primary Dependencies**: React 18, react-router-dom 6, react-bootstrap 2 + Bootstrap 5, Vite 5

**Storage**: Browser `localStorage` (attempts + last setup); question bank is static Markdown bundled into the build

**Testing**: Vitest 1.x, @testing-library/react + user-event, jsdom; a bank-validation test that loads every question file

**Target Platform**: Evergreen desktop and mobile browsers; served by Vite dev server (dev) or nginx (prod) in Docker

**Project Type**: Single-page web application (frontend only)

**Performance Goals**: First question reachable in < 30 s / ≤ 4 interactions; bank parse (250 files) at startup < 100 ms; test suite < 2 min

**Constraints**: Offline after load, no backend, no runtime network calls; Node 18 compatible toolchain; phone-width layout

**Scale/Scope**: 250–1000 questions, 4 pages (setup, quiz, results, history), single user per browser

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | How the design complies |
|---|---|
| I. Content Is Data, Not Code | Questions are Markdown files discovered by glob; topics = folders; categories = folder + one entry in `src/domain/categories.ts`. No question text in source. ✅ |
| II. Every Question Teaches Twice | Parser requires both `## Explanation` and `## Explicação para criança`; `ExplanationPanel` renders both on every reveal (practice: after confirm; exam: in results review). ✅ |
| III. Validated Bank | `tests/domain/questionBank.test.ts` loads every file via the same loader the app uses and asserts all rules; wired as `npm run validate:questions` and part of `npm run test:run`. ✅ |
| IV. Local-First and Offline | No fetch calls; bank bundled; `attemptsStore` wraps `localStorage` in try/catch, validates schema version, falls back to empty. ✅ |
| V. Test What Matters, Keep It Simple | `src/domain/*` and `src/storage/*` are pure TS with unit tests; component tests cover confirm-reveal, exam-hides-feedback, results, history. Dependencies limited to React, router, bootstrap. ✅ |

**Post-design re-check (after Phase 1)**: no violations; no Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-kcna-exam-quiz/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── question-file-format.md
│   └── local-storage-schema.md
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
data/questions/                      # question bank (Markdown, one file per question)
├── kubernetes-fundamentals/{architecture,api-and-objects,workloads,containers-and-images,scheduling}/
├── container-orchestration/{orchestration-fundamentals,runtime,security,networking,service-mesh,storage}/
├── cloud-native-architecture/{fundamentals,autoscaling,serverless,community-and-governance,roles-and-personas,open-standards}/
├── cloud-native-observability/{telemetry-fundamentals,prometheus-and-tooling,cost-management}/
└── cloud-native-application-delivery/{delivery-fundamentals,gitops,ci-cd-tooling}/

docs/
├── README.md            # index
├── how-to-run.md
├── how-to-extend.md
├── question-format.md
└── kcna-domains.md

src/
├── main.tsx, App.tsx, routes
├── domain/              # pure logic, framework-free
│   ├── types.ts, categories.ts, random.ts
│   ├── parseQuestion.ts, questionBank.ts
│   ├── selectQuestions.ts, scoring.ts, focus.ts
├── storage/attemptsStore.ts, settingsStore.ts
├── hooks/useQuizSession.ts, useTimer.ts, useAttempts.ts
├── components/
│   ├── layout/AppNavbar.tsx
│   ├── setup/SetupForm.tsx
│   ├── quiz/QuestionCard.tsx, ExplanationPanel.tsx, QuizProgress.tsx, QuestionNavigator.tsx, TimerBadge.tsx
│   ├── results/ResultsSummary.tsx, BreakdownTable.tsx, ReviewList.tsx
│   └── history/AttemptsTable.tsx, FocusSuggestions.tsx
└── pages/HomePage.tsx, QuizPage.tsx, ResultsPage.tsx, HistoryPage.tsx

tests/
├── setup.ts
├── domain/*.test.ts     # parser, bank, selection, scoring, focus, random
├── storage/*.test.ts
├── hooks/*.test.ts
└── components/*.test.tsx

Dockerfile, docker-compose.yml, docker/nginx.conf
vite.config.ts (includes vitest config), tsconfig.json, tsconfig.node.json, .eslintrc.cjs
package.json, .gitignore, .dockerignore, .editorconfig, README.md
```

**Structure Decision**: Single frontend project at the repository root. `src/domain` and
`src/storage` contain no React imports so they can be unit-tested in plain Node. Question
content is deliberately outside `src/` (`data/`) to make Principle I visible in the tree.

## Complexity Tracking

No constitution violations; table intentionally empty.
