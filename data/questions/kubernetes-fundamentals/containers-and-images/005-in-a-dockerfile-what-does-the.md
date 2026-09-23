---
id: kf-img-005
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: medium
tags: [dockerfile]
source: LFS158 ch.2
---

# Question

In a Dockerfile, what does the `FROM` instruction do?

## Options

- [x] It sets the base image that subsequent layers are built on top of
- [ ] It defines the command that runs when the container starts
- [ ] It copies files from the host into the image
- [ ] It exposes a network port from the container

## Explanation

`FROM` selects the starting base image (for example a minimal OS or a language runtime image); every other instruction in the Dockerfile adds layers on top of it.

## Explicação para criança

É como escolher a massa base de uma pizza antes de colocar os ingredientes: tudo o que vem depois é construído em cima dessa base escolhida.

