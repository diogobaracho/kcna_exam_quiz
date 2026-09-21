---
id: kf-arch-001
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [control-plane, etcd]
source: LFS158 ch.4
---

# Question

Which control plane component stores the entire cluster state?

## Options

- [ ] kube-scheduler
- [x] etcd
- [ ] kube-proxy
- [ ] kubelet

## Explanation

etcd is the consistent, distributed key-value store that holds all cluster state. The API server is the only component that reads from and writes to it; every other component goes through the API server.

## Explicação para criança

O etcd é como o caderno onde o Kubernetes anota tudo o que existe no cluster. Quando alguém quer saber o que está acontecendo, o "chefe" (o API server) é o único que abre o caderno para ler ou escrever.
