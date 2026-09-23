---
id: kf-api-013
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [kubectl, describe]
source: LFS158 ch.3
---

# Question

You want to see recent events explaining why a Pod is stuck in `Pending`. Which command is most useful?

## Options

- [x] kubectl describe pod <name>
- [ ] kubectl get pods -o wide
- [ ] kubectl top pod <name>
- [ ] kubectl version

## Explanation

`kubectl describe pod` prints detailed object status plus the Events section, which records scheduling failures, image pull errors, and other reasons a Pod has not progressed.

## Explicação para criança

É como perguntar 'o que está acontecendo com você?' para o Pod: o `describe` conta a história recente, incluindo os problemas que aconteceram no caminho.

