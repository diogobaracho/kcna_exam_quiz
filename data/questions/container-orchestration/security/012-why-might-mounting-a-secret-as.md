---
id: co-sec-012
category: container-orchestration
topic: security
difficulty: medium
tags: [secrets, env-vars]
source: LFS250 module 10
---

# Question

Why might mounting a Secret as a file (a volume) be preferred over injecting it as an environment variable?

## Options

- [x] Mounted files can be updated without restarting the Pod, and are less likely to leak through logs, process listings, or child process inheritance
- [ ] Environment variables are always encrypted, files never are
- [ ] Files cannot be read by the application at all
- [ ] Kubernetes does not allow Secrets as environment variables

## Explanation

Environment variables are easily exposed through crash dumps, `/proc`, or accidental logging, and are fixed at container start; a mounted Secret volume can be updated live by the kubelet as the underlying Secret changes, without those exposure risks.

## Explicação para criança

É como escrever uma senha num post-it colado na tela (variável de ambiente, fácil de qualquer um ver) versus guardá-la numa gaveta fechada que só quem precisa vai abrir (arquivo montado).

