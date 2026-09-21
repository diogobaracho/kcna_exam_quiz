# Contract: Question File Format

This is the interface between content authors and the app. Any file that satisfies this contract
is accepted by `parseQuestion` and the bank validator; any file that violates it is rejected with
the listed error.

## Location and naming

- Path: `data/questions/<category>/<topic>/<NNN>-<slug>.md`
- `<category>` must be a category id from the manifest; `<topic>` is any `[a-z0-9-]+` folder.
- `<NNN>` is a zero-padded ordinal unique within the topic; `<slug>` is short kebab-case.
- ID inside the file: `<category-prefix>-<topic-prefix>-<NNN>`; prefixes are documented in
  `docs/question-format.md`. Uniqueness is enforced across the whole bank, not the naming pattern.

## Grammar

```
file        := frontmatter NL question NL options NL explanation NL explanationPt
frontmatter := "---" NL (key ":" value NL)+ "---"
question    := "# Question" NL text
options     := "## Options" NL ("- [" (" "|"x"|"X") "] " text NL){3,5}
explanation := "## Explanation" NL text
explanationPt := "## Explicação para criança" NL text     # accent/case-insensitive match
```

- `text` is free Markdown-ish plain text; inline code with backticks is allowed and rendered
  monospaced. Blank lines inside a section are preserved as paragraph breaks.
- Frontmatter keys: `id` (required), `category` (required), `topic` (required),
  `difficulty` (`easy|medium|hard`, default `medium`), `tags` (`[a, b, c]` or omitted),
  `source` (free text, optional). Unknown keys are ignored.
- Section order is fixed as above. Headings are matched trimmed, case-insensitively, with accents
  stripped (`Explicacao para crianca` is accepted).

## Errors (message templates)

| Code | Message |
|---|---|
| E_FRONTMATTER | `missing or unterminated frontmatter` |
| E_FIELD | `frontmatter field "<key>" is required` |
| E_FIELD_FORMAT | `frontmatter field "<key>" has invalid value "<v>"` |
| E_SECTION | `missing section "<heading>"` |
| E_EMPTY | `section "<heading>" is empty` |
| E_OPTIONS_COUNT | `expected 3-5 options, found <n>` |
| E_OPTIONS_CORRECT | `expected exactly 1 correct option, found <n>` |
| E_PATH_CATEGORY | `category "<v>" does not match folder "<folder>"` |
| E_PATH_TOPIC | `topic "<v>" does not match folder "<folder>"` |
| E_CATEGORY_UNKNOWN | `category "<v>" is not declared in src/domain/categories.ts` |
| E_DUPLICATE_ID | `duplicate id "<id>" also used by <other file>` (bank-level) |

Every error is reported as `<filePath>: <message>`.

## Example

```markdown
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

etcd is the consistent, distributed key-value store that holds all cluster state. The API server
is the only component that reads and writes it.

## Explicação para criança

O etcd é como o caderno onde o Kubernetes anota tudo o que existe no cluster. Quando alguém quer
saber o que está acontecendo, o "chefe" (API server) olha no caderno.
```
