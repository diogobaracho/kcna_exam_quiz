---
id: co-rt-005
category: container-orchestration
topic: runtime
difficulty: medium
tags: [sandboxed-runtime, gvisor]
source: LFS250 module 3
---

# Question

What does gVisor add compared to a standard container runtime?

## Options

- [x] An application-level kernel that intercepts syscalls to provide stronger isolation between the container and the host kernel
- [ ] A faster way to build container images
- [ ] Native support for GPU scheduling
- [ ] A replacement for the Kubernetes API server

## Explanation

gVisor implements a user-space kernel that sits between containers and the host, intercepting system calls so a compromised container has a much smaller and more controlled surface to attack, at some performance cost compared to a plain runtime.

## Explicação para criança

É como colocar um segurança extra entre o hóspede e a casa: mesmo que o hóspede tente algo estranho, o segurança intercepta antes de chegar na estrutura real da casa.

