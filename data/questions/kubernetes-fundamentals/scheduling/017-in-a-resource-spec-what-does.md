---
id: kf-sched-017
category: kubernetes-fundamentals
topic: scheduling
difficulty: easy
tags: [resources, cpu-units]
source: LFS158 ch.10
---

# Question

In a resource spec, what does `cpu: 500m` mean?

## Options

- [x] Half of one CPU core (500 millicpu)
- [ ] 500 full CPU cores
- [ ] 500 megabytes of CPU cache
- [ ] A hard limit of 500 seconds of CPU time

## Explanation

CPU is measured in cores, and `m` denotes millicpu (thousandths of a core); `500m` equals 0.5 of a CPU core's worth of compute time.

## Explicação para criança

É como pedir meia fatia de um bolo: `500m` é só a metade de um núcleo (core) inteiro de processador.

