---
id: kf-wl-011
category: kubernetes-fundamentals
topic: workloads
difficulty: easy
tags: [rolling-update]
source: LFS158 ch.8
---

# Question

During a Deployment's default rolling update, what generally happens?

## Options

- [x] New Pods are gradually created while old Pods are gradually terminated, keeping the app available throughout
- [ ] All old Pods are deleted first, then new Pods are created
- [ ] The Deployment is paused and the app goes offline until the update finishes
- [ ] Only one Pod total exists during the whole process, regardless of replica count

## Explanation

The RollingUpdate strategy replaces Pods incrementally, controlled by `maxSurge` (how many extra Pods can be created) and `maxUnavailable` (how many can be down at once), so the service keeps serving traffic during the rollout.

## Explicação para criança

É como trocar os pneus do carro em movimento, um de cada vez: o carro nunca para de andar enquanto a troca acontece.

