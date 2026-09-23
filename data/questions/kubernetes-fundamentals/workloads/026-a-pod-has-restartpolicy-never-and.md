---
id: kf-wl-026
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [pod, container-lifecycle]
source: LFS158 ch.5
---

# Question

A Pod has `restartPolicy: Never` and its single container exits with status code 1. What is the resulting Pod phase?

## Options

- [x] Failed
- [ ] Running
- [ ] Pending
- [ ] Succeeded

## Explanation

With `restartPolicy: Never`, the kubelet does not restart the container; a non-zero exit code marks the container (and therefore the Pod) as `Failed`, whereas an exit code of 0 would have resulted in `Succeeded`.

## Explicação para criança

É como uma tarefa que deu errado e ninguém vai repetir: o resultado fica marcado como 'não deu certo' (Failed) em vez de tentar de novo.

