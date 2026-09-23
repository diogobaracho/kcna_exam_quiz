---
id: kf-wl-006
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [daemonset]
source: LFS158 ch.8
---

# Question

What is a DaemonSet used for?

## Options

- [x] Running exactly one copy of a Pod on every (or a selected subset of) node in the cluster
- [ ] Running a Pod to completion once and then stopping
- [ ] Running a fixed number of Pods regardless of how many nodes exist
- [ ] Running a Pod only on the control plane node

## Explanation

A DaemonSet ensures a copy of a Pod runs on each eligible node automatically, growing and shrinking as nodes are added or removed; it is the typical pattern for node-level agents like log collectors or CNI plugins.

## Explicação para criança

É como colocar um extintor de incêndio em cada sala do prédio: não importa quantas salas existam, toda sala ganha o seu, automaticamente.

