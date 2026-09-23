# KCNA domains, folders, and reference material

The Kubernetes and Cloud Native Associate (KCNA) exam from the Cloud Native Computing Foundation
(CNCF) / Linux Foundation covers five domains. This table maps each official domain to the
folder that holds its questions in this repository, and to the Linux Foundation courses used as
study reference while authoring content: **LFS158** (Introduction to Kubernetes) and **LFS250**
(Introduction to Cloud Native and Kubernetes / KCNA companion course).

| KCNA domain | Exam weight | Folder | Primary reference | Topics in this bank |
|---|---|---|---|---|
| Kubernetes Fundamentals | 46% | `data/questions/kubernetes-fundamentals/` | LFS158 (chapters on architecture, objects, workloads, scheduling) | architecture, api-and-objects, workloads, containers-and-images, scheduling |
| Container Orchestration | 22% | `data/questions/container-orchestration/` | LFS158 (networking, storage) + LFS250 (runtimes, security, service mesh) | orchestration-fundamentals, runtime, security, networking, service-mesh, storage |
| Cloud Native Architecture | 16% | `data/questions/cloud-native-architecture/` | LFS250 (cloud native concepts, CNCF landscape) | fundamentals, autoscaling, serverless, community-and-governance, roles-and-personas, open-standards |
| Cloud Native Observability | 8% | `data/questions/cloud-native-observability/` | LFS250 (observability module) | telemetry-fundamentals, prometheus-and-tooling, cost-management |
| Cloud Native Application Delivery | 8% | `data/questions/cloud-native-application-delivery/` | LFS250 (CI/CD, GitOps module) | delivery-fundamentals, gitops, ci-cd-tooling |

## Topic-by-topic detail

### Kubernetes Fundamentals (`kubernetes-fundamentals`)

- **architecture** — control plane components (API server, etcd, scheduler, controller manager),
  node components (kubelet, kube-proxy, container runtime), cluster topology.
- **api-and-objects** — the Kubernetes API, `kubectl`, YAML manifests, namespaces, labels and
  selectors, annotations, API groups and versions.
- **workloads** — Pods, ReplicaSets, Deployments, DaemonSets, StatefulSets, Jobs, CronJobs,
  rolling updates, readiness/liveness probes.
- **containers-and-images** — the OCI image spec, image layers, registries, `Dockerfile` basics,
  image pull policies.
- **scheduling** — how `kube-scheduler` places Pods, node affinity/anti-affinity, taints and
  tolerations, resource requests and limits, priority classes.

### Container Orchestration (`container-orchestration`)

- **orchestration-fundamentals** — why orchestration exists, desired state, self-healing,
  declarative vs. imperative management.
- **runtime** — the Container Runtime Interface (CRI), containerd, CRI-O, sandboxed runtimes
  (gVisor, Kata Containers), the retirement of dockershim.
- **security** — the 4 C's of cloud native security (Cloud, Cluster, Container, Code), RBAC,
  ServiceAccounts, SecurityContext, Pod Security Admission, secrets handling.
- **networking** — the Container Network Interface (CNI), Service types (ClusterIP, NodePort,
  LoadBalancer), Ingress, cluster DNS (CoreDNS), NetworkPolicy.
- **service-mesh** — the sidecar pattern, Istio, Linkerd, mutual TLS, traffic splitting, the
  Service Mesh Interface (SMI).
- **storage** — Volumes, PersistentVolume/PersistentVolumeClaim, StorageClass, the Container
  Storage Interface (CSI), access modes.

### Cloud Native Architecture (`cloud-native-architecture`)

- **fundamentals** — what "cloud native" means, the 12-factor app methodology, microservices,
  immutable infrastructure.
- **autoscaling** — Horizontal Pod Autoscaler (HPA), Vertical Pod Autoscaler (VPA), Cluster
  Autoscaler, KEDA, scaling metrics.
- **serverless** — Knative, Functions-as-a-Service (FaaS), CloudEvents, scale-to-zero.
- **community-and-governance** — the CNCF, its Technical Oversight Committee (TOC) and Special
  Interest Groups (SIGs), project maturity levels (sandbox, incubating, graduated), Kubernetes
  Enhancement Proposals (KEPs).
- **roles-and-personas** — Site Reliability Engineering (SRE), DevOps, platform engineering,
  FinOps.
- **open-standards** — an overview of OCI, CRI, CNI, CSI and SMI as open, vendor-neutral
  interfaces.

### Cloud Native Observability (`cloud-native-observability`)

- **telemetry-fundamentals** — the three pillars of observability (logs, metrics, traces),
  Service Level Indicators/Objectives/Agreements (SLI/SLO/SLA).
- **prometheus-and-tooling** — Prometheus architecture, basic PromQL, Grafana, Alertmanager,
  OpenTelemetry.
- **cost-management** — FinOps basics, resource optimization, cost-visibility tooling concepts
  (e.g. Kubecost).

### Cloud Native Application Delivery (`cloud-native-application-delivery`)

- **delivery-fundamentals** — Continuous Integration vs. Continuous Delivery/Deployment,
  immutable build artifacts, deployment strategies (rolling, blue-green, canary).
- **gitops** — GitOps principles, Argo CD, Flux, reconciliation loops, git as the source of
  truth for desired state.
- **ci-cd-tooling** — Helm, Kustomize, Tekton, Argo Rollouts, general pipeline concepts.

## A note on sourcing

Questions in this bank are authored from public knowledge of the KCNA curriculum and the
publicly described syllabi of LFS158 and LFS250. No text is copied verbatim from either course;
the `source` frontmatter field on each question file is a study pointer for contributors (e.g.
"LFS158 ch.4"), not a citation of copied material. If you are studying for the real exam, taking
LFS158 and LFS250 (or the equivalent Linux Foundation training) alongside this quiz is strongly
recommended — this app is a practice tool, not a replacement for the official courses.
