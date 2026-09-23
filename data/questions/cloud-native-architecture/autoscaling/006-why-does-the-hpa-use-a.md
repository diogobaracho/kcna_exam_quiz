---
id: cna-scale-006
category: cloud-native-architecture
topic: autoscaling
difficulty: medium
tags: [hpa, stabilization]
source: LFS158 ch.10
---

# Question

Why does the HPA use a stabilization window and cooldown behavior instead of scaling instantly on every metric fluctuation?

## Options

- [x] To avoid rapid, repeated scaling up and down (thrashing) caused by short-lived metric spikes or dips
- [ ] Because Kubernetes only allows one scaling event per day
- [ ] Because scaling instantly would corrupt etcd
- [ ] Because the scheduler requires a fixed delay before any Pod creation

## Explanation

Metrics can be noisy; without smoothing, an HPA might add and remove replicas every few seconds. The stabilization window looks at recent recommendations over time and picks a safer value, preventing rapid oscillation.

## Explicação para criança

É como não sair trocando o número de garçons a cada minuto só porque um cliente entrou e saiu rápido: espera um pouco para ver se a mudança realmente vai durar.

