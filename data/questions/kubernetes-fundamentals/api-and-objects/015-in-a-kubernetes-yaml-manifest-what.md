---
id: kf-api-015
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [yaml]
source: LFS158 ch.3
---

# Question

In a Kubernetes YAML manifest, what does the `metadata.name` field represent?

## Options

- [x] The unique name of the object within its namespace (and kind)
- [ ] The name of the node the object must run on
- [ ] The Docker image tag to pull
- [ ] The name of the cluster the object belongs to

## Explanation

`metadata.name` identifies the object uniquely among objects of the same kind in the same namespace; it is how you refer to it later with kubectl and how other objects reference it.

## Explicação para criança

É o nome próprio da coisa, tipo o nome escrito na etiqueta da mochila, para saber de quem é sem confundir com a mochila do coleguinha.

