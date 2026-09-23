---
id: cna-scale-005
category: cloud-native-architecture
topic: autoscaling
difficulty: medium
tags: [scaling-metrics]
source: LFS158 ch.10
---

# Question

Besides built-in resource metrics like CPU, what other metric type can the HPA use if the `custom.metrics.k8s.io` or `external.metrics.k8s.io` API is available?

## Options

- [x] Custom application metrics (like requests per second) or external metrics from outside the cluster
- [ ] Only the number of nodes in the cluster
- [ ] Only the container image size
- [ ] Only the Kubernetes version

## Explanation

With a metrics adapter exposing the custom or external metrics API (often backed by Prometheus), HPA can scale on application-specific signals like queue depth or requests-per-second, not just CPU/memory utilization.

## Explicação para criança

É como decidir quantos caixas abrir olhando não só o cansaço dos funcionários, mas também quantas pessoas estão na fila esperando para pagar.

