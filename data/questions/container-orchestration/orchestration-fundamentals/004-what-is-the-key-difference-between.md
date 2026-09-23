---
id: co-fund-004
category: container-orchestration
topic: orchestration-fundamentals
difficulty: medium
tags: [declarative, imperative]
source: LFS250 module 1
---

# Question

What is the key difference between declarative and imperative approaches to managing infrastructure?

## Options

- [x] Declarative describes the desired end state and lets the system figure out how to get there; imperative specifies the exact sequence of steps to run
- [ ] Declarative only works for networking, imperative only works for storage
- [ ] Imperative is always faster and preferred in production
- [ ] Declarative requires no configuration files at all

## Explanation

A declarative manifest says 'there should be 3 replicas of this Pod'; an imperative script says 'run this container, then run this one, then that one', requiring the operator to handle drift and failure themselves rather than letting a controller reconcile it.

## Explicação para criança

É a diferença entre dizer 'quero o quarto arrumado' (declarativo, alguém descobre como fazer) e dizer 'guarde a camisa na gaveta 1, depois a calça na gaveta 2...' (passo a passo, imperativo).

