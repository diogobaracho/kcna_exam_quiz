---
id: cnad-cicd-004
category: cloud-native-application-delivery
topic: ci-cd-tooling
difficulty: hard
tags: [argo-rollouts]
source: LFS250 module 11
---

# Question

What capability does Argo Rollouts add on top of a standard Kubernetes Deployment?

## Options

- [x] Advanced progressive delivery strategies (canary, blue-green) with automated metric analysis and traffic shifting, which Deployments do not natively support
- [ ] It replaces the need for a container registry
- [ ] It adds encryption to etcd automatically
- [ ] It is required before any Pod can be scheduled

## Explanation

A vanilla Deployment only supports basic RollingUpdate or Recreate strategies; Argo Rollouts is a custom controller that adds fine-grained canary and blue-green rollout strategies, integrating with metric providers (like Prometheus) to automatically decide whether to proceed, pause, or roll back.

## Explicação para criança

É como dar superpoderes extras ao Deployment padrão: em vez de só trocar a versão aos poucos de um jeito fixo, ele pode testar aos pouquinhos e checar sozinho se está indo bem antes de continuar.

