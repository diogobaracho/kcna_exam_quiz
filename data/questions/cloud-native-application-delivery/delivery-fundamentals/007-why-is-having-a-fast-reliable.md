---
id: cnad-fund-007
category: cloud-native-application-delivery
topic: delivery-fundamentals
difficulty: easy
tags: [rollback]
source: LFS250 module 11
---

# Question

Why is having a fast, reliable rollback mechanism considered essential in cloud native delivery?

## Options

- [x] It lets teams quickly undo a bad release and restore service, limiting the impact of problems discovered after deployment
- [ ] It removes the need for any testing before release
- [ ] Rollbacks are only relevant for database schema changes
- [ ] It guarantees a release will never have bugs

## Explanation

No amount of pre-release testing catches every issue; a fast rollback path (like `kubectl rollout undo`, or switching a blue-green router back) minimizes how long users are affected when a release does cause a problem.

## Explicação para criança

É como ter um botão de 'desfazer' rápido: se algo sair errado depois que a peça nova entrou no jogo, dá para voltar para a peça de antes sem grande estrago.

