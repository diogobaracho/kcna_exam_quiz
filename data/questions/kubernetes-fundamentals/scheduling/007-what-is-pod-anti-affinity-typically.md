---
id: kf-sched-007
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [pod-affinity, anti-affinity]
source: LFS158 ch.10
---

# Question

What is Pod anti-affinity typically used for?

## Options

- [x] Spreading replicas of an application across different nodes or zones to improve availability
- [ ] Forcing all replicas of an application onto the same node
- [ ] Preventing a Pod from ever being scheduled
- [ ] Blocking a node from running any Pods at all

## Explanation

Pod anti-affinity repels Pods from nodes already running Pods that match a given label selector, commonly used so replicas of the same Deployment avoid sharing a node or a failure domain.

## Explicação para criança

É como espalhar os ovos em cestas diferentes: se uma cesta cair, você não perde todos os ovos de uma vez.

