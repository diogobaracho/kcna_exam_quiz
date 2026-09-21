<!--
Sync Impact Report
- Version change: (none) → 1.0.0 (initial ratification)
- Modified principles: n/a (initial document)
- Added sections: Core Principles (I–V), Technology & Content Constraints, Development Workflow & Quality Gates, Governance
- Removed sections: none
- Templates requiring updates: none (plan/spec/tasks templates read this file at runtime)
- Follow-up TODOs: none
-->

# KCNA Exam Quiz Constitution

## Core Principles

### I. Content Is Data, Not Code

Every question, its options, and both explanations MUST live as a plain Markdown file under
`data/questions/<category>/<topic>/`, one file per question. The application MUST discover
questions from the folder structure; adding a question MUST never require touching application
source code. Adding a topic MUST only require a new folder. Adding a category MUST require at most
a folder plus one manifest entry. Rationale: the bank is the product and non-developers must be
able to grow it.

### II. Every Question Teaches Twice

Each question MUST carry a concise technical explanation in English and a simple, analogy-based
explanation in Portuguese ("como para uma criança"). Both MUST be shown whenever an answer is
revealed, whether immediately (practice) or at the end (exam). A question file missing either
explanation MUST fail validation and MUST NOT ship. Rationale: the app is a study tool first and
a test second.

### III. Validated Bank (NON-NEGOTIABLE)

The complete question bank MUST be validated by an automated test on every run of the test suite:
every file parses, IDs are unique, frontmatter matches the folder path, exactly one option is
correct, options are within 3–5, and both explanations are non-empty. A red bank test blocks
merging. Rationale: a single malformed file must never break the app for a learner.

### IV. Local-First and Offline

The app MUST run entirely in the browser with no backend and no network calls at runtime. Attempt
history, scores and focus suggestions MUST be stored locally in the browser and MUST survive a
page reload. Corrupt or missing local data MUST degrade to an empty history, never to a crash.
Rationale: privacy, zero cost, works on a plane.

### V. Test What Matters, Keep It Simple

Pure domain logic (parsing, selection, scoring, focus suggestions, storage) MUST be framework-free
and unit-tested. UI components MUST have behaviour tests for the learner-critical flows (confirm
reveals feedback, exam mode hides feedback, results and history render). No feature MAY add a
library, abstraction or configuration that is not required by a stated requirement (YAGNI).
Rationale: keep the codebase small enough for a solo maintainer to extend.

## Technology & Content Constraints

- Stack: React with react-bootstrap for UI, Vite for build, Vitest + Testing Library for tests,
  Docker + docker-compose for running (a dev service with hot reload and a prod service serving
  the static build).
- Content: questions follow the KCNA curriculum and its five domains with official weights
  (Kubernetes Fundamentals 46%, Container Orchestration 22%, Cloud Native Architecture 16%,
  Cloud Native Observability 8%, Cloud Native Application Delivery 8%). Reference material is the
  Linux Foundation courses LFS158 and LFS250. Content MUST be vendor-neutral and factually
  current for the KCNA exam.
- Language: UI text is English; only explanations are bilingual (EN + PT-BR simple language).
- Node 18 or newer MUST be supported for local (non-Docker) development.

## Development Workflow & Quality Gates

- Work follows Spec Kit: constitution → spec → plan → tasks → implement. Specs live under
  `specs/<NNN-feature>/`.
- Before a task is marked complete: `npm run typecheck`, `npm run lint` and `npm run test:run`
  MUST pass locally.
- Question content is added in batches per topic folder and validated with
  `npm run validate:questions` after each batch.
- Documentation under `docs/` (how to run, how to extend, question format) MUST be updated in the
  same change that alters the behaviour it describes.
- Commits are made only when the user asks; commit messages are conventional
  (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).

## Governance

This constitution supersedes ad-hoc practices for this repository. Amendments MUST be made by
editing this file with an updated Sync Impact Report, a semantic version bump (MAJOR for removed
or redefined principles, MINOR for new principles or materially expanded guidance, PATCH for
clarifications) and updated dates. Every plan MUST include a Constitution Check that lists each
principle and states how the design complies; unjustified violations block the plan. Reviews of
tasks and pull requests MUST verify compliance with Principles I–V.

**Version**: 1.0.0 | **Ratified**: 2026-09-21 | **Last Amended**: 2026-09-21
