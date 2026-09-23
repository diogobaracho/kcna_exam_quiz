---
id: kf-arch-005
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [control-plane, controller-manager]
source: LFS158 ch.4
---

# Question

What does kube-controller-manager do?

## Options

- [x] It runs a set of control loops that watch cluster state and move it toward the desired state
- [ ] It stores all cluster objects on disk
- [ ] It builds container images for Deployments
- [ ] It exposes the Kubernetes API over HTTPS

## Explanation

kube-controller-manager bundles several controllers (node, replication, endpoints, and more) into a single process, each continuously comparing actual state to desired state and taking action to reconcile them.

## Explicação para criança

O kube-controller-manager é como vários fiscais trabalhando juntos, cada um olhando uma coisa diferente (nós, réplicas, endpoints) e corrigindo quando algo não está do jeito combinado.

