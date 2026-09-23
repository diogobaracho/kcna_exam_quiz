---
id: kf-api-020
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: medium
tags: [kubectl, namespace]
source: LFS158 ch.6
---

# Question

Which command creates objects in a namespace called `staging` without editing the YAML file to add the namespace field?

## Options

- [x] kubectl apply -f app.yaml -n staging
- [ ] kubectl create namespace staging --apply=app.yaml
- [ ] kubectl apply -f app.yaml --context=staging
- [ ] kubectl get -f app.yaml -n staging

## Explanation

The `-n`/`--namespace` flag tells kubectl which namespace to target for the operation, overriding the manifest's namespace field (or supplying one if it is absent) without modifying the file.

## Explicação para criança

É como escrever o destino no envelope na hora de postar a carta, mesmo que a carta em si não mencione para onde vai: o `-n` diz o endereço na hora de enviar.

