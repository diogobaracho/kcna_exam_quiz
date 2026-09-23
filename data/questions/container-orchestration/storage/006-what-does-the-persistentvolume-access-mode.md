---
id: co-sto-006
category: container-orchestration
topic: storage
difficulty: medium
tags: [access-modes]
source: LFS158 ch.9
---

# Question

What does the PersistentVolume access mode `ReadWriteOnce` (RWO) mean?

## Options

- [x] The volume can be mounted as read-write by a single node at a time (potentially by multiple Pods on that node, depending on the driver)
- [ ] The volume can only ever be read once and then becomes unavailable
- [ ] The volume can be mounted read-write by many nodes simultaneously
- [ ] The volume is always read-only after the first write

## Explanation

RWO restricts the volume to being mounted read-write on one node at a time, which fits most block storage; ReadWriteMany (RWX) is needed when multiple nodes must write to the same volume concurrently, and not all storage backends support it.

## Explicação para criança

É como um caderno que só uma pessoa por vez pode escrever nele: até essa pessoa terminar (soltar o caderno em outro nó), mais ninguém escreve ao mesmo tempo.

