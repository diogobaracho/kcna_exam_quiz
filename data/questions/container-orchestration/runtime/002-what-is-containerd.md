---
id: co-rt-002
category: container-orchestration
topic: runtime
difficulty: easy
tags: [containerd]
source: LFS250 module 3
---

# Question

What is containerd?

## Options

- [x] A lightweight, CRI-compliant container runtime that manages the container lifecycle (image pull, execution, storage)
- [ ] A Kubernetes networking plugin
- [ ] A monitoring dashboard for containers
- [ ] A Kubernetes distribution like kind or Minikube

## Explanation

containerd is a graduated CNCF project and one of the most widely used container runtimes; it handles image transfer, storage, container execution, and supervision, and speaks the CRI directly to the kubelet.

## Explicação para criança

O containerd é o motor que realmente liga e desliga os contêineres, cuidando de baixar a imagem e mantê-la rodando, como o motor debaixo do capô de um carro.

