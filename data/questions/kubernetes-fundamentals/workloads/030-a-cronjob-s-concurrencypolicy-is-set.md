---
id: kf-wl-030
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [cronjob, concurrency]
source: LFS158 ch.8
---

# Question

A CronJob's `concurrencyPolicy` is set to `Forbid`. What happens if the previous scheduled Job is still running when the next scheduled time arrives?

## Options

- [x] The new Job run is skipped until the current one finishes
- [ ] Kubernetes runs both Jobs at the same time
- [ ] The CronJob is deleted automatically
- [ ] The old Job is killed to make room for the new one

## Explanation

`concurrencyPolicy: Forbid` prevents overlapping runs: if a Job from the previous schedule tick is still active, the CronJob controller simply skips launching a new one at the next tick.

## Explicação para criança

É como não deixar começar um novo episódio de um seriado enquanto o de ontem ainda está passando: espera terminar um para só então começar o próximo.

