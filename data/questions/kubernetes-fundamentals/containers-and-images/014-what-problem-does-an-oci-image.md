---
id: kf-img-014
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: hard
tags: [image-format, manifest-list]
source: LFS158 ch.2
---

# Question

What problem does an OCI image index (a.k.a. manifest list) solve?

## Options

- [x] It lets one image tag resolve to different platform-specific images (e.g. amd64, arm64) so clients pull the right one automatically
- [ ] It compresses several unrelated images into a single file
- [ ] It replaces the need for image tags
- [ ] It stores the Kubernetes RBAC rules for pulling an image

## Explanation

A manifest list maps a single tag to multiple platform-specific manifests; the client's runtime picks the manifest matching its OS/architecture, which is how multi-arch images work transparently for users.

## Explicação para criança

É como um cardápio que se ajusta sozinho: dependendo de quem pede (qual tipo de computador), a cozinha entrega a versão certa do prato, sem o cliente precisar escolher manualmente.

