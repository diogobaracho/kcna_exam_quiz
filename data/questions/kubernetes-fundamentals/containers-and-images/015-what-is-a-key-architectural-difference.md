---
id: kf-img-015
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: easy
tags: [containers-vs-vms]
source: LFS158 ch.2
---

# Question

What is a key architectural difference between containers and traditional virtual machines?

## Options

- [x] Containers share the host OS kernel, while each VM runs its own full guest OS on virtualized hardware
- [ ] Containers require a hypervisor, VMs do not
- [ ] VMs always start faster than containers
- [ ] Containers cannot be networked together

## Explanation

Containers use OS-level isolation (namespaces and cgroups) on top of a shared host kernel, making them much lighter weight to start and run than VMs, which each virtualize an entire machine including a separate kernel.

## Explicação para criança

É como apartamentos num mesmo prédio (contêineres, um encanamento e uma estrutura compartilhados) versus casas totalmente separadas, cada uma com sua própria fundação (VMs, cada uma com seu próprio sistema completo).

