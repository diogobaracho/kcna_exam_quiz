---
id: cnad-gitops-004
category: cloud-native-application-delivery
topic: gitops
difficulty: hard
tags: [reconciliation-loop]
source: LFS250 module 11
---

# Question

What does the 'reconciliation loop' at the heart of GitOps continuously do?

## Options

- [x] It observes the actual cluster state, compares it to the desired state declared in Git, and applies changes to converge the two, repeating indefinitely
- [ ] It runs unit tests against the application code once per day
- [ ] It only runs a single time during initial cluster bootstrap
- [ ] It merges Git branches automatically without review

## Explanation

The reconciliation loop is the same control-loop pattern used throughout Kubernetes controllers, applied to the whole cluster's configuration: observe, diff against desired (Git), act, and repeat, which is what makes GitOps self-healing against manual drift.

## Explicação para criança

É como alguém que fica sempre olhando se a sala está exatamente como o caderno de regras diz, e corrige na hora se perceber qualquer diferença, sem parar de checar.

