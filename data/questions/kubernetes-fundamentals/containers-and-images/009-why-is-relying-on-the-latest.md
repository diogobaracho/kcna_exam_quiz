---
id: kf-img-009
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: medium
tags: [image-pull-policy, latest]
source: LFS158 ch.5
---

# Question

Why is relying on the `latest` tag considered risky in production Kubernetes manifests?

## Options

- [x] It is a mutable pointer that can silently change to a different image over time, making rollouts unpredictable and hard to reproduce
- [ ] Kubernetes refuses to schedule Pods using the `latest` tag
- [ ] The `latest` tag disables all resource limits
- [ ] It forces the Pod onto the control plane node

## Explanation

Because `latest` is just a tag someone can re-push to point at a new image, two Pods created at different times from 'the same' manifest can end up running different code, defeating reproducibility; pinning to a specific tag or digest avoids this.

## Explicação para criança

É como combinar de encontrar o 'amigo mais engraçado da turma' sem dizer o nome: essa pessoa pode mudar de um dia para o outro, então melhor combinar com um nome certo.

