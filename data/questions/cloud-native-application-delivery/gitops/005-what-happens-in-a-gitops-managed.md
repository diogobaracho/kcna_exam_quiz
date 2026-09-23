---
id: cnad-gitops-005
category: cloud-native-application-delivery
topic: gitops
difficulty: medium
tags: [gitops, drift]
source: LFS250 module 11
---

# Question

What happens in a GitOps-managed cluster if someone manually runs `kubectl edit` to change a Deployment that is also declared in the Git repository?

## Options

- [x] The GitOps operator detects the drift on its next reconciliation and reverts the change back to what is declared in Git (if automated sync is enabled)
- [ ] The manual change is automatically committed to Git for them
- [ ] The GitOps operator stops working entirely and needs a manual restart
- [ ] Kubernetes rejects all kubectl edit commands once GitOps is enabled

## Explanation

Because the operator continuously reconciles toward the Git-declared state, an out-of-band manual change is treated as drift and overwritten on the next sync cycle, reinforcing that Git, not the live cluster, is the source of truth.

## Explicação para criança

É como escrever algo diferente na parede de um quadro que é sempre apagado e reescrito igual ao caderno original: a mudança feita na mão acaba sendo desfeita.

