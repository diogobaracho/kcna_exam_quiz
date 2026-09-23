---
id: cna-fund-002
category: cloud-native-architecture
topic: fundamentals
difficulty: medium
tags: [12-factor]
source: The Twelve-Factor App
---

# Question

The Twelve-Factor App methodology recommends storing configuration where?

## Options

- [x] In environment variables, separate from the code
- [ ] Hardcoded directly in the application source code
- [ ] In a compiled binary only
- [ ] In the container image's filesystem permanently

## Explanation

One of the twelve factors states that config that varies between deployments (database URLs, credentials, feature flags) should live in environment variables, keeping the same build artifact deployable across environments without code changes.

## Explicação para criança

É como deixar os temperos separados da receita escrita: a mesma receita (código) pode ser feita com temperos diferentes (configuração) dependendo de onde você está cozinhando.

