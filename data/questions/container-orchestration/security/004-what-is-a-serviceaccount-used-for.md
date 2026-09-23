---
id: co-sec-004
category: container-orchestration
topic: security
difficulty: easy
tags: [service-accounts]
source: LFS250 module 10
---

# Question

What is a ServiceAccount used for in Kubernetes?

## Options

- [x] It provides an identity that Pods use to authenticate to the Kubernetes API
- [ ] It stores the billing information for a cloud account
- [ ] It defines which node a Pod runs on
- [ ] It configures DNS records for a Service

## Explanation

Every Pod runs with a ServiceAccount identity (a default one if none is specified); Pods use its mounted token to authenticate to kube-apiserver when they need to make API calls, and RBAC can restrict what that ServiceAccount is allowed to do.

## Explicação para criança

É como um crachá de funcionário para os próprios Pods: quando um Pod precisa pedir algo para o 'chefe' (API server), ele mostra seu crachá para provar quem é.

