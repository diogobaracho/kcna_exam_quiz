---
id: kf-api-019
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: hard
tags: [objects, owner-references]
source: LFS158 ch.8
---

# Question

What is the purpose of `ownerReferences` on a Kubernetes object, such as a Pod created by a ReplicaSet?

## Options

- [x] It links the dependent object to its owner so garbage collection can clean up dependents when the owner is deleted
- [ ] It records which user account created the object
- [ ] It defines which namespace the object can be moved to
- [ ] It sets the CPU quota inherited from the parent object

## Explanation

`ownerReferences` establishes a parent-child relationship between objects; Kubernetes' garbage collector uses it to automatically delete dependents (like Pods) when their owner (like a ReplicaSet) is deleted, unless orphaning is requested.

## Explicação para criança

É como escrever o nome dos pais numa pulseirinha de bebê no hospital: se descobrir quem é a mãe (dono), sabe quais bebês (objetos) pertencem a ela e cuidar deles juntos.

