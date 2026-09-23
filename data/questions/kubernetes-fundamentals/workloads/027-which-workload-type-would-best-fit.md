---
id: kf-wl-027
category: kubernetes-fundamentals
topic: workloads
difficulty: easy
tags: [workloads]
source: LFS158 ch.8
---

# Question

Which workload type would best fit a nightly database backup that must run once a day at 2 AM?

## Options

- [x] CronJob
- [ ] DaemonSet
- [ ] Deployment
- [ ] StatefulSet

## Explanation

A CronJob is purpose-built for scheduled, recurring finite tasks like nightly backups, creating a fresh Job (and Pod) at each scheduled time.

## Explicação para criança

É como programar um alarme para tocar toda madrugada e fazer a mesma tarefinha: o CronJob é esse alarme para backups automáticos.

