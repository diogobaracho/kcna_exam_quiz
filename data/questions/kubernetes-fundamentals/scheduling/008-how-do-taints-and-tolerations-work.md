---
id: kf-sched-008
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [taints, tolerations]
source: LFS158 ch.10
---

# Question

How do taints and tolerations work together?

## Options

- [x] A taint on a node repels Pods unless they carry a matching toleration
- [ ] A toleration on a node repels Pods unless they carry a matching taint
- [ ] Taints and tolerations both live on Pods and cancel each other out
- [ ] Taints only affect networking, not scheduling

## Explanation

A taint applied to a node marks it as unsuitable for Pods in general; a Pod can still be scheduled there if its spec includes a toleration that matches the taint's key, value, and effect.

## Explicação para criança

O taint é como uma placa de 'perigo, não entre' na porta; a toleration é o crachá especial que permite entrar mesmo assim.

