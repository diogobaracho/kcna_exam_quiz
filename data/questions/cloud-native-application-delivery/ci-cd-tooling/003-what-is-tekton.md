---
id: cnad-cicd-003
category: cloud-native-application-delivery
topic: ci-cd-tooling
difficulty: medium
tags: [tekton]
source: LFS250 module 11
---

# Question

What is Tekton?

## Options

- [x] A Kubernetes-native framework for building CI/CD pipelines using CRDs like Task and Pipeline, where each step runs as a container
- [ ] A dashboarding tool for visualizing Prometheus metrics
- [ ] A service mesh implementation
- [ ] A container image registry

## Explanation

Tekton defines pipelines declaratively as Kubernetes custom resources; each pipeline step executes inside its own container/Pod on the cluster, making CI/CD itself a cloud native, Kubernetes-managed workload rather than a separate external system.

## Explicação para criança

É como montar uma linha de montagem inteira usando as mesmas peças (Pods e CRDs) que o Kubernetes já usa para tudo o mais, em vez de usar uma fábrica separada.

