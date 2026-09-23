---
id: cnad-fund-004
category: cloud-native-application-delivery
topic: delivery-fundamentals
difficulty: medium
tags: [blue-green]
source: LFS250 module 11
---

# Question

How does a blue-green deployment strategy work?

## Options

- [x] Two full environments run side by side (one live, one idle with the new version); traffic is switched over all at once, with the old environment kept as an instant rollback path
- [ ] It slowly increases traffic to the new version over hours
- [ ] It requires deleting the old version before deploying the new one
- [ ] It only works for database migrations

## Explanation

Blue-green keeps two complete environments: 'blue' (current) serves live traffic while 'green' (new version) is deployed and verified separately; a router or load balancer then cuts traffic over to green, and blue stays available for a quick rollback if something goes wrong.

## Explicação para criança

É como ter duas casas idênticas prontas: todo mundo mora na casa azul, e quando a casa verde (nova versão) está pronta e testada, todo mundo se muda de uma vez, podendo voltar rapidinho se algo der errado.

