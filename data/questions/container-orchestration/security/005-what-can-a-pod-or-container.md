---
id: co-sec-005
category: container-orchestration
topic: security
difficulty: medium
tags: [security-context]
source: LFS250 module 10
---

# Question

What can a Pod or container's `securityContext` field configure?

## Options

- [x] Settings like running as non-root, a specific UID/GID, read-only root filesystem, and dropped Linux capabilities
- [ ] The container image to pull
- [ ] The number of replicas to run
- [ ] The DNS servers the Pod uses

## Explanation

`securityContext` at the Pod or container level configures privilege and access-control settings enforced by the kernel: user/group IDs, whether the root filesystem is writable, privilege escalation, and which Linux capabilities are added or dropped.

## Explicação para criança

É como uma lista de regras de comportamento para o contêiner: pode dizer 'não seja o dono da casa (root)', 'não escreva em lugares fixos', entre outras regras de segurança.

