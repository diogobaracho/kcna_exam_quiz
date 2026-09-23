---
id: kf-arch-022
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [kubeconfig, kubectl]
source: LFS158 ch.3
---

# Question

What is the purpose of a kubeconfig file?

## Options

- [x] It stores cluster connection details, credentials, and contexts that kubectl uses to talk to one or more clusters
- [ ] It defines the resource limits for every Pod in the cluster
- [ ] It is the manifest that starts etcd
- [ ] It configures which container runtime the kubelet uses

## Explanation

A kubeconfig file bundles cluster addresses, user credentials, and named contexts, letting kubectl (and other clients) switch between clusters and identities without retyping connection details.

## Explicação para criança

O kubeconfig é como a agenda de contatos do seu celular: guarda o endereço e a senha de cada cluster para você não precisar decorar tudo toda vez que quiser falar com ele.

