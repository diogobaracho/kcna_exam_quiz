---
id: kf-sched-009
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [taints, effects]
source: LFS158 ch.10
---

# Question

Which taint effect allows already-running Pods without a matching toleration to keep running, but blocks new Pods from being scheduled?

## Options

- [x] NoSchedule
- [ ] NoExecute
- [ ] PreferNoSchedule
- [ ] Blocked

## Explanation

`NoSchedule` only affects future scheduling decisions; it does not evict Pods already on the node. `NoExecute`, in contrast, actively evicts non-tolerating Pods that are already running there.

## Explicação para criança

É como fechar a porta só para quem ainda não entrou: quem já está lá dentro pode continuar, mas ninguém novo passa.

