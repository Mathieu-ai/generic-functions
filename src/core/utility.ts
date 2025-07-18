/**
 * Utility functions
 * No external dependencies - includes lodash-inspired methods
 */

/**
 * Returns the first argument it receives
 * @param {T} value - The value to return
 * @returns {T} Returns value
 * @example
 * identity(42); // 42
 * identity('hello'); // 'hello'
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * Creates a function that returns value
 * @param {T} value - The value to wrap in a function
 * @returns {() => T} Returns the new constant function
 * @example
 * const getAnswer = constant(42);
 * getAnswer(); // 42
 */
export function constant<T>(value: T): () => T {
  return function() {
    return value;
  };
}

/**
 * A method that returns undefined
 * @returns {undefined} Returns undefined
 * @example
 * noop(); // undefined
 */
export function noop(): undefined {
  return undefined;
}

/**
 * Creates a function that returns the value at path of a given object
 * @param {string | string[]} path - The path of the property to get
 * @returns {(obj: Record<string, unknown>) => T | undefined} Returns the new accessor function
 * @example
 * const getName = property('name');
 * getName({ name: 'John' }); // 'John'
 * 
 * const getDeep = property(['user', 'profile', 'name']);
 * getDeep({ user: { profile: { name: 'Jane' } } }); // 'Jane'
 */
export function property<T = unknown>(path: string | string[]): (obj: Record<string, unknown>) => T | undefined {
  return function(obj: Record<string, unknown>) {
    const keys = Array.isArray(path) ? path : path.split('.');
    let result: unknown = obj;
    for (const key of keys) {
      if (result == null) return undefined;
      result = (result as Record<string, unknown>)[key];
    }
    return result as T | undefined;
  };
}

/**
 * The opposite of property; creates a function that returns the value at a given path of object
 * @param {Record<string, unknown>} obj - The object to query
 * @returns {(path: string | string[]) => unknown} Returns the new accessor function
 * @example
 * const object = { a: { b: 2 } };
 * const at = propertyOf(object);
 * at('a.b'); // 2
 * at(['a', 'b']); // 2
 */
export function propertyOf(obj: Record<string, unknown>): (path: string | string[]) => unknown {
  return function(path: string | string[]) {
    const keys = Array.isArray(path) ? path : path.split('.');
    let result: unknown = obj;
    for (const key of keys) {
      if (result == null) return undefined;
      result = (result as Record<string, unknown>)[key];
    }
    return result;
  };
}

/**
 * Creates a function that performs a partial deep comparison between a given object and source
 * @param {Partial<T>} source - The object of property values to match
 * @returns {(obj: T) => boolean} Returns the new spec function
 * @example
 * const isActive = matches({ active: true });
 * isActive({ active: true, name: 'John' }); // true
 */
export function matches<T extends Record<string, unknown>>(source: Partial<T>): (obj: T) => boolean {
  return function(obj: T) {
    return isMatch(obj, source);
  };
}

/**
 * Creates a function that performs a partial deep comparison between the value at path of a given object to srcValue
 * @param {string | string[]} path - The path of the property to get
 * @param {unknown} srcValue - The value to match
 * @returns {(obj: T) => boolean} Returns the new spec function
 * @example
 * const isJohn = matchesProperty('name', 'John');
 * isJohn({ name: 'John', age: 25 }); // true
 */
export function matchesProperty<T extends Record<string, unknown>>(path: string | string[], srcValue: unknown): (obj: T) => boolean {
  return function(obj: T) {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current: unknown = obj;
    for (const key of keys) {
      if (current == null) return false;
      current = (current as Record<string, unknown>)[key];
    }
    return isEqual(current, srcValue);
  };
}

/**
 * Creates a function that invokes the iteratee with the arguments it receives
 * @param {Function | Record<string, unknown> | string | [string, unknown] | null} [func] - The iteratee to transform
 * @returns {(value: T) => R} Returns the callback
 * @example
 * iteratee('name')({ name: 'John' }); // 'John'
 * iteratee(['age', 25])({ age: 25 }); // true
 */
