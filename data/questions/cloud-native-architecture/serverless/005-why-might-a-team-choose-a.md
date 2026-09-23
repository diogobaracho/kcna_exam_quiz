---
id: cna-sls-005
category: cloud-native-architecture
topic: serverless
difficulty: hard
tags: [serverless, vendor-lock-in]
source: LFS250 module 7
---

# Question

Why might a team choose a Kubernetes-based serverless platform (like Knative) over a public cloud's proprietary FaaS offering?

## Options

- [x] To reduce vendor lock-in and keep the ability to run the same workloads consistently across clusters or clouds
- [ ] Because Kubernetes-based options never scale to zero
- [ ] Because proprietary FaaS offerings are always more expensive
- [ ] Because Knative eliminates the need for containers

## Explanation

A proprietary FaaS platform ties your function's packaging and triggers to one cloud provider's APIs; running serverless workloads on Kubernetes with an open framework keeps the deployment portable across any conformant cluster, at the cost of managing more of the platform yourself.

## Explicação para criança

É como escolher uma receita que funciona em qualquer forno, em vez de uma que só funciona no forno de uma marca específica: dá mais liberdade para mudar de cozinha depois.

