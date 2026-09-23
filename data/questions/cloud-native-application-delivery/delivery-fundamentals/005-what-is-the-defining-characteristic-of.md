---
id: cnad-fund-005
category: cloud-native-application-delivery
topic: delivery-fundamentals
difficulty: hard
tags: [canary]
source: LFS250 module 11
---

# Question

What is the defining characteristic of a canary deployment strategy?

## Options

- [x] A small subset of real traffic is routed to the new version first, and it is gradually increased while monitoring for problems
- [ ] The new version is only tested in a completely offline environment, never with real traffic
- [ ] All users see the new version immediately with no monitoring
- [ ] It requires two entirely separate Kubernetes clusters

## Explanation

Named after canaries once used to detect danger in mines, a canary release exposes the new version to a small, controlled slice of real users/traffic first; if metrics stay healthy, the rollout gradually expands, and if not, traffic is quickly shifted back.

## Explicação para criança

É como servir uma comida nova para poucos clientes primeiro e observar se passam bem, antes de colocar o prato no cardápio inteiro do restaurante.

