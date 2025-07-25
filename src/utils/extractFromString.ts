/**
 * Extract value from string using regex
 * @param {string} str - Input string to extract from
 * @param {RegExp} regex - Regular expression with capture groups
 * @param {T} type - Expected return type ('string' | 'number' | 'boolean' | 'array' | 'date')
 * @returns {ExtractedValue} Extracted and converted value based on type
 * @since 0.9.8
 * @example
 * extractFromString('Price: $25.99', /\$(\d+\.\d+)/, 'number'); // 25.99
 * extractFromString('Active: true', /Active: (\w+)/, 'boolean'); // true
 * extractFromString('Date: 2023-12-25', /Date: (.+)/, 'date'); // Date object
 */
export function extractFromString<T extends 'string' | 'number' | 'boolean' | 'array' | 'date'> (
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