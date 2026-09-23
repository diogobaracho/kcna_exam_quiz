---
id: co-sec-006
category: container-orchestration
topic: security
difficulty: hard
tags: [pod-security-admission]
source: LFS250 module 10
---

# Question

What does Pod Security Admission (the built-in successor to PodSecurityPolicy) do?

## Options

- [x] It enforces one of three predefined security standards (privileged, baseline, restricted) at the namespace level via labels
- [ ] It scans container images for known CVEs before allowing a pull
- [ ] It manages TLS certificates for the API server
- [ ] It replaces RBAC entirely

## Explanation

Pod Security Admission is a built-in admission controller that checks Pods against one of the Pod Security Standards levels (privileged, baseline, restricted), configured per namespace via labels, without needing a separate policy engine.

## Explicação para criança

É como um segurança na porta de cada sala que já sabe três níveis de regra (bem solto, médio, bem apertado) e só deixa entrar quem seguir o nível daquela sala.

