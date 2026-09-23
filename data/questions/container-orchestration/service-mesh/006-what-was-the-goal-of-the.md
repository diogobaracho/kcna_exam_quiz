---
id: co-mesh-006
category: container-orchestration
topic: service-mesh
difficulty: hard
tags: [smi]
source: LFS250 module 6
---

# Question

What was the goal of the Service Mesh Interface (SMI) specification?

## Options

- [x] To define a common, portable API surface (traffic policy, metrics, traffic split) so tools could work across different service mesh implementations
- [ ] To merge all service meshes into a single mandatory Kubernetes component
- [ ] To replace CNI plugins for Pod networking
- [ ] To standardize container image formats

## Explanation

SMI proposed a vendor-neutral set of CRDs (like TrafficSplit and TrafficTarget) so tooling built against SMI could work with Istio, Linkerd, or other compliant meshes without mesh-specific integration code, similar in spirit to CNI or CSI for their domains.

## Explicação para criança

É como um plugue universal que serve para várias marcas de tomada de parede diferentes, para não precisar de um adaptador específico para cada malha de serviço.

