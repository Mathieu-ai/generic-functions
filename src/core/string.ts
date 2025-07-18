/**
 * Lightweight string utility functions
 * No external dependencies
 */

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 * @example
 * capitalize('hello') // 'Hello'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Removes all accents from a string
 * @param str - The string to purify
 * @returns The string without accents
 * @example
 * purify('Héllo Wörld') // 'Hello World'
 */
export function purify(str: any): string {
  return typeof str === "string"
    ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";
}

/**
 * Removes excessive whitespace from a string
 * @param str - The string to trim
 * @returns The cleaned string
 * @example
 * trim('  hello   world  ') // 'hello world'
 */
export function trim(str: any): string {
  return typeof str === 'string' 
    ? str.replace(/\s+/g, ' ').trim()
    : "";
}

/**
 * Removes HTML break lines from a string
 * @param str - The string to clean
 * @returns The string without break lines
 * @example
 * removeBreakLines('Hello\r\nWorld') // 'Hello World'
 */
export function removeBreakLines(str: string): string {
  return str
    .replace(/[\r\n]+/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

/**
 * Gets initials from a string (max 4 letters)
 * @param str - The string to extract initials from
 * @returns The initials
 * @example
 * getInitials('John Doe Smith') // 'JDS'
 */
export function getInitials(str: string): string {
  return str
    .trim()
    .split(/\s+/)
    .reduce((initials: string[], word: string) => {
      const firstLetter = word.charAt(0);
      if (/^[A-Za-z]$/.test(firstLetter) && initials.length < 4) {
        if (/^[A-Z]$/.test(firstLetter)) {
          initials.push(firstLetter);
        } else if (initials.filter(c => /^[A-Z]$/.test(c)).length === 0) {
          initials.push(firstLetter.toUpperCase());
        }
      }
      return initials;
    }, [])
    .join("");
}

/**
 * Converts string to uppercase (works on nested objects/arrays)
 * @param data - The data to convert
 * @returns The uppercased data
 */
export function toUpperCase<T>(data: T): T {
  if (typeof data === "string") {
    return data.toUpperCase() as any;
  }
  if (Array.isArray(data)) {
    return data.map((item) => toUpperCase(item)) as any;
  }
  if (typeof data === "object" && data !== null) {
    const upperCaseData: any = {};
    for (const key in data) {
      upperCaseData[key] = toUpperCase(data[key]);
    }
    return upperCaseData as any;
  }
  return data;
}

/**
 * Basic HTML entity decoding (lightweight alternative to entities library)
 * @param str - The string with HTML entities
 * @returns The decoded string
 */
export function decodeHtmlEntities(str: string): string {
  const entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' '
  };
  
  return str.replace(/&[#\w]+;/g, (entity) => {
    return entityMap[entity] || entity;
  });
}

/**
 * Checks if input includes a value
 * @param input - The input to search in
 * @param value - The value to search for
 * @returns Whether the value is found
 */
export function includes(input: any[] | string | object, value: string | object | number): boolean {
  switch (typeof input) {
    case 'string':
      return (input as string).includes(value as string);
    case 'object':
      if (Array.isArray(input)) {
        return input.includes(value);
      } else if (input) {
        return Object.values(input).includes(value);
      }
      break;
  }
  return false;
}
