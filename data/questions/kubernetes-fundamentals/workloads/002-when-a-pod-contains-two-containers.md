---
id: kf-wl-002
category: kubernetes-fundamentals
topic: workloads
difficulty: easy
tags: [pod, multi-container]
source: LFS158 ch.5
---

# Question

When a Pod contains two containers, what do they share by default?

## Options

- [x] The same network namespace (IP address and port space) and any defined volumes
- [ ] Nothing; each container is fully isolated even within the same Pod
- [ ] Only their CPU limits
- [ ] Only environment variables

## Explanation

Containers in the same Pod share the Pod's network namespace, so they can reach each other via localhost, and any Volumes declared in the Pod spec can be mounted by more than one of them.

## Explicação para criança

É como dois irmãos dividindo um quarto: têm o mesmo endereço (rede) e podem compartilhar as mesmas gavetas (volumes), mesmo sendo pessoas diferentes.

