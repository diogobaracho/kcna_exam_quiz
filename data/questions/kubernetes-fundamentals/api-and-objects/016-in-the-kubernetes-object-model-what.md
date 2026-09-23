---
id: kf-api-016
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [objects, spec-status]
source: LFS158 ch.3
---

# Question

In the Kubernetes object model, what is the difference between `spec` and `status`?

## Options

- [x] `spec` is the desired state you declare; `status` is the observed current state reported by the system
- [ ] `spec` is read-only; `status` is the only field you can edit
- [ ] `spec` only applies to Pods; `status` applies to every object
- [ ] They are two names for the same field kept for backward compatibility

## Explanation

You write the `spec` to describe what you want; controllers work to make reality match it and then report what actually happened in `status`, which you never set directly.

## Explicação para criança

O `spec` é o pedido que você faz ('quero uma pizza de calabresa'); o `status` é o que realmente chegou na mesa ('a pizza está pronta e a caminho').

