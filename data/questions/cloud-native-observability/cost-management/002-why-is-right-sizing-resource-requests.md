---
id: cno-cost-002
category: cloud-native-observability
topic: cost-management
difficulty: medium
tags: [resource-optimization]
source: LFS250 module 9
---

# Question

Why is right-sizing resource requests and limits considered an important cost optimization practice?

## Options

- [x] Over-requesting reserves capacity that goes unused, wasting money, while under-requesting risks throttling or eviction
- [ ] Resource requests have no effect on scheduling or cost
- [ ] Right-sizing only matters for StatefulSets
- [ ] Setting requests to zero always saves the most money safely

## Explanation

Since the scheduler reserves a node's capacity based on requests, consistently over-requesting means nodes look full even when actual usage is low, forcing unnecessary extra nodes; tools like VPA or usage analysis help set requests closer to real needs.

## Explicação para criança

É como reservar mesa para 10 pessoas numa festa e só 3 aparecerem: o espaço reservado a mais fica sem uso e ninguém mais pode aproveitar aquele lugar.

