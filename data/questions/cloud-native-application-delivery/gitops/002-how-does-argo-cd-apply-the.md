---
id: cnad-gitops-002
category: cloud-native-application-delivery
topic: gitops
difficulty: medium
tags: [argocd]
source: LFS250 module 11
---

# Question

How does Argo CD apply the GitOps model to a Kubernetes cluster?

## Options

- [x] It continuously compares the manifests in a Git repository to the live cluster state and syncs (applies) differences, optionally automatically
- [ ] It replaces kube-apiserver with its own API
- [ ] It only works by manually running kubectl apply from a laptop
- [ ] It builds container images from source code

## Explanation

Argo CD watches one or more Git repositories containing Kubernetes manifests (or Helm/Kustomize sources), detects drift between Git and the live cluster, and can automatically (or with manual approval) apply the Git-declared state to reconcile them.

## Explicação para criança

É como um fiscal que compara o caderno de regras com a sala de aula real e ajusta a sala sempre que ela não bate com o que o caderno diz.

