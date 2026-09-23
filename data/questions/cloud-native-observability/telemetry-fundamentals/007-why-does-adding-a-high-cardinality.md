---
id: cno-tel-007
category: cloud-native-observability
topic: telemetry-fundamentals
difficulty: hard
tags: [cardinality]
source: LFS250 module 8
---

# Question

Why does adding a high-cardinality label (like a raw user ID) to a metric cause operational problems for a metrics system like Prometheus?

## Options

- [x] Each unique label value combination creates a new time series, and too many unique series can overwhelm memory and storage
- [ ] High-cardinality labels are automatically rejected and cause no issue
- [ ] It only affects log storage, never metrics storage
- [ ] It makes metrics collection faster

## Explanation

Time-series databases like Prometheus store a separate series per unique combination of metric name and label values; a label with unbounded or very high cardinality (like a user ID) can multiply the number of series into the millions, causing memory pressure and slow queries.

## Explicação para criança

É como tentar guardar uma gaveta separada para cada cliente que já entrou na loja, em vez de algumas gavetas por categoria: rápido fica impossível de organizar.

