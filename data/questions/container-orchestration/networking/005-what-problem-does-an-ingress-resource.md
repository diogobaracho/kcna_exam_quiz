---
id: co-net-005
category: container-orchestration
topic: networking
difficulty: medium
tags: [ingress]
source: LFS158 ch.9
---

# Question

What problem does an Ingress resource solve that plain Services do not?

## Options

- [x] It provides HTTP(S) layer-7 routing (host/path-based rules, TLS termination) for many Services through a single entry point
- [ ] It replaces the need for a CNI plugin
- [ ] It assigns IP addresses to Pods
- [ ] It stores Secrets for the whole cluster

## Explanation

Ingress lets you define host- and path-based HTTP routing rules and centralize TLS termination, so many Services can share one external load balancer/IP instead of each needing its own, which an Ingress controller (like NGINX or Traefik) then implements.

## Explicação para criança

É como ter uma recepção única que direciona os visitantes para a sala certa, em vez de precisar de uma porta separada na rua para cada sala do prédio.

