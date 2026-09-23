---
id: kf-api-006
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [labels]
source: LFS158 ch.7
---

# Question

What are labels used for in Kubernetes?

## Options

- [x] Key-value pairs attached to objects so they can be grouped and selected, for example by Services or Deployments
- [ ] Encrypting secret values before they reach a Pod
- [ ] Defining how much CPU a container may use
- [ ] Storing the logs produced by a container

## Explanation

Labels are arbitrary, user-defined key-value metadata attached to objects. Selectors then match on labels so controllers like Deployments and Services can find the exact set of Pods they should manage or route to.

## Explicação para criança

Labels são como etiquetas coloridas em caixas de mudança: escrevendo 'cozinha' ou 'quarto' você consegue depois separar rapidinho as caixas certas sem abrir todas.

