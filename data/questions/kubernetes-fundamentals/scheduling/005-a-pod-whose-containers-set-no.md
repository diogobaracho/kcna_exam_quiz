---
id: kf-sched-005
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [qos]
source: LFS158 ch.10
---

# Question

A Pod whose containers set no `requests` or `limits` at all falls into which QoS class?

## Options

- [x] BestEffort
- [ ] Guaranteed
- [ ] Burstable
- [ ] Unbounded

## Explanation

With no requests or limits declared, a Pod has no resource claim at all and is classified `BestEffort`, making it the first candidate for eviction when a node runs low on resources.

## Explicação para criança

É como chegar numa festa sem avisar quantos vão vir: se a comida acabar, quem não reservou nada é o primeiro a ficar sem prato.

