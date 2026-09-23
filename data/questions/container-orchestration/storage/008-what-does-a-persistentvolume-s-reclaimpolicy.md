---
id: co-sto-008
category: container-orchestration
topic: storage
difficulty: medium
tags: [reclaim-policy]
source: LFS158 ch.9
---

# Question

What does a PersistentVolume's `reclaimPolicy` of `Retain` do when its bound PVC is deleted?

## Options

- [x] The PV and its underlying storage data are kept, requiring manual cleanup or reuse instead of automatic deletion
- [ ] The PV's data is immediately wiped and the PV deleted
- [ ] The PV is automatically resized
- [ ] The PVC deletion is blocked until the PV is manually deleted first

## Explanation

With `Retain`, deleting the PVC leaves the PersistentVolume and its data intact (in a `Released` state) so an administrator can manually recover the data or the volume, as opposed to `Delete`, which removes the underlying storage automatically.

## Explicação para criança

É como guardar as coisas de um inquilino que se mudou em vez de jogar tudo fora na hora: fica reservado até alguém decidir o que fazer com aquilo.

