---
id: kf-wl-031
category: kubernetes-fundamentals
topic: workloads
difficulty: easy
tags: [pod, multi-container-patterns]
source: LFS158 ch.5
---

# Question

A container that runs alongside the main application container in the same Pod to handle a supporting task (like shipping logs) is commonly called what?

## Options

- [x] A sidecar container
- [ ] An init container
- [ ] A DaemonSet container
- [ ] A headless container

## Explanation

The sidecar pattern places a helper container in the same Pod as the main application container so they share the network and volumes, commonly used for log shipping, proxies, or metric exporters.

## Explicação para criança

É como um ajudante que anda sempre ao lado do personagem principal, cuidando de uma tarefa extra (tipo enviar os registros) enquanto o principal faz seu trabalho.

