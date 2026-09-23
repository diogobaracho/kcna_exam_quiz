---
id: kf-api-003
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: easy
tags: [yaml, manifest]
source: LFS158 ch.3
---

# Question

Which top-level fields are required in almost every Kubernetes manifest?

## Options

- [x] apiVersion, kind, metadata, spec
- [ ] version, type, name, body
- [ ] apiVersion, type, labels, data
- [ ] kind, owner, replicas, image

## Explanation

A standard Kubernetes object manifest declares `apiVersion` (which API group/version), `kind` (the object type), `metadata` (name, namespace, labels), and `spec` (the desired state).

## Explicação para criança

É como preencher um formulário: sempre tem 'que tipo de coisa é essa' (kind), 'qual versão de regra usar' (apiVersion), 'como ela se chama' (metadata) e 'como ela deveria ser' (spec).

