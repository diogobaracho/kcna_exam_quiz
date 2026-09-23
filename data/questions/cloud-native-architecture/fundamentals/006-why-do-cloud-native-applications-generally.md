---
id: cna-fund-006
category: cloud-native-architecture
topic: fundamentals
difficulty: medium
tags: [statelessness]
source: LFS250 module 1
---

# Question

Why do cloud native applications generally favor stateless services where possible?

## Options

- [x] Stateless services can be scaled, replaced, or rescheduled freely since no instance holds irreplaceable local data
- [ ] Stateless services never need a database
- [ ] Stateless services always run faster than stateful ones
- [ ] Stateless services cannot be containerized

## Explanation

A stateless service keeps no essential data in its own memory or local disk between requests, so any replica can handle any request and be killed and replaced without data loss, which is exactly what orchestrators need to scale and heal workloads freely.

## Explicação para criança

É como um atendente que não precisa lembrar de nada da conversa anterior: qualquer outro atendente pode continuar o atendimento sem perder informação importante.

