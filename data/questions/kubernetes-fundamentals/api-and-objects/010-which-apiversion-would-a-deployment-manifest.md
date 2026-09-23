---
id: kf-api-010
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [api-groups]
source: LFS158 ch.3
---

# Question

Which apiVersion would a Deployment manifest typically use in a modern Kubernetes cluster?

## Options

- [x] apps/v1
- [ ] v1
- [ ] batch/v1
- [ ] networking.k8s.io/v1

## Explanation

Deployments, along with ReplicaSets, StatefulSets, and DaemonSets, belong to the `apps` API group at version `v1`; the bare `v1` group is reserved for core objects like Pod, Service, and ConfigMap.

## Explicação para criança

É como um endereço com bairro e número: `apps/v1` diz que o Deployment mora no bairro 'apps', andar 'v1', diferente do bairro central onde moram Pods e Services.

