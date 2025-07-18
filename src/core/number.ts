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
 * @param data - The data to parse
 * @param options - Parse options
 * @returns Parsed number or original value
 * @example
 * number('123') // 123
 * number('abc') // 'abc'
 */
export function number(data: NumberInput, options: NumberOptions = { deep: false }): any {
  const { deep } = options;

  if (Array.isArray(data)) {
    return data.map((item): any => number(item, options));
  }

  if (typeof data === "object" && data) {
    const result: { [key: string]: any } = {};
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
 * @param data - The data to parse
 * @param precision - Number of decimal places
 * @returns Parsed float or original value
 */
export function parseFloat(data: any, precision?: number): number | any {
  const parsed = Number.parseFloat(data);
  if (isNaN(parsed)) return data;
  
  return precision !== undefined ? Number(parsed.toFixed(precision)) : parsed;
}

/**
 * Clamp a number between min and max values
 * @param value - The value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate random number between min and max
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns Random number
 */
export function random(min: number = 0, max: number = 1): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate random integer between min and max
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer
 */
export function randomInt(min: number = 0, max: number = 100): number {
  return Math.floor(random(min, max + 1));
}
