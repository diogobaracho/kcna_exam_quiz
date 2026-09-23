---
id: kf-api-001
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [kubectl, imperative]
source: LFS158 ch.3
---

# Question

Which kubectl command creates a Pod directly from the command line without writing a YAML file first?

## Options

- [ ] kubectl apply -f pod.yaml
- [x] kubectl run mypod --image=nginx
- [ ] kubectl describe pod mypod
- [ ] kubectl get pods

## Explanation

`kubectl run` is the classic imperative command: it builds and submits a Pod spec for you from flags, without needing a manifest file, which is handy for quick tests.

## Explicação para criança

É como pedir um lanche de boca em vez de escrever a receita: `kubectl run` já manda fazer o Pod na hora, sem precisar de um papel (arquivo) explicando tudo antes.

