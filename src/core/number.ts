/**
 * Lightweight number utility functions
 * No external dependencies
 */

export interface NumberOptions {
  deep?: boolean;
}

export type NumberInput = string | number | boolean | object | any[];

/**
 * Parse string to number if possible
 * @param {NumberInput} data - The data to parse
 * @param {NumberOptions} [options={ deep: false }] - Parse options
 * @param {boolean} [options.deep=false] - Whether to recursively parse nested objects and arrays
 * @returns {NumberInput | number} Parsed number or original value if parsing fails
 * @example
 * number('123') // 123
 * number('abc') // 'abc'
 * number(['1', '2', 'abc']) // [1, 2, 'abc']
 * number({ a: '123', b: 'abc' }, { deep: true }) // { a: 123, b: 'abc' }
 */
export function number (data: NumberInput, options: NumberOptions = { deep: false }): NumberInput | number {
  const { deep } = options;

  if (Array.isArray(data)) {
    return data.map((item): NumberInput | number => number(item, options));
  }

  if (typeof data === "object" && data) {
    const result: Record<string, NumberInput | number> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = deep ? number(value, options) : value;
    }
    return result;
  }

  const parsedNumber = parseInt(data as string);
  return isNaN(parsedNumber) ? data : parsedNumber;
}

/**
 * Parse float with optional precision
 * @param {string | number} data - The data to parse as a floating point number
 * @param {number} [precision] - Number of decimal places to round to
 * @returns {number | string | number} Parsed float rounded to specified precision, or original value if parsing fails
 * @example
 * parseFloat('3.14159') // 3.14159
 * parseFloat('3.14159', 2) // 3.14
 * parseFloat('abc') // 'abc'
 */
export function parseFloat (data: string | number, precision?: number): number | string | number {
  const parsed = Number.parseFloat(String(data));
  if (isNaN(parsed)) return data;

  return precision !== undefined ? Number(parsed.toFixed(precision)) : parsed;
}

/**
 * Clamp a number between min and max values
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum allowed value (inclusive)
 * @param {number} max - Maximum allowed value (inclusive)
 * @returns {number} The clamped value between min and max
 * @example
 * clamp(5, 0, 10) // 5
 * clamp(-5, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 */
export function clamp (value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate random number between min and max
 * @param {number} [min=0] - Minimum value (inclusive)
 * @param {number} [max=1] - Maximum value (exclusive)
 * @returns {number} Random floating point number in the specified range
 * @example
 * random() // Random number between 0 and 1
 * random(5, 10) // Random number between 5 and 10
 */
export function random (min: number = 0, max: number = 1): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate random integer between min and max
 * @param {number} [min=0] - Minimum value (inclusive)
 * @param {number} [max=100] - Maximum value (inclusive)
 * @returns {number} Random integer in the specified range
 * @example
 * randomInt() // Random integer between 0 and 100
 * randomInt(1, 6) // Random integer between 1 and 6 (like a dice roll)
 */
export function randomInt (min: number = 0, max: number = 100): number {
  return Math.floor(random(min, max + 1));
}
