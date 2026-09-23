---
id: kf-api-014
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: hard
tags: [kubectl, apply]
source: LFS158 ch.3
---

# Question

What mechanism does `kubectl apply` use to figure out which fields were removed from a manifest since the last apply, so it can remove them from the live object too?

## Options

- [x] It compares the live object to the last-applied-configuration annotation stored on the object
- [ ] It always does a full delete and recreate of the object
- [ ] It asks etcd for the object's edit history
- [ ] It relies on the container runtime to track field changes

## Explanation

kubectl apply stores the previous manifest in the `kubectl.kubernetes.io/last-applied-configuration` annotation; on the next apply it three-way merges the last-applied, the new file, and the live object, so fields removed from the file are also removed live.

## Explicação para criança

É como guardar uma cópia do pedido anterior no bolso: da próxima vez, comparando o pedido novo com o antigo, dá para saber exatamente o que foi tirado da lista.

