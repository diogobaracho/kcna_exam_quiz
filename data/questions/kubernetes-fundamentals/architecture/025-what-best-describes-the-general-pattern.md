---
id: kf-arch-025
category: kubernetes-fundamentals
topic: architecture
difficulty: hard
tags: [controllers, reconciliation]
source: LFS158 ch.4
---

# Question

What best describes the general pattern every controller inside kube-controller-manager follows?

## Options

- [x] A reconciliation loop: observe current state, compare it to desired state, and take action to reduce the difference
- [ ] A one-time script that runs only during cluster installation
- [ ] A request-response handler that only reacts to kubectl commands
- [ ] A cron-based batch job that runs once every 24 hours

## Explanation

Every Kubernetes controller implements the same control-loop pattern: it watches objects through the API server, compares observed state to the desired spec, and issues changes until the two converge, then keeps watching for drift.

## Explicação para criança

É como um termostato: ele mede a temperatura da sala, compara com a temperatura que você pediu, e liga ou desliga o ar até ficar igual - e continua vigiando depois.

