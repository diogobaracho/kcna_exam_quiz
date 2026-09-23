---
id: kf-api-007
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [labels, selectors]
source: LFS158 ch.7
---

# Question

A Service has the selector `app: payments, tier: backend`. Which Pods will it route traffic to?

## Options

- [x] Only Pods that have both labels app=payments AND tier=backend
- [ ] Any Pod that has either app=payments OR tier=backend
- [ ] All Pods in the same namespace regardless of labels
- [ ] Only the first Pod created with a matching label

## Explanation

A Service (and most controllers) uses equality-based selectors combined with a logical AND: a Pod must match every key-value pair listed in the selector to be included as a backend.

## Explicação para criança

É como pedir alguém que use camisa azul E calça jeans para entrar numa festa: precisa ter as duas coisas ao mesmo tempo, não só uma delas.

