---
id: co-rt-007
category: container-orchestration
topic: runtime
difficulty: medium
tags: [cri, shim]
source: LFS250 module 3
---

# Question

What role does a 'runtime shim' (like runc invoked by containerd-shim) play in the container execution stack?

## Options

- [x] It is a thin process that launches and supervises the low-level OCI runtime for a single container, keeping it running independently of the higher-level daemon
- [ ] It replaces the CRI entirely
- [ ] It compiles the container image into a binary
- [ ] It performs image vulnerability scanning

## Explanation

The shim sits between the high-level runtime (containerd/CRI-O) and the low-level OCI runtime (like runc), keeping the container's process alive and reporting exit status even if the higher-level daemon restarts, decoupling container lifecycle from daemon lifecycle.

## Explicação para criança

É como um assistente que fica de olho numa tarefa específica, mesmo se o chefe sair da sala: a tarefa continua sendo cuidada de perto, independente do que acontece lá em cima.

