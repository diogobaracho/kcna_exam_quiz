---
id: co-mesh-001
category: container-orchestration
topic: service-mesh
difficulty: easy
tags: [sidecar, service-mesh]
source: LFS250 module 6
---

# Question

In the common service mesh architecture, how is traffic between microservices typically intercepted?

## Options

- [x] A sidecar proxy container runs in each application Pod and transparently intercepts inbound/outbound traffic
- [ ] Each application must embed a mesh SDK in its own source code
- [ ] Traffic is intercepted only at the Ingress controller
- [ ] The kube-scheduler routes all inter-service traffic

## Explanation

Most service meshes (Istio, Linkerd) inject a lightweight proxy (e.g. Envoy) as a sidecar container into each Pod; it transparently handles the Pod's network traffic, so the application code does not need to change.

## Explicação para criança

É como colocar um assistente pessoal do lado de cada funcionário para cuidar de todas as ligações que ele faz e recebe, sem que o funcionário precise aprender a atender o telefone de forma diferente.

