---
id: kf-wl-010
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [cronjob]
source: LFS158 ch.8
---

# Question

What does a CronJob add on top of a Job?

## Options

- [x] It creates new Jobs automatically on a recurring schedule defined with cron syntax
- [ ] It guarantees the Job's Pod never fails
- [ ] It replaces the need for a container image
- [ ] It runs the Job continuously without ever completing

## Explanation

A CronJob wraps the Job pattern with a schedule expressed in standard cron syntax (e.g. `0 * * * *`), creating a new Job object at each tick, useful for periodic tasks like backups or report generation.

## Explicação para criança

É como um despertador que, toda vez que toca, manda alguém fazer uma tarefinha (o Job) e depois volta a esperar até o próximo toque.

