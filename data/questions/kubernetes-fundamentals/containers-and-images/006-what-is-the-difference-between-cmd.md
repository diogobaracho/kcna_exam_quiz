---
id: kf-img-006
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: medium
tags: [dockerfile]
source: LFS158 ch.2
---

# Question

What is the difference between `CMD` and `ENTRYPOINT` in a Dockerfile, at a basic level?

## Options

- [x] ENTRYPOINT sets the fixed executable to run; CMD supplies default arguments that can be overridden at `docker run` time
- [ ] CMD can only be used once per Dockerfile, ENTRYPOINT can be used many times
- [ ] ENTRYPOINT only works with Kubernetes, CMD only works with Docker
- [ ] They are exact synonyms with no behavioral difference

## Explanation

ENTRYPOINT configures the container's main process, and CMD provides default arguments to it; a caller can override CMD at run time (or in a Pod's `args` field) without changing the fixed ENTRYPOINT.

## Explicação para criança

ENTRYPOINT é tipo o nome fixo do show que sempre acontece; CMD são as músicas padrão tocadas, mas alguém pode pedir músicas diferentes sem trocar o nome do show.

