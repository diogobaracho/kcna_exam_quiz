---
id: kf-arch-018
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [addons, dns]
source: LFS158 ch.4
---

# Question

Which cluster add-on provides internal DNS so Pods can resolve Service names like `my-svc.my-namespace`?

## Options

- [x] CoreDNS
- [ ] kube-proxy
- [ ] etcd
- [ ] kube-scheduler

## Explanation

CoreDNS is the standard cluster add-on that runs as Pods watching Services and Endpoints, serving DNS records so workloads can reach each other by name instead of hardcoded IP addresses.

## Explicação para criança

O CoreDNS é como uma lista telefônica do cluster: em vez de decorar o número (IP) de cada Service, você só precisa saber o nome, e ele acha o número certo para você.

