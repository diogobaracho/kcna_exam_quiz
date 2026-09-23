---
id: kf-sched-004
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [qos]
source: LFS158 ch.10
---

# Question

A Pod where every container sets equal `requests` and `limits` for both CPU and memory is assigned which Quality of Service (QoS) class?

## Options

- [x] Guaranteed
- [ ] Burstable
- [ ] BestEffort
- [ ] Reserved

## Explanation

Kubernetes derives QoS from resource specs: `Guaranteed` requires every container to set requests equal to limits for both CPU and memory, giving the Pod the highest protection from eviction under node pressure.

## Explicação para criança

É como reservar exatamente o espaço que você vai usar, nem mais nem menos: por ser tão certinho, essa reserva é a última a ser cancelada quando falta espaço.

