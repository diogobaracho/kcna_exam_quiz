---
id: cna-fund-007
category: cloud-native-architecture
topic: fundamentals
difficulty: medium
tags: [api-driven]
source: CNCF definition
---

# Question

Why do cloud native systems emphasize declarative, API-driven management over manual, ad-hoc changes?

## Options

- [x] APIs allow automation, auditing, and consistent reconciliation of infrastructure state by machines rather than manual, error-prone steps
- [ ] APIs remove the need for any human oversight ever
- [ ] APIs are only useful for billing purposes
- [ ] Declarative APIs prevent any configuration from ever changing

## Explanation

Exposing infrastructure and application state through APIs (like the Kubernetes API) lets tools automate creation, changes, and reconciliation reliably and consistently, which is much harder to achieve with manual, one-off changes made by different people.

## Explicação para criança

É como preencher um formulário padrão em vez de pedir favores diferentes para cada pessoa: fica mais fácil automatizar, revisar e repetir o processo do jeito certo.

