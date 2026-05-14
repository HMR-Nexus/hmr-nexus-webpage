export type PageId = 'home' | 'history' | 'services' | 'portfolio' | 'products' | 'contact';

export const pageIds: PageId[] = ['home', 'history', 'services', 'portfolio', 'products', 'contact'];

export function toPageId(value?: string | null): PageId {
  const normalized = value?.replace(/^#/, '') as PageId | undefined;
  return normalized && pageIds.includes(normalized) ? normalized : 'home';
}
