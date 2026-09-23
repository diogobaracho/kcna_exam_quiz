---
id: kf-wl-014
category: kubernetes-fundamentals
topic: workloads
difficulty: easy
tags: [probes, liveness]
source: LFS158 ch.10
---

# Question

What does a liveness probe do?

## Options

- [x] It checks whether a container is still working correctly; if it fails, the kubelet restarts the container
- [ ] It checks whether a Pod should receive traffic from a Service
- [ ] It checks how much CPU a container is using
- [ ] It checks whether a node has enough disk space

## Explanation

A liveness probe periodically checks a container's health; repeated failures beyond the configured threshold cause the kubelet to kill and restart the container according to its restart policy.

## Explicação para criança

É como cutucar alguém para ver se ainda está acordado: se a pessoa não reage depois de várias tentativas, chamam alguém para 'acordar' (reiniciar) ela.

