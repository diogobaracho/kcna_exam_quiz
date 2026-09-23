---
id: cna-scale-003
category: cloud-native-architecture
topic: autoscaling
difficulty: medium
tags: [cluster-autoscaler]
source: LFS158 ch.10
---

# Question

What triggers the Cluster Autoscaler to add a new node to the cluster?

## Options

- [x] Pods that are unschedulable due to insufficient resources on existing nodes
- [ ] A manual request from a developer's laptop
- [ ] A scheduled cron job that runs nightly
- [ ] A change in the number of namespaces

## Explanation

The Cluster Autoscaler watches for Pods stuck in `Pending` because no existing node has room; if adding a node from a configured node group would let them schedule, it provisions one. It also scales nodes down when they are underutilized and their Pods could fit elsewhere.

## Explicação para criança

É como abrir mais uma mesa no restaurante quando todas as outras estão cheias e ainda tem gente esperando na fila para sentar.

