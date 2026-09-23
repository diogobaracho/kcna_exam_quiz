---
id: co-mesh-004
category: container-orchestration
topic: service-mesh
difficulty: medium
tags: [mtls]
source: LFS250 module 6
---

# Question

What does mutual TLS (mTLS), commonly automated by a service mesh, provide?

## Options

- [x] Both sides of a connection authenticate each other with certificates and the traffic is encrypted, not just the server side as in typical TLS
- [ ] Only the client authenticates the server, as in typical HTTPS
- [ ] It removes the need for certificates entirely
- [ ] It only encrypts traffic leaving the cluster to the internet

## Explanation

In mTLS, both the client and the server present certificates and verify each other's identity before establishing an encrypted channel, giving service-to-service communication strong authentication in addition to confidentiality.

## Explicação para criança

É como duas pessoas mostrando documento de identidade uma para a outra antes de conversar, em vez de só uma mostrar o documento: as duas confirmam quem são.

