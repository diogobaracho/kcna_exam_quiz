---
id: kf-api-021
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [api-versions, deprecation]
source: LFS158 ch.3
---

# Question

What does it typically mean when a Kubernetes API version is labeled `v1beta1`?

## Options

- [x] The API is still evolving and may change or be removed in a future release; it is not yet fully stable
- [ ] It is the fastest performing version of the API
- [ ] It only works with beta versions of kubectl
- [ ] It is a deprecated alias that always points to v1

## Explanation

Kubernetes API versioning uses alpha, beta, and stable (v1, v2, ...) tiers; `beta` versions are enabled by default and reasonably well tested but can still receive breaking changes before graduating to a stable version.

## Explicação para criança

É como um brinquedo de teste antes de ir para as lojas: já funciona bem, mas ainda pode receber ajustes antes da versão final chegar para todo mundo.

