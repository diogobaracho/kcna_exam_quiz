---
id: kf-arch-019
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [addons, metrics]
source: LFS158 ch.4
---

# Question

Which add-on collects CPU and memory usage from kubelets and exposes it through the `metrics.k8s.io` API, commonly used by `kubectl top` and the Horizontal Pod Autoscaler?

## Options

- [x] metrics-server
- [ ] CoreDNS
- [ ] kube-proxy
- [ ] cloud-controller-manager

## Explanation

metrics-server is a lightweight, cluster-wide aggregator of resource usage data scraped from each node's kubelet; it is not a full monitoring solution but supplies the metrics API that autoscaling and `kubectl top` rely on.

## Explicação para criança

O metrics-server é como um termômetro que passa em cada máquina, mede quanto de esforço (CPU e memória) está sendo usado, e entrega esse número para quem precisa decidir se deve colocar mais ajudantes.

