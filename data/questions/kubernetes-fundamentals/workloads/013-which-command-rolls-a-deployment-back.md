---
id: kf-wl-013
category: kubernetes-fundamentals
topic: workloads
difficulty: hard
tags: [rollback]
source: LFS158 ch.8
---

# Question

Which command rolls a Deployment back to its previous revision?

## Options

- [x] kubectl rollout undo deployment/<name>
- [ ] kubectl delete deployment/<name> --revert
- [ ] kubectl apply -f old-version.yaml --force-recreate
- [ ] kubectl scale deployment/<name> --replicas=0

## Explanation

`kubectl rollout undo` reverts a Deployment's Pod template to a previous ReplicaSet revision recorded in its rollout history, triggering a new rolling update back to that state.

## Explicação para criança

É como apertar 'desfazer' num documento: volta para a versão anterior que ainda estava salva, sem precisar reescrever tudo do zero.

