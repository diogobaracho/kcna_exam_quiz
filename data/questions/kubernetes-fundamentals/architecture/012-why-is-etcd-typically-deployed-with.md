---
id: kf-arch-012
category: kubernetes-fundamentals
topic: architecture
difficulty: medium
tags: [etcd, ha]
source: LFS158 ch.5
---

# Question

Why is etcd typically deployed with an odd number of members, such as 3 or 5?

## Options

- [ ] Odd numbers use less disk space than even numbers
- [x] etcd uses the Raft consensus algorithm, which needs a majority quorum to agree on writes
- [ ] Kubernetes licensing only allows odd member counts
- [ ] It allows etcd to skip leader election entirely

## Explanation

etcd replicates data using the Raft protocol, which commits a write only after a majority of members acknowledge it. An odd count maximizes fault tolerance per added node, since 3 members tolerate 1 failure and 5 tolerate 2, without wasting a node on ties.

## Explicação para criança

É como uma votação em grupo: com número ímpar de pessoas, nunca dá empate para decidir o que é verdade, mesmo se uma pessoa faltar.

