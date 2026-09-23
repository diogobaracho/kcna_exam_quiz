---
id: kf-img-004
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: easy
tags: [registry]
source: LFS158 ch.2
---

# Question

What is a container registry?

## Options

- [x] A service that stores and distributes container images, referenced by name and tag
- [ ] A component that schedules Pods onto nodes
- [ ] The place where Kubernetes stores cluster state
- [ ] A tool for writing YAML manifests

## Explanation

A registry (like Docker Hub, GHCR, or a private registry) hosts image repositories that clients push to and pull from, identified by a reference such as `registry/namespace/image:tag`.

## Explicação para criança

É como uma biblioteca de imagens: você guarda seu livro (imagem) lá com um nome e depois qualquer pessoa autorizada pode pegar emprestado (baixar) o mesmo livro.

