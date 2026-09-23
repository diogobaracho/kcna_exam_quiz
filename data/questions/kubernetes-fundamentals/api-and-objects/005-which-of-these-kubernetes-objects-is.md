---
id: kf-api-005
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [namespaces]
source: LFS158 ch.6
---

# Question

Which of these Kubernetes objects is NOT namespaced (it exists cluster-wide)?

## Options

- [x] Node
- [ ] Pod
- [ ] Deployment
- [ ] ConfigMap

## Explanation

Nodes represent physical or virtual machines and belong to the whole cluster rather than any single namespace, unlike Pods, Deployments, and ConfigMaps, which always live inside a namespace.

## Explicação para criança

O Node é como o prédio inteiro, não uma sala dele. Pods, Deployments e ConfigMaps ficam dentro de salas (namespaces), mas o prédio em si não pertence a nenhuma sala específica.

