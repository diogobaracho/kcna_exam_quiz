---
id: kf-arch-002
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [node, kubelet]
source: LFS158 ch.4
---

# Question

What is the main responsibility of the kubelet?

## Options

- [ ] Deciding on which node a new Pod should run
- [ ] Storing the cluster configuration
- [x] Making sure the containers described in Pods assigned to its node are running and healthy
- [ ] Routing Service traffic to the right Pods

## Explanation

The kubelet is the node agent. It watches the API server for Pods scheduled to its node, asks the container runtime to start them, runs probes, and reports status back. Scheduling is done by kube-scheduler, storage by etcd and Service routing by kube-proxy.

## Explicação para criança

O kubelet é o cuidador de cada máquina. Ele recebe a lista de "caixinhas" (Pods) que devem rodar ali, pede para o motor de contêineres ligar cada uma e fica vigiando se todas continuam bem, avisando o chefe se algo der errado.
