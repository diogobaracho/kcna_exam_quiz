---
id: kf-sched-013
category: kubernetes-fundamentals
topic: scheduling
difficulty: easy
tags: [node-selector]
source: LFS158 ch.10
---

# Question

What is the simplest way to constrain a Pod to nodes with the label `disktype=ssd`?

## Options

- [x] Set nodeSelector: {disktype: ssd} in the Pod spec
- [ ] Add a Service selector for disktype=ssd
- [ ] Set an annotation on the Deployment
- [ ] Create a NetworkPolicy matching disktype=ssd

## Explanation

`nodeSelector` is the most basic node-placement mechanism: the Pod is only scheduled onto nodes whose labels match every key-value pair listed, though node affinity offers more expressive matching for complex cases.

## Explicação para criança

É como pedir 'só quero mesa perto da cozinha': o garçom só te senta numa mesa que tenha exatamente essa etiqueta.

