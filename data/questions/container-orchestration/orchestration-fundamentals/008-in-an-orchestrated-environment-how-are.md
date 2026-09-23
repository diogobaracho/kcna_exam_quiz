---
id: co-fund-008
category: container-orchestration
topic: orchestration-fundamentals
difficulty: medium
tags: [orchestration, immutability]
source: LFS250 module 1
---

# Question

In an orchestrated environment, how are application updates typically delivered, compared to patching a running server in place?

## Options

- [x] By replacing running containers with new ones built from an updated image, rather than modifying containers in place
- [ ] By SSHing into each container and manually editing files
- [ ] By upgrading the Linux kernel on every node before every deploy
- [ ] By pausing the whole cluster until the update finishes

## Explanation

Containers are treated as immutable: instead of patching a running container, you build a new image with the fix and let the orchestrator roll out new containers from it, replacing the old ones, which keeps deployments reproducible.

## Explicação para criança

Em vez de consertar uma peça quebrada com fita adesiva, você troca a peça inteira por uma nova já pronta e testada.

