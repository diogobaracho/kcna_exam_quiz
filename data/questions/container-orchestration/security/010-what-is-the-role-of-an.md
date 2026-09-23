---
id: co-sec-010
category: container-orchestration
topic: security
difficulty: hard
tags: [admission-controllers]
source: LFS250 module 10
---

# Question

What is the role of an admission controller (such as an OPA Gatekeeper or Kyverno webhook) in the API request lifecycle?

## Options

- [x] It intercepts requests after authentication and authorization to validate or mutate objects before they are persisted
- [ ] It replaces authentication entirely
- [ ] It only runs during cluster installation
- [ ] It schedules Pods onto nodes

## Explanation

Admission controllers/webhooks run as the final step before an object is written to etcd; validating webhooks can reject non-compliant objects (like Pods without resource limits), and mutating webhooks can modify them, enforcing custom policy beyond RBAC.

## Explicação para criança

É como uma última checagem antes de carimbar um documento: depois de confirmar quem você é e o que pode fazer, alguém ainda revisa se o pedido segue as regras da casa antes de aprovar de vez.

