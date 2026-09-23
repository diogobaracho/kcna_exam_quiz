---
id: kf-sched-012
category: kubernetes-fundamentals
topic: scheduling
difficulty: hard
tags: [preemption]
source: LFS158 ch.10
---

# Question

What happens during scheduler preemption?

## Options

- [x] The scheduler evicts one or more lower-priority Pods on a node to free enough resources for a pending higher-priority Pod
- [ ] The scheduler permanently deletes the node
- [ ] The scheduler pauses all Pods on the cluster
- [ ] The scheduler downgrades the pending Pod's priority automatically

## Explanation

When a higher-priority Pod cannot be scheduled due to insufficient resources, the scheduler may select a node and evict lower-priority Pods there, freeing capacity so the higher-priority Pod can then be scheduled.

## Explicação para criança

É como pedir para alguém sair de uma cadeira reservada assim que o dono real chega: alguém de prioridade menor cede o lugar para quem tem prioridade maior.

