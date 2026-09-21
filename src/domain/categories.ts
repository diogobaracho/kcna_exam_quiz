import type { Category, CategoryId } from './types';

/**
 * The only manifest in the project. A category corresponds to a folder under
 * `data/questions/`. Adding a new KCNA domain means adding a folder and one
 * entry here (weights must still sum to 100).
 */
export const CATEGORIES: Category[] = [
  {
    id: 'kubernetes-fundamentals',
    name: 'Kubernetes Fundamentals',
    namePt: 'Fundamentos de Kubernetes',
    weight: 46,
    order: 1,
    prefix: 'kf',
  },
  {
    id: 'container-orchestration',
    name: 'Container Orchestration',
    namePt: 'Orquestração de Contêineres',
    weight: 22,
    order: 2,
    prefix: 'co',
  },
  {
    id: 'cloud-native-architecture',
    name: 'Cloud Native Architecture',
    namePt: 'Arquitetura Cloud Native',
    weight: 16,
    order: 3,
    prefix: 'cna',
  },
  {
    id: 'cloud-native-observability',
    name: 'Cloud Native Observability',
    namePt: 'Observabilidade Cloud Native',
    weight: 8,
    order: 4,
    prefix: 'cno',
  },
  {
    id: 'cloud-native-application-delivery',
    name: 'Cloud Native Application Delivery',
    namePt: 'Entrega de Aplicações Cloud Native',
    weight: 8,
    order: 5,
    prefix: 'cnad',
  },
];

export const CATEGORY_IDS: CategoryId[] = CATEGORIES.map((c) => c.id);

const BY_ID = new Map<CategoryId, Category>(CATEGORIES.map((c) => [c.id, c]));

export function isCategoryId(value: string): value is CategoryId {
  return BY_ID.has(value as CategoryId);
}

export function getCategory(id: CategoryId): Category {
  const category = BY_ID.get(id);
  if (!category) {
    throw new Error(`Unknown category "${id}"`);
  }
  return category;
}

/** Categories in display order. */
export function orderedCategories(): Category[] {
  return [...CATEGORIES].sort((a, b) => a.order - b.order);
}
