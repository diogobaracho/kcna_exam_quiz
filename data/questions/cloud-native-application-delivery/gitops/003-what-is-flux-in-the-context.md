---
id: cnad-gitops-003
category: cloud-native-application-delivery
topic: gitops
difficulty: medium
tags: [flux]
source: LFS250 module 11
---

# Question

What is Flux, in the context of GitOps tooling?

## Options

- [x] A CNCF GitOps toolkit that continuously reconciles cluster state with configuration stored in Git (or other sources like OCI artifacts)
- [ ] A container runtime alternative to containerd
- [ ] A service mesh implementation
- [ ] A Kubernetes distribution for edge devices

## Explanation

Flux, like Argo CD, is a graduated CNCF GitOps tool built from a set of controllers that watch sources (Git repos, Helm repositories, OCI registries) and reconcile the cluster to match, with support for multi-tenancy and progressive delivery add-ons.

## Explicação para criança

É outra ferramenta que faz o mesmo trabalho de conferir e ajustar o cluster de acordo com o que está escrito no Git, parecido com um segundo fiscal usando o mesmo método.

