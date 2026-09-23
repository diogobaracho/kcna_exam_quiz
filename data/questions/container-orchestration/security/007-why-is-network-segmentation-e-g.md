---
id: co-sec-007
category: container-orchestration
topic: security
difficulty: medium
tags: [network-segmentation]
source: LFS250 module 10
---

# Question

Why is network segmentation (e.g. via NetworkPolicy) considered an important security practice in Kubernetes?

## Options

- [x] By default, all Pods can talk to all other Pods in a cluster, so segmentation limits the blast radius if one workload is compromised
- [ ] It replaces the need for RBAC
- [ ] It is required before any Pod can be scheduled
- [ ] It encrypts traffic between Pods automatically

## Explanation

Without any NetworkPolicy, Kubernetes networking is flat and permissive: any Pod can reach any other Pod. Segmenting traffic so only the necessary connections are allowed limits how far an attacker can move if they compromise one workload.

## Explicação para criança

Sem separação, é como uma casa sem portas internas: se alguém entra por uma janela, anda livre por toda a casa. Com portas (segmentação), cada cômodo fica mais protegido.

