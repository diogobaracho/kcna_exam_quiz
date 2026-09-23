---
id: kf-wl-009
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [job]
source: LFS158 ch.8
---

# Question

What is a Job for?

## Options

- [x] Running one or more Pods to completion for a finite task, retrying on failure until a success count is reached
- [ ] Keeping a Pod running forever and restarting it if it exits successfully
- [ ] Running a Pod on every node in the cluster
- [ ] Scheduling a Pod to run at a specific time every day

## Explanation

A Job creates Pods to run a task to completion; it tracks successful completions, retries failed Pods up to a limit, and is done when the target number of successes is reached, unlike Deployments which expect Pods to run indefinitely.

## Explicação para criança

O Job é como uma tarefa de casa: você faz até terminar. Depois de pronta, não precisa ficar fazendo de novo.

