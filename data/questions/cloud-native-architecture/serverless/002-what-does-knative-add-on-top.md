---
id: cna-sls-002
category: cloud-native-architecture
topic: serverless
difficulty: medium
tags: [knative]
source: LFS250 module 7
---

# Question

What does Knative add on top of Kubernetes?

## Options

- [x] Building blocks for serverless workloads on Kubernetes, including request-driven autoscaling (including to zero) and event handling
- [ ] A replacement for etcd
- [ ] A new container image format
- [ ] A new CNI plugin

## Explanation

Knative Serving manages revisions of a workload and scales Pods based on incoming request traffic, including down to zero when idle, while Knative Eventing provides a standard way to produce, route, and consume events, both running as Kubernetes CRDs and controllers.

## Explicação para criança

É como adicionar um recepcionista esperto ao prédio (Kubernetes) que só chama funcionários (Pods) quando alguém realmente aparece na porta, e manda todo mundo embora quando não tem visitante.

