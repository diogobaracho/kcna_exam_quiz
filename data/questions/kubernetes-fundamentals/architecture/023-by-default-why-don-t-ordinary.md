---
id: kf-arch-023
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [taints, control-plane]
source: LFS158 ch.5
---

# Question

By default, why don't ordinary application Pods get scheduled onto control plane nodes?

## Options

- [x] Control plane nodes are usually tainted (e.g. `node-role.kubernetes.io/control-plane:NoSchedule`), and Pods need a matching toleration to land there
- [ ] Control plane nodes physically cannot run the container runtime
- [ ] kube-scheduler is hardcoded to skip any node running etcd
- [ ] Application Pods are always rejected by CoreDNS on those nodes

## Explanation

kubeadm and most managed offerings apply a taint to control plane nodes so regular workloads are repelled unless they carry a matching toleration, keeping cluster-critical components isolated from application load.

## Explicação para criança

É como uma placa de 'só funcionários' numa porta: os Pods comuns não entram ali a menos que tenham um crachá especial (toleration) permitindo a entrada.

