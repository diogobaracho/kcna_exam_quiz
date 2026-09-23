---
id: kf-arch-020
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [namespaces, control-plane]
source: LFS158 ch.4
---

# Question

In a typical cluster, in which namespace do the control plane's own Pods (such as CoreDNS or a kubeadm-managed kube-apiserver) usually appear?

## Options

- [x] kube-system
- [ ] default
- [ ] kube-public
- [ ] kube-node-lease

## Explanation

The `kube-system` namespace is reserved for objects created by the Kubernetes system itself, including control plane components run as Pods and cluster add-ons like CoreDNS.

## Explicação para criança

kube-system é como a sala dos funcionários de um prédio: é onde ficam as peças que fazem o prédio (o cluster) funcionar, separadas das salas dos moradores comuns.

