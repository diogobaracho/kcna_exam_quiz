---
id: co-sec-002
category: container-orchestration
topic: security
difficulty: medium
tags: [rbac]
source: LFS250 module 10
---

# Question

What does Kubernetes RBAC (Role-Based Access Control) allow you to configure?

## Options

- [x] Which actions (verbs) a subject (user, group, or ServiceAccount) may perform on which resources
- [ ] Which container images are allowed to run in the cluster
- [ ] How much CPU a Pod may consume
- [ ] Which nodes a Pod can be scheduled to

## Explanation

RBAC binds subjects to Roles (or ClusterRoles) that list allowed verbs (get, list, create, delete, ...) on specific resource types, letting administrators grant least-privilege access instead of all-or-nothing cluster access.

## Explicação para criança

É como dar crachás diferentes: um crachá deixa só olhar os arquivos, outro deixa editar, e o sistema confere o crachá antes de deixar fazer qualquer coisa.

