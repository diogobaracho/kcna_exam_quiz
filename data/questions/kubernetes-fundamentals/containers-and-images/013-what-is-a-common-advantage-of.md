---
id: kf-img-013
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: medium
tags: [images, base-images]
source: LFS158 ch.2
---

# Question

What is a common advantage of using a minimal base image (such as `distroless` or `alpine`) instead of a full OS image?

## Options

- [x] Smaller attack surface and image size, since unnecessary OS packages and shells are left out
- [ ] It automatically encrypts all traffic to and from the container
- [ ] It removes the need for a container runtime
- [ ] It makes the image compatible with any CPU architecture automatically

## Explanation

Minimal images ship fewer binaries and libraries, which shrinks download size, speeds up startup, and reduces the number of packages that could carry vulnerabilities.

## Explicação para criança

É como levar uma mochila só com o essencial numa viagem, em vez de levar a casa inteira: mais leve, mais rápido e menos coisa para se perder ou dar problema.

