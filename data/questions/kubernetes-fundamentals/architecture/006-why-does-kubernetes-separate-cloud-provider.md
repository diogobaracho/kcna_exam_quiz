---
id: kf-arch-006
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [control-plane, cloud-controller-manager]
source: LFS158 ch.4
---

# Question

Why does Kubernetes separate cloud-provider logic into a cloud-controller-manager instead of building it into kube-controller-manager?

## Options

- [x] So cloud-specific code (load balancers, routes, node metadata) can evolve independently of core Kubernetes
- [ ] Because cloud-controller-manager replaces etcd in managed clusters
- [ ] Because only cloud-controller-manager can talk to the kube-apiserver
- [ ] So that Pods can be scheduled without kube-scheduler

## Explanation

The cloud-controller-manager isolates provider-specific integration (for example provisioning load balancers or setting node addresses) from the core control loops, letting cloud vendors maintain their own plugin without patching Kubernetes itself.

## Explicação para criança

É como separar o eletricista da empresa de energia do resto da equipe de manutenção do prédio: cada nuvem (AWS, GCP, Azure) tem suas próprias regras, então esse pedaço fica isolado e pode mudar sem bagunçar o resto.

