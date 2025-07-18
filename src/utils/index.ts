/**
 * Utility functions that may have optional dependencies
 * These functions are heavier and should be imported separately if needed
 */

/**
 * Country interface
 */
export interface Country {
  name?: {
    common: string;
    official: string;
  };
  cca2?: string;
  altNames?: string;
  flag?: string;
}

/**
 * HTTP request options (lightweight, axios-free)
 */
export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}
/**
 * Simple HTTP client using fetch (no axios dependency)
 * @param url - Request URL
 * @param options - Request options
 * @returns Promise with response data
 */
export async function api(url: string, options: RequestOptions = {}): Promise<any> {
  const { method = 'GET', headers = {}, body } = options;
  
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (body && method !== 'GET') {
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }
    
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return { 
      ok: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Find country by various criteria
 * @param searchParams - Search criteria
 * @param countries - Array of countries
 * @returns Found country or empty object
 */
export function getCountry(
  { cc, cn, cf }: { cc?: string; cn?: string; cf?: string },
  countries: Country[]
): Partial<Country> {
  if (!countries || countries.length === 0) return {};
  
  const normalizedCn = cn?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  const searchInAltNames = (altNames: string) => {
    return new RegExp(`\\b${normalizedCn}\\b`, "i").test(altNames);
  };
  
  const country = countries
    .sort((a, b) => (a.cca2 || '').localeCompare(b.cca2 || ''))
    .find(({ name, altNames, cca2, flag }) => {
      if (cc && cca2 === cc) return true;
      if (cf && flag === cf) return true;
      if (normalizedCn && name) {
        if (name.common === normalizedCn || name.official === normalizedCn) return true;
        if (altNames && searchInAltNames(altNames)) return true;
      }
      return false;
    });
  
  return country || {};
}

/**
 * Extract value from string using regex
 * @param str - Input string
 * @param regex - Regular expression
 * @param type - Expected return type
 * @returns Extracted value
 */
export function extractFromString(
  str: any,
  regex: RegExp,
  type: 'string' | 'number' | 'boolean' | 'array' | 'date'
): any {
  const match = str?.match?.(regex);
  if (!match) return str;
  
  switch (type) {
    case 'string':
      return match[2] || match[1] || match[0];
    case 'boolean':
      return match[2] === 'true' || match[1] === 'true';
    case 'array':
      try {
        return JSON.parse(match[0]);
      } catch {
        return [];
      }
    case 'number':
      const num = parseFloat(match[1] || match[0]);
      return isNaN(num) ? str : num;
    case 'date':
      const date = new Date(match[2] || match[1] || match[0]);
      return isNaN(date.getTime()) ? new Date() : date;
    default:
      return match[0];
  }
}

/**
 * Simple hash function (lightweight alternative to object-hash)
 * @param obj - Object to hash
 * @returns Simple hash string
 */
export function simpleHash(obj: any): string {
  const str = typeof obj === 'string' ? obj : JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}
