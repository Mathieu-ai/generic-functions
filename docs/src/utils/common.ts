import { REGEX_PATTERNS } from '@/lib/constants';

/**
 * Generate a unique ID for an element
 */
export function generateId (prefix: string, name: string): string {
  return `${prefix}-${name.toLowerCase().replace(REGEX_PATTERNS.ID_CLEANUP, '-')}`;
}

/**
 * Format category name for display
 */
export function formatCategoryName (category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Sort items alphabetically by names
 */
export function sortByName<T extends { readonly name: string }> (
  items: readonly T[]
): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Group items by category
 */
export function groupByCategory<T extends { readonly category: string; readonly name: string }> (
  items: readonly T[]
): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const category = item.category || 'other';
    return {
      ...groups,
      [category]: [...(groups[category] || []), item],
    };
  }, {} as Record<string, T[]>);
}

/**
 * Filter items by search term
 */
export function filterBySearch<T extends { readonly name: string; readonly description: string }> (
  items: readonly T[],
  searchTerm: string
): T[] {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return [...items];

  return items.filter(item =>
    item.name.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term)
  );
}

/**
 * Create a debounced version of a function
 */
export function debounce<T extends unknown[]> (
  func: (...args: T) => void,
  wait: number
): (...args: T) => void {
  let timeout: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
