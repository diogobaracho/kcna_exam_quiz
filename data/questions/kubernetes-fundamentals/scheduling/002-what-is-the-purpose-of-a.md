---
id: kf-sched-002
category: kubernetes-fundamentals
topic: scheduling
difficulty: easy
tags: [resources, requests]
source: LFS158 ch.10
---

# Question

What is the purpose of a container's `resources.requests` field?

## Options

- [x] It tells the scheduler the minimum CPU/memory the container needs, used to decide which node has room for the Pod
- [ ] It sets a hard cap the container can never exceed
- [ ] It configures how often the liveness probe runs
- [ ] It defines which node the Pod must run on

## Explanation

Requests represent the amount of a resource the scheduler reserves for the container on a node; the sum of all Pods' requests on a node must fit within that node's allocatable capacity.

## Explicação para criança

É como reservar um lugar à mesa antes da festa: você avisa quanto espaço vai precisar, para o anfitrião só chamar mais gente se ainda sobrar lugar.

