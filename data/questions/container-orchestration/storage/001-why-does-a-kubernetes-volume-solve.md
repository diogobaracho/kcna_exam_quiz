---
id: co-sto-001
category: container-orchestration
topic: storage
difficulty: easy
tags: [volumes]
source: LFS158 ch.9
---

# Question

Why does a Kubernetes Volume solve the problem of a container's own filesystem being ephemeral?

## Options

- [x] A Volume is storage attached to the Pod that can outlive individual container restarts within that Pod's lifetime
- [ ] A Volume replaces the need for a container image
- [ ] A Volume is only accessible from outside the cluster
- [ ] A Volume automatically backs up data to the cloud

## Explanation

A container's writable layer is lost when the container restarts; a Volume is defined at the Pod level and can be mounted into one or more containers, so data survives a container crash and restart as long as the Pod itself still exists.

## Explicação para criança

É como uma mochila que fica com a turma inteira em vez de com um aluno só: mesmo que um aluno saia da sala e volte, a mochila com o material continua lá.

