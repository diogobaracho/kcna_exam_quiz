---
id: co-mesh-003
category: container-orchestration
topic: service-mesh
difficulty: medium
tags: [linkerd]
source: LFS250 module 6
---

# Question

What is a key differentiator Linkerd emphasizes compared to some other service meshes?

## Options

- [x] A minimal, lightweight design focused on simplicity and low resource overhead using its own ultralight proxy
- [ ] It only works outside of Kubernetes
- [ ] It requires rewriting application code in Rust
- [ ] It replaces CNI plugins entirely

## Explanation

Linkerd is a CNCF graduated project built around simplicity: it uses a purpose-built lightweight proxy (written in Rust) instead of a general-purpose proxy, aiming for lower latency and operational overhead than more feature-heavy meshes.

## Explicação para criança

É como escolher um assistente treinado só para fazer poucas tarefas muito bem e de forma leve, em vez de um assistente enorme que faz de tudo mas gasta mais energia.

