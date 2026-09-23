---
id: cna-scale-004
category: cloud-native-architecture
topic: autoscaling
difficulty: hard
tags: [keda]
source: LFS250 module 5
---

# Question

What problem does KEDA (Kubernetes Event-Driven Autoscaling) solve that plain HPA cannot easily handle?

## Options

- [x] It scales workloads based on external event sources (queue length, Kafka lag, cron schedules) rather than only CPU/memory metrics, and can scale to zero
- [ ] It replaces the Kubernetes scheduler entirely
- [ ] It only works with StatefulSets
- [ ] It removes the need for a metrics-server

## Explanation

KEDA adds scalers for many event sources (message queues, databases, cron) and can drive the HPA using those custom metrics, including scaling a Deployment down to zero replicas when there is no work, which the standard HPA does not support on its own.

## Explicação para criança

É como decidir quantos entregadores colocar de acordo com quantos pedidos estão na fila do aplicativo, e até dispensar todos quando não tem nenhum pedido, em vez de olhar só o cansaço deles.

