---
id: co-net-012
category: container-orchestration
topic: networking
difficulty: easy
tags: [pod-networking]
source: LFS158 ch.9
---

# Question

In the Kubernetes networking model, which statement is true about Pod IP addresses?

## Options

- [x] Every Pod gets its own unique IP address, and Pods can reach each other's IPs directly without NAT within the cluster
- [ ] All Pods on a node share the exact same IP address
- [ ] Pod IPs are only reachable from the same node they run on
- [ ] Pods communicate only through the API server, never directly

## Explanation

The Kubernetes networking model requires that every Pod gets a unique, routable IP within the cluster network and that Pods can communicate with any other Pod's IP without address translation, simplifying application networking.

## Explicação para criança

É como cada morador do prédio ter seu próprio número de apartamento único, e poder visitar qualquer outro apartamento diretamente, sem precisar de um crachá especial de tradução.

