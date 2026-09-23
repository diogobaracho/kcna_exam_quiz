---
id: kf-api-002
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [kubectl, declarative]
source: LFS158 ch.3
---

# Question

What does `kubectl apply -f deployment.yaml` do differently from `kubectl create -f deployment.yaml`?

## Options

- [x] apply creates or updates the object to match the file, and can be run repeatedly; create fails if the object already exists
- [ ] apply only works for Pods, create works for every object type
- [ ] apply deletes the object first and create only adds new fields
- [ ] There is no difference between the two commands

## Explanation

`kubectl apply` computes a diff against the live object and the last applied configuration, so re-running it is safe and declarative; `kubectl create` is imperative and errors out if the resource already exists.

## Explicação para criança

O `apply` é como atualizar uma lista de compras: se já existe, ele ajusta o que mudou. O `create` é como tentar criar a lista do zero - se já tiver uma, ele reclama.

