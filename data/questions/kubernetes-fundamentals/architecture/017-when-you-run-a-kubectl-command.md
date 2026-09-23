---
id: kf-arch-017
category: kubernetes-fundamentals
topic: architecture
difficulty: easy
tags: [kubectl, api-server]
source: LFS158 ch.3
---

# Question

When you run a kubectl command, which component does it communicate with?

## Options

- [x] kube-apiserver
- [ ] etcd directly
- [ ] kubelet on the target node
- [ ] kube-scheduler

## Explanation

kubectl is a client of the Kubernetes REST API. It sends authenticated HTTPS requests to kube-apiserver, which validates, authorizes, and persists the change (via etcd) or returns the requested data.

## Explicação para criança

O kubectl é como um controle remoto: você aperta o botão, e o sinal vai direto para a central (API server), que é quem manda de verdade o comando ser executado.

