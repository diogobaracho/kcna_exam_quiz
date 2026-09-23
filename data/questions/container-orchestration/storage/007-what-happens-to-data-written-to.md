---
id: co-sto-007
category: container-orchestration
topic: storage
difficulty: easy
tags: [emptydir]
source: LFS158 ch.9
---

# Question

What happens to data written to an `emptyDir` volume when its Pod is deleted?

## Options

- [x] The data is deleted along with the Pod; emptyDir only survives container restarts within the same Pod, not Pod deletion
- [ ] The data is automatically backed up to a PersistentVolume
- [ ] The data is preserved forever, even after the Pod is gone
- [ ] The data is copied to every other node in the cluster

## Explanation

`emptyDir` is scratch space tied to the Pod's own lifetime: it survives a container crashing and restarting inside the same Pod, but is permanently removed once the Pod itself is deleted, making it unsuitable for data that must outlive the Pod.

## Explicação para criança

É como um rascunho de sala de aula: sobrevive se o aluno sair e voltar no mesmo dia, mas é apagado quando a aula (o Pod) termina de vez.

