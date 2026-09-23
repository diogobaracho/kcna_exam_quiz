---
id: kf-wl-017
category: kubernetes-fundamentals
topic: workloads
difficulty: medium
tags: [init-containers]
source: LFS158 ch.5
---

# Question

What is an init container?

## Options

- [x] A container that runs to completion before the Pod's main containers start, often used for setup tasks
- [ ] A container that runs forever alongside the main container
- [ ] The very first Pod created in a new namespace
- [ ] A container reserved for the control plane only

## Explanation

Init containers run sequentially and must each complete successfully before the Pod's regular containers are started, making them a common place to run setup steps like waiting for a dependency or seeding a config file.

## Explicação para criança

É como arrumar a mesa antes do jantar começar: alguém termina de pôr os pratos e talheres, e só depois a refeição principal (o container normal) começa.

