---
id: kf-arch-024
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [single-node, architecture]
source: LFS158 ch.2
---

# Question

In a single-node development cluster such as one created by kind or Minikube, where do the control plane components and the application Pods run?

## Options

- [x] All on the same single node
- [ ] Control plane components run outside the cluster on the host OS only
- [ ] Application Pods run locally while control plane components run in the cloud
- [ ] It is not possible to run a functional cluster on a single node

## Explanation

Single-node clusters used for learning and local development still run the full set of control plane components and worker components, just co-located on one machine, which is why the same object model works there and in production.

## Explicação para criança

É como montar uma cidade inteira dentro de uma casinha de bonecas: tudo que existe numa cidade grande (chefia e moradores) cabe ali, só que em um espaço bem menor.

