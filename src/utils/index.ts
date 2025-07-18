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
 * @param {string} url - Request URL
 * @param {RequestOptions} [options={}] - Request options including method, headers, and body
 * @returns {Promise<T | { ok: false; message: string }>} Promise with response data or error object
 * @example
 * // GET request
 * const data = await api('https://api.example.com/users');
 * 
 * // POST request
 * const result = await api('https://api.example.com/users', {
 *   method: 'POST',
 *   body: { name: 'John' }
 * });
 */
export async function api<T = unknown>(url: string, options: RequestOptions = {}): Promise<T | { ok: false; message: string }> {
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
    
    return await response.json() as T;
  } catch (error) {
    return { 
      ok: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Find country by various criteria
 * @param {Object} searchParams - Search criteria
 * @param {string} [searchParams.cc] - Country code (ISO 3166-1 alpha-2)
 * @param {string} [searchParams.cn] - Country name (common or official)
 * @param {string} [searchParams.cf] - Country flag emoji
 * @param {Country[]} countries - Array of countries to search in
 * @returns {Partial<Country>} Found country or empty object if not found
 * @example
 * const country = getCountry({ cc: 'US' }, countries);
 * const country2 = getCountry({ cn: 'France' }, countries);
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
 * @param {string} str - Input string to extract from
 * @param {RegExp} regex - Regular expression with capture groups
 * @param {T} type - Expected return type ('string' | 'number' | 'boolean' | 'array' | 'date')
 * @returns {ExtractedValue} Extracted and converted value based on type
 * @example
 * extractFromString('Price: $25.99', /\$(\d+\.\d+)/, 'number'); // 25.99
 * extractFromString('Active: true', /Active: (\w+)/, 'boolean'); // true
 * extractFromString('Date: 2023-12-25', /Date: (.+)/, 'date'); // Date object
 */
export function extractFromString<T extends 'string' | 'number' | 'boolean' | 'array' | 'date'>(
  str: string,
  regex: RegExp,
  type: T
): T extends 'string' ? string : T extends 'number' ? number : T extends 'boolean' ? boolean : T extends 'array' ? unknown[] : T extends 'date' ? Date : unknown {
  const match = str?.match?.(regex);
  if (!match) return str as never;
  
  switch (type) {
    case 'string':
      return (match[2] || match[1] || match[0]) as never;
    case 'boolean':
      return (match[2] === 'true' || match[1] === 'true') as never;
    case 'array':
      try {
        return JSON.parse(match[0]) as never;
      } catch {
        return [] as never;
      }
    case 'number':
      const num = parseFloat(match[1] || match[0]);
      return (isNaN(num) ? str : num) as never;
    case 'date':
      const date = new Date(match[2] || match[1] || match[0]);
      return (isNaN(date.getTime()) ? new Date() : date) as never;
    default:
      return match[0] as never;
  }
}

/**
 * Simple hash function (lightweight alternative to object-hash)
 * @param {unknown} obj - Object or value to hash
 * @returns {string} Simple hash string in base 36
 * @example
 * simpleHash('hello'); // "1k4xd"
 * simpleHash({ a: 1, b: 2 }); // "1x3k2d"
 */
export function simpleHash(obj: unknown): string {
  const str = typeof obj === 'string' ? obj : JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}
