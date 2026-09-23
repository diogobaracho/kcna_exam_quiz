---
id: co-fund-002
category: container-orchestration
topic: orchestration-fundamentals
difficulty: easy
tags: [desired-state]
source: LFS250 module 1
---

# Question

What is meant by 'desired state' in an orchestration system like Kubernetes?

## Options

- [x] A declaration of what the end result should look like, which the system continuously works to achieve and maintain
- [ ] The state a cluster was in when it was first installed
- [ ] A snapshot of the current CPU usage on every node
- [ ] The list of users allowed to log into the cluster

## Explanation

You declare what you want (e.g. 'run 3 replicas of this image'), and controllers continuously reconcile the actual state of the system toward that target, rather than you issuing step-by-step imperative commands.

## Explicação para criança

É como deixar escrito na geladeira 'sempre ter 3 maçãs': toda vez que alguém comer uma, outra pessoa repõe, sem precisar pedir de novo cada vez.

