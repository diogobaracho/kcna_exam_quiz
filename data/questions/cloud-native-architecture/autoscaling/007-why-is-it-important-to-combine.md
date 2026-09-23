---
id: cna-scale-007
category: cloud-native-architecture
topic: autoscaling
difficulty: hard
tags: [scaling, capacity-planning]
source: LFS158 ch.10
---

# Question

Why is it important to combine the Horizontal Pod Autoscaler with the Cluster Autoscaler in many real deployments?

## Options

- [x] HPA can only add as many Pods as existing nodes have room for; the Cluster Autoscaler adds nodes so HPA's extra Pods actually have somewhere to run
- [ ] They must never be used together
- [ ] HPA automatically provisions nodes so Cluster Autoscaler is redundant
- [ ] Cluster Autoscaler replaces the need for resource requests

## Explanation

HPA scales the number of Pods, but if the cluster is already at capacity, those new Pods stay `Pending`. Cluster Autoscaler complements it by growing the node pool when Pods cannot be scheduled, and shrinking it when nodes are no longer needed.

## Explicação para criança

É como pedir para chamar mais garçons (HPA), mas se o restaurante já está lotado de gente, também é preciso abrir mais salas (Cluster Autoscaler) para eles caberem.

