---
id: co-sto-004
category: container-orchestration
topic: storage
difficulty: medium
tags: [storageclass]
source: LFS158 ch.9
---

# Question

What does a StorageClass enable?

## Options

- [x] Dynamic provisioning: PersistentVolumes are created automatically on demand when a PVC requests that class, instead of an admin pre-creating them
- [ ] It sets the CPU and memory limits for a Pod
- [ ] It defines which nodes a Pod can run on
- [ ] It replaces the need for PersistentVolumeClaims

## Explanation

A StorageClass describes a 'profile' of storage (e.g. SSD-backed, a specific cloud disk type) and a provisioner; when a PVC references it, the provisioner creates a matching PV on demand, avoiding manual pre-provisioning.

## Explicação para criança

É como um catálogo de tipos de depósito disponíveis: ao escolher um tipo no catálogo, o depósito é construído automaticamente na hora, sem precisar já existir de antemão.

