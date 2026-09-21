# Feature Specification: KCNA Exam Quiz

**Feature Branch**: `001-kcna-exam-quiz`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "KCNA exam quiz: a web app simulating the exam with features like choosing the number of questions and categories. Keep the attempts locally, storing the score and points to focus on as suggestions. Instead of answering everything to get the result, after confirmation show whether it is right or wrong, and always show a small explanation in English and another in Portuguese in simple terms like to a kid. All questions, answers and explanations as local files, organized by category folders. Docs on how to run and how to extend with more questions. Reference: Linux Foundation courses LFS158 and LFS250. Must have unit tests."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Practice a custom quiz with instant feedback (Priority: P1)

A learner preparing for the KCNA exam opens the app, chooses how many questions they want and
which KCNA domains to include, and starts a practice session. For each question they pick one
answer and confirm it. The app immediately tells them whether they were right, highlights the
correct answer, and shows two short explanations: a technical one in English and a very simple,
analogy-based one in Portuguese. They move on to the next question until the session ends and
see their score.

**Why this priority**: This is the core study loop and the reason the app exists. On its own it
already delivers value: a learner can drill any domain and learn from every answer.

**Independent Test**: Start a 10-question practice session limited to one domain, answer each
question, and verify that every confirmation reveals correctness plus both explanations, and that
a final score is shown.

**Acceptance Scenarios**:

1. **Given** the setup screen, **When** the learner selects 10 questions and the "Kubernetes
   Fundamentals" domain and starts, **Then** exactly 10 questions from that domain are presented,
   one at a time.
2. **Given** a question is displayed, **When** the learner selects an option and confirms,
   **Then** the app marks the answer right or wrong, highlights the correct option, and shows the
   English and the Portuguese explanations before allowing the next question.
3. **Given** an answer has been confirmed, **When** the learner tries to change it, **Then** the
   choice is locked and cannot be altered.
4. **Given** the last question has been confirmed, **When** the learner proceeds, **Then** a
   results summary shows the score as a percentage and the count of correct answers.
5. **Given** the setup screen, **When** the learner requests more questions than are available
   for the selected domains, **Then** the requested count is capped to the available number and
   the learner is told.

---

### User Story 2 - Track progress locally and get focus suggestions (Priority: P2)

After finishing sessions, the learner wants to see how they have been doing and where to spend
their study time. The app keeps every finished attempt on the learner's own device, shows a
history with scores, and suggests the domains and topics with the weakest results. The learner
can start a new session pre-configured to target those weak areas.

**Why this priority**: Turns a quiz into a study plan. Depends on sessions existing (Story 1)
but is otherwise independent.

**Independent Test**: Complete two sessions with different results, reload the page, and verify
both appear in the history with correct scores and that the suggestions list the domains/topics
where accuracy was lowest.

**Acceptance Scenarios**:

1. **Given** a finished session, **When** the learner opens the history, **Then** the attempt is
   listed with date, mode, number of questions, score and pass/fail status.
2. **Given** at least one attempt is stored, **When** the page is reloaded or the browser is
   reopened, **Then** the history is still present.
3. **Given** the learner answered at least three questions in a topic with accuracy below the
   pass threshold, **When** they open the history, **Then** that topic appears in the focus
   suggestions, ordered from weakest to strongest.
4. **Given** focus suggestions exist, **When** the learner chooses "Focus on my weak areas",
   **Then** the setup screen is pre-filled with the suggested domains/topics.
5. **Given** stored data that is unreadable or from an older format, **When** the app starts,
   **Then** it shows an empty history without crashing.
6. **Given** the history view, **When** the learner deletes one attempt or clears all,
   **Then** the corresponding data disappears and stays gone after reload.

---

### User Story 3 - Simulate the real exam (Priority: P3)

The learner wants to rehearse exam conditions: a full set of questions weighted like the real
exam, a countdown timer, the ability to move back and forth and flag questions, and no feedback
until they finish. At the end they get the score, pass/fail against the real pass mark, a
breakdown by domain, and a review of every question with both explanations.

