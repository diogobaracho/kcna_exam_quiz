---
id: kf-arch-003
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [control-plane, api-server]
source: LFS158 ch.4
---

# Question

Which control plane component is the only one that all other components (including kubectl) talk to directly?

## Options

- [ ] kube-scheduler
- [ ] kube-controller-manager
- [x] kube-apiserver
- [ ] etcd

## Explanation

The kube-apiserver exposes the Kubernetes REST API and is the single front door to the cluster. Every other component, including kubectl and etcd clients, communicates through it rather than with each other directly.

## Explicação para criança

O kube-apiserver é como a recepção de um prédio: todo mundo que quer entrar ou pedir algo passa por ali primeiro. Nenhum outro componente entra direto na sala do etcd sem passar pela recepção.

