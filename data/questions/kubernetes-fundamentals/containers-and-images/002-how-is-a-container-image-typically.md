---
id: kf-img-002
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: easy
tags: [images, layers]
source: LFS158 ch.2
---

# Question

How is a container image typically structured internally?

## Options

- [x] As a stack of read-only layers plus image metadata, combined at runtime with a union filesystem
- [ ] As a single monolithic binary file with no internal structure
- [ ] As a live virtual machine snapshot
- [ ] As a database of running process states

## Explanation

An image is built from ordered, read-only layers (each usually corresponding to a Dockerfile instruction); when a container starts, the runtime stacks these layers and adds a thin writable layer on top.

## Explicação para criança

É como uma torta de camadas: cada camada já vem pronta e não muda, e quando alguém vai comer (rodar o contêiner), põe uma coberta extra por cima que pode ser mexida.

