---
id: cna-scale-008
category: cloud-native-architecture
topic: autoscaling
difficulty: easy
tags: [scale-to-zero]
source: LFS250 module 5
---

# Question

What does 'scale to zero' mean for a workload?

## Options

- [x] The number of running replicas can drop to zero when there is no demand, and scale back up when requests arrive
- [ ] The workload's resource limits are set to zero permanently
- [ ] The workload is deleted and cannot be restarted
- [ ] The workload always keeps at least one replica running

## Explanation

Scale-to-zero lets idle workloads consume no compute resources at all when unused; an incoming request or event triggers scaling back up, common in serverless/FaaS-style platforms like Knative and event-driven autoscalers like KEDA.

## Explicação para criança

É como apagar a luz de um cômodo vazio e só acender de novo quando alguém entra: não gasta energia à toa quando ninguém está usando.

