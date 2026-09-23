---
id: cna-sls-004
category: cloud-native-architecture
topic: serverless
difficulty: medium
tags: [scale-to-zero]
source: LFS250 module 7
---

# Question

What is a key trade-off of scale-to-zero serverless workloads?

## Options

- [x] The first request after idling may experience extra latency ('cold start') while a new instance is provisioned
- [ ] They can never handle more than one request at a time
- [ ] They cannot run stateless applications
- [ ] They require a dedicated node per function

## Explanation

When a workload scales to zero, an incoming request has to wait for a new instance to start (a cold start) before it can be served, which trades resource savings for occasional added latency compared to keeping warm instances running.

## Explicação para criança

É como apagar o forno da padaria quando não tem cliente: economiza energia, mas o primeiro pão do dia demora um pouquinho mais porque o forno precisa esquentar de novo.

