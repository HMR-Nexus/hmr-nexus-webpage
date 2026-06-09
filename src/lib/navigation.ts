export type PageId = 'home' | 'fibra' | 'software';

export const pageIds: PageId[] = ['home', 'fibra', 'software'];

export function toPageId(value?: string | null): PageId {
  const normalized = value?.replace(/^#/, '') as PageId | undefined;
  return normalized && pageIds.includes(normalized) ? normalized : 'home';
}
