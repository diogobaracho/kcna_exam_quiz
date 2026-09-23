---
id: cno-prom-004
category: cloud-native-observability
topic: prometheus-and-tooling
difficulty: hard
tags: [promql, metric-types]
source: LFS250 module 8
---

# Question

What is the difference between a Prometheus Counter and a Gauge metric type?

## Options

- [x] A Counter only ever increases (or resets to zero); a Gauge can go up or down freely, like current memory usage
- [ ] A Gauge only ever increases; a Counter can go up or down
- [ ] They behave identically and differ only in name
- [ ] A Counter stores strings, a Gauge stores numbers

## Explanation

Counters model cumulative values like total requests served, which should only grow (except on restart); Gauges represent an instantaneous value that fluctuates in either direction, like current CPU usage or the number of active connections.

## Explicação para criança

O Counter é como o odômetro de um carro, que só sobe; o Gauge é como o marcador de combustível, que sobe e desce conforme o uso.

