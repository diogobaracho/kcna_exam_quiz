---
id: co-net-001
category: container-orchestration
topic: networking
difficulty: easy
tags: [cni]
source: LFS250 module 4
---

# Question

What is the Container Network Interface (CNI)?

## Options

- [x] A specification and set of plugins that configure networking (IP assignment, routes) for containers when they start
- [ ] A tool for scanning container images
- [ ] The Kubernetes component that stores cluster state
- [ ] A protocol for encrypting Service traffic

## Explanation

CNI defines a standard interface between container runtimes and network plugins (like Calico, Cilium, or Flannel); the runtime calls the configured plugin to attach a Pod to the network and assign it an IP address.

## Explicação para criança

É como um padrão de tomada elétrica: qualquer 'plugue' (plugin de rede) que siga o padrão CNI encaixa e liga o Pod à rede, não importa qual marca ele seja.

