---
id: co-net-008
category: container-orchestration
topic: networking
difficulty: medium
tags: [networkpolicy]
source: LFS158 ch.9
---

# Question

What does a Kubernetes NetworkPolicy do?

## Options

- [x] It restricts which Pods can communicate with which, based on selectors, namespaces, or IP blocks, when enforced by a supporting CNI plugin
- [ ] It configures DNS resolution for the cluster
- [ ] It creates a load balancer automatically
- [ ] It sets resource limits for network bandwidth per container

## Explanation

NetworkPolicy objects declare allowed ingress/egress traffic for matched Pods; without any NetworkPolicy, all traffic is allowed by default, and a CNI plugin that supports NetworkPolicy (like Calico or Cilium) is required to actually enforce the rules.

## Explicação para criança

É como uma lista de convidados na porta de uma festa: só quem está na lista pode entrar ou sair por ali, mas alguém (o plugin de rede) precisa realmente checar a lista na porta.

