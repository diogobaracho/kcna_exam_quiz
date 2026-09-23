---
id: co-fund-003
category: container-orchestration
topic: orchestration-fundamentals
difficulty: medium
tags: [self-healing]
source: LFS250 module 1
---

# Question

What does 'self-healing' mean in the context of container orchestration?

## Options

- [x] The system automatically detects failed containers or nodes and takes corrective action, like restarting or rescheduling workloads
- [ ] Containers automatically patch their own security vulnerabilities
- [ ] The cluster repairs corrupted disks without any downtime
- [ ] Applications automatically fix their own bugs at runtime

## Explanation

Self-healing describes controllers and the kubelet detecting failures (a crashed container, an unresponsive node) and automatically restarting containers or rescheduling Pods elsewhere to restore the desired state without human intervention.

## Explicação para criança

É como um brinquedo que, quando quebra uma peça, chama sozinho alguém para trocar a peça, sem que você precise perceber e pedir o conserto.

