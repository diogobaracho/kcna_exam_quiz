---
id: kf-wl-007
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [statefulset]
source: LFS158 ch.8
---

# Question

What distinguishes a StatefulSet from a Deployment?

## Options

- [x] StatefulSet Pods get stable, unique network identities and stable storage, and are created/deleted in order
- [ ] StatefulSet Pods share a single IP address between replicas
- [ ] StatefulSet cannot be scaled up or down
- [ ] StatefulSet does not support container probes

## Explanation

Each StatefulSet Pod gets a persistent, predictable name and hostname (like `db-0`, `db-1`) plus its own PersistentVolumeClaim, and Pods are started, updated, and terminated in a defined order, which suits clustered stateful applications like databases.

## Explicação para criança

É como ter quartos numerados numa pousada: o hóspede do quarto 1 sempre volta para o quarto 1 com as mesmas malas, em vez de ser trocado de quarto toda hora.

