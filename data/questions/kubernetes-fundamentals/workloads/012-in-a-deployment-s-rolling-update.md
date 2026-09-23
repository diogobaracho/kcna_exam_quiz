---
id: kf-wl-012
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [rolling-update]
source: LFS158 ch.8
---

# Question

In a Deployment's rolling update strategy, what does `maxUnavailable` control?

## Options

- [x] The maximum number (or percentage) of desired Pods that can be unavailable during the update
- [ ] The maximum time in seconds the rollout is allowed to take
- [ ] The maximum number of container restarts allowed
- [ ] The maximum number of ReplicaSets kept in history

## Explanation

`maxUnavailable` caps how far below the desired replica count the Deployment may drop while updating, letting you trade off update speed against how much capacity you are willing to lose temporarily.

## Explicação para criança

É o limite de quantas cadeiras podem ficar vazias na sala enquanto trocam a mobília, para garantir que sempre sobre lugar suficiente para quem chega.