**Why this priority**: Valuable for final preparation but not needed to start learning.

**Independent Test**: Start a 60-question exam-mode session with all domains, confirm no
correctness feedback appears while answering, finish, and verify the results page shows the
score, pass/fail, domain breakdown and per-question review with both explanations.

**Acceptance Scenarios**:

1. **Given** exam mode with 60 questions, **When** the session starts, **Then** a 90-minute
   countdown is visible and the question mix follows the official domain weights.
2. **Given** a question in exam mode, **When** the learner selects an option, **Then** no
   indication of correctness is shown and they can navigate to any other question and change
   answers.
3. **Given** the timer reaches zero, **When** questions remain unanswered, **Then** the session
   ends automatically and unanswered questions count as incorrect.
4. **Given** the learner finishes, **When** the results are shown, **Then** they include the
   score, PASS or FAIL against a 75% threshold, correct/total per domain and per topic, and a
   list of every question showing the chosen and correct answers with both explanations.
5. **Given** the results page, **When** the learner chooses "retry wrong ones", **Then** a new
   practice session starts containing only the questions they missed.

---

### User Story 4 - Extend the question bank without coding (Priority: P4)

A contributor wants to add new questions. They copy an existing question file, edit its text,
options and explanations, drop it into the right domain/topic folder, run one validation
command, and the question appears in the app. Documentation explains the file format, folder
rules and how to add a new topic or domain.

**Why this priority**: Long-term value of the bank depends on easy extension, but the initial
bank is shipped complete.

**Independent Test**: Add a new question file following the documented format, run the
validation, start the app and verify the question can appear in a session for its topic.

**Acceptance Scenarios**:

1. **Given** a correctly formatted question file placed in an existing topic folder, **When**
   validation runs, **Then** it passes and the question is available in the app.
2. **Given** a question file with zero or two correct options, or missing one of the two
   explanations, **When** validation runs, **Then** it fails and names the file and the problem.
3. **Given** a new topic folder inside an existing domain, **When** it contains valid question
   files, **Then** the topic is selectable in the setup screen without any other change.

---

### Edge Cases

- Fewer questions available than requested (after filtering by domain/topic): cap and inform.
- Learner selects zero domains: start is disabled with a hint.
- Learner leaves a session midway (quit or navigation): nothing is stored; a confirmation is asked.
- Timer expires while a confirmation dialog is open: the session still ends.
- Two question files share the same identifier: validation fails.
- Local storage is unavailable (private mode, quota exceeded): the session still works, history
  shows a warning that it could not be saved.
- Very long option text or explanations: layout wraps and stays readable on a phone-width screen.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The learner MUST be able to choose the number of questions (presets 10, 20, 40,
  60 and a custom value) before starting a session.
- **FR-002**: The learner MUST be able to choose one or more KCNA domains, and optionally topics
  within them, before starting a session; the available question count per selection MUST be
  visible.
- **FR-003**: The learner MUST be able to choose between Practice mode (feedback after each
  confirmation) and Exam mode (feedback only at the end).
- **FR-004**: In Practice mode, after confirming an answer the app MUST show whether it is
  correct, highlight the correct option, and display the English explanation and the simple
  Portuguese explanation; the answer MUST then be locked.
- **FR-005**: In Exam mode the app MUST show a countdown (1.5 minutes per question, 90 minutes
  for 60), allow forward/backward navigation and flagging, and end the session when the timer
  expires or the learner finishes.
- **FR-006**: Every question MUST have exactly one correct option among 3 to 5 options, and the
  options MUST be presented in a shuffled order each session.
- **FR-007**: When all selected domains are included, the question mix MUST follow the official
  KCNA weights (46/22/16/8/8); otherwise the learner may choose weighted or uniform distribution.
- **FR-008**: At the end of any session the app MUST show the score percentage, correct/total,
  PASS or FAIL against a 75% threshold, a breakdown per domain and per topic, and a review of
  each question with chosen answer, correct answer and both explanations, filterable to wrong
  answers only.
- **FR-009**: The app MUST persist every finished session on the learner's device, including
  date, mode, selection, score, per-domain/topic results and the individual answers.
