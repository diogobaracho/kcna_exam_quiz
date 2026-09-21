# Research: KCNA Exam Quiz

All Technical Context items were resolvable from the user's stated constraints and the
environment; no NEEDS CLARIFICATION remained. Decisions below record the rationale.

## R1. How to load Markdown question files into the app

- **Decision**: `import.meta.glob('/data/questions/**/*.md', { query: '?raw', import: 'default', eager: true })`
  in `src/domain/questionBank.ts`, parsed at startup by a custom parser.
- **Rationale**: Zero extra dependencies, works identically in Vite dev, Vite build and Vitest
  (which uses Vite's transform pipeline). The file path is available as the glob key, which lets
  the loader verify that frontmatter `category`/`topic` match the folder. HMR works when a file
  is edited. 250 small files parse in a few milliseconds.
- **Alternatives considered**: A pre-build script generating `questions.json` (extra step to
  forget, no HMR); `vite-plugin-md` or `remark` (heavier, and the format is deliberately tiny).

## R2. Markdown format and parser

- **Decision**: YAML-like frontmatter (flat `key: value`, `tags: [a, b]`) + `# Question` +
  `## Options` (task-list items, `[x]` marks the correct one) + `## Explanation` +
  `## Explicação para criança`. Hand-written parser (~120 lines), heading matching is
  case- and accent-insensitive.
- **Rationale**: Readable and editable by non-developers; no YAML/Markdown libraries needed; the
  parser can emit precise error messages (file, section, problem) for the validation command.
- **Alternatives considered**: `gray-matter` + `marked` (adds two deps for a fixed format);
  JSON/YAML per question (user chose Markdown).

## R3. Question selection and distribution

- **Decision**: Seeded PRNG (mulberry32) for reproducible tests. When every selected category is
  included and distribution is "weighted", allocate counts by the official weights using
  largest-remainder rounding, then fill shortfalls from other categories. "Uniform" splits
  evenly. Options are shuffled per question with the same PRNG; the correct index is tracked.
- **Rationale**: Mirrors the real exam mix; deterministic tests; avoids positional answer bias.
- **Alternatives considered**: `Math.random` only (untestable); no weighting (less realistic).

## R4. Persistence

- **Decision**: `localStorage` keys `kcna-quiz:attempts:v1` and `kcna-quiz:settings:v1`; a
  versioned envelope `{ version: 1, attempts: [...] }`; every read/write in try/catch; a
  schema-version mismatch or parse error yields an empty list and a non-fatal warning flag.
- **Rationale**: Simplest durable browser storage; data volume is tiny (a few KB per attempt).
- **Alternatives considered**: IndexedDB (more code for no benefit at this scale).

## R5. Toolchain versions for Node 18

- **Decision**: Vite 5.4, Vitest 1.6, @vitejs/plugin-react 4, TypeScript 5.5, ESLint 8 with
  typescript-eslint 7, jsdom 24. Docker image `node:20-alpine`.
- **Rationale**: Vite 6/7 and Vitest 2/3 raise the Node floor; the user's machine has Node 18.19.
- **Alternatives considered**: Requiring Node 20 locally (would force the user to upgrade).

## R6. Timer behaviour

- **Decision**: `useTimer(totalSeconds, onExpire)` based on `setInterval` at 1 s and wall-clock
  deltas (`Date.now()`), so tab throttling does not drift the countdown. Exam mode: 90 s per
  question. Practice: optional, same rule.
- **Rationale**: Wall-clock deltas remain correct when background tabs throttle intervals.

## R7. Routing and production serving

- **Decision**: `react-router-dom` with `BrowserRouter`; nginx config with
  `try_files $uri /index.html` so deep links work in the prod container. Quiz state is held in
  React state at the `App` level (not in the URL) and a direct visit to `/quiz` without a session
  redirects home.
- **Alternatives considered**: `HashRouter` (ugly URLs; unnecessary once nginx has the fallback).

## R8. Content sourcing

- **Decision**: Questions are authored from the public KCNA curriculum (v1.x domains and
  competencies) and the outlines of LFS158 (Introduction to Kubernetes) and LFS250 (Introduction
  to Cloud Native). Each file records a free-text `source` hint (e.g. `LFS158 ch.5`) to help
  contributors find the study material. No course text is reproduced.
- **Rationale**: Keeps the bank vendor-neutral and legally clean while remaining aligned to the
  reference courses the user named.
