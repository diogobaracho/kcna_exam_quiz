---
id: cna-std-001
category: cloud-native-architecture
topic: open-standards
difficulty: easy
tags: [open-standards]
source: LFS250 module 3
---

# Question

Why does the cloud native ecosystem rely heavily on open standards like OCI, CRI, CNI, and CSI?

## Options

- [x] They let independent implementations (runtimes, network plugins, storage drivers) interoperate with orchestrators without vendor lock-in
- [ ] They are required by law in every country
- [ ] They eliminate the need for any configuration
- [ ] They only apply to Kubernetes' own internal code

## Explanation

These interfaces define stable contracts between Kubernetes and pluggable components; as long as an implementation honors the spec, it works with any conformant orchestrator, fostering a competitive, interoperable ecosystem instead of one vendor's proprietary stack.

## Explicação para criança

É como combinar um tamanho padrão de tomada: qualquer aparelho de qualquer marca que siga esse padrão vai funcionar na parede, sem precisar de adaptador especial.

