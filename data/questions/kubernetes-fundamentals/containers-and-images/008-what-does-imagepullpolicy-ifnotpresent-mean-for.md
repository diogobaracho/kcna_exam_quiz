---
id: kf-img-008
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: medium
tags: [image-pull-policy]
source: LFS158 ch.5
---

# Question

What does `imagePullPolicy: IfNotPresent` mean for a container in a Pod spec?

## Options

- [x] The kubelet only pulls the image if it is not already cached on the node
- [ ] The kubelet always pulls the image fresh, ignoring the local cache
- [ ] The kubelet never pulls the image, even if missing
- [ ] The image is pulled only during cluster installation

## Explanation

With `IfNotPresent`, the kubelet reuses a locally cached image with the same name and tag if it exists, avoiding a repeat pull; `Always` forces a fresh pull check on every start, and is the default when the tag is `latest`.

## Explicação para criança

É como só ir ao mercado se a despensa estiver vazia: se já tem o produto guardado, não precisa buscar de novo.

