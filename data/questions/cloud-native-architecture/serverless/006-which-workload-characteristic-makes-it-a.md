---
id: cna-sls-006
category: cloud-native-architecture
topic: serverless
difficulty: easy
tags: [serverless, use-cases]
source: LFS250 module 7
---

# Question

Which workload characteristic makes it a good fit for a serverless/FaaS approach?

## Options

- [x] Short-lived, event-triggered tasks with variable or unpredictable traffic
- [ ] A long-running database that must never restart
- [ ] A stateful application requiring a fixed, always-on identity
- [ ] A workload that needs guaranteed dedicated hardware at all times

## Explanation

FaaS shines for bursty, event-driven work (image resizing on upload, webhook handlers, scheduled jobs) where paying only for actual invocation time and scaling automatically with demand is more efficient than running dedicated always-on infrastructure.

## Explicação para criança

É como chamar um ajudante só quando chega uma encomenda, em vez de pagar alguém parado o dia inteiro esperando uma encomenda que pode nem chegar.

