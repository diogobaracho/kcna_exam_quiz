---
id: kf-wl-028
category: kubernetes-fundamentals
topic: workloads
difficulty: hard
tags: [jobs, backoff]
source: LFS158 ch.8
---

# Question

What does `backoffLimit` control on a Job?

## Options

- [x] The number of retries allowed before the Job is marked as failed
- [ ] The maximum number of Pods that can run in parallel
- [ ] The number of seconds to wait before starting the Job
- [ ] The number of nodes the Job's Pods can be spread across

## Explanation

Each time a Job's Pod fails, the Job controller retries with an exponential back-off delay; once the number of retries exceeds `backoffLimit` (default 6), the Job is marked `Failed` and stops retrying.

## Explicação para criança

É como dar um número limitado de chances para alguém acertar uma tarefa: depois de errar demais, desiste e marca como não concluído.

