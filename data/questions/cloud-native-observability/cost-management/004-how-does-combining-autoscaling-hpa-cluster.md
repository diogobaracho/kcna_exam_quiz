---
id: cno-cost-004
category: cloud-native-observability
topic: cost-management
difficulty: hard
tags: [cost-optimization, autoscaling]
source: LFS250 module 9
---

# Question

How does combining autoscaling (HPA/Cluster Autoscaler) with spot/preemptible instances typically help reduce cloud native infrastructure costs?

## Options

- [x] Workloads scale to match real demand and can run fault-tolerant portions on cheaper, interruptible capacity, avoiding paying for idle, always-on, full-price nodes
- [ ] Spot instances guarantee they will never be terminated
- [ ] Autoscaling always increases total cost regardless of usage
- [ ] Spot instances are only usable for stateful databases

## Explanation

Autoscaling avoids provisioning for peak load all the time, and scheduling interruption-tolerant workloads onto cheaper spot/preemptible nodes (with a fallback to on-demand for critical ones) further reduces cost, since idle reserved capacity is one of the biggest sources of cloud waste.

## Explicação para criança

É como alugar cadeiras extras só quando a festa está cheia e usar as cadeiras mais baratas (que às vezes podem ser pedidas de volta) para quem não se importa de trocar de lugar, em vez de comprar cadeiras caras que ficam paradas o ano todo.

