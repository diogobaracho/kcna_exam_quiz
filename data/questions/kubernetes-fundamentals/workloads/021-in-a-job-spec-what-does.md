---
id: kf-wl-021
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [jobs, parallelism]
source: LFS158 ch.8
---

# Question

In a Job spec, what does `parallelism: 3` combined with `completions: 9` mean?

## Options

- [x] Up to 3 Pods run at the same time until a total of 9 successful completions have been reached
- [ ] Exactly 3 Pods run once each, ignoring completions
- [ ] The Job fails if fewer than 27 Pods are created
- [ ] Completions is ignored whenever parallelism is set

## Explanation

`parallelism` bounds how many Pods the Job runs concurrently, while `completions` sets the total number of successful Pod completions needed before the Job is considered done; the controller keeps launching Pods within the parallelism limit until that total is met.

## Explicação para criança

É como lavar 9 pratos com no máximo 3 pessoas lavando ao mesmo tempo: assim que um termina, chama o próximo, até os 9 estarem lavados.

