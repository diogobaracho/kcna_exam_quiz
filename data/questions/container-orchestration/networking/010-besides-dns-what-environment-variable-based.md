---
id: co-net-010
category: container-orchestration
topic: networking
difficulty: medium
tags: [service-discovery]
source: LFS158 ch.9
---

# Question

Besides DNS, what environment-variable-based mechanism does Kubernetes provide for basic service discovery?

## Options

- [x] It injects <SVC>_SERVICE_HOST and <SVC>_SERVICE_PORT variables into Pods for Services that existed when the Pod started
- [ ] It injects the full kubeconfig into every Pod
- [ ] It mounts a hosts file mapping every node's hostname
- [ ] It requires a service mesh sidecar for any discovery to work

## Explanation

For compatibility with pre-DNS discovery, kubelet also sets environment variables like `MY_SVC_SERVICE_HOST` for Services that already existed when a Pod was created, though this only reflects a snapshot at Pod start, unlike DNS, which is looked up live.

## Explicação para criança

É como colar um bilhete com o endereço de um vizinho na parede, mas só se o vizinho já morava lá quando você chegou; se ele se mudar depois, o bilhete não atualiza.

