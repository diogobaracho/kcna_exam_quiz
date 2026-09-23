---
id: kf-img-010
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: easy
tags: [images, tags]
source: LFS158 ch.2
---

# Question

In the image reference `myrepo/app:1.4.2`, what does `1.4.2` represent?

## Options

- [x] The tag identifying a specific version of the image
- [ ] The number of layers in the image
- [ ] The port the container listens on
- [ ] The CPU architecture required

## Explanation

The part after the colon is the tag, a human-readable label pointing at a specific image digest; the same repository can hold many tags for different versions or builds.

## Explicação para criança

É como o número da edição de uma revista: o nome da revista (repositório) é o mesmo, mas o número (tag) diz exatamente qual edição você está pegando.

