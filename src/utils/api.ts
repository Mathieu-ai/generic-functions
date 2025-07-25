/**
 * HTTP request options (lightweight, axios-free)
 * @since 0.9.8
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
 * @since 0.9.8
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
export async function api<T = unknown> (url: string, options: RequestOptions = {}): Promise<T | { ok: false; message: string }> {
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