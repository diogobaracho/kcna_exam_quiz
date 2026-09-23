---
id: kf-api-022
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [kubectl, delete]
source: LFS158 ch.3
---

# Question

Which command removes a Deployment named `web` from the current namespace?

## Options

- [x] kubectl delete deployment web
- [ ] kubectl stop deployment web
- [ ] kubectl remove web --kind=deployment
- [ ] kubectl apply -f web.yaml --delete

## Explanation

`kubectl delete <kind> <name>` sends a delete request for that specific object to the API server, which then triggers garbage collection of its dependents (like the Deployment's ReplicaSet and Pods).

## Explicação para criança

É como jogar fora uma caixa e tudo que estava dentro dela junto: apagar o Deployment também leva embora os Pods que ele controlava.

