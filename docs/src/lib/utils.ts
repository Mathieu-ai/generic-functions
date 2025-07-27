import { ERROR_MESSAGES, REGEX_PATTERNS, SUCCESS_MESSAGES } from './constants';
import toast from './toast';

/**
 * Copy text to clipboard with toast notification
 * @param text - The text to copy to clipboard
 * @param message - Success message to display (optional)
 */
export async function copyToClipboard(
  text: string, 
  message: string = SUCCESS_MESSAGES.COPIED
): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(message);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    toast.error(ERROR_MESSAGES.COPY_FAILED);
  }
}

/**
 * Generate a unique ID for an element
 * @param prefix - Prefix for the ID
 * @param name - Name to convert to ID
 * @returns Generated ID string
 */
export function generateId(prefix: string, name: string): string {
  return `${prefix}-${name.toLowerCase().replace(REGEX_PATTERNS.ID_CLEANUP, '-')}`;
}

/**
 * Scroll to element by ID with smooth animation
 * @param id - Element ID to scroll to
 */
export function scrollToElement(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

/**
 * Format category name for display
 * @param category - Category string to format
 * @returns Formatted category name
 */
export function formatCategoryName(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Sort items alphabetically by name
 * @param items - Array of items with name property
 * @returns Sorted array
 */
export function sortByName<T extends { readonly name: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Group items by category
 * @param items - Array of items with category and name properties
 * @returns Object with categories as keys and item arrays as values
 */
export function groupByCategory<T extends { readonly category: string; readonly name: string }>(
  items: readonly T[]
): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Filter items by search term
 * @param items - Array of items to filter
 * @param searchTerm - Search term to filter by
 * @returns Filtered array
 */
export function filterBySearch<T extends { readonly name: string; readonly description: string }>(
  items: readonly T[],
  searchTerm: string
): T[] {
  if (!searchTerm.trim()) return [...items];
  
  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    item.name.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term)
  );
}

/**
 * Debounce function to limit rapid function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
): (...args: T) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if a string is a valid URL
 * @param string - String to validate
 * @returns True if valid URL, false otherwise
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract domain from URL
 * @param url - URL to extract domain from
 * @returns Domain string or original URL if extraction fails
 */
export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return url;
  }
}
