---
id: co-net-002
category: container-orchestration
topic: networking
difficulty: easy
tags: [service, clusterip]
source: LFS158 ch.9
---

# Question

What is the default Kubernetes Service type, and what does it provide?

## Options

- [x] ClusterIP; a stable virtual IP reachable only from inside the cluster
- [ ] NodePort; a port exposed on every node reachable from outside the cluster
- [ ] LoadBalancer; a cloud provider load balancer
- [ ] ExternalName; a DNS CNAME to an outside service

## Explanation

ClusterIP is the default Service type: it allocates a stable, cluster-internal virtual IP that load-balances traffic to the matching Pods, useful for internal communication between workloads.

## Explicação para criança

É como um número de ramal interno da empresa: só quem está dentro do prédio (cluster) consegue discar para ele.

