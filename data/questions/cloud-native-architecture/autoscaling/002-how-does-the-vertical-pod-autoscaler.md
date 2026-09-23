---
id: cna-scale-002
category: cloud-native-architecture
topic: autoscaling
difficulty: medium
tags: [vpa]
source: LFS158 ch.10
---

# Question

How does the Vertical Pod Autoscaler (VPA) differ from the HPA?

## Options

- [x] VPA adjusts a container's CPU/memory requests and limits, rather than the number of replicas
- [ ] VPA and HPA do exactly the same thing
- [ ] VPA only works on DaemonSets
- [ ] VPA adds more nodes to the cluster automatically

## Explanation

Instead of changing how many replicas run, VPA recommends or automatically updates a Pod's resource requests/limits based on observed usage, which usually requires restarting the Pod to apply the new values, and is typically not combined with HPA on the same resource metric.

## Explicação para criança

Em vez de contratar mais garçons, é como dar um uniforme maior ou menor para o garçom que já está lá, ajustando o tamanho conforme o esforço necessário.

