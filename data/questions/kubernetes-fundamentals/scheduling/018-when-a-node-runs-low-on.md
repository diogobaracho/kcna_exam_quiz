---
id: kf-sched-018
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [eviction]
source: LFS158 ch.10
---

# Question

When a node runs low on memory (node pressure), which QoS class of Pods is evicted first, all else being equal?

## Options

- [x] BestEffort
- [ ] Guaranteed
- [ ] Burstable
- [ ] None; QoS does not affect eviction order

## Explanation

The kubelet's eviction logic ranks Pods by QoS class and usage above requests; `BestEffort` Pods (no requests/limits at all) are evicted before `Burstable`, and `Guaranteed` Pods are evicted only as a last resort.

## Explicação para criança

É como pedir para quem não reservou lugar nenhum sair primeiro quando a sala fica cheia demais, deixando por último quem garantiu exatamente o espaço combinado.

