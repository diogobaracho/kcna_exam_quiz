---
id: cnad-cicd-006
category: cloud-native-application-delivery
topic: ci-cd-tooling
difficulty: medium
tags: [helm, values]
source: LFS250 module 11
---

# Question

In a Helm chart, what is the role of the `values.yaml` file?

## Options

- [x] It provides the default configuration values that fill in the chart's templates, which users can override per installation
- [ ] It stores the compiled binary of the application
- [ ] It lists the RBAC permissions granted to cluster-admin
- [ ] It defines the container runtime used by the chart

## Explanation

`values.yaml` supplies the default parameters (image tag, replica count, resource limits, and so on) that Helm substitutes into the chart's templates; users can override any of these at install or upgrade time with `--set` or their own values file.

## Explicação para criança

É como a lista de ingredientes padrão de uma receita, que você pode trocar na hora de cozinhar (por exemplo, usar menos açúcar) sem precisar reescrever a receita inteira.

