---
id: kf-wl-022
category: kubernetes-fundamentals
topic: workloads
difficulty: easy
tags: [pod, ephemeral]
source: LFS158 ch.5
---

# Question

If a bare Pod (not managed by a Deployment or ReplicaSet) crashes and its node fails, what happens?

## Options

- [x] The Pod is not automatically recreated, since nothing is watching to replace it
- [ ] kube-scheduler automatically recreates it on a healthy node
- [ ] etcd restarts the Pod directly
- [ ] The Pod moves itself to another node without help

## Explanation

Pods created directly have no controller behind them; if the node dies, the Pod is gone for good, which is exactly why controllers like Deployments and ReplicaSets exist to recreate Pods automatically.

## Explicação para criança

É como um brinquedo sem dono: se ele se perde, ninguém vai correndo comprar outro igual, porque não tinha ninguém encarregado de repor.

