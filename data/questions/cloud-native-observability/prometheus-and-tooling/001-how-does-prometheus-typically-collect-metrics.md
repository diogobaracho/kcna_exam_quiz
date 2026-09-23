---
id: cno-prom-001
category: cloud-native-observability
topic: prometheus-and-tooling
difficulty: easy
tags: [prometheus]
source: LFS250 module 8
---

# Question

How does Prometheus typically collect metrics from targets?

## Options

- [x] It pulls (scrapes) metrics over HTTP from targets that expose a metrics endpoint, on a configured interval
- [ ] Targets always push metrics to Prometheus over gRPC
- [ ] It only reads metrics from log files
- [ ] It requires a sidecar container that emails metrics periodically

## Explanation

Prometheus is fundamentally pull-based: it scrapes an HTTP `/metrics` endpoint on each configured target at regular intervals, though a Pushgateway exists for short-lived jobs that cannot be scraped directly.

## Explicação para criança

É como um entregador que passa de tempos em tempos e recolhe as caixas prontas em cada loja, em vez de esperar cada loja mandar a caixa sozinha.

