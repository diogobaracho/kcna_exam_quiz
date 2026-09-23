---
id: kf-arch-013
category: kubernetes-fundamentals
topic: architecture
difficulty: hard
tags: [static-pods, control-plane]
source: LFS158 ch.5
---

# Question

In a kubeadm-based cluster, how are the control plane components (kube-apiserver, kube-scheduler, kube-controller-manager) themselves usually run?

## Options

- [x] As static Pods managed directly by the kubelet on each control plane node
- [ ] As Deployments scheduled by kube-scheduler
- [ ] As DaemonSets that require etcd to already be running
- [ ] As systemd-only processes that Kubernetes cannot observe

## Explanation

kubeadm places manifest files for the control plane components in a directory the kubelet watches; the kubelet starts them as static Pods without needing the API server to be up first, which solves the chicken-and-egg problem of bootstrapping the control plane.

## Explicação para criança

É como acender a primeira vela usando um fósforo antes de ter luz elétrica: o kubelet consegue ligar essas peças sozinho, lendo arquivos locais, antes mesmo do 'chefe' (API server) estar de pé.

