---
id: co-sto-003
category: container-orchestration
topic: storage
difficulty: medium
tags: [persistentvolumeclaim]
source: LFS158 ch.9
---

# Question

How does a PersistentVolumeClaim (PVC) relate to a PersistentVolume (PV)?

## Options

- [x] A PVC is a request for storage made by a Pod's owner; Kubernetes binds it to a matching PV that satisfies the requested size and access mode
- [ ] A PVC is the physical disk itself
- [ ] A PVC and a PV are exactly the same object under two names
- [ ] A PVC can only be created after the Pod using it has already started

## Explanation

Users declare a PVC describing the storage they need (size, access mode, optionally a StorageClass); the control plane binds it to an available PV that meets those requirements, decoupling application manifests from storage implementation details.

## Explicação para criança

A PVC é o pedido ('preciso de um depósito de 10GB'), e o PV é o depósito real que é reservado para atender esse pedido.

