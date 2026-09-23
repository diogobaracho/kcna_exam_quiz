---
id: kf-sched-006
category: kubernetes-fundamentals
topic: scheduling
difficulty: easy
tags: [node-affinity]
source: LFS158 ch.10
---

# Question

What does node affinity let you express?

## Options

- [x] Rules that attract Pods toward nodes matching certain labels, with 'required' or 'preferred' strength
- [ ] A guarantee that two Pods never share a node
- [ ] The exact CPU model a container needs
- [ ] A way to prevent any Pod from being evicted

## Explanation

Node affinity uses label selectors on nodes with `requiredDuringSchedulingIgnoredDuringExecution` (a hard rule) or `preferredDuringSchedulingIgnoredDuringExecution` (a soft preference) to influence which nodes a Pod can land on.

## Explicação para criança

É como pedir para sentar perto da janela: pode ser uma exigência (obrigatório) ou só uma preferência (se der, ótimo, se não, tudo bem).

