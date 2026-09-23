---
id: kf-sched-014
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [topology-spread]
source: LFS158 ch.10
---

# Question

What problem do Pod topology spread constraints solve?

## Options

- [x] They let you control how evenly Pods are distributed across topology domains such as zones or nodes
- [ ] They set the exact CPU frequency a Pod requires
- [ ] They replace the need for a scheduler entirely
- [ ] They configure DNS resolution across zones

## Explanation

`topologySpreadConstraints` let you define a `maxSkew` and a `topologyKey` (like `zone` or `hostname`) so the scheduler actively balances matching Pods across those domains instead of clumping them together.

## Explicação para criança

É como distribuir os alunos igualmente entre as salas de aula, em vez de encher uma sala e deixar outra vazia.

