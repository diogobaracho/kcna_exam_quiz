---
id: co-mesh-005
category: container-orchestration
topic: service-mesh
difficulty: hard
tags: [traffic-splitting, canary]
source: LFS250 module 6
---

# Question

How does a service mesh commonly enable canary deployments through traffic splitting?

## Options

- [x] It routes a small configurable percentage of live traffic to the new version while most traffic still goes to the stable version
- [ ] It duplicates every request and sends it to both versions simultaneously, discarding one response
- [ ] It requires taking the whole service offline during the rollout
- [ ] It only works if both versions are deployed to different clusters

## Explanation

Traffic-splitting rules (e.g. Istio VirtualService weights) let operators send, say, 5% of requests to a new version and 95% to the stable one, gradually increasing the new version's share while watching metrics before a full rollout.

## Explicação para criança

É como testar uma receita nova servindo só para alguns clientes primeiro, enquanto a maioria ainda recebe a receita de sempre, até ter certeza que a nova está boa.

