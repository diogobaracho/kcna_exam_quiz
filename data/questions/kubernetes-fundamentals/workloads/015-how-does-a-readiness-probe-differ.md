---
id: kf-wl-015
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [probes, readiness]
source: LFS158 ch.10
---

# Question

How does a readiness probe differ from a liveness probe?

## Options

- [x] Readiness controls whether a Pod is added to a Service's endpoints; failing it removes the Pod from traffic instead of restarting it
- [ ] Readiness restarts the container, liveness only logs a warning
- [ ] Readiness only runs once at container startup, liveness runs forever
- [ ] There is no functional difference between the two

## Explanation

A failing readiness probe simply takes the Pod out of the Service's load-balancing rotation until it passes again, without touching the container's lifecycle, which is useful for temporary conditions like warming up a cache.

## Explicação para criança

É como um garçom decidir se a mesa está pronta para receber clientes: se não estiver, ele só não manda gente para lá ainda, mas não precisa chamar a mesa de volta para a cozinha.

