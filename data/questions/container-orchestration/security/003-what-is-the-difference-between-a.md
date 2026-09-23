---
id: co-sec-003
category: container-orchestration
topic: security
difficulty: medium
tags: [rbac, role-vs-clusterrole]
source: LFS250 module 10
---

# Question

What is the difference between a Role and a ClusterRole in RBAC?

## Options

- [x] A Role's permissions are scoped to a single namespace; a ClusterRole can grant permissions cluster-wide or be reused across namespaces
- [ ] A Role can only be used by ServiceAccounts, a ClusterRole only by human users
- [ ] A ClusterRole always grants full admin access
- [ ] A Role applies to nodes, a ClusterRole applies to Pods

## Explanation

Roles are namespaced objects granting access within that namespace only, while ClusterRoles are cluster-scoped and can either grant cluster-wide permissions (via a ClusterRoleBinding) or be bound within a single namespace (via a RoleBinding) for reuse.

## Explicação para criança

O Role é uma permissão que vale só dentro de uma sala específica; o ClusterRole é uma permissão que pode valer no prédio inteiro, ou ser emprestada para uma sala só.

