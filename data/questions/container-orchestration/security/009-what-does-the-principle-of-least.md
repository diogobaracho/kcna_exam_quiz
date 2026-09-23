---
id: co-sec-009
category: container-orchestration
topic: security
difficulty: easy
tags: [least-privilege]
source: LFS250 module 10
---

# Question

What does the principle of least privilege mean when applied to Kubernetes RBAC?

## Options

- [x] Every subject should be granted only the permissions it actually needs to do its job, and nothing more
- [ ] Every subject should be granted cluster-admin by default for convenience
- [ ] Only human users need RBAC rules, ServiceAccounts do not
- [ ] RBAC rules should never be namespace-scoped

## Explanation

Least privilege means scoping Roles tightly to the specific verbs and resources a workload or user needs, reducing the damage that a mistake or a compromised credential can cause.

## Explicação para criança

É como dar a chave só do quarto que a pessoa realmente usa, em vez de dar a chave mestra da casa inteira para todo mundo.

