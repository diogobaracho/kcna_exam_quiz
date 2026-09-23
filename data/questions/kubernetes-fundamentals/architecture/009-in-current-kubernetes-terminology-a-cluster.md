---
id: kf-arch-009
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [architecture, nodes]
source: LFS158 ch.4
---

# Question

In current Kubernetes terminology, a cluster is divided into which two kinds of machines?

## Options

- [ ] Master and slave nodes
- [x] Control plane nodes and worker nodes
- [ ] Primary and secondary etcd nodes
- [ ] Gateway and edge nodes

## Explanation

Kubernetes documentation now uses 'control plane node' for machines running the cluster's control plane components and 'worker node' for machines that run application Pods; the older master/slave terms have been retired.

## Explicação para criança

É como uma escola: tem a sala da diretoria (control plane), que organiza tudo, e as salas de aula (worker nodes), onde as atividades (Pods) realmente acontecem.

