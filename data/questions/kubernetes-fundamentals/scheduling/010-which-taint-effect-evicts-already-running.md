---
id: kf-sched-010
category: kubernetes-fundamentals
topic: scheduling
difficulty: hard
tags: [taints, effects]
source: LFS158 ch.10
---

# Question

Which taint effect evicts already-running Pods that do not tolerate it, in addition to blocking new scheduling?

## Options

- [x] NoExecute
- [ ] NoSchedule
- [ ] PreferNoSchedule
- [ ] SoftEvict

## Explanation

`NoExecute` is the strictest effect: Pods without a matching toleration are actively evicted from the node, and Pods with a toleration can optionally specify `tolerationSeconds` to bound how long they are allowed to stay before eviction anyway.

## Explicação para criança

É como mandar todo mundo sair de uma sala interditada agora, mesmo quem já estava lá dentro, a não ser que tenha uma autorização especial.