- **FR-010**: The app MUST show an attempt history and MUST let the learner delete a single
  attempt or clear all attempts.
- **FR-011**: The app MUST compute focus suggestions from stored attempts: topics and domains
  with accuracy below 75% having at least 3 answered questions, ordered weakest first, plus the
  questions missed two or more times; with insufficient data it MUST say so.
- **FR-012**: The learner MUST be able to start a session pre-configured from the focus
  suggestions and to retry only the questions missed in the last session.
- **FR-013**: Every question, with its options and both explanations, MUST be stored as an
  individual plain-text (Markdown) file inside a folder structure organized by domain and topic;
  no question content MAY live in application code.
- **FR-014**: The app MUST ship with an initial bank of approximately 250 questions distributed
  according to the KCNA weights and covering the KCNA curriculum as taught in LFS158 and LFS250.
- **FR-015**: A single validation command MUST check the entire bank (file format, unique
  identifiers, folder/metadata consistency, exactly one correct option, both explanations
  present) and report each failing file with its reason.
- **FR-016**: Adding a question or a topic MUST require no application code changes; adding a
  domain MUST require at most one manifest entry.
- **FR-017**: The project MUST include documentation covering how to run it (with and without
  containers) and how to extend it with new questions, topics and domains.
- **FR-018**: The project MUST include automated unit tests for the question parsing,
  selection, scoring, focus-suggestion and persistence logic, plus behaviour tests for the
  learner-critical screens.
- **FR-019**: The app MUST run fully offline in a browser once loaded, with no external service
  calls.
- **FR-020**: The app MUST be runnable with a single container command for development (with
  live reload) and another for a production-style build.

### Key Entities

- **Domain (Category)**: One of the five KCNA domains; has an identifier, display name, official
  exam weight and ordering. Contains Topics.
- **Topic**: A sub-area inside a Domain (for example "scheduling"); identified by its folder
  name. Contains Questions.
- **Question**: Identifier, domain, topic, difficulty, tags, source reference, question text,
  3–5 options with exactly one correct, English explanation, simple Portuguese explanation.
- **Session**: A configured run (mode, question count, selected domains/topics, distribution,
  timer) holding the ordered questions with per-session shuffled options and the learner's
  answers.
- **Attempt**: A finished Session persisted locally: timestamps, mode, selection, totals, score,
  pass/fail, per-domain and per-topic tallies and each answer given.
- **Focus Suggestion**: Derived from Attempts: weak domains/topics with their accuracy and sample
  size, and most-missed questions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A learner can go from opening the app to answering the first question of a
  custom practice session in under 30 seconds and at most 4 interactions.
- **SC-002**: 100% of confirmed answers in Practice mode display correctness plus both
  explanations without any extra click.
- **SC-003**: 100% of shipped question files pass the validation command; the bank contains at
  least 250 questions with the per-domain share within ±3 percentage points of the official
  KCNA weights.
- **SC-004**: After finishing a session and reloading the page, the attempt is visible in the
  history 100% of the time when local storage is available.
- **SC-005**: A contributor following only the documentation can add a new question and see it
  in the app in under 10 minutes without editing application code.
- **SC-006**: The automated test suite runs in under 2 minutes and covers parsing, selection,
  scoring, focus suggestions, persistence and the practice/exam feedback behaviours.
- **SC-007**: The app is usable at phone width (no horizontal scrolling) and desktop width.

## Assumptions

- Single learner per browser profile; no accounts, no sync between devices.
- The KCNA pass mark used for PASS/FAIL is 75%, and the real exam has 60 questions in 90 minutes.
- All questions are single-choice; multi-select questions are out of scope for v1.
- UI language is English; only explanations are bilingual (English + Brazilian Portuguese).
- Question content is authored from public KCNA curriculum knowledge and the LFS158/LFS250
  syllabi; no course material is copied verbatim.
- History retention is unlimited until the learner clears it; storage size stays small (a few
  hundred attempts) so no pruning is needed.
- Modern evergreen browsers (last two major versions) are the target.
