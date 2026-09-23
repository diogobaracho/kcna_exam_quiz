---
id: co-rt-008
category: container-orchestration
topic: runtime
difficulty: easy
tags: [runc, oci-runtime]
source: LFS250 module 3
---

# Question

What is runc?

## Options

- [x] A low-level, OCI-compliant runtime that actually creates and runs a container using Linux namespaces and cgroups
- [ ] A high-level tool for writing Kubernetes manifests
- [ ] A DNS server used inside clusters
- [ ] A container registry implementation

## Explanation

runc is the reference implementation of the OCI Runtime Specification; higher-level runtimes like containerd and CRI-O typically invoke runc (or an alternative like crun or Kata) to do the actual work of creating a container's namespaces, cgroups, and process.

## Explicação para criança

O runc é quem realmente aperta o botão de ligar o contêiner no nível mais baixo, usando os recursos do próprio Linux, enquanto ferramentas maiores só dão a ordem para ele.

