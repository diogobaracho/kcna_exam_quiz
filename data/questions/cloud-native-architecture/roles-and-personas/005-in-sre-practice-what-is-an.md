---
id: cna-role-005
category: cloud-native-architecture
topic: roles-and-personas
difficulty: medium
tags: [sre, error-budget]
source: LFS250 module 9
---

# Question

In SRE practice, what is an 'error budget'?

## Options

- [x] The acceptable amount of unreliability (1 minus the SLO) a service can spend before teams must pause feature work to focus on reliability
- [ ] The financial budget allocated for fixing bugs each quarter
- [ ] A fixed number of bugs a developer is allowed to introduce
- [ ] The maximum number of Pods a namespace may run

## Explanation

If a service's SLO is 99.9% availability, its error budget is the remaining 0.1% of allowed failure over a period; teams can spend that budget on risk (like releasing new features) but must slow down and prioritize reliability once it is exhausted.

## Explicação para criança

É como uma mesada de 'poder errar um pouco': enquanto não gastar tudo, dá para arriscar coisas novas; quando acaba, é hora de parar e cuidar do que já existe.

