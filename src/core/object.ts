/**
 * Lightweight object utility functions
 * No external dependencies
 */

export interface FlatOptions {
  props?: string[];
}

/**
 * Flatten an object and extract values
 * @param data - The data to flatten
 * @param options - Flatten options
 * @returns Flattened string of values
 * @example
 * flat({ a: 1, b: { c: 2 } }) // '1, 2'
 */
export function flat(data: any, options: FlatOptions = {}): string {
  const { props = [] } = options;
  const result: string[] = [];

  const traverse = (obj: any) => {
    for (const key in obj) {
      const val = obj[key];

      if (typeof val === "object" && val) {
        traverse(val);
      } else if (!props.length || props.includes(key)) {
        if (Array.isArray(val)) {
          result.push(...val.filter(item => item));
        } else if (val) {
          result.push(val);
        }
      }
    }
  };

  traverse(data);
  return [...new Set(result)].join(', ');
}

/**
 * Get object keys by value type
 * @param obj - The object to analyze
 * @param type - The type to filter by
 * @returns Array of keys with matching type
 */
export function getObjectKeysByType(obj: object, type: string): string[] {
  return Object.entries(obj)
    .filter(([_, value]) => typeof value === type)
    .map(([key, _]) => key);
}

/**
 * Get value from object by path
 * @param obj - The object to traverse
 * @param path - Array of keys representing the path
 * @returns The value at the path or null
 */
export function getObjectValueByPath<T>(obj: any, path: string[]): T | null {
  return path.reduce((o, key) => {
    if (o && Array.isArray(o)) {
      return o.map((item) => getObjectValueByPath<T>(item, [key])).flat();
    }
    return (o && o[key]) ? o[key] : null;
  }, obj);
}

/**
 * Check if a value is empty
 * @param value - The value to check
 * @param options - Check options
 * @returns Whether the value is empty
 */
export function isEmpty(
  value: string | object | any[],
  options: { props?: boolean } = { props: false }
): boolean {
  switch (typeof value) {
    case "string":
      return value.length === 0;
    case "object":
      if (Array.isArray(value)) {
        return value.every((item) => isEmpty(item, options));
      } else {
        if (options.props) {
          return Object.values(value).every((prop) =>
            isEmpty(prop, options)
          );
        }
        return Object.keys(value).length === 0;
      }
    default:
      return true;
  }
}

/**
 * Get the type of a value
 * @param value - The value to check
 * @returns The type as string
 */
export function getValueType(value: any): string {
  return typeof value;
}
