/**
 * Lightweight array utility functions
 * No external dependencies
 */

export interface SortOptions<T> {
  arr: T[];
  prop: keyof T;
  ascending?: boolean;
}

/**
 * Removes all accents from a string (inline to avoid circular imports)
 */
function purify(str: any): string {
  return typeof str === "string"
    ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";
}

/**
 * Sort an array of objects by a property
 * @param options - The sort options
 * @returns The sorted array
 * @example
 * sort({ arr: [{name: 'Bob'}, {name: 'Alice'}], prop: 'name' })
 * // [{name: 'Alice'}, {name: 'Bob'}]
 */
export function sort<T extends Record<string, any>>(options: SortOptions<T>): T[] {
  const { arr, prop, ascending = true } = options;
  
  const compare = (a: T, b: T) => {
    const valueA = a[prop];
    const valueB = b[prop];
    
    const sortOrder = ascending ? 1 : -1;
    
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder * (valueA - valueB);
    }
    
    return sortOrder * purify(String(valueA)).localeCompare(purify(String(valueB)));
  };
  
  return arr.slice().sort(compare);
}

/**
 * Get unique values from an array
 * @param data - The array to filter
 * @param field - Optional field to use for uniqueness
 * @returns Array of unique values
 */
export function getUnique<T>(data: T[], field?: string): T[] {
  const seen = new Set();
  
  return data.filter(item => {
    const key = field && typeof item === 'object' && item !== null
      ? JSON.stringify((item as any)[field])
      : JSON.stringify(item);
    
    if (seen.has(key)) {
      return false;
    }
    
    seen.add(key);
    return true;
  });
}

/**
 * Get the last element(s) from an array or object
 * @param data - The data to get last element from
 * @returns The last element(s)
 */
export function getLastElement<T>(data: T[] | Record<string, any>): T[] | Record<string, any> {
  if (Array.isArray(data)) {
    return data.length > 0 ? [data[data.length - 1]] : [];
  } else if (typeof data === 'object' && data) {
    const keys = Object.keys(data);
    return keys.length > 0 
      ? { [keys[keys.length - 1]]: data[keys[keys.length - 1]] } 
      : {};
  }
  return data as any;
}

/**
 * Get a random string from an array
 * @param arr - Array of strings
 * @returns Random string from the array
 */
export function randomString(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Check if array length is less than size, return array or fallback
 * @param first - The array to check
 * @param second - Fallback value
 * @param size - Size threshold
 * @returns The array or fallback based on size
 */
export function checkLength<T>(first: T[], second: string, size: number): T[] | string {
  return first.length < size ? first : second;
}
