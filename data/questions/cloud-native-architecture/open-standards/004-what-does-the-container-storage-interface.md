---
id: cna-std-004
category: cloud-native-architecture
topic: open-standards
difficulty: medium
tags: [csi]
source: LFS250 module 3
---

# Question

What does the Container Storage Interface (CSI) standardize?

## Options

- [x] The API between orchestrators and storage systems, so storage vendors can write one driver that works across compliant orchestrators
- [ ] The format used to store container logs
- [ ] The layout of container image layers
- [ ] The way Services expose a virtual IP

## Explanation

CSI lets a storage vendor implement one driver against a stable spec, and that driver then works with any CSI-compliant orchestrator, avoiding the need to write and maintain orchestrator-specific in-tree storage plugins.

## Explicação para criança

É um padrão parecido com o CRI, mas para armazenamento: qualquer fabricante de disco que siga essa regra consegue ligar seu produto ao Kubernetes sem customização especial.

