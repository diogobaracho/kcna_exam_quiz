---
id: co-sec-011
category: container-orchestration
topic: security
difficulty: medium
tags: [image-scanning]
source: LFS250 module 10
---

# Question

Why is scanning container images for known vulnerabilities (CVEs) part of a cloud native security pipeline?

## Options

- [x] It catches vulnerable dependencies or base images before they are deployed to a running cluster
- [ ] It replaces the need for RBAC and NetworkPolicy
- [ ] It is only useful after an incident has already happened
- [ ] It guarantees an application has no bugs

## Explanation

Image scanning inspects the packages and libraries baked into an image against vulnerability databases, letting teams catch and fix known issues in a CI pipeline before the image ever reaches production, shifting security left.

## Explicação para criança

É como revisar os ingredientes de uma receita antes de servir, para garantir que nada estragado ou perigoso vá parar no prato de alguém.

