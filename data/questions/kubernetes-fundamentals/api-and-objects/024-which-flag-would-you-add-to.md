---
id: kf-api-024
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [kubectl, output]
source: LFS158 ch.3
---

# Question

Which flag would you add to `kubectl get pods` to print the underlying YAML/JSON representation of the objects instead of the summary table?

## Options

- [x] -o yaml (or -o json)
- [ ] -v yaml
- [ ] --format=full
- [ ] -w

## Explanation

The `-o`/`--output` flag controls how kubectl renders results; `yaml` and `json` print the full object representation as stored by the API server, useful for inspecting fields not shown in the default table.

## Explicação para criança

É como pedir para ver a receita completa em vez do prato pronto: `-o yaml` mostra todos os ingredientes (campos) que compõem o objeto.

