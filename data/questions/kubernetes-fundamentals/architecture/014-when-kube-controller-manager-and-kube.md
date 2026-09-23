---
id: kf-arch-014
category: kubernetes-fundamentals
topic: architecture
difficulty: hard
tags: [leader-election, control-plane]
source: LFS158 ch.5
---

# Question

When kube-controller-manager and kube-scheduler run with multiple replicas for high availability, how do they avoid conflicting actions?

## Options

- [ ] Each replica handles a different, fixed subset of namespaces
- [x] They use leader election so only one replica is active at a time; the rest stand by
- [ ] They coordinate through kube-proxy's iptables rules
- [ ] Only the replica running on the same node as etcd's leader is allowed to act

## Explanation

Replicas of kube-scheduler and kube-controller-manager race to acquire a lease object through the API server; the winner becomes the active leader and performs the work, while the others watch and take over automatically if the leader's lease expires.

## Explicação para criança

É como vários goleiros reservas: só um fica no gol de cada vez. Se ele se machucar, outro entra rapidinho, mas nunca dois jogam a mesma posição ao mesmo tempo.

