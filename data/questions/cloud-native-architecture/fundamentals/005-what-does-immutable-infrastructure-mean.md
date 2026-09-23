---
id: cna-fund-005
category: cloud-native-architecture
topic: fundamentals
difficulty: easy
tags: [immutable-infrastructure]
source: LFS250 module 1
---

# Question

What does 'immutable infrastructure' mean?

## Options

- [x] Once deployed, servers or containers are never modified in place; changes are made by deploying new replacements built from updated images
- [ ] Infrastructure that can never be deleted
- [ ] Infrastructure that only runs on physical hardware
- [ ] A server that automatically upgrades its own operating system

## Explanation

Rather than patching a running instance, immutable infrastructure builds a new image or container with the change and replaces the old instance entirely, making deployments reproducible and eliminating configuration drift.

## Explicação para criança

É como trocar um brinquedo quebrado por um novo igual, já consertado de fábrica, em vez de tentar colar as peças do brinquedo velho.

