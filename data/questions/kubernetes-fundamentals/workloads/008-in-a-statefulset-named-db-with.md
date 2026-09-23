---
id: kf-wl-008
category: kubernetes-fundamentals
topic: workloads
difficulty: hard
tags: [statefulset]
source: LFS158 ch.8
---

# Question

In a StatefulSet named `db` with 3 replicas, what are the Pod names?

## Options

- [x] db-0, db-1, db-2
- [ ] db-a, db-b, db-c
- [ ] db-pod1, db-pod2, db-pod3
- [ ] Random hashes like a Deployment's Pods

## Explanation

StatefulSet Pods are named `<statefulset-name>-<ordinal>` starting at 0, giving each replica a stable, predictable identity that persists across rescheduling, unlike the random suffixes Deployment Pods get.

## Explicação para criança

É uma numeração fixa, tipo apartamentos: 0, 1 e 2, e cada morador (Pod) sempre volta para o número que já era dele.

