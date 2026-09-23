---
id: kf-wl-003
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [replicaset]
source: LFS158 ch.8
---

# Question

What does a ReplicaSet guarantee?

## Options

- [x] That a specified number of identical Pod replicas matching its selector are running at all times
- [ ] That Pods are updated one at a time with zero downtime
- [ ] That a Pod always restarts on the same node it died on
- [ ] That a Job runs exactly once and then is deleted

## Explanation

A ReplicaSet's controller continuously counts Pods matching its label selector and creates or deletes Pods until the count equals `spec.replicas`, but it has no built-in concept of rolling updates.

## Explicação para criança

O ReplicaSet é como um contador de brinquedos: se pediu 5 bonecos e um quebra, ele fabrica outro na hora para sempre ter exatamente 5.

