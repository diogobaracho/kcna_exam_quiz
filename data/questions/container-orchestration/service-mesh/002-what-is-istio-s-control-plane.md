---
id: co-mesh-002
category: container-orchestration
topic: service-mesh
difficulty: medium
tags: [istio]
source: LFS250 module 6
---

# Question

What is Istio's control plane responsible for?

## Options

- [x] Configuring and managing the data-plane proxies (like traffic rules, mTLS certificates, and telemetry collection)
- [ ] Building container images for the mesh's applications
- [ ] Replacing kube-apiserver for mesh-enabled clusters
- [ ] Storing application-level business data

## Explanation

Istio's control plane (`istiod`) distributes configuration, security policy, and certificates to the Envoy sidecars that make up the data plane, which is where the actual traffic passes through.

## Explicação para criança

É como uma central que manda as instruções para todos os assistentes pessoais (proxies) espalhados pela empresa, dizendo como se comportar e passando as credenciais de segurança.

