---
id: co-sec-008
category: container-orchestration
topic: security
difficulty: medium
tags: [secrets]
source: LFS250 module 10
---

# Question

Which practice improves the security of Kubernetes Secrets at rest?

## Options

- [x] Enabling encryption at rest for the etcd datastore so Secret data is not stored in plaintext
- [ ] Storing Secrets as plain ConfigMaps instead
- [ ] Disabling RBAC for the Secrets resource
- [ ] Mounting Secrets with world-writable permissions

## Explanation

By default, Secret data in etcd is only base64-encoded, not encrypted, so anyone with etcd access can read it. Enabling an encryption provider for the Secrets resource ensures the data is encrypted before it is written to disk.

## Explicação para criança

É como guardar documentos importantes numa gaveta trancada em vez de só colocá-los dentro de um envelope fechado: sem a chave certa, ninguém consegue ler o conteúdo.

