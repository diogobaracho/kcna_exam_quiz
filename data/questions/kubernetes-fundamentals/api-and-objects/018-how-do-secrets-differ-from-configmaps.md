---
id: kf-api-018
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [secrets]
source: LFS158 ch.9
---

# Question

How do Secrets differ from ConfigMaps in Kubernetes?

## Options

- [x] Secrets are intended for sensitive data and are base64-encoded (and can be encrypted at rest); otherwise they work similarly to ConfigMaps
- [ ] Secrets can only be used by StatefulSets
- [ ] Secrets are stored on the node's disk instead of etcd
- [ ] Secrets cannot be mounted as files, only as environment variables

## Explanation

Secrets and ConfigMaps share the same basic mechanics (key-value data consumable as env vars or volumes), but Secrets are meant for sensitive values, are stored base64-encoded, and clusters can be configured to encrypt them at rest in etcd.

## Explicação para criança

É como um cofre pequeno dentro da casa: guarda coisas parecidas com uma gaveta comum (ConfigMap), mas é para os itens mais importantes, tipo senhas.

