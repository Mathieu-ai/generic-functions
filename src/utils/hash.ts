/**
 * Simple hash function (lightweight alternative to object-hash)
 * @param {unknown} obj - Object or value to hash
 * @returns {string} Simple hash string in base 36
 * @since 0.9.8
 * @example
 * hash('hello'); // "1k4xd"
 * hash({ a: 1, b: 2 }); // "1x3k2d"
 */
export function hash (obj: unknown): string {
  const str = typeof obj === 'string' ? obj : JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}