---
id: kf-wl-020
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [scaling]
source: LFS158 ch.8
---

# Question

Which command scales a Deployment named `web` to 5 replicas?

## Options

- [x] kubectl scale deployment/web --replicas=5
- [ ] kubectl set replicas web=5
- [ ] kubectl edit deployment web --replicas 5
- [ ] kubectl apply --scale=5 web

## Explanation

`kubectl scale` updates the `replicas` field of the target object directly; the Deployment's controller then creates or removes Pods (through its ReplicaSet) to match.

## Explicação para criança

É como dizer 'quero 5 cadeiras nessa mesa': o comando muda o número desejado, e o Deployment cuida de colocar ou tirar cadeiras até bater esse número.

