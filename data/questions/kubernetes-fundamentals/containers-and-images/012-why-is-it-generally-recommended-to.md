---
id: kf-img-012
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: medium
tags: [security, images]
source: LFS158 ch.2
---

# Question

Why is it generally recommended to run containers as a non-root user?

## Options

- [x] It limits the damage a compromised process inside the container can do, since it lacks root privileges even within the container's user namespace
- [ ] Non-root containers start faster than root containers
- [ ] Kubernetes refuses to schedule containers running as root
- [ ] It removes the need for image scanning

## Explanation

Running as an unprivileged user reduces the blast radius if an application is exploited; combined with the OS/kernel's own protections, it is one of several defense-in-depth measures recommended for hardening container workloads.

## Explicação para criança

É como não dar a chave mestra do prédio para o entregador: mesmo que algo dê errado com ele, não vai conseguir abrir todas as portas.

