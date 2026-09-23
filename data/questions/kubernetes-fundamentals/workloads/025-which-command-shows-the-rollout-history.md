---
id: kf-wl-025
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [deployment, history]
source: LFS158 ch.8
---

# Question

Which command shows the rollout history of a Deployment, including revision numbers?

## Options

- [x] kubectl rollout history deployment/<name>
- [ ] kubectl get deployment/<name> --history
- [ ] kubectl describe rollout <name>
- [ ] kubectl logs deployment/<name> --history

## Explanation

`kubectl rollout history` lists the recorded revisions for a Deployment (each tied to a ReplicaSet), letting you inspect or target a specific revision with `kubectl rollout undo --to-revision=N`.

## Explicação para criança

É como olhar o histórico de versões de um documento: mostra cada mudança salva para você poder escolher para qual versão voltar.

