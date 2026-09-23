---
id: kf-sched-016
category: kubernetes-fundamentals
topic: scheduling
difficulty: hard
tags: [scheduler, extension-points]
source: LFS158 ch.10
---

# Question

In the Kubernetes scheduling framework, what is a 'plugin' at an extension point such as `Filter` or `Score` used for?

## Options

- [x] It implements a specific piece of scheduling logic that runs at that stage of the scheduling cycle, and can be customized or replaced
- [ ] It is a CNI plugin used only for Pod networking
- [ ] It is a CSI driver used only for storage provisioning
- [ ] It is a Helm chart hook

## Explanation

The scheduling framework exposes extension points (`PreFilter`, `Filter`, `Score`, `Bind`, etc.); each plugin implements one or more of these interfaces, letting operators customize scheduling behavior without forking kube-scheduler.

## Explicação para criança

É como um jogo de montar peças: cada peça (plugin) encaixa numa etapa específica da decisão (filtrar, pontuar, confirmar), e dá para trocar peças sem refazer o jogo inteiro.

