---
id: kf-wl-032
category: kubernetes-fundamentals
topic: workloads
difficulty: hard
tags: [deployment, revision-history]
source: LFS158 ch.8
---

# Question

What does the Deployment field `revisionHistoryLimit` control?

## Options

- [x] How many old, scaled-down ReplicaSets are kept around to allow rollback
- [ ] How many replicas the Deployment can scale up to
- [ ] How many seconds a rollout can take before timing out
- [ ] How many container restarts are allowed per Pod

## Explanation

Each revision of a Deployment corresponds to an old ReplicaSet kept at zero replicas so a rollback can reuse it; `revisionHistoryLimit` (default 10) caps how many of these old ReplicaSets are retained before the oldest ones are garbage collected.

## Explicação para criança

É como guardar só as últimas 10 versões de um documento salvo: depois disso, as versões mais antigas vão sendo apagadas para não lotar o armário.

