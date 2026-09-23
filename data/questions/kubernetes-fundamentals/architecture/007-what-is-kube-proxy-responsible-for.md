---
id: kf-arch-007
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [node, kube-proxy]
source: LFS158 ch.4
---

# Question

What is kube-proxy responsible for on each node?

## Options

- [x] Maintaining network rules that implement Service virtual IPs and load balancing to Pods
- [ ] Scheduling Pods onto the node
- [ ] Building and storing container images
- [ ] Running the etcd database replica for the node

## Explanation

kube-proxy watches Services and Endpoints/EndpointSlices and programs rules (iptables, IPVS, or nftables) on the node so traffic sent to a Service's virtual IP reaches one of the backing Pods.

## Explicação para criança

O kube-proxy é como um carteiro que sabe transformar o endereço geral de um prédio (o Service) no apartamento certo (o Pod) para entregar a carta certa.

