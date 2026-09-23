---
id: co-rt-006
category: container-orchestration
topic: runtime
difficulty: medium
tags: [kata-containers]
source: LFS250 module 3
---

# Question

How do Kata Containers achieve stronger workload isolation than a standard OCI runtime?

## Options

- [x] Each container (or Pod) runs inside its own lightweight virtual machine with its own kernel, instead of sharing the host kernel
- [ ] By running containers as unprivileged Linux users only
- [ ] By encrypting all container network traffic
- [ ] By disabling the CRI entirely

## Explanation

Kata Containers combines the speed and packaging of containers with the isolation of virtual machines: each Pod gets a minimal VM and its own kernel, which prevents container escapes from directly compromising the host kernel.

## Explicação para criança

É como dar uma casinha própria e separada para cada hóspede em vez de um quarto dentro da mesma casa: mesmo que algo dê errado lá dentro, não afeta a estrutura principal.

