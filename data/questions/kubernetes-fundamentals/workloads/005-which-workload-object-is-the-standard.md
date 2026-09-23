---
id: kf-wl-005
category: kubernetes-fundamentals
topic: workloads
difficulty: easy
tags: [deployment]
source: LFS158 ch.8
---

# Question

Which workload object is the standard choice for running a stateless web application with several interchangeable replicas?

## Options

- [x] Deployment
- [ ] DaemonSet
- [ ] Job
- [ ] StatefulSet

## Explanation

Deployment is designed for stateless, interchangeable replicas: it supports easy scaling, rolling updates, and rollbacks, which fits typical web front ends and APIs.

## Explicação para criança

É como ter várias cópias idênticas de um folheto: não importa qual cópia a pessoa pega, todas dizem a mesma coisa. O Deployment cuida de manter essas cópias.

