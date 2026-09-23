---
id: kf-api-017
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [configmap]
source: LFS158 ch.9
---

# Question

What is a ConfigMap typically used for?

## Options

- [x] Storing non-sensitive configuration data as key-value pairs that Pods can consume as env vars or files
- [ ] Storing TLS private keys securely
- [ ] Defining which nodes a Pod can be scheduled on
- [ ] Recording the history of past Deployment rollouts

## Explanation

ConfigMaps decouple configuration from container images: values like feature flags or URLs are stored as an object and injected into Pods as environment variables or mounted files, without rebuilding the image.

## Explicação para criança

É como uma cartela de instruções separada da caixa do brinquedo: você pode trocar as instruções sem precisar comprar um brinquedo novo.

