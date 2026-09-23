---
id: cnad-cicd-002
category: cloud-native-application-delivery
topic: ci-cd-tooling
difficulty: medium
tags: [kustomize]
source: LFS250 module 11
---

# Question

How does Kustomize's approach to managing manifest variations differ from Helm's?

## Options

- [x] Kustomize applies template-free overlays and patches on top of plain YAML bases, while Helm uses a templating language with variables inside the YAML itself
- [ ] Kustomize and Helm produce completely different, incompatible resource types
- [ ] Kustomize can only be used outside of Kubernetes
- [ ] Kustomize requires compiling Go code for every change

## Explanation

Kustomize (built into kubectl) starts from plain, valid Kubernetes YAML and layers declarative patches/overlays for different environments (e.g. dev vs prod), avoiding the templating syntax embedded inside YAML that Helm charts use.

## Explicação para criança

É como ajustar uma receita colando adesivos de mudança por cima da receita original (Kustomize), em vez de escrever a receita já com espaços em branco para preencher depois (Helm).

