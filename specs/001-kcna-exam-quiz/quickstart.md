# Quickstart: validating the KCNA Exam Quiz end-to-end

## Prerequisites

- Docker 24+ with Compose v2, **or** Node 18+ and npm 9+.

## 1. Automated checks

```bash
npm ci
npm run typecheck      # expect: no output, exit 0
npm run lint           # expect: no warnings
npm run test:run       # expect: all suites green, incl. "question bank" with 250 files
npm run validate:questions   # bank-only check used by contributors
```

Expected: the bank test prints the total question count and per-category counts and passes.

## 2. Dev container

```bash
docker compose up dev
```

Open http://localhost:5173. Edit any file under `data/questions/`, save, and the page reloads.

## 3. Prod container

```bash
docker compose up --build prod
```

Open http://localhost:8080, navigate to History, press reload: the page must render (no 404).

## 4. Manual scenarios (map to spec user stories)

| # | Story | Steps | Expected |
|---|---|---|---|
| 1 | US1 | Home → Practice, 10 questions, only "Kubernetes Fundamentals" → Start | 10 questions, progress "1 / 10" |
| 2 | US1 | Pick an option → Confirm | Right/wrong badge, correct option highlighted, EN and PT explanation boxes shown, options disabled |
| 3 | US1 | Finish all 10 | Results with score %, correct/total, per-domain table |
| 4 | US2 | Open History | The attempt is listed; reload keeps it |
| 5 | US2 | Do a second session scoring poorly in one topic (≥3 questions) | History shows that topic in Focus suggestions; "Focus on my weak areas" pre-fills Home |
| 6 | US3 | Home → Exam, 60 questions, all domains → Start | 90:00 countdown, navigator grid, no feedback after selecting |
| 7 | US3 | Finish | PASS/FAIL, breakdown, review list with both explanations; "Wrong only" filter works |
| 8 | US3 | Results → Retry wrong ones | New practice session containing only the missed questions |
| 9 | US4 | Copy a question file, change id/text, run `npm run validate:questions` | Passes; new count is 251 |
| 10 | US4 | Set two options to `[x]` in that file, run validation | Fails naming the file and "expected exactly 1 correct option, found 2" |

## 5. Container test run

```bash
docker compose run --rm test
```

Expected: same green result as step 1.
