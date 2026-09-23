---
id: kf-arch-010
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [etcd, control-plane]
source: LFS158 ch.4
---

# Question

Which statement about access to etcd is correct?

## Options

- [ ] kubelets on every node read and write directly to etcd for speed
- [x] Only kube-apiserver reads from and writes to etcd; other components go through it
- [ ] etcd is optional and can be disabled once the cluster is running
- [ ] kube-scheduler writes scheduling decisions directly into etcd

## Explanation

etcd is treated as a private backing store for kube-apiserver. Other control plane components and kubelets never connect to etcd themselves; they read and write cluster state exclusively through API server calls.

## Explicação para criança

Pense no etcd como o cofre de um banco: só o gerente (API server) tem a chave. Os outros funcionários pedem para o gerente pegar ou guardar algo, ninguém mexe no cofre sozinho.

