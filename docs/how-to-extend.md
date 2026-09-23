# How to extend the question bank

Adding content never requires touching application code. This guide covers the three levels of
extension, from smallest to largest: a new question, a new topic, and a new domain (category).

See [question-format.md](./question-format.md) for the full file format spec.

## Add a single question (most common)

1. **Find or create the topic folder.** Look under `data/questions/<category>/` for an existing
   topic close to your question (e.g. `data/questions/kubernetes-fundamentals/workloads/`). If
   none fits, see "Add a new topic" below — it's just a folder, no extra step.
2. **Copy an existing file** in that folder as a starting template, so you inherit the right
   frontmatter shape and section order. Rename it: bump the ordinal and use a descriptive slug,
   e.g. `013-configmap-vs-secret.md`.
3. **Edit the frontmatter**: give it a **unique** `id` following the `<prefix>-<topic>-<NNN>`
   convention already used in that folder (open a sibling file to see the pattern, e.g.
   `kf-wl-012`). Keep `category` and `topic` exactly equal to the two folder names in the path.
   Set `difficulty` (`easy`/`medium`/`hard`) and, optionally, `tags` and a `source` hint like
   `LFS158 ch.6` or `LFS250 module 4`.
4. **Write the question** under `# Question`: one clear stem, no compound questions.
5. **Write 3 to 5 options** under `## Options`, marking exactly one `- [x]`. Distractors should
   be plausible — things a learner might genuinely believe, not obviously silly. Avoid "all of
   the above" / "none of the above".
6. **Write the English explanation** under `## Explanation`: 1–3 sentences on *why* the correct
   answer is correct (and, if it helps, why the closest wrong option is wrong).
7. **Write the Portuguese explanation** under `## Explicação para criança`. This is the part
   that makes the app worth using — use a concrete, everyday analogy, no technical jargon, at
   most 3 sentences. A quick self-check: *would a 10-year-old who has never heard of Kubernetes
   get the idea?* A few examples from the existing bank:
   - etcd → "o caderno onde o Kubernetes anota tudo"
   - kubelet → "o cuidador de cada máquina"
   - CRI → "a língua combinada para pedir 'ligue esse contêiner'"
8. **Validate**:
   ```bash
   npm run validate:questions
   ```
   Fix anything it reports (see the error table in question-format.md) and re-run until clean.
9. **See it in the app**: `npm run dev` (or `docker compose up dev`), open the setup screen —
   your topic's count should have gone up by one. Start a session covering that topic to confirm
   your question appears with both explanations after confirming an answer.

That's it — no file under `src/` needs to change.

## Add a new topic inside an existing domain

A topic is nothing but a folder name. To add, say, a "helm-charts" topic under
`cloud-native-application-delivery`:

1. Create `data/questions/cloud-native-application-delivery/helm-charts/`.
2. Add question files there following the steps above, with `topic: helm-charts` in each
   file's frontmatter (matching the folder name exactly).
3. Run `npm run validate:questions`.

The new topic appears automatically in the setup screen's topic list for that domain, with its
question count, and can be selected or included in "all topics" sessions. No code change needed.

## Add a new domain (category)

This is the one case that needs a small code change, because domains have official exam weights
declared centrally. To add a domain:

1. Create the folder(s), e.g. `data/questions/my-new-domain/some-topic/`, with valid question
   files (`category: my-new-domain`).
2. Open [`src/domain/categories.ts`](../src/domain/categories.ts) and add one entry to the
   `CATEGORIES` array:
   ```ts
   {
     id: 'my-new-domain',
     name: 'My New Domain',
     namePt: 'Meu Novo Domínio',
     weight: 10,       // percent; all weights across all categories must sum to 100
     order: 6,          // display order
     prefix: 'mnd',     // used as the question id prefix, e.g. mnd-topic-001
   }
   ```
3. Also add `'my-new-domain'` to the `CategoryId` union type in
   [`src/domain/types.ts`](../src/domain/types.ts).
4. Adjust the `weight` of the existing categories so the total is still 100 (the bank-validation
   test checks that each category's real share of the bank is within a few percentage points of
   its declared weight, so keep the numbers realistic once you've added enough questions).
5. Run `npm run validate:questions`, then `npm run typecheck`.

That's the entire process — one manifest entry plus one type union member, everything else
(setup screen, selection, scoring, focus suggestions) reads from that manifest automatically.

## How the weighted distribution uses these numbers

When a learner selects every domain and picks "Exam-weighted" distribution, the question count
for a session is split across domains proportionally to their `weight` values (using
largest-remainder rounding so the total always matches exactly, and capping at whatever is
actually available in a domain). This is implemented in `allocateCounts` in
[`src/domain/selectQuestions.ts`](../src/domain/selectQuestions.ts) and covered by
`tests/domain/selectQuestions.test.ts`. You don't need to touch this file when adding content —
it already reads the weights from the manifest.

## Checking the bank in bulk

Two commands are useful while authoring a batch of questions:

```bash
npm run validate:questions   # fast: only the bank-loading/validation test
npm run test:run             # full suite, including the bank test plus everything else
```

The validation test also prints, on success, the total question count and the percentage share
of each domain — useful to see whether you're keeping the mix close to the official KCNA weights
as you add content in batches.
