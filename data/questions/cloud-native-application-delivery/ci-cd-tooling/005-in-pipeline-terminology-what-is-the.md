---
id: cnad-cicd-005
category: cloud-native-application-delivery
topic: ci-cd-tooling
difficulty: medium
tags: [pipeline-concepts]
source: LFS250 module 11
---

# Question

In pipeline terminology, what is the purpose of a 'pipeline as code' approach (e.g. a pipeline definition committed alongside application source)?

## Options

- [x] It version-controls the build/test/deploy process together with the application, making pipeline changes reviewable and reproducible
- [ ] It means the pipeline can only run once and then must be deleted
- [ ] It removes the need for any container images in the pipeline
- [ ] It requires the pipeline to be written in the same language as the application

## Explanation

Storing pipeline definitions (like a Tekton Pipeline YAML or a CI config file) in the same repository as the code lets changes to the build/deploy process go through the same review and versioning workflow as application changes, improving traceability and reproducibility.

## Explicação para criança

É como guardar as instruções de montagem junto com a caixa do próprio móvel, para que qualquer mudança nas instruções seja revisada e lembrada junto com o móvel em si.

