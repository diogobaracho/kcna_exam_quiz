---
id: kf-wl-029
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [pod, termination]
source: LFS158 ch.5
---

# Question

During graceful Pod termination, what does `terminationGracePeriodSeconds` control?

## Options

- [x] How long Kubernetes waits after sending SIGTERM before forcibly sending SIGKILL to the container
- [ ] How long the Pod waits in Pending before being scheduled
- [ ] How many seconds a readiness probe waits between checks
- [ ] How long a Job waits before retrying a failed Pod

## Explanation

When a Pod is deleted, the kubelet sends SIGTERM to give the process a chance to shut down cleanly, then waits up to `terminationGracePeriodSeconds` (default 30) before sending SIGKILL if the process is still running.

## Explicação para criança

É como avisar educadamente que a loja vai fechar e dar um tempinho para todo mundo sair, antes de trancar a porta na força se alguém demorar demais.

