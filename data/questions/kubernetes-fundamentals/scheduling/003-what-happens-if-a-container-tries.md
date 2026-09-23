---
id: kf-sched-003
category: kubernetes-fundamentals
topic: scheduling
difficulty: medium
tags: [resources, limits]
source: LFS158 ch.10
---

# Question

What happens if a container tries to use more memory than its `resources.limits.memory`?

## Options

- [x] The container is OOMKilled (terminated for exceeding its memory limit)
- [ ] The Pod is automatically moved to a bigger node
- [ ] The container is throttled but never killed for memory
- [ ] Kubernetes silently raises the limit

## Explanation

Unlike CPU, which can be throttled, memory is not compressible: if a container's usage exceeds its limit, the kernel's OOM killer terminates it, and the kubelet reports the reason as OOMKilled.

## Explicação para criança

É como uma bolsa que só cabe um tanto de coisa: se tentar forçar mais do que cabe, ela rasga (o contêiner é encerrado).

