---
id: cno-tel-003
category: cloud-native-observability
topic: telemetry-fundamentals
difficulty: medium
tags: [metrics]
source: LFS250 module 8
---

# Question

What distinguishes a metric from a log?

## Options

- [x] A metric is a numeric measurement aggregated over time, efficient to store and query for trends, unlike a discrete per-event log entry
- [ ] A metric always requires distributed tracing to be recorded
- [ ] A metric can only describe network traffic
- [ ] A metric and a log are stored in exactly the same way and are interchangeable

## Explanation

Metrics (like request rate, error count, or memory usage) are numeric time series designed to be cheap to store and aggregate, making them well suited for dashboards, alerting rules, and spotting trends over time.

## Explicação para criança

É como acompanhar a temperatura do dia num gráfico (métrica), em vez de escrever uma frase toda vez que a temperatura muda (log).

