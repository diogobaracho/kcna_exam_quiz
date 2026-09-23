---
id: cnad-fund-003
category: cloud-native-application-delivery
topic: delivery-fundamentals
difficulty: medium
tags: [rolling-deployment]
source: LFS250 module 11
---

# Question

What characterizes a rolling deployment strategy?

## Options

- [x] Instances of the old version are replaced by the new version incrementally, keeping the service available throughout
- [ ] All instances are replaced at the exact same instant
- [ ] Traffic is split 50/50 between two full environments indefinitely
- [ ] Only a single canary instance ever receives production traffic

## Explanation

A rolling deployment gradually swaps old instances for new ones (this is exactly what a Deployment's default RollingUpdate strategy does in Kubernetes), balancing update speed against continuous availability.

## Explicação para criança

É como trocar as luzes de um corredor uma de cada vez, mantendo o corredor sempre iluminado, em vez de apagar tudo de uma vez para trocar todas juntas.

