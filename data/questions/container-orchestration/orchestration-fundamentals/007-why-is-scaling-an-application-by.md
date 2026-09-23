---
id: co-fund-007
category: container-orchestration
topic: orchestration-fundamentals
difficulty: easy
tags: [scaling]
source: LFS250 module 1
---

# Question

Why is scaling an application by adding more container replicas ('scaling out') often preferred over making one container bigger ('scaling up')?

## Options

- [x] It improves availability (no single point of failure) and can be automated more easily across many machines
- [ ] It always uses less total CPU than scaling up
- [ ] It removes the need for load balancing
- [ ] It is the only scaling method Kubernetes supports

## Explanation

Distributing load across multiple replicas means the loss of one instance does not take the whole application down, and orchestrators can add or remove replicas dynamically, which is generally more flexible than resizing a single instance.

## Explicação para criança

É melhor ter vários ajudantes pequenos trabalhando juntos do que um só ajudante gigante: se um ajudante ficar doente, os outros continuam o trabalho.

