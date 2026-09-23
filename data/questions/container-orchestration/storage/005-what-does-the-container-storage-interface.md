---
id: co-sto-005
category: container-orchestration
topic: storage
difficulty: hard
tags: [csi]
source: LFS158 ch.9
---

# Question

What does the Container Storage Interface (CSI) allow?

## Options

- [x] Storage vendors to write drivers that plug into Kubernetes (and other orchestrators) without modifying Kubernetes' own source code
- [ ] Containers to share the exact same filesystem across different nodes without a volume
- [ ] Kubernetes to run without any storage backend
- [ ] Pods to bypass PersistentVolumeClaims entirely

## Explanation

CSI standardizes how orchestrators talk to storage systems, similar to how CRI standardizes runtimes; storage vendors implement a CSI driver once, and it works with any CSI-compliant orchestrator, decoupling storage innovation from the Kubernetes release cycle.

## Explicação para criança

É como um padrão de conector USB para pen drives de fábricas diferentes: qualquer fabricante que siga o padrão CSI faz seu armazenamento funcionar no Kubernetes sem precisar mudar o próprio Kubernetes.

