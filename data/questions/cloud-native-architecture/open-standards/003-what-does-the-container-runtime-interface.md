---
id: cna-std-003
category: cloud-native-architecture
topic: open-standards
difficulty: medium
tags: [cri]
source: LFS250 module 3
---

# Question

What does the Container Runtime Interface (CRI) standardize?

## Options

- [x] The gRPC API between the kubelet and a container runtime, so any compliant runtime can be swapped in
- [ ] The format of container images
- [ ] The way Pods communicate with each other over the network
- [ ] The way PersistentVolumes attach to nodes

## Explanation

CRI defines the protocol the kubelet uses to manage containers and images through a runtime, decoupling kubelet's implementation from any specific runtime like containerd or CRI-O.

## Explicação para criança

É a língua combinada entre o kubelet e o motor de contêineres, para que qualquer motor que fale essa língua consiga trabalhar junto sem tradução especial.

