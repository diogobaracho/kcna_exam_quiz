---
id: kf-api-008
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: hard
tags: [labels, selectors]
source: LFS158 ch.7
---

# Question

Which selector expression is an example of a set-based selector, as opposed to an equality-based one?

## Options

- [x] environment in (production, staging)
- [ ] environment = production
- [ ] environment != production
- [ ] environment: production

## Explanation

Set-based selectors support operators like `in`, `notin`, and `exists`, letting a query match against a set of possible values in one expression, while equality-based selectors only support `=`, `==`, and `!=` against a single value.

## Explicação para criança

É como dizer 'aceito quem for da turma A ou da turma B' de uma vez só, em vez de comparar aluno por aluno com um nome específico.

