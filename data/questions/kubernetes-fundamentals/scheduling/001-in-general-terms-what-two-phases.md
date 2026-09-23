---
id: kf-sched-001
category: kubernetes-fundamentals
topic: scheduling
difficulty: easy
tags: [scheduler]
source: LFS158 ch.10
---

# Question

In general terms, what two phases does kube-scheduler go through when placing a Pod?

## Options

- [x] Filtering (find feasible nodes) and scoring (rank the feasible nodes to pick the best one)
- [ ] Compiling and deploying
- [ ] Authentication and authorization
- [ ] Building and pushing an image

## Explanation

kube-scheduler first filters out nodes that cannot satisfy the Pod's requirements (e.g. insufficient resources, taints), then scores the remaining feasible nodes using plugins to choose the best fit.

## Explicação para criança

É como escolher uma mesa num restaurante: primeiro descarta as mesas pequenas demais (filtro), depois escolhe a melhor entre as que sobraram (pontuação).

