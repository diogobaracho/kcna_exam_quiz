---
id: kf-sched-015
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [scheduler, unschedulable]
source: LFS158 ch.10
---

# Question

A Pod stays in `Pending` and `kubectl describe` shows the event `0/3 nodes are available: 3 Insufficient cpu`. What is the most likely cause?

## Options

- [x] No node currently has enough allocatable CPU left to satisfy the Pod's CPU request
- [ ] The container image does not exist
- [ ] The Pod's YAML has a syntax error
- [ ] The Service selector does not match any Pods

## Explanation

This scheduler event means every node was filtered out during the CPU-capacity check; the fix is typically to reduce the Pod's CPU request, free capacity, or add more/larger nodes.

## Explicação para criança

É como não achar mesa livre num restaurante lotado: não tem outro motivo, simplesmente não sobrou espaço (CPU) suficiente em nenhuma mesa (nó).

