---
id: kf-wl-001
category: kubernetes-fundamentals
topic: workloads
difficulty: easy
tags: [pod]
source: LFS158 ch.5
---

# Question

What is the smallest deployable unit you can create directly in Kubernetes?

## Options

- [x] A Pod
- [ ] A container
- [ ] A node
- [ ] A namespace

## Explanation

A Pod is Kubernetes' smallest schedulable unit; it wraps one or more containers that share the same network namespace and storage volumes and are always scheduled together on the same node.

## Explicação para criança

O Pod é como uma caixinha de lanche: pode ter um ou mais itens dentro, mas a caixinha inteira vai junto para o mesmo lugar, nunca metade para cá e metade para lá.

