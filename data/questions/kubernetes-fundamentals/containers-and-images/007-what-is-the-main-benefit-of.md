---
id: kf-img-007
category: kubernetes-fundamentals
topic: containers-and-images
difficulty: hard
tags: [dockerfile, multi-stage]
source: LFS158 ch.2
---

# Question

What is the main benefit of a multi-stage Dockerfile build?

## Options

- [x] It lets you compile with a full build toolchain in one stage and copy only the final artifact into a smaller final image, reducing size and attack surface
- [ ] It allows an image to run on multiple architectures automatically
- [ ] It removes the need for a registry
- [ ] It doubles the number of layers to improve caching

## Explanation

Multi-stage builds use one or more intermediate stages with build tools and dependencies, then a final `FROM` stage that only copies the compiled output, producing a leaner, more secure production image without extra build-time cruft.

## Explicação para criança

É como cozinhar numa cozinha bagunçada cheia de panelas e só levar o prato pronto para a mesa: a bagunça do preparo fica para trás, só o resultado final vai para a imagem.

