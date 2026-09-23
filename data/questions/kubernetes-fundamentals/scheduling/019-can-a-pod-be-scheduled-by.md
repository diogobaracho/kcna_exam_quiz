---
id: kf-sched-019
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [scheduling, custom-scheduler]
source: LFS158 ch.10
---

# Question

Can a Pod be scheduled by something other than the default kube-scheduler?

## Options

- [x] Yes, by setting `spec.schedulerName` to a custom scheduler running in the cluster
- [ ] No, all Pods must always use the default kube-scheduler
- [ ] Only DaemonSet Pods can use a custom scheduler
- [ ] Only Jobs can bypass the scheduler

## Explanation

Kubernetes supports running multiple schedulers side by side; setting `schedulerName` on a Pod tells the API server which scheduler is responsible for binding that Pod to a node, useful for specialized scheduling logic.

## Explicação para criança

É como ter mais de um árbitro numa competição, cada um responsável por um tipo diferente de jogo, e o time escolhe qual árbitro vai cuidar da sua partida.

