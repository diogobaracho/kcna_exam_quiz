---
id: cno-prom-002
category: cloud-native-observability
topic: prometheus-and-tooling
difficulty: medium
tags: [prometheus, architecture]
source: LFS250 module 8
---

# Question

What is the role of the Prometheus server itself in its architecture?

## Options

- [x] It scrapes and stores time-series data locally and evaluates alerting/recording rules against it
- [ ] It only visualizes dashboards, storage is handled elsewhere
- [ ] It replaces the Kubernetes API server
- [ ] It is a log aggregation and search tool

## Explanation

The Prometheus server combines scraping, a local time-series database, a query engine (PromQL), and a rule evaluator; visualization is typically delegated to a separate tool like Grafana, and alert routing to Alertmanager.

## Explicação para criança

O servidor Prometheus é como o arquivo central que recolhe e guarda os números coletados e checa as regras de alerta, enquanto outras ferramentas cuidam de mostrar bonito na tela ou avisar alguém.

