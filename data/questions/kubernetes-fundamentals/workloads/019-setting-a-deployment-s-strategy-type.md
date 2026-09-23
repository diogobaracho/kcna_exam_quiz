---
id: kf-wl-019
category: kubernetes-fundamentals
topic: workloads
difficulty: hard
tags: [deployment, strategy]
source: LFS158 ch.8
---

# Question

Setting a Deployment's `strategy.type` to `Recreate` results in what behavior during an update?

## Options

- [x] All existing Pods are terminated before any new Pods are created, causing a brief outage
- [ ] Pods are updated one at a time with zero downtime
- [ ] Only half of the Pods are ever replaced
- [ ] The Deployment refuses to apply any change

## Explanation

`Recreate` is the simpler of the two built-in strategies: it kills all old Pods first and only then creates the new ones, trading availability for simplicity and avoiding two incompatible versions running simultaneously.

## Explicação para criança

É como esvaziar a sala inteira antes de trocar a mobília, em vez de trocar peça por peça: mais simples, mas a sala fica vazia por um tempinho.

