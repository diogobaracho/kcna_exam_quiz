---
id: cno-prom-007
category: cloud-native-observability
topic: prometheus-and-tooling
difficulty: medium
tags: [service-discovery]
source: LFS250 module 8
---

# Question

In a Kubernetes cluster, how does Prometheus typically know which Pods to scrape as targets, given that Pod IPs change constantly?

## Options

- [x] It uses Kubernetes service discovery to dynamically query the API server for Pods/Services/Endpoints matching configured selectors
- [ ] An administrator manually updates a static IP list every time a Pod restarts
- [ ] It scrapes every IP address on the network indiscriminately
- [ ] It only scrapes the control plane, never worker Pods

## Explanation

Prometheus's Kubernetes service discovery integration watches the API server for relevant objects and their labels, automatically updating the scrape target list as Pods come and go, without manual reconfiguration.

## Explicação para criança

É como ter uma lista de convidados que se atualiza sozinha toda vez que alguém chega ou sai da festa, em vez de alguém ter que reescrever a lista à mão.

