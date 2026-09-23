---
id: co-net-004
category: container-orchestration
topic: networking
difficulty: medium
tags: [service, loadbalancer]
source: LFS158 ch.9
---

# Question

What does a Service of type LoadBalancer typically do in a cloud environment?

## Options

- [x] It asks the cloud provider to provision an external load balancer that routes public traffic to the Service
- [ ] It only works on bare-metal clusters
- [ ] It replaces the need for kube-proxy
- [ ] It disables ClusterIP for that Service

## Explanation

A LoadBalancer Service triggers the cloud-controller-manager's integration with the cloud provider's API to create an external load balancer (with a public IP) that forwards to the Service, which in turn is still backed by a ClusterIP and NodePort under the hood.

## Explicação para criança

É como pedir para a prefeitura construir uma entrada oficial e visível na rua para o seu prédio, em vez de só ter uma porta interna.

