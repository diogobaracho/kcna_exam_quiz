---
id: kf-sched-011
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [priority-classes]
source: LFS158 ch.10
---

# Question

What is the purpose of a PriorityClass in Kubernetes scheduling?

## Options

- [x] It assigns a relative importance to Pods, influencing scheduling order and which Pods are preempted when resources are scarce
- [ ] It sets the CPU limit for a Pod
- [ ] It defines how many replicas a Deployment should run
- [ ] It controls which container runtime is used

## Explanation

Pods referencing a higher-priority PriorityClass are scheduled ahead of lower-priority pending Pods, and the scheduler may preempt (evict) lower-priority Pods to make room for a higher-priority one that cannot otherwise fit.

## Explicação para criança

É como uma fila de emergência no hospital: quem está mais grave (maior prioridade) passa na frente, e às vezes até 'toma o lugar' de quem está esperando.

