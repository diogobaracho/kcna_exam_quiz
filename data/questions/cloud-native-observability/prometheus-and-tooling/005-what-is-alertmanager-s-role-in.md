---
id: cno-prom-005
category: cloud-native-observability
topic: prometheus-and-tooling
difficulty: medium
tags: [alertmanager]
source: LFS250 module 8
---

# Question

What is Alertmanager's role in the Prometheus ecosystem?

## Options

- [x] It receives fired alerts from Prometheus and handles deduplication, grouping, silencing, and routing to notification channels
- [ ] It stores the raw time-series metric data
- [ ] It generates the dashboards shown to users
- [ ] It replaces PromQL as the query language

## Explanation

Prometheus itself only evaluates alerting rules and fires alerts; Alertmanager takes over from there, grouping related alerts, silencing known issues, and routing notifications to the right channel (email, Slack, PagerDuty, etc.) based on configured rules.

## Explicação para criança

É como uma central telefônica que recebe todos os alarmes disparados, agrupa os parecidos, silencia os que já são conhecidos, e liga para a pessoa certa avisar.

