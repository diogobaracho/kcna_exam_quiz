---
id: cno-tel-008
category: cloud-native-observability
topic: telemetry-fundamentals
difficulty: medium
tags: [opentelemetry]
source: LFS250 module 8
---

# Question

What is OpenTelemetry?

## Options

- [x] A CNCF project providing vendor-neutral APIs, SDKs, and a collector for generating and exporting logs, metrics, and traces
- [ ] A dashboarding tool exclusively for Prometheus data
- [ ] A container runtime
- [ ] A specific backend database for storing time-series data

## Explanation

OpenTelemetry standardizes instrumentation for telemetry data, so applications can be instrumented once and export to any compatible backend (Jaeger, Prometheus, a commercial vendor, etc.), avoiding vendor-specific instrumentation code.

## Explicação para criança

É como um formulário padrão para anotar o que está acontecendo no sistema, que qualquer ferramenta de análise consegue ler depois, não importa quem fez a ferramenta.

