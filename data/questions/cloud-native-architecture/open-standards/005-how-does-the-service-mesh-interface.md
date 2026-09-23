---
id: cna-std-005
category: cloud-native-architecture
topic: open-standards
difficulty: hard
tags: [smi, open-standards]
source: LFS250 module 6
---

# Question

How does the Service Mesh Interface (SMI) relate to CNI, CRI, and CSI in spirit?

## Options

- [x] It aims to be a similar vendor-neutral abstraction layer, but for service mesh traffic policy and metrics instead of networking, runtime, or storage
- [ ] It is a mandatory part of every Kubernetes installation, just like CNI
- [ ] It defines the container image format for mesh sidecars
- [ ] It replaces the Kubernetes API server for mesh-enabled clusters

## Explanation

Just as CNI, CRI, and CSI decouple Kubernetes from specific implementations of networking, runtimes, and storage, SMI attempted to define a common surface (traffic split, traffic policy, metrics) so tooling could target any compliant service mesh implementation.

## Explicação para criança

É a mesma ideia dos outros padrões (uma regra comum para todo mundo seguir), só que aplicada à parte de malha de serviço, em vez de rede, motor de contêiner ou armazenamento.

