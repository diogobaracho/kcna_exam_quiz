---
id: kf-img-003
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: medium
tags: [images, layers]
source: LFS158 ch.2
---

# Question

Why do image layers make distributing updated images more efficient?

## Options

- [x] Only the layers that changed need to be pushed or pulled; unchanged layers are reused from cache
- [ ] Layers compress images to zero bytes
- [ ] Layers eliminate the need for a registry
- [ ] Layers are always merged into one file before being pushed

## Explanation

Since layers are content-addressed and immutable, a registry and local Docker/containerd cache can skip re-downloading layers that are already present, so a small code change usually means only the top layer needs to move.

## Explicação para criança

É como reimprimir só a página que mudou de um livro, em vez do livro inteiro de novo, porque as outras páginas já estão prontas e guardadas.

