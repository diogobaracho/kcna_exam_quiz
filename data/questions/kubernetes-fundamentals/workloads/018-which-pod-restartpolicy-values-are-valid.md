---
id: kf-wl-018
category: kubernetes-fundamentals
topic: workloads
difficulty: easy
tags: [restart-policy]
source: LFS158 ch.5
---

# Question

Which Pod `restartPolicy` values are valid?

## Options

- [x] Always, OnFailure, Never
- [ ] Always, Sometimes, Never
- [ ] Retry, Skip, Fail
- [ ] Auto, Manual

## Explanation

A Pod's `restartPolicy` (applied to all its containers by the kubelet) must be one of `Always`, `OnFailure`, or `Never`; Deployments require `Always`, while Jobs commonly use `OnFailure` or `Never`.

## Explicação para criança

São as três opções de 'o que fazer quando a atividade terminar': sempre repetir, repetir só se der errado, ou nunca repetir.

