# Question file format

This is the exact contract the app relies on to load a question. It is also enforced
automatically: any file that violates it is reported by `npm run validate:questions` with the
file path and the specific problem, and it will not be shown in the app.

The authoritative version of this document (used during design) also lives at
[`specs/001-kcna-exam-quiz/contracts/question-file-format.md`](../specs/001-kcna-exam-quiz/contracts/question-file-format.md);
this copy is the one to read when adding content.

## Where a question file lives

```text
data/questions/<category>/<topic>/<NNN>-<slug>.md
```

- `<category>` — one of the five KCNA domains, see the table below. Must be a real folder that
  matches an entry in [`src/domain/categories.ts`](../src/domain/categories.ts).
- `<topic>` — any sub-folder you like inside a category, e.g. `scheduling`. Creating a new folder
  automatically creates a new selectable topic in the app — see
  [how-to-extend.md](./how-to-extend.md).
- `<NNN>` — a zero-padded ordinal, unique within the topic folder (e.g. `001`, `002`, …). It's
  only for humans browsing the folder; the app does not read it.
- `<slug>` — a short, kebab-case hint of the question's content (e.g. `etcd-stores-cluster-state`).

## Categories and id prefixes

| Category folder | Display name | Weight | Id prefix |
|---|---|---|---|
| `kubernetes-fundamentals` | Kubernetes Fundamentals | 46% | `kf` |
| `container-orchestration` | Container Orchestration | 22% | `co` |
| `cloud-native-architecture` | Cloud Native Architecture | 16% | `cna` |
| `cloud-native-observability` | Cloud Native Observability | 8% | `cno` |
| `cloud-native-application-delivery` | Cloud Native Application Delivery | 8% | `cnad` |

Question ids follow `<category-prefix>-<topic-prefix>-<NNN>`, e.g. `kf-arch-001`,
`co-sec-012`, `cnad-gitops-003`. The topic prefix is a short abbreviation you choose per topic —
keep it consistent within a topic (check existing files in that folder first). **The only hard
rule is that the id must be unique across the entire bank**; the validator checks this.

## File contents

Every file has five parts, in this exact order:

````markdown
---
id: kf-arch-001
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [control-plane, etcd]
source: LFS158 ch.4
---

# Question

Which control plane component stores the entire cluster state?

## Options

- [ ] kube-scheduler
- [x] etcd
- [ ] kube-proxy
- [ ] kubelet

## Explanation

etcd is the consistent, distributed key-value store that holds all cluster state. The API
server is the only component that reads from and writes to it; every other component goes
through the API server.

## Explicação para criança

O etcd é como o caderno onde o Kubernetes anota tudo o que existe no cluster. Quando alguém
quer saber o que está acontecendo, o "chefe" (o API server) é o único que abre o caderno para
ler ou escrever.
````

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Lowercase letters, digits and hyphens only; unique across the whole bank |
| `category` | yes | Must equal the category folder the file is in |
| `topic` | yes | Must equal the topic folder the file is in |
| `difficulty` | no | `easy`, `medium`, or `hard`; defaults to `medium` |
| `tags` | no | `[tag-one, tag-two]`; free-form, used only for authoring/searchability today |
| `source` | no | Free text, e.g. `LFS158 ch.4` or `LFS250 module 3`; a hint for contributors, not shown in the UI |

### Sections

1. **`# Question`** — the question stem. Plain text; inline `` `code` `` and blank-line
   paragraphs are supported and rendered.
2. **`## Options`** — a Markdown task list with **3 to 5** items. Exactly **one** must be marked
   `[x]` (or `[X]`); all others `[ ]`. Options are shown to the learner in a shuffled order each
   session, so their order in the file doesn't matter.
3. **`## Explanation`** — the technical explanation, in English. Keep it to 1–3 sentences that
   say *why* the answer is correct (and, if useful, why a common wrong answer is tempting).
4. **`## Explicação para criança`** — the same idea, in simple Brazilian Portuguese, using an
   everyday analogy, as if explaining to a child. No jargon, at most 3 sentences. The heading is
   matched case- and accent-insensitively, so `Explicacao para crianca` also works, but the
   spelling above is preferred for consistency.

Headings must appear in this exact order and use exactly one or two `#`/`##` as shown. Anything
inside a fenced code block (` ``` `) is left untouched and does not count as a heading.

## Validation errors

Running `npm run validate:questions` parses every file and reports every problem it finds (not
just the first). Typical messages:

| Message | Cause |
|---|---|
| `missing or unterminated frontmatter` | No `---`/`---` block at the top of the file |
| `frontmatter field "id" is required` | Missing `id`, `category`, or `topic` |
| `category "<v>" is not declared in src/domain/categories.ts` | Typo in `category`, or it's a category that doesn't exist yet |
| `category "<v>" does not match folder "<folder>"` | The frontmatter `category` doesn't match the folder the file is actually in |
| `topic "<v>" does not match folder "<folder>"` | Same, for `topic` |
| `missing section "Options"` | A required heading is missing or misspelled |
| `section "Explicação para criança" is empty` | The heading exists but has no text under it |
| `expected 3-5 options, found <n>` | Too few or too many option lines |
| `expected exactly 1 correct option, found <n>` | Zero or more than one `[x]` |
| `duplicate id "<id>" also used by <other file>` | Two files share the same `id` |

Fix the named file and re-run the command; it's fast (well under a second for the whole bank).