export function iteratee<T, R = unknown>(func?: ((value: T) => R) | Record<string, unknown> | string | [string, unknown] | null): (value: T) => R {
  if (func == null) {
    return identity as (value: T) => R;
  }
  if (typeof func === 'function') {
    return func;
  }
  if (typeof func === 'object') {
    return Array.isArray(func) 
      ? matchesProperty<T extends Record<string, unknown> ? T : Record<string, unknown>>(func[0], func[1]) as (value: T) => R
      : matches<T extends Record<string, unknown> ? T : Record<string, unknown>>(func as Partial<T extends Record<string, unknown> ? T : Record<string, unknown>>) as (value: T) => R;
  }
  return property<R>(func) as (value: T) => R;
}

/**
 * Generates a unique ID
 * @param {string} [prefix=''] - The value to prefix the ID with
 * @returns {string} Returns the unique ID
 * @example
 * uniqueId(); // '8h3k2d'
 * uniqueId('user_'); // 'user_8h3k2d'
 */
export function uniqueId(prefix: string = ''): string {
  const id = Math.random().toString(36).substr(2, 9);
  return prefix + id;
}

/**
 * Invokes the iteratee n times, returning an array of the results
 * @param {number} n - The number of times to invoke iteratee
 * @param {(index: number) => T} iteratee - The function invoked per iteration
 * @returns {T[]} Returns the array of results
 * @example
 * times(3, i => i * 2); // [0, 2, 4]
 * times(4, () => 'a'); // ['a', 'a', 'a', 'a']
 */
export function times<T>(n: number, iteratee: (index: number) => T): T[] {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    result.push(iteratee(i));
  }
  return result;
}

/**
 * Creates an array of numbers progressing from start up to, but not including, end
 * @param {number} start - The start of the range
 * @param {number} [end] - The end of the range
 * @param {number} [step=1] - The value to increment or decrement by
 * @returns {number[]} Returns the range of numbers
 * @example
 * range(4); // [0, 1, 2, 3]
 * range(1, 5); // [1, 2, 3, 4]
 * range(0, 20, 5); // [0, 5, 10, 15]
 */
export function range(start: number, end?: number, step: number = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
}

/**
 * Like range except that it populates values in descending order
 * @param {number} start - The start of the range
 * @param {number} [end] - The end of the range
 * @param {number} [step=1] - The value to increment or decrement by
 * @returns {number[]} Returns the range of numbers
 * @example
 * rangeRight(4); // [3, 2, 1, 0]
 * rangeRight(1, 5); // [4, 3, 2, 1]
 */
export function rangeRight(start: number, end?: number, step: number = 1): number[] {
  return range(start, end, step).reverse();
}

/**
 * Stub function that returns an empty array
 * @returns {any[]} Returns a new empty array
 * @example
 * stubArray(); // []
 */
export function stubArray(): any[] {
  return [];
}

/**
 * Stub function that returns false
 * @returns {false} Returns false
 * @example
 * stubFalse(); // false
 */
export function stubFalse(): false {
  return false;
}

/**
 * Stub function that returns an empty object
 * @returns {object} Returns a new empty object
 * @example
 * stubObject(); // {}
 */
export function stubObject(): object {
  return {};
}

/**
 * Stub function that returns an empty string
 * @returns {string} Returns an empty string
 * @example
 * stubString(); // ''
 */
export function stubString(): string {
  return '';
}

/**
 * Stub function that returns true
 * @returns {true} Returns true
 * @example
 * stubTrue(); // true
 */
export function stubTrue(): true {
  return true;
}

/**
 * Helper function that performs a partial deep comparison between an object and source
 * @param {T} obj - The object to inspect
 * @param {Partial<T>} source - The object of property values to match
 * @returns {boolean} Returns true if object is a match, else false
 */
function isMatch<T extends Record<string, unknown>>(obj: T, source: Partial<T>): boolean {
  for (const key in source) {
    if (source[key] !== obj[key]) {
      return false;
    }
  }
  return true;
}

/**
 * Helper function that performs a deep comparison between two values to determine if they are equivalent
 * @param {unknown} a - The value to compare
 * @param {unknown} b - The other value to compare
 * @returns {boolean} Returns true if the values are equivalent, else false
 */
function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== typeof b) return false;
  
  if (typeof a === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => isEqual(item, b[index]));
    }
    
    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);
    if (keysA.length !== keysB.length) return false;
    
    return keysA.every(key => isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]));
  }
  
  return false;
}
