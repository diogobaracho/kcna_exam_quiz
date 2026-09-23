---
id: kf-api-004
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [namespaces]
source: LFS158 ch.6
---

# Question

What is the main purpose of Kubernetes namespaces?

## Options

- [x] To provide a scope for names so multiple teams or environments can share a cluster without object name collisions
- [ ] To physically separate nodes into different hardware racks
- [ ] To encrypt traffic between Pods automatically
- [ ] To limit which container runtimes a node can use

## Explanation

Namespaces divide a single cluster into virtual sub-clusters for organizing resources; object names must be unique within a namespace but the same name can be reused in a different one, and namespaces are a common boundary for RBAC and quotas.

## Explicação para criança

Namespaces são como pastas separadas numa gaveta: cada equipe guarda seus arquivos na própria pasta, e duas pastas podem ter um arquivo com o mesmo nome sem se confundir.

