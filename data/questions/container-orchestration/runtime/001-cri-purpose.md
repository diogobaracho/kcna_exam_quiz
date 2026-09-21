---
id: co-rt-001
category: container-orchestration
topic: runtime
difficulty: medium
tags: [cri, containerd, cri-o]
source: LFS250 module 3
---

# Question

What does the Container Runtime Interface (CRI) allow Kubernetes to do?

## Options

- [ ] Build container images from a Dockerfile inside the cluster
- [x] Use different container runtimes such as containerd or CRI-O without changing the kubelet
- [ ] Share a single container between several nodes
- [ ] Replace etcd with a runtime-specific database

## Explanation

CRI is a gRPC API between the kubelet and the container runtime. Any runtime that implements it (containerd, CRI-O, and others) can be plugged in, which is why Docker Engine needed the dockershim adapter until it was removed in Kubernetes 1.24.

## Explicação para criança

Imagine que o kubelet fala uma língua própria para pedir "ligue esse contêiner". O CRI é essa língua combinada. Qualquer motor de contêineres que aprenda a língua pode trabalhar com o Kubernetes, sem que o kubelet precise mudar.
