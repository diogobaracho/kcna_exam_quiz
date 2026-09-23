---
id: kf-wl-023
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [daemonset, updates]
source: LFS158 ch.8
---

# Question

Which update strategies are available for a DaemonSet?

## Options

- [x] RollingUpdate and OnDelete
- [ ] RollingUpdate and Recreate
- [ ] BlueGreen and Canary
- [ ] Manual and Automatic

## Explanation

DaemonSets support `RollingUpdate` (the default, replacing Pods gradually node by node) and `OnDelete` (new Pods are only created after you manually delete the old ones), unlike Deployments which also offer `Recreate`.

## Explicação para criança

É como escolher entre trocar as lâmpadas do prédio andar por andar sozinho (RollingUpdate) ou só trocar quando alguém tira a lâmpada velha na mão (OnDelete).

