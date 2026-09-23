---
id: kf-arch-015
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [controllers, node-controller]
source: LFS158 ch.4
---

# Question

Which controller inside kube-controller-manager is responsible for noticing that a node has stopped responding and updating its status?

## Options

- [x] Node controller
- [ ] Endpoint controller
- [ ] Namespace controller
- [ ] Job controller

## Explanation

The node controller monitors node heartbeats; when a node misses them for too long it marks the node NotReady and, after a further grace period, evicts the Pods so they can be rescheduled elsewhere.

## Explicação para criança

O node controller é o vigia que repara quando uma máquina para de responder. Depois de esperar um pouco, ele avisa que ali não dá mais para confiar e manda recolocar as tarefas em outro lugar.

