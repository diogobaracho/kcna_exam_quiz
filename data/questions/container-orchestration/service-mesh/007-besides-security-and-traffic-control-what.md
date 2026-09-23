---
id: co-mesh-007
category: container-orchestration
topic: service-mesh
difficulty: medium
tags: [service-mesh, observability]
source: LFS250 module 6
---

# Question

Besides security and traffic control, what observability benefit does a service mesh commonly provide out of the box?

## Options

- [x] Uniform metrics, distributed tracing hooks, and traffic logs for every service, without changing application code
- [ ] Automatic bug fixing in application logic
- [ ] Automatic image vulnerability scanning
- [ ] Automatic horizontal scaling of the control plane

## Explanation

Because every request passes through the sidecar proxies, a mesh can uniformly collect metrics (latency, error rate, request volume) and propagate tracing headers across all mesh-enabled services, giving consistent visibility without instrumenting each application individually.

## Explicação para criança

É como ter câmeras de segurança em todos os corredores de um prédio: dá para ver o movimento de todo mundo sem precisar pedir para cada pessoa carregar uma câmera própria.

