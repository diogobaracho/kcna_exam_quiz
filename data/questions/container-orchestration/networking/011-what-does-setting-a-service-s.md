---
id: co-net-011
category: container-orchestration
topic: networking
difficulty: medium
tags: [service, session-affinity]
source: LFS158 ch.9
---

# Question

What does setting a Service's `sessionAffinity: ClientIP` change?

## Options

- [x] Requests from the same client IP are routed to the same backing Pod for a configurable time window
- [ ] It forces the Service to use only one Pod ever
- [ ] It disables load balancing entirely
- [ ] It changes the Service to type ExternalName

## Explanation

By default, Services load balance each connection independently across Pods; `ClientIP` session affinity instead keeps directing a given client's requests to the same Pod, useful for stateful in-memory session data.

## Explicação para criança

É como sempre ser atendido pelo mesmo garçom enquanto estiver na mesma mesa, em vez de um garçom diferente a cada pedido.

