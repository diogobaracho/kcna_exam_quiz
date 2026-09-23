---
id: kf-wl-016
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [probes, startup]
source: LFS158 ch.10
---

# Question

Why would you add a startupProbe to a container that also has a liveness probe?

## Options

- [x] To give slow-starting applications enough time to initialize before liveness checks begin, preventing premature restarts
- [ ] To disable the readiness probe permanently
- [ ] Because liveness probes cannot be used on the first Pod replica
- [ ] To replace the need for resource requests and limits

## Explanation

While a startupProbe has not yet succeeded, the kubelet disables the liveness (and readiness) probe, giving applications with a long boot sequence room to start without being killed for 'failing' checks too early.

## Explicação para criança

É como dar um tempo extra para alguém acordar direito antes de começar a cobrar tarefas dele, para não confundir sono com preguiça.

