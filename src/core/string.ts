/**
 * Lightweight string utility functions
 * No external dependencies - includes lodash-inspired methods
 * @since 0.8.0
 */

/**
 * Removes all accents from a string
 * @param {any} str - The string to purify
 * @returns {string} Returns the string without accents
 * @since 0.8.0
 * @example
 * purify('café'); // 'cafe'
 * purify('naïve'); // 'naive'
 */
export function purify (str: any): string {
  return typeof str === "string"
    ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";
}

/**
 * Capitalizes the first character of a string
 * @param {string} str - The string to capitalize
 * @returns {string} Returns the capitalized string
 * @since 0.8.0
 * @example
 * capitalize('hello'); // 'Hello'
 * capitalize('WORLD'); // 'WORLD'
 */
export function capitalize (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Removes leading and trailing whitespace
 * @param {string} str - The string to trim
 * @param {string} [chars] - The characters to remove
 * @returns {string} Returns the trimmed string
 * @since 0.8.0
 * @example
 * trim('  hello  '); // 'hello'
 * trim('---hello---', '-'); // 'hello'
 */
export function trim (str: string, chars?: string): string {
  if (chars === undefined) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
  const charRegex = new RegExp(`^[${escapeRegExp(chars)}]+|[${escapeRegExp(chars)}]+$`, 'g');
  return str.replace(charRegex, '');
}

/**
 * Removes leading whitespace
 * @param {string} str - The string to trim
 * @param {string} [chars] - The characters to remove
 * @returns {string} Returns the trimmed string
 * @since 0.8.0
 * @example
 * trimStart('  hello  '); // 'hello  '
 * trimStart('---hello---', '-'); // 'hello---'
 */
export function trimStart (str: string, chars?: string): string {
  if (chars === undefined) {
    return str.replace(/^[\s\uFEFF\xA0]+/, '');
  }
  const charRegex = new RegExp(`^[${escapeRegExp(chars)}]+`, 'g');
  return str.replace(charRegex, '');
}

/**
 * Removes trailing whitespace
 * @param {string} str - The string to trim
 * @param {string} [chars] - The characters to remove
 * @returns {string} Returns the trimmed string
 * @since 0.8.0
 * @example
 * trimEnd('  hello  '); // '  hello'
 * trimEnd('---hello---', '-'); // '---hello'
 */
export function trimEnd (str: string, chars?: string): string {
  if (chars === undefined) {
    return str.replace(/[\s\uFEFF\xA0]+$/, '');
  }
  const charRegex = new RegExp(`[${escapeRegExp(chars)}]+$`, 'g');
  return str.replace(charRegex, '');
}

/**
 * Converts string to camelCase
 * @param {string} str - The string to convert
 * @returns {string} Returns the camel cased string
 * @since 0.9.0
 * @example
 * camelCase('hello world'); // 'helloWorld'
 * camelCase('hello-world'); // 'helloWorld'
 */
export function camelCase (str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Converts string to kebab-case
 * @param {string} str - The string to convert
 * @returns {string} Returns the kebab cased string
 * @since 0.9.0
 * @example
 * kebabCase('hello world'); // 'hello-world'
 * kebabCase('HelloWorld'); // 'hello-world'
 */
export function kebabCase (str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts string to snake_case
 * @param {string} str - The string to convert
 * @returns {string} Returns the snake cased string
 * @since 0.9.0
 * @example
 * snakeCase('hello world'); // 'hello_world'
 * snakeCase('HelloWorld'); // 'hello_world'
 */
export function snakeCase (str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Converts string to PascalCase
 * @param {string} str - The string to convert
 * @returns {string} Returns the Pascal cased string
 * @since 0.9.0
 * @example
 * pascalCase('hello world'); // 'HelloWorld'
 * pascalCase('hello-world'); // 'HelloWorld'
 */
export function pascalCase (str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Converts string to UPPER_CASE
 * @param {string} str - The string to convert
 * @returns {string} Returns the upper cased string
 * @since 0.8.0
 * @example
 * upperCase('hello world'); // 'HELLO WORLD'
 * upperCase('hello-world'); // 'HELLO WORLD'
 */
export function upperCase (str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[\s-_]+/g, ' ')
    .toUpperCase();
}

/**
 * Converts string to lower case
 * @param {string} str - The string to convert
 * @returns {string} Returns the lower cased string
 * @since 0.8.0
 * @example
 * lowerCase('HELLO WORLD'); // 'hello world'
 * lowerCase('Hello-World'); // 'hello world'
 */
export function lowerCase (str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[\s-_]+/g, ' ')
    .toLowerCase();
}

/**
 * Converts first character to uppercase and rest to lowercase
 * @param {string} str - The string to convert
 * @returns {string} Returns the start cased string
 * @since 0.9.0
 * @example
 * startCase('hello world'); // 'Hello world'
 * startCase('hELLO wORLD'); // 'Hello world'
 */
export function startCase (str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[\s-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters
 * @param {string} str - The string to deburr
 * @returns {string} Returns the deburred string
 * @since 0.8.0
 * @example
 * deburr('déjà vu'); // 'deja vu'
 * deburr('niño'); // 'nino'
 */
export function deburr (str: string): string {
  return purify(str);
}

/**
 * Checks if string ends with target string
 * @param {string} str - The string to check
 * @param {string} target - The target string
 * @param {number} [position] - The position to check from
 * @returns {boolean} Returns true if the string ends with the target
 * @since 0.8.0
 * @example
 * endsWith('hello world', 'world'); // true
 * endsWith('hello world', 'hello', 5); // true
 */
export function endsWith (str: string, target: string, position?: number): boolean {
  const end = position === undefined ? str.length : position;
  return str.slice(end - target.length, end) === target;
}

/**
 * Escapes RegExp special characters
 * @param {string} str - The string to escape
 * @returns {string} Returns the escaped string
 * @since 0.8.0
 * @example
 * escapeRegExp('hello.world?'); // 'hello\.world\?'
 * escapeRegExp('^hello$'); // '\^hello\$'
 */
export function escapeRegExp (str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Pads string on the left and right sides
 * @param {string} str - The string to pad
 * @param {number} length - The length of the resulting string
 * @param {string} [chars=' '] - The characters to pad with
 * @returns {string} Returns the padded string
 * @since 0.8.0
 * @example
 * pad('hello', 10); // '  hello   '
 * pad('hello', 10, '-'); // '--hello----'
 */
export function pad (str: string, length: number, chars: string = ' '): string {
  const strLen = str.length;
  if (strLen >= length) return str;

  const padLength = length - strLen;
  const leftPad = Math.floor(padLength / 2);
  const rightPad = padLength - leftPad;

  return padStart(padEnd(str, strLen + rightPad, chars), length, chars);
}

/**
 * Pads string on the left side
 * @param {string} str - The string to pad
 * @param {number} length - The length of the resulting string
 * @param {string} [chars=' '] - The characters to pad with
 * @returns {string} Returns the padded string
 * @since 0.8.0
 * @example
 * padStart('hello', 10); // '     hello'
 * padStart('hello', 10, '-'); // '-----hello'
 */
export function padStart (str: string, length: number, chars: string = ' '): string {
  const strLen = str.length;
  if (strLen >= length) return str;

  const padLength = length - strLen;
  const padding = chars.repeat(Math.ceil(padLength / chars.length)).slice(0, padLength);
  return padding + str;
}

/**
 * Pads string on the right side
 * @param {string} str - The string to pad
 * @param {number} length - The length of the resulting string
 * @param {string} [chars=' '] - The characters to pad with
 * @returns {string} Returns the padded string
 * @since 0.8.0
 * @example
 * padEnd('hello', 10); // 'hello     '
 * padEnd('hello', 10, '-'); // 'hello-----'
 */
export function padEnd (str: string, length: number, chars: string = ' '): string {
  const strLen = str.length;
  if (strLen >= length) return str;

  const padLength = length - strLen;
  const padding = chars.repeat(Math.ceil(padLength / chars.length)).slice(0, padLength);
  return str + padding;
}

/**
 * Repeats string n times
 * @param {string} str - The string to repeat
 * @param {number} n - The number of times to repeat the string
 * @returns {string} Returns the repeated string
 * @since 0.8.0
 * @example
 * repeat('hello', 3); // 'hellohellohello'
 * repeat('abc', 2); // 'abcabc'
 */
export function repeat (str: string, n: number): string {
  return str.repeat(n);
}

/**
 * Replaces matches for pattern in string with replacement
 * @param {string} str - The string to search and replace in
 * @param {string | RegExp} pattern - The pattern to match
 * @param {string} replacement - The replacement string
 * @returns {string} Returns the string with replacements
 * @since 0.8.0
 * @example
 * replace('hello world', 'world', 'there'); // 'hello there'
 * replace('hello 123', /\d+/, '456'); // 'hello 456'
 */
export function replace (str: string, pattern: string | RegExp, replacement: string): string {
  return str.replace(pattern, replacement);
}

/**
 * Splits string by separator
 * @param {string} str - The string to split
 * @param {string | RegExp} [separator] - The separator to split by
 * @param {number} [limit] - The maximum number of splits
 * @returns {string[]} Returns the array of split strings
 * @since 0.8.0
 * @example
 * split('hello,world', ','); // ['hello', 'world']
 * split('hello world', /\s+/); // ['hello', 'world']
 */
export function split (str: string, separator?: string | RegExp, limit?: number): string[] {
  return separator === undefined ? str.split('') : str.split(separator, limit);
}

/**
 * Checks if string starts with target string
 * @param {string} str - The string to check
 * @param {string} target - The target string
 * @param {number} [position=0] - The position to check from
 * @returns {boolean} Returns true if the string starts with the target
 * @since 0.8.0
 * @example
 * startsWith('hello world', 'hello'); // true
 * startsWith('hello world', 'world', 6); // true
 */
export function startsWith (str: string, target: string, position: number = 0): boolean {
  return str.slice(position, position + target.length) === target;
}

/**
 * Converts string to an array of its characters
 * @param {string} str - The string to convert
 * @returns {string[]} Returns the array of characters
 * @since 0.8.0
 * @example
 * toArray('hello'); // ['h', 'e', 'l', 'l', 'o']
 * toArray('abc'); // ['a', 'b', 'c']
 */
export function toArray (str: string): string[] {
  return Array.from(str);
}

/**
 * Converts string to lowercase
 * @param {string} str - The string to convert
 * @returns {string} Returns the lower cased string
 * @since 0.8.0
 * @example
 * toLowerCase('HELLO'); // 'hello'
 * toLowerCase('HeLLo'); // 'hello'
 */
export function toLowerCase (str: string): string {
  return str.toLowerCase();
}

/**
 * Converts string to uppercase
 * @param {string} str - The string to convert
 * @returns {string} Returns the upper cased string
 * @since 0.8.0
 * @example
 * toUpperCase('hello'); // 'HELLO'
 * toUpperCase('HeLLo'); // 'HELLO'
 */
export function toUpperCase (str: string): string {
  return str.toUpperCase();
}

/**
 * Truncates string if it's longer than the given maximum string length
 * @param {string} str - The string to truncate
 * @param {Object} [options] - The options for truncating
 * @param {number} [options.length=30] - The maximum length of the string
 * @param {string} [options.omission='...'] - The string to indicate omission
 * @param {string | RegExp} [options.separator] - The separator to truncate on
 * @returns {string} Returns the truncated string
 * @since 0.8.0
 * @example
 * truncate('hello world', { length: 10 }); // 'hello worl...'
 * truncate('hello world', { length: 10, separator: ' ' }); // 'hello...'
 */
export function truncate (str: string, options: { length?: number; omission?: string; separator?: string | RegExp } = {}): string {
  const { length = 30, omission = '...', separator } = options;

  if (str.length <= length) return str;

  let truncated = str.slice(0, length - omission.length);

  if (separator !== undefined) {
    const lastIndex = truncated.lastIndexOf(separator as string);
    if (lastIndex > 0) {
      truncated = truncated.slice(0, lastIndex);
    }
  }

  return truncated + omission;
}

/**
 * Removes leading and trailing whitespace or specified characters
 * @param {string} str - The string to process
 * @param {RegExp} [pattern] - The pattern to match words
 * @returns {string[]} Returns the array of words
 * @since 0.8.0
 * @example
 * words('  hello world  '); // ['hello', 'world']
 * words('---hello---world---', /-/); // ['hello', 'world']
 */
export function words (str: string, pattern?: RegExp): string[] {
  const defaultPattern = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
  return str.match(pattern || defaultPattern) || [];
}

/**
 * Remove breaklines from string
 * @param {string} str - The string to process
 * @returns {string} Returns the string without breaklines
 * @since 0.8.0
 * @example
 * removeBreakLines('hello\nworld'); // 'hello world'
 * removeBreakLines('line1\r\nline2'); // 'line1 line2'
 */
export function removeBreakLines (str: string): string {
  return str
    .replace(/[\r\n]+/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

/**
 * Converts string to template string
 * @param {string} string - The string to convert
 * @param {Object} [options] - The options for the template
 * @param {RegExp} [options.interpolate] - The pattern for interpolation
 * @param {RegExp} [options.evaluate] - The pattern for evaluation
 * @param {RegExp} [options.escape] - The pattern for escaping
 * @returns {Function} Returns the template function
 * @since 0.8.0
 * @example
 * const compiled = template('hello <%= name %>!');
 * compiled({ name: 'world' }); // 'hello world!'
 * 
 * const compiled = template('number: <%= number %>', { interpolate: /<%=([\s\S]+?)%>/g });
 * compiled({ number: 42 }); // 'number: 42'
 */
export function template (string: string, options: { interpolate?: RegExp; evaluate?: RegExp; escape?: RegExp } = {}): (data: any) => string {
  const { interpolate = /<%=([\s\S]+?)%>/g, evaluate = /<%([\s\S]+?)%>/g, escape = /<%-([\s\S]+?)%>/g } = options;

  return function (data: any = {}) {
    return string
      .replace(escape, (match, code) => {
        const result = new Function('obj', `with(obj) { return ${code}; }`)(data);
        return String(result).replace(/[&<>"']/g, char => {
          const escapeMap: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
          };
          return escapeMap[char];
        });
      })
      .replace(interpolate, (match, code) => {
        const result = new Function('obj', `with(obj) { return ${code}; }`)(data);
        return String(result);
      })
      .replace(evaluate, (match, code) => {
        new Function('obj', `with(obj) { ${code}; }`)(data);
        return '';
      });
  };
}

/**
 * Converts HTML entities to characters
 * @param {string} str - The string to unescape
 * @returns {string} Returns the unescaped string
 * @since 0.8.0
 * @example
 * unescape('&lt;div&gt;hello&lt;/div&gt;'); // '<div>hello</div>'
 * unescape('&amp;copy; 2023'); // '© 2023'
 */
export function unescape (str: string): string {
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, match => htmlUnescapes[match]);
}

/**
 * Converts characters to HTML entities
 * @param {string} str - The string to escape
 * @returns {string} Returns the escaped string
 * @since 0.8.0
 * @example
 * escape('hello & world'); // 'hello &amp; world'
 * escape('<div>hello</div>'); // '&lt;div&gt;hello&lt;/div&gt;'
 */
export function escape (str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return str.replace(/[&<>"']/g, match => htmlEscapes[match]);
}

/**
 * Converts the first character of string to upper case
 * @param {string} str - The string to convert
 * @returns {string} Returns the string with the first character uppercased
 * @since 0.8.0
 * @example
 * upperFirst('hello'); // 'Hello'
 * upperFirst('javaScript'); // 'JavaScript'
 */
export function upperFirst (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts the first character of string to lower case
 * @param {string} str - The string to convert
 * @returns {string} Returns the string with the first character lowercased
 * @since 0.8.0
 * @example
 * lowerFirst('Hello'); // 'hello'
 * lowerFirst('JavaScript'); // 'javaScript'
 */
export function lowerFirst (str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Converts string to an integer of the specified radix
 * @param {string} str - The string to convert
 * @param {number} [radix=10] - The radix to use
 * @returns {number} Returns the converted integer
 * @since 0.8.0
 * @example
 * parseInt('10'); // 10
 * parseInt('10', 2); // 2
 */
export function parseInt (str: string, radix: number = 10): number {
  return Number.parseInt(str, radix);
}
