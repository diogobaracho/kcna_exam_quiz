---
id: kf-arch-004
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [control-plane, scheduler]
source: LFS158 ch.4
---

# Question

What is the primary job of kube-scheduler?

## Options

- [x] Deciding which node a newly created Pod should run on
- [ ] Storing the desired state of every object in the cluster
- [ ] Forwarding traffic between Services and Pods
- [ ] Pulling container images onto nodes

## Explanation

kube-scheduler watches for Pods with no assigned node and picks a suitable node for each one, based on resource requests, constraints, affinity rules, and taints/tolerations.

## Explicação para criança

O kube-scheduler é tipo um organizador de uma festa que decide em qual mesa cada convidado (Pod) vai sentar, olhando quantas cadeiras livres (recursos) cada mesa (nó) tem.

