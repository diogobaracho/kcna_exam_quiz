---
id: kf-wl-004
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [deployment, replicaset]
source: LFS158 ch.8
---

# Question

Why do most people manage Pods through a Deployment rather than creating a ReplicaSet directly?

## Options

- [x] A Deployment manages ReplicaSets for you and adds rolling updates, rollback, and revision history
- [ ] A ReplicaSet cannot run more than one Pod
- [ ] A Deployment is required before etcd will accept any Pod
- [ ] ReplicaSets cannot use labels, only Deployments can

## Explanation

A Deployment owns one or more ReplicaSets over time; changing its Pod template creates a new ReplicaSet and scales it up while scaling the old one down, giving you rolling updates and the ability to roll back to a previous revision.

## Explicação para criança

Se o ReplicaSet é o contador de bonecos, o Deployment é o gerente que troca o modelo de boneco aos poucos, sem deixar a prateleira vazia nem por um segundo.

