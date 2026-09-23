---
id: kf-api-025
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [namespaces, default]
source: LFS158 ch.6
---

# Question

If you create a Pod without specifying a namespace and never switched context, which namespace does it land in?

## Options

- [x] default
- [ ] kube-system
- [ ] kube-public
- [ ] None; it fails without a namespace

## Explanation

Kubernetes ships with a namespace literally called `default`; any namespaced object created without an explicit namespace (and no different context namespace configured) is placed there.

## Explicação para criança

É como uma gaveta 'geral' de uma cômoda: se você não escolher uma gaveta específica, a roupa cai automaticamente na gaveta padrão.

