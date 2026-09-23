---
id: kf-arch-008
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [node, runtime]
source: LFS158 ch.4
---

# Question

On a worker node, which component asks the container runtime to start and stop containers?

## Options

- [ ] kube-scheduler
- [x] kubelet
- [ ] kube-apiserver
- [ ] cloud-controller-manager

## Explanation

The kubelet is the node agent: it receives Pod specs (from the API server or local static manifests) and instructs the container runtime, through the CRI, to pull images and start or stop the containers.

## Explicação para criança

O kubelet é o gerente da máquina. Ele lê a lista do que precisa rodar e é quem avisa o motor de contêineres para ligar ou desligar cada caixinha.

