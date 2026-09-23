---
id: kf-api-011
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [api-groups]
source: LFS158 ch.3
---

# Question

Why does Kubernetes organize resources into separate API groups such as `apps`, `batch`, and `networking.k8s.io` instead of one flat API?

## Options

- [x] So different sets of resources can evolve, version, and be enabled independently
- [ ] Because etcd requires a separate database per group
- [ ] Because kubectl cannot talk to more than one group at a time
- [ ] To force every object to be namespaced

## Explanation

API groups let related resource types version and change together without affecting unrelated resources; a group can move from `v1beta1` to `v1` on its own schedule, and cluster admins can enable or disable whole groups.

## Explicação para criança

É como separar as matérias da escola em cadernos diferentes: matemática pode mudar de página sem bagunçar o caderno de português. Cada 'caderno' (grupo de API) evolui no seu próprio ritmo.

