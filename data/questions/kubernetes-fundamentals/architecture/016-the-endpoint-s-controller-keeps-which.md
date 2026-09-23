---
id: kf-arch-016
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [controllers]
source: LFS158 ch.4
---

# Question

The endpoint(s) controller keeps which object up to date as Pods matching a Service's selector come and go?

## Options

- [x] The Endpoints/EndpointSlice object listing ready Pod IPs for the Service
- [ ] The etcd snapshot schedule
- [ ] The kubeconfig file used by kubectl
- [ ] The container image cache on each node

## Explanation

The endpoint(s) controller watches Pods and Services and continuously updates the Endpoints or EndpointSlice objects with the current list of Pod IPs that match a Service's selector and are ready to receive traffic.

## Explicação para criança

É como uma lista de presença atualizada o tempo todo: sempre que um aluno (Pod) chega ou sai da sala do Service, a lista é corrigida na hora.

