---
id: cno-prom-008
category: cloud-native-observability
topic: prometheus-and-tooling
difficulty: hard
tags: [exporters]
source: LFS250 module 8
---

# Question

What is a Prometheus 'exporter' used for?

## Options

- [x] It translates metrics from a system that does not natively expose Prometheus format into a scrapeable `/metrics` HTTP endpoint
- [ ] It exports Prometheus's own data to a CSV file for backup
- [ ] It is required to export container images to a registry
- [ ] It converts logs into traces automatically

## Explanation

Many systems (databases, hardware sensors, legacy applications) do not speak the Prometheus exposition format natively; an exporter runs alongside them, translating their native metrics into the format Prometheus can scrape.

## Explicação para criança

É como um tradutor que fica ao lado de alguém que só fala outra língua, traduzindo tudo para o formato que o Prometheus entende antes de ele vir coletar.

