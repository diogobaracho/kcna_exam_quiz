---
id: kf-api-012
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [kubectl, get]
source: LFS158 ch.3
---

# Question

Which command lists all Pods in the current namespace along with their status?

## Options

- [x] kubectl get pods
- [ ] kubectl describe namespace
- [ ] kubectl logs pods
- [ ] kubectl config get-contexts

## Explanation

`kubectl get pods` queries the API server for Pod objects in the active namespace and prints a summary table including name, ready count, status, restarts, and age.

## Explicação para criança

É como pedir a lista de chamada da sala: `kubectl get pods` mostra quem (quais Pods) está presente e como cada um está.

