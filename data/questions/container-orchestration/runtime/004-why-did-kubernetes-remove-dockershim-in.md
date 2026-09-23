---
id: co-rt-004
category: container-orchestration
topic: runtime
difficulty: hard
tags: [dockershim, history]
source: LFS250 module 3
---

# Question

Why did Kubernetes remove dockershim in version 1.24?

## Options

- [x] Docker Engine never implemented CRI natively, so kubelet needed a translation shim; removing it pushed users toward CRI-native runtimes like containerd or CRI-O
- [ ] Docker Engine was found to be insecure and was banned entirely
- [ ] dockershim was removed because Kubernetes stopped supporting Linux
- [ ] Docker images stopped being OCI-compliant

## Explanation

dockershim was a compatibility layer maintained inside kubelet to let Docker Engine, which predates and does not speak CRI, work with Kubernetes. Maintaining it added long-term complexity, so the project removed it once CRI-native runtimes were mature, though Docker-built images still run fine anywhere.

## Explicação para criança

É como tirar um tradutor que ficava repetindo tudo duas vezes: sem ele, o kubelet fala direto com motores que já entendem sua língua (CRI), simplificando o sistema.

