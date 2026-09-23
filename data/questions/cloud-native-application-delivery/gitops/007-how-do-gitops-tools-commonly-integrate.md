---
id: cnad-gitops-007
category: cloud-native-application-delivery
topic: gitops
difficulty: hard
tags: [progressive-delivery]
source: LFS250 module 11
---

# Question

How do GitOps tools commonly integrate with progressive delivery (canary/blue-green) controllers like Argo Rollouts or Flagger?

## Options

- [x] The GitOps operator syncs the desired rollout strategy declared in Git, while the progressive delivery controller executes the gradual traffic shift and automated analysis
- [ ] GitOps and progressive delivery are mutually exclusive and cannot be combined
- [ ] Progressive delivery controllers replace the need for Git entirely
- [ ] GitOps tools directly implement service mesh traffic splitting themselves

## Explanation

Argo Rollouts and Flagger are specialized controllers (often reconciled via the same GitOps pipeline) that manage the mechanics of gradually shifting traffic and running automated success checks, while the GitOps tool ensures the rollout's desired configuration always matches Git.

## Explicação para criança

É como o fiscal (GitOps) garantir que a receita certa está sendo seguida, enquanto um cozinheiro especializado (controlador de entrega progressiva) cuida da parte técnica de servir a comida aos poucos e verificar se está agradando.

