---
id: co-sto-002
category: container-orchestration
topic: storage
difficulty: medium
tags: [persistentvolume]
source: LFS158 ch.9
---

# Question

What is a PersistentVolume (PV)?

## Options

- [x] A cluster-level piece of storage provisioned by an administrator or dynamically, independent of any single Pod's lifecycle
- [ ] A temporary directory inside a container
- [ ] A Kubernetes Secret used to store storage credentials
- [ ] A type of Service used only for databases

## Explanation

A PersistentVolume is a cluster resource representing actual storage (an NFS share, a cloud disk, etc.) with its own lifecycle, existing independently of any Pod that might claim it.

## Explicação para criança

É como um espaço de armazenamento externo, tipo um depósito, que existe por conta própria, mesmo que nenhum morador (Pod) esteja usando ele no momento.

