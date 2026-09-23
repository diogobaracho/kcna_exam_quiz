---
id: kf-arch-011
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [ha, control-plane]
source: LFS158 ch.5
---

# Question

In a highly available cluster with three control plane nodes, why is kube-apiserver usually placed behind a load balancer?

## Options

- [x] To let clients keep working if one API server replica fails, since any replica can serve requests
- [ ] Because only one API server replica is ever active and the others are backups on standby disks
- [ ] To let the load balancer replace etcd's quorum mechanism
- [ ] Because kubelets require a different API server than kubectl does

## Explanation

kube-apiserver is stateless and can run as multiple identical replicas that all read and write the same etcd cluster; a load balancer in front distributes client and node traffic and hides the failure of any single replica.

## Explicação para criança

É como ter três atendentes numa loja em vez de um só: se um sai para o almoço, os outros dois continuam atendendo e o cliente nem percebe a troca.

