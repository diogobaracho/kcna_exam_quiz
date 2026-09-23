---
id: cno-prom-003
category: cloud-native-observability
topic: prometheus-and-tooling
difficulty: medium
tags: [promql]
source: LFS250 module 8
---

# Question

What does the PromQL expression `rate(http_requests_total[5m])` compute?

## Options

- [x] The per-second average rate of increase of the counter `http_requests_total` over the trailing 5-minute window
- [ ] The exact total number of requests in the last 5 minutes
- [ ] The maximum value the counter ever reached
- [ ] The number of Pods serving HTTP requests

## Explanation

`rate()` is designed for monotonically increasing counters: it calculates the average per-second increase over the given time range, correctly handling counter resets (like a Pod restart), which makes it the standard way to turn a counter into a meaningful rate.

## Explicação para criança

É como calcular quantos passos por segundo alguém deu em média nos últimos 5 minutos, olhando quanto o contador de passos avançou nesse período.

