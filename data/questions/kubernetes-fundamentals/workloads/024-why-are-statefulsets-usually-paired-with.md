---
id: kf-wl-024
category: kubernetes-fundamentals
topic: workloads
difficulty: hard
tags: [statefulset, headless-service]
source: LFS158 ch.8
---

# Question

Why are StatefulSets usually paired with a headless Service (ClusterIP: None)?

## Options

- [x] To give each Pod its own stable DNS record, like `db-0.db.svc`, instead of load-balancing across all replicas
- [ ] Because StatefulSets cannot use any Service at all
- [ ] To disable networking for the StatefulSet's Pods
- [ ] Because a headless Service is required for autoscaling

## Explanation

A headless Service skips virtual-IP load balancing and instead lets DNS return the individual Pod IPs, so clients can address a specific StatefulSet replica by its stable hostname, which matters for clustered software that needs to know its peers by name.

## Explicação para criança

É como ter uma lista com o telefone direto de cada morador do prédio, em vez de só um número geral da portaria que atende qualquer um.

