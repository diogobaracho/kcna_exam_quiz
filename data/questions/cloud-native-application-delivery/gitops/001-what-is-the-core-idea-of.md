---
id: cnad-gitops-001
category: cloud-native-application-delivery
topic: gitops
difficulty: easy
tags: [gitops]
source: LFS250 module 11
---

# Question

What is the core idea of GitOps?

## Options

- [x] A Git repository is the single source of truth for the desired state of infrastructure and applications, and an automated agent reconciles the live system to match it
- [ ] GitOps means developers SSH into servers to apply changes tracked in Git commit messages
- [ ] GitOps replaces the need for Kubernetes manifests
- [ ] GitOps only applies to application source code, never infrastructure

## Explanation

In GitOps, every change to the desired state is made as a Git commit (reviewed via pull request); an operator running in or near the cluster continuously compares the live state to what is declared in Git and applies any difference automatically.

## Explicação para criança

É como ter um caderno de receitas (o Git) que é sempre a verdade sobre o que deveria estar na cozinha, e um cozinheiro automático que confere e ajusta a cozinha para bater com o caderno.

