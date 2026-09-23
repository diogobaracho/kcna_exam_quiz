---
id: cnad-fund-006
category: cloud-native-application-delivery
topic: delivery-fundamentals
difficulty: medium
tags: [pipelines]
source: LFS250 module 11
---

# Question

Which of the following is a typical stage found in a cloud native CI/CD pipeline, after code is committed?

## Options

- [x] Build the artifact, run automated tests, then package and push a container image to a registry
- [ ] Skip all testing and deploy directly to production
- [ ] Manually copy files onto each server over FTP
- [ ] Wait for a fixed number of days before doing anything

## Explanation

A typical pipeline compiles/builds the code, runs unit and integration tests, and if they pass, packages the result as a container image and pushes it to a registry, ready to be deployed by a later stage.

## Explicação para criança

É como uma linha de montagem: cada etapa (montar, testar, embalar) acontece em ordem, e só se a etapa anterior deu certo é que a próxima começa.

