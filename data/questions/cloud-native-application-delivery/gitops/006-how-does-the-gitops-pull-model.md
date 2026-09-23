---
id: cnad-gitops-006
category: cloud-native-application-delivery
topic: gitops
difficulty: medium
tags: [gitops, pull-vs-push]
source: LFS250 module 11
---

# Question

How does the GitOps 'pull' model (an in-cluster agent pulling from Git) differ from a traditional CI system 'pushing' deployments to a cluster?

## Options

- [x] In the pull model, cluster credentials never need to leave the cluster, since the agent inside pulls changes; in a push model, an external CI system needs credentials to reach into the cluster
- [ ] Pull and push models are functionally identical with no security difference
- [ ] The pull model requires disabling the Kubernetes API server
- [ ] Push deployments cannot use Git at all

## Explanation

A GitOps agent running inside the cluster only needs read access to the Git repository and already has in-cluster API access; it never needs to expose cluster credentials to an external system, which is a meaningful security improvement over CI pipelines pushing changes in from outside.

## Explicação para criança

É como deixar o próprio porteiro do prédio ir buscar as encomendas na portaria (pull), em vez de dar a chave do prédio para um entregador de fora entrar sozinho (push).

