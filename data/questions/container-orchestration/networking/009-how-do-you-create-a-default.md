---
id: co-net-009
category: container-orchestration
topic: networking
difficulty: hard
tags: [networkpolicy, default-deny]
source: LFS158 ch.9
---

# Question

How do you create a 'default deny all ingress' NetworkPolicy for a namespace?

## Options

- [x] Create a NetworkPolicy with an empty podSelector (matching all Pods) and an ingress field with no rules
- [ ] Delete the CNI plugin from the cluster
- [ ] Set every Pod's restartPolicy to Never
- [ ] Create a NetworkPolicy with podSelector matching no Pods

## Explanation

A NetworkPolicy selecting all Pods (`podSelector: {}`) with `policyTypes: [Ingress]` and no `ingress` rules blocks all inbound traffic to those Pods by default; you then add further NetworkPolicies to explicitly allow the traffic you want.

## Explicação para criança

É como trancar todas as portas do prédio de uma vez e depois ir liberando, uma por uma, só as entradas que você realmente quer permitir.

