---
id: kf-api-009
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [annotations]
source: LFS158 ch.7
---

# Question

How do annotations differ from labels?

## Options

- [x] Annotations store non-identifying metadata (like build info or a description) and are not used for selecting objects
- [ ] Annotations can only hold numeric values, labels only hold strings
- [ ] Annotations are required on every object, labels are optional
- [ ] There is no real difference; the terms are interchangeable

## Explanation

Both are key-value maps attached to objects, but annotations are meant for arbitrary, often larger, non-identifying data (changelog entries, tool configuration, contact info) and are never used by selectors, unlike labels.

## Explicação para criança

Se a label é a etiqueta na caixa dizendo 'cozinha', a anotação é o bilhete dentro da caixa com detalhes extras que ninguém usa para organizar, só para lembrar de algo.

