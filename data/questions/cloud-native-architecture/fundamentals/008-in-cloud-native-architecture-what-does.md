---
id: cna-fund-008
category: cloud-native-architecture
topic: fundamentals
difficulty: hard
tags: [loose-coupling]
source: CNCF definition
---

# Question

In cloud native architecture, what does 'loose coupling' between services aim to achieve?

## Options

- [x] Services can be developed, deployed, and scaled independently, minimizing the ripple effect when one service changes or fails
- [ ] All services must share the exact same database schema
- [ ] Services must always run on the same node
- [ ] Loose coupling means services cannot communicate at all

## Explanation

Loosely coupled services interact through well-defined, stable interfaces (APIs, message queues) rather than sharing internal implementation details, so a change or failure in one service has a limited, contained impact on others.

## Explicação para criança

É como amigos que combinam encontrar num ponto certo da cidade, sem precisar saber os detalhes da casa um do outro: cada um pode mudar sua rotina sem bagunçar a combinação.

