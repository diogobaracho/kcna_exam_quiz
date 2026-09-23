---
id: kf-api-023
category: kubernetes-fundamentals
topic: api-and-objects
difficulty: hard
tags: [crd, extensibility]
source: LFS158 ch.3
---

# Question

What does a CustomResourceDefinition (CRD) allow a cluster administrator to do?

## Options

- [x] Define a brand-new object kind that the Kubernetes API can store and serve, extending the API without changing its source code
- [ ] Change the internal schema of built-in objects like Pod
- [ ] Replace etcd with a custom database engine
- [ ] Grant a ServiceAccount cluster-admin privileges

## Explanation

A CRD registers a new resource type with kube-apiserver, complete with its own schema, versions, and endpoint; combined with a controller, this is how tools like cert-manager or Argo CD add domain-specific objects that behave like native Kubernetes resources.

## Explicação para criança

É como inventar uma nova gaveta no armário que ainda não existia, com um formato próprio, e ensinar a casa inteira a reconhecer e guardar coisas nela.

