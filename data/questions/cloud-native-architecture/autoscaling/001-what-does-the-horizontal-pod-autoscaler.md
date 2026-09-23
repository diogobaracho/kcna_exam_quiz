---
id: cna-scale-001
category: cloud-native-architecture
topic: autoscaling
difficulty: easy
tags: [hpa]
source: LFS158 ch.10
---

# Question

What does the Horizontal Pod Autoscaler (HPA) do?

## Options

- [x] It automatically adjusts the number of Pod replicas of a workload based on observed metrics like CPU utilization
- [ ] It automatically increases the CPU/memory limits of existing Pods
- [ ] It adds more nodes to the cluster
- [ ] It resizes PersistentVolumes automatically

## Explanation

HPA periodically checks metrics (commonly CPU or memory utilization, or custom/external metrics) against a target and scales a Deployment's, ReplicaSet's, or StatefulSet's replica count up or down to try to hit that target.

## Explicação para criança

É como contratar ou dispensar garçons dependendo de quantos clientes chegam no restaurante: mais gente, mais garçons; menos gente, menos garçons.

