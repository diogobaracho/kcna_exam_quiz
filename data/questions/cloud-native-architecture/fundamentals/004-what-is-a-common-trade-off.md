---
id: cna-fund-004
category: cloud-native-architecture
topic: fundamentals
difficulty: hard
tags: [microservices, tradeoffs]
source: LFS250 module 1
---

# Question

What is a common trade-off teams accept when adopting a microservices architecture?

## Options

- [x] Increased operational complexity (networking, observability, deployment coordination) in exchange for independent scalability and deployability
- [ ] Guaranteed lower total infrastructure cost in every case
- [ ] The complete elimination of the need for testing
- [ ] Automatic elimination of all network latency between services

## Explanation

Splitting a monolith into many services introduces distributed-systems challenges: network calls that can fail, the need for service discovery, distributed tracing, and careful deployment coordination, all in exchange for the flexibility of scaling and deploying pieces independently.

## Explicação para criança

É como ganhar a liberdade de trocar só uma barraquinha da feira sem fechar a feira inteira, mas agora você precisa organizar o trânsito entre várias barraquinhas em vez de uma cozinha só.

