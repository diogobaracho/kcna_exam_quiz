---
id: co-rt-003
category: container-orchestration
topic: runtime
difficulty: easy
tags: [cri-o]
source: LFS250 module 3
---

# Question

What is CRI-O?

## Options

- [x] A lightweight container runtime built specifically to implement the Kubernetes CRI and run OCI-compliant images
- [ ] A tool for writing Kubernetes YAML manifests
- [ ] A CNI plugin for network policy enforcement
- [ ] A logging aggregator for Kubernetes clusters

## Explanation

CRI-O was designed from the start purely to satisfy the Kubernetes Container Runtime Interface, with no extra features beyond running OCI images, making it a minimal, Kubernetes-focused runtime alternative to containerd.

## Explicação para criança

O CRI-O é um motor de contêineres feito sob medida só para o Kubernetes, sem enfeites extras, cuidando exatamente do necessário para rodar as imagens.

