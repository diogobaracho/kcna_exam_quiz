---
id: cnad-fund-002
category: cloud-native-application-delivery
topic: delivery-fundamentals
difficulty: medium
tags: [immutable-artifacts]
source: LFS250 module 11
---

# Question

Why do cloud native delivery pipelines emphasize building one immutable artifact (like a container image) and promoting the same artifact through environments?

## Options

- [x] It guarantees that what was tested in staging is exactly what runs in production, avoiding 'it worked in staging' surprises from rebuilding
- [ ] It is required because Kubernetes cannot pull the same image twice
- [ ] It removes the need for any testing in staging
- [ ] It only works for stateless batch jobs

## Explanation

Rebuilding an artifact separately for each environment risks subtle differences (dependency versions, build-time flags) sneaking in; promoting the exact same tagged/digest-pinned artifact from CI through staging to production removes that class of risk entirely.

## Explicação para criança

É como levar o mesmo bolo já pronto e provado na cozinha de teste direto para a festa, em vez de assar um bolo novo em cada lugar e torcer para sair igual.

