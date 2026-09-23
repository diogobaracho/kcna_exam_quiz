---
id: co-net-007
category: container-orchestration
topic: networking
difficulty: easy
tags: [dns, coredns]
source: LFS158 ch.9
---

# Question

By default, what DNS name pattern can a Pod use to reach a Service named `api` in namespace `shop`?

## Options

- [x] api.shop.svc.cluster.local (or simply api.shop from other namespaces)
- [ ] api.pod.cluster.local
- [ ] shop.api.node.local
- [ ] cluster.local.api.shop

## Explanation

CoreDNS creates records following the pattern `<service>.<namespace>.svc.<cluster-domain>`; Pods in the same namespace can also reach it with the short name `api` alone thanks to the default DNS search path.

## Explicação para criança

É como um endereço completo com rua, bairro e cidade: `api.shop.svc.cluster.local` diz exatamente onde encontrar o Service, mas de perto (mesmo bairro) dá para usar só o apelido curto.

