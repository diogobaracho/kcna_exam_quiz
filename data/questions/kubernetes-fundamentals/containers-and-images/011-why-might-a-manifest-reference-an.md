---
id: kf-img-011
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: hard
tags: [images, digest]
source: LFS158 ch.2
---

# Question

Why might a manifest reference an image by digest (e.g. `app@sha256:abcd...`) instead of by tag?

## Options

- [x] A digest is an immutable content hash, guaranteeing the exact same image bytes are pulled every time
- [ ] Digests pull faster than tags because they skip the registry
- [ ] Digests are required for every Kubernetes object, not just images
- [ ] Tags cannot be used with private registries

## Explanation

A digest is a cryptographic hash of the image content, so it can never silently point to different bytes the way a mutable tag can; pinning by digest gives strong reproducibility guarantees for production deployments.

## Explicação para criança

É como identificar alguém pela impressão digital em vez do apelido: o apelido pode ser usado por outra pessoa depois, mas a impressão digital nunca muda de dono.

