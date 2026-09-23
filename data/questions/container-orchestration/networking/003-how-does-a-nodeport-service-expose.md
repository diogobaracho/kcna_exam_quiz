---
id: co-net-003
category: container-orchestration
topic: networking
difficulty: medium
tags: [service, nodeport]
source: LFS158 ch.9
---

# Question

How does a NodePort Service expose an application?

## Options

- [x] It opens the same static port on every node's IP, forwarding traffic from that port to the Service's Pods
- [ ] It creates a cloud load balancer automatically
- [ ] It only works for Pods running on the control plane node
- [ ] It assigns a public DNS name automatically

## Explanation

A NodePort Service reserves a port (default range 30000-32767) and opens it on every node in the cluster; traffic hitting `<any-node-ip>:<nodePort>` is routed via kube-proxy to one of the Service's backend Pods, wherever they run.

## Explicação para criança

É como abrir a mesma portinha numerada em todas as casas do bairro: não importa em qual casa você bater, sempre vai cair no mesmo destino.

