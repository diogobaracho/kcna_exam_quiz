---
id: kf-arch-021
category: kubernetes-fundamentals
topic: architecture
difficulty: hard
tags: [api-server, requests]
source: LFS158 ch.11
---

# Question

When a request reaches kube-apiserver, in which order does it generally pass through these stages?

## Options

- [x] Authentication, then authorization, then admission control
- [ ] Admission control, then authentication, then scheduling
- [ ] Authorization, then etcd write, then authentication
- [ ] Scheduling, then authentication, then admission control

## Explanation

kube-apiserver first authenticates who is making the request, then authorizes whether that identity may perform the action (for example via RBAC), and finally runs the request through admission controllers that can validate or mutate it before it is persisted.

## Explicação para criança

É como entrar num evento: primeiro mostram o documento (quem é você - autenticação), depois checam se seu ingresso permite entrar ali (autorização), e por fim um segurança dá uma última olhada antes de liberar (admissão).

