---
id: co-net-006
category: container-orchestration
topic: networking
difficulty: hard
tags: [ingress, ingress-controller]
source: LFS158 ch.9
---

# Question

Why does creating an Ingress object alone not route any traffic unless something else is installed in the cluster?

## Options

- [x] Ingress is just a set of routing rules; an Ingress controller (a separate component like NGINX or Traefik) must be running to actually implement them
- [ ] Ingress objects require etcd to be reconfigured manually
- [ ] Ingress only works with the LoadBalancer Service type
- [ ] Ingress rules take effect only after a cluster restart

## Explanation

Kubernetes ships the Ingress API but no built-in implementation; an Ingress controller watches Ingress objects and configures a real proxy (like NGINX) to match the declared rules, so without one installed, Ingress objects have no effect.

## Explicação para criança

É como escrever as regras de um jogo num papel, mas precisar de alguém (o árbitro) para realmente aplicar essas regras durante a partida.

