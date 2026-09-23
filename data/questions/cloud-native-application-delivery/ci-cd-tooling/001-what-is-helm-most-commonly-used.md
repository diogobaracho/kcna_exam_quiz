---
id: cnad-cicd-001
category: cloud-native-application-delivery
topic: ci-cd-tooling
difficulty: easy
tags: [helm]
source: LFS250 module 11
---

# Question

What is Helm most commonly used for in the Kubernetes ecosystem?

## Options

- [x] Packaging, templating, and versioning collections of Kubernetes manifests as reusable 'charts' that can be installed and upgraded
- [ ] Replacing kube-apiserver for smaller clusters
- [ ] Scanning container images for vulnerabilities
- [ ] Building container images from source code

## Explanation

Helm charts bundle templated YAML manifests with configurable values, letting you install, upgrade, and roll back a whole application (with all its objects) as a single named release, rather than managing many raw manifest files by hand.

## Explicação para criança

É como uma receita de bolo pronta que você pode ajustar (mais ou menos açúcar) antes de assar, em vez de escrever a receita inteira do zero toda vez.

