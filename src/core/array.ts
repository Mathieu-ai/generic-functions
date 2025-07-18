/**
 * Lightweight array utility functions
 * No external dependencies - includes lodash-inspired methods
 */

export interface SortOptions<T> {
  arr: T[];
  prop: keyof T;
  ascending?: boolean;
}

/**
 * Removes all accents from a string (inline to avoid circular imports)
 * @private
 * @param {any} str - The string to purify
 * @returns {string} Returns the purified string
 */
function purify(str: any): string {
  return typeof str === "string"
    ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";
}

/**
 * Sort an array of objects by a property
 * @param {SortOptions<T>} options - The sort options
 * @param {T[]} options.arr - The array to sort
 * @param {keyof T} options.prop - The property to sort by
 * @param {boolean} [options.ascending=true] - Sort in ascending order
 * @returns {T[]} Returns the sorted array
 * @example
 * sort({ arr: [{name: 'Bob'}, {name: 'Alice'}], prop: 'name' })
 * // [{name: 'Alice'}, {name: 'Bob'}]
 */
export function sort<T extends Record<string, any>>(options: SortOptions<T>): T[] {
  const { arr, prop, ascending = true } = options;
  
  const compare = (a: T, b: T) => {
    const valueA = a[prop];
    const valueB = b[prop];
    
    const sortOrder = ascending ? 1 : -1;
    
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder * (valueA - valueB);
    }
    
    return sortOrder * purify(String(valueA)).localeCompare(purify(String(valueB)));
  };
  
  return arr.slice().sort(compare);
}

/**
 * Get unique values from an array
 * @param {T[]} data - The array to filter
 * @param {string} [field] - Optional field to use for uniqueness in objects
 * @returns {T[]} Returns array of unique values
 * @example
 * getUnique([1, 2, 2, 3]); // [1, 2, 3]
 * getUnique([{id: 1}, {id: 2}, {id: 1}], 'id'); // [{id: 1}, {id: 2}]
 */
export function getUnique<T>(data: T[], field?: string): T[] {
  const seen = new Set();
  
  return data.filter(item => {
    const key = field && typeof item === 'object' && item !== null
      ? JSON.stringify((item as any)[field])
      : JSON.stringify(item);
    
    if (seen.has(key)) {
      return false;
    }
    
    seen.add(key);
    return true;
  });
}

/**
 * Get the last element(s) from an array or object
 * @param data - The data to get last element from
 * @returns The last element(s)
 */
export function getLastElement<T>(data: T[] | Record<string, any>): T[] | Record<string, any> {
  if (Array.isArray(data)) {
    return data.length > 0 ? [data[data.length - 1]] : [];
  } else if (typeof data === 'object' && data) {
    const keys = Object.keys(data);
    return keys.length > 0 
      ? { [keys[keys.length - 1]]: data[keys[keys.length - 1]] } 
      : {};
  }
  return data as any;
}

/**
 * Get a random string from an array
 * @param arr - Array of strings
 * @returns Random string from the array
 */
export function randomString(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Check if array length is less than size, return array or fallback
 * @param first - The array to check
 * @param second - Fallback value
 * @param size - Size threshold
 * @returns The array or fallback based on size
 */
export function checkLength<T>(first: T[], second: string, size: number): T[] | string {
  return first.length < size ? first : second;
}

/**
 * Creates an array of elements split into groups the length of size
 * @param {T[]} array - The array to process
 * @param {number} [size=1] - The length of each chunk
 * @returns {T[][]} Returns the new array of chunks
 * @example
 * chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
 * chunk([1, 2, 3, 4, 5], 3); // [[1, 2, 3], [4, 5]]
 */
export function chunk<T>(array: T[], size: number = 1): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Creates an array with all falsy values removed
 * @param {(T | null | undefined | false | 0 | "")[]} array - The array to compact
 * @returns {T[]} Returns the new array of filtered values
 * @example
 * compact([0, 1, false, 2, '', 3]); // [1, 2, 3]
 */
export function compact<T>(array: (T | null | undefined | false | 0 | "")[]): T[] {
  return array.filter(Boolean) as T[];
}

/**
 * Creates a new array concatenating array with any additional arrays and/or values
 * @param {T[]} array - The array to concatenate
 * @param {...(T | T[])} values - The values to concatenate
 * @returns {T[]} Returns the new concatenated array
 * @example
 * concat([1], 2, [3], [[4]]); // [1, 2, 3, [4]]
 */
export function concat<T>(array: T[], ...values: (T | T[])[]): T[] {
  const result = [...array];
  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...value);
    } else {
      result.push(value);
    }
  }
  return result;
}

/**
 * Creates an array of array values not included in the other given arrays
 * @param {T[]} array - The array to inspect
 * @param {...T[][]} values - The values to exclude
 * @returns {T[]} Returns the new array of filtered values
 * @example
 * difference([2, 1], [2, 3]); // [1]
 */
export function difference<T>(array: T[], ...values: T[][]): T[] {
  const excludeSet = new Set(values.flat());
  return array.filter(item => !excludeSet.has(item));
}

/**
 * Like difference except that it accepts iteratee which is invoked for each element
 * @param {T[]} array - The array to inspect
 * @param {T[]} values - The values to exclude
 * @param {(value: T) => any} iteratee - The iteratee invoked per element
 * @returns {T[]} Returns the new array of filtered values
 * @example
 * differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
 */
export function differenceBy<T>(array: T[], values: T[], iteratee: (value: T) => any): T[] {
  const excludeSet = new Set(values.map(iteratee));
  return array.filter(item => !excludeSet.has(iteratee(item)));
}

/**
 * Like difference except that it accepts comparator which is invoked to compare elements
 * @param {T[]} array - The array to inspect
 * @param {T[]} values - The values to exclude
 * @param {(a: T, b: T) => boolean} comparator - The comparator invoked per element
 * @returns {T[]} Returns the new array of filtered values
 * @example
 * differenceWith([{ 'x': 1 }, { 'x': 2 }], [{ 'x': 1 }], (a, b) => a.x === b.x); // [{ 'x': 2 }]
 */
export function differenceWith<T>(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[] {
  return array.filter(arrayItem => !values.some(valueItem => comparator(arrayItem, valueItem)));
}

/**
 * Creates a slice of array with n elements dropped from the beginning
 * @param {T[]} array - The array to query
 * @param {number} [n=1] - The number of elements to drop
 * @returns {T[]} Returns the slice of array
 * @example
 * drop([1, 2, 3]); // [2, 3]
 * drop([1, 2, 3], 2); // [3]
 */
export function drop<T>(array: T[], n: number = 1): T[] {
  return array.slice(n);
}

/**
 * Creates a slice of array with n elements dropped from the end
 * @param {T[]} array - The array to query
 * @param {number} [n=1] - The number of elements to drop
 * @returns {T[]} Returns the slice of array
 * @example
 * dropRight([1, 2, 3]); // [1, 2]
 * dropRight([1, 2, 3], 2); // [1]
 */
export function dropRight<T>(array: T[], n: number = 1): T[] {
  return array.slice(0, -n || array.length);
}

/**
 * Creates a slice of array excluding elements dropped from the beginning
 * @param {T[]} array - The array to query
 * @param {(value: T) => boolean} predicate - The function invoked per iteration
 * @returns {T[]} Returns the slice of array
 * @example
 * dropWhile([1, 2, 3, 4], n => n < 3); // [3, 4]
 */
export function dropWhile<T>(array: T[], predicate: (value: T) => boolean): T[] {
  let index = 0;
  while (index < array.length && predicate(array[index])) {
    index++;
  }
  return array.slice(index);
}

/**
 * Creates a slice of array excluding elements dropped from the end
 * @param {T[]} array - The array to query
 * @param {(value: T) => boolean} predicate - The function invoked per iteration
 * @returns {T[]} Returns the slice of array
 * @example
 * dropRightWhile([1, 2, 3, 4], n => n > 2); // [1, 2]
 */
export function dropRightWhile<T>(array: T[], predicate: (value: T) => boolean): T[] {
  let index = array.length;
  while (index > 0 && predicate(array[index - 1])) {
    index--;
  }
  return array.slice(0, index);
}

/**
 * Fills elements of array with value from start up to, but not including, end
 * @param {T[]} array - The array to fill
 * @param {T} value - The value to fill array with
 * @param {number} [start=0] - The start position
 * @param {number} [end=array.length] - The end position
 * @returns {T[]} Returns the filled array
 * @example
 * fill([1, 2, 3], 'a'); // ['a', 'a', 'a']
 * fill([4, 6, 8, 10], '*', 1, 3); // [4, '*', '*', 10]
 */
export function fill<T>(array: T[], value: T, start: number = 0, end: number = array.length): T[] {
  const result = [...array];
  for (let i = start; i < end && i < result.length; i++) {
    result[i] = value;
  }
  return result;
}

/**
 * Returns the first index at which a given element can be found
 * @param {T[]} array - The array to inspect
 * @param {(value: T, index: number, array: T[]) => boolean} predicate - The function invoked per iteration
 * @param {number} [fromIndex=0] - The index to search from
 * @returns {number} Returns the index of the found element, else -1
 * @example
 * findIndex([1, 2, 3, 4], n => n % 2 === 0); // 1
 */
export function findIndex<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean, fromIndex: number = 0): number {
  for (let i = fromIndex; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}

/**
 * Like findIndex except that it iterates over elements from right to left
 * @param {T[]} array - The array to inspect
 * @param {(value: T, index: number, array: T[]) => boolean} predicate - The function invoked per iteration
 * @param {number} [fromIndex=array.length-1] - The index to search from
 * @returns {number} Returns the index of the found element, else -1
 * @example
 * findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2
 */
export function findLastIndex<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean, fromIndex: number = array.length - 1): number {
  for (let i = fromIndex; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}

/**
 * Flattens array a single level deep
 * @param {(T | T[])[]} array - The array to flatten
 * @returns {T[]} Returns the new flattened array
 * @example
 * flatten([1, [2, [3, [4]], 5]]); // [1, 2, [3, [4]], 5]
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.flat() as T[];
}

/**
 * Recursively flattens array
 * @param {any[]} array - The array to flatten
 * @returns {T[]} Returns the new flattened array
 * @example
 * flattenDeep([1, [2, [3, [4]], 5]]); // [1, 2, 3, 4, 5]
 */
export function flattenDeep<T>(array: any[]): T[] {
  return array.flat(Infinity) as T[];
}

/**
 * Recursively flatten array up to depth times
 * @param {any[]} array - The array to flatten
 * @param {number} [depth=1] - The maximum recursion depth
 * @returns {T[]} Returns the new flattened array
 * @example
 * flattenDepth([1, [2, [3, [4]], 5]], 1); // [1, 2, [3, [4]], 5]
 * flattenDepth([1, [2, [3, [4]], 5]], 2); // [1, 2, 3, [4], 5]
 */
export function flattenDepth<T>(array: any[], depth: number = 1): T[] {
  return array.flat(depth) as T[];
}

/**
 * Reverses array so that the first element becomes the last
 * @param {T[]} array - The array to reverse
 * @returns {T[]} Returns the new reversed array
 * @example
 * reverse([1, 2, 3]); // [3, 2, 1]
 */
export function reverse<T>(array: T[]): T[] {
  return [...array].reverse();
}

/**
 * Creates an array of unique values from all given arrays
 * @param {...T[][]} arrays - The arrays to inspect
 * @returns {T[]} Returns the new array of combined values
 * @example
 * union([2], [1, 2]); // [2, 1]
 */
export function union<T>(...arrays: T[][]): T[] {
  return [...new Set(arrays.flat())];
}

/**
 * Like union except that it accepts iteratee
 * @param {T[][]} arrays - The arrays to inspect
 * @param {(value: T) => any} iteratee - The iteratee invoked per element
 * @returns {T[]} Returns the new array of combined values
 * @example
 * unionBy([[2.1], [1.2, 2.3]], Math.floor); // [2.1, 1.2]
 */
export function unionBy<T>(arrays: T[][], iteratee: (value: T) => any): T[] {
  const seen = new Set();
  const result: T[] = [];
  
  for (const array of arrays) {
    for (const item of array) {
      const key = iteratee(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
  }
  return result;
}

/**
 * Creates an array of unique values that are included in all given arrays
 * @param {...T[][]} arrays - The arrays to inspect
 * @returns {T[]} Returns the new array of intersecting values
 * @example
 * intersection([2, 1], [2, 3]); // [2]
 */
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return [...arrays[0]];
  
  const [first, ...rest] = arrays;
  return first.filter(item => rest.every(array => array.includes(item)));
}

/**
 * Like intersection except that it accepts iteratee
 * @param {T[][]} arrays - The arrays to inspect
 * @param {(value: T) => any} iteratee - The iteratee invoked per element
 * @returns {T[]} Returns the new array of intersecting values
 * @example
 * intersectionBy([[2.1, 1.2], [2.3, 3.4]], Math.floor); // [2.1]
 */
export function intersectionBy<T>(arrays: T[][], iteratee: (value: T) => any): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return [...arrays[0]];
  
  const [first, ...rest] = arrays;
  return first.filter(item => {
    const key = iteratee(item);
    return rest.every(array => array.some(arrayItem => iteratee(arrayItem) === key));
  });
}

/**
 * Removes all given values from array
 * @param {T[]} array - The array to modify
 * @param {...T} values - The values to remove
 * @returns {T[]} Returns the new array with values removed
 * @example
 * pull([1, 2, 3, 1, 2, 3], 2, 3); // [1, 1]
 */
export function pull<T>(array: T[], ...values: T[]): T[] {
  return array.filter(item => !values.includes(item));
}

/**
 * Removes elements from array corresponding to indexes
 * @param {T[]} array - The array to modify
 * @param {...number} indexes - The indexes of elements to remove
 * @returns {T[]} Returns the new array with elements removed
 * @example
 * pullAt(['a', 'b', 'c', 'd'], 1, 3); // ['a', 'c']
 */
export function pullAt<T>(array: T[], ...indexes: number[]): T[] {
  const indexSet = new Set(indexes);
  return array.filter((_, index) => !indexSet.has(index));
}

/**
 * Removes all elements from array that predicate returns truthy for
 * @param {T[]} array - The array to modify
 * @param {(value: T, index: number, array: T[]) => boolean} predicate - The function invoked per iteration
 * @returns {T[]} Returns an array of removed elements
 * @example
 * const array = [1, 2, 3, 4];
 * const evens = remove(array, n => n % 2 === 0); // evens: [2, 4], array: [1, 3]
 */
export function remove<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[] {
  const removed: T[] = [];
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      removed.unshift(...array.splice(i, 1));
    }
  }
  return removed;
}

/**
 * Gets all but the first element of array
 * @param {T[]} array - The array to query
 * @returns {T[]} Returns the slice of array
 * @example
 * tail([1, 2, 3]); // [2, 3]
 */
export function tail<T>(array: T[]): T[] {
  return array.slice(1);
}

/**
 * Creates a slice of array with n elements taken from the beginning
 * @param {T[]} array - The array to query
 * @param {number} [n=1] - The number of elements to take
 * @returns {T[]} Returns the slice of array
 * @example
 * take([1, 2, 3]); // [1]
 * take([1, 2, 3], 2); // [1, 2]
 */
export function take<T>(array: T[], n: number = 1): T[] {
  return array.slice(0, n);
}

/**
 * Creates a slice of array with n elements taken from the end
 * @param {T[]} array - The array to query
 * @param {number} [n=1] - The number of elements to take
 * @returns {T[]} Returns the slice of array
 * @example
 * takeRight([1, 2, 3]); // [3]
 * takeRight([1, 2, 3], 2); // [2, 3]
 */
export function takeRight<T>(array: T[], n: number = 1): T[] {
  return array.slice(-n);
}

/**
 * Creates a slice of array with elements taken from the beginning
 * @param {T[]} array - The array to query
 * @param {(value: T) => boolean} predicate - The function invoked per iteration
 * @returns {T[]} Returns the slice of array
 * @example
 * takeWhile([1, 2, 3], n => n < 3); // [1, 2]
 */
export function takeWhile<T>(array: T[], predicate: (value: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of array) {
    if (predicate(item)) {
      result.push(item);
    } else {
      break;
    }
  }
  return result;
}

/**
 * Creates a slice of array with elements taken from the end
 * @param {T[]} array - The array to query
 * @param {(value: T) => boolean} predicate - The function invoked per iteration
 * @returns {T[]} Returns the slice of array
 * @example
 * takeRightWhile([1, 2, 3], n => n > 1); // [2, 3]
 */
export function takeRightWhile<T>(array: T[], predicate: (value: T) => boolean): T[] {
  const result: T[] = [];
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      result.unshift(array[i]);
    } else {
      break;
    }
  }
  return result;
}

/**
 * Creates an array of unique values from the first array not included in the other given arrays
 * @param {T[]} array - The array to inspect
 * @param {...T} values - The values to exclude
 * @returns {T[]} Returns the new array of filtered values
 * @example
 * without([2, 1, 2, 3], 1, 2); // [3]
 */
export function without<T>(array: T[], ...values: T[]): T[] {
  return array.filter(item => !values.includes(item));
}

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays
 * @param {...T[][]} arrays - The arrays to inspect
 * @returns {T[]} Returns the new array of filtered values
 * @example
 * xor([2, 1], [2, 3]); // [1, 3]
 */
export function xor<T>(...arrays: T[][]): T[] {
  const counts = new Map();
  for (const array of arrays) {
    for (const item of array) {
      counts.set(item, (counts.get(item) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .filter(([_, count]) => count === 1)
    .map(([item]) => item);
}

/**
 * Creates an array that is the zip of arrays
 * @param {...T[][]} arrays - The arrays to process
 * @returns {T[][]} Returns the new array of grouped elements
 * @example
 * zip(['a', 'b'], [1, 2], [true, false]); // [['a', 1, true], ['b', 2, false]]
 */
export function zip<T>(...arrays: T[][]): T[][] {
  const length = Math.max(...arrays.map(arr => arr.length));
  const result: T[][] = [];
  
  for (let i = 0; i < length; i++) {
    result.push(arrays.map(arr => arr[i]));
  }
  
  return result;
}

/**
 * Creates an object composed from arrays of keys and values
 * @param {string[]} keys - The property names
 * @param {T[]} values - The property values
 * @returns {Record<string, T>} Returns the new object
 * @example
 * zipObject(['a', 'b'], [1, 2]); // { 'a': 1, 'b': 2 }
 */
export function zipObject<T>(keys: string[], values: T[]): Record<string, T> {
  const result: Record<string, T> = {};
  for (let i = 0; i < keys.length; i++) {
    if (i < values.length) {
      result[keys[i]] = values[i];
    }
  }
  return result;
}

/**
 * Creates an array of grouped elements
 * @param {...[...T[][], ((...values: T[]) => R)]} arrays - The arrays to process and the function to combine grouped values
 * @returns {R[]} Returns the new array of grouped elements
 * @example
 * zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c); // [111, 222]
 */
export function zipWith<T, R>(...arrays: [...T[][], ((...values: T[]) => R)]): R[] {
  const func = arrays.pop() as (...values: T[]) => R;
  const arraysToZip = arrays as T[][];
  
  const length = Math.max(...arraysToZip.map(arr => arr.length));
  const result: R[] = [];
  
  for (let i = 0; i < length; i++) {
    const values = arraysToZip.map(arr => arr[i]);
    result.push(func(...values));
  }
  
  return result;
}

/**
 * The opposite of zip; creates an array of arrays
 * @param {T[][]} array - The array of grouped elements to process
 * @returns {T[][]} Returns the new array of regrouped elements
 * @example
 * unzip([['a', 1, true], ['b', 2, false]]); // [['a', 'b'], [1, 2], [true, false]]
 */
export function unzip<T>(array: T[][]): T[][] {
  if (array.length === 0) return [];
  
  const length = Math.max(...array.map(arr => arr.length));
  const result: T[][] = [];
  
  for (let i = 0; i < length; i++) {
    result.push(array.map(arr => arr[i]));
  }
  
  return result;
}

/**
 * Gets the first element of array
 * @param {T[]} array - The array to query
 * @returns {T | undefined} Returns the first element of array
 * @example
 * head([1, 2, 3]); // 1
 * head([]); // undefined
 */
export function head<T>(array: T[]): T | undefined {
  return array[0];
}

/**
 * Gets the last element of array
 * @param {T[]} array - The array to query
 * @returns {T | undefined} Returns the last element of array
 * @example
 * last([1, 2, 3]); // 3
 * last([]); // undefined
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

/**
 * Gets the element at index n of array
 * @param {T[]} array - The array to query
 * @param {number} [n=0] - The index of the element to return
 * @returns {T | undefined} Returns the nth element of array
 * @example
 * nth(['a', 'b', 'c', 'd'], 1); // 'b'
 * nth(['a', 'b', 'c', 'd'], -2); // 'c'
 */
export function nth<T>(array: T[], n: number = 0): T | undefined {
  const index = n < 0 ? array.length + n : n;
  return array[index];
}

/**
 * Gets all but the last element of array
 * @param {T[]} array - The array to query
 * @returns {T[]} Returns the slice of array
 * @example
 * initial([1, 2, 3]); // [1, 2]
 */
export function initial<T>(array: T[]): T[] {
  return array.slice(0, -1);
}

/**
 * Creates an array of unique values from all given arrays using SameValueZero for equality comparisons
 * @param {T[][]} arrays - The arrays to inspect
 * @param {(a: T, b: T) => boolean} comparator - The comparator invoked per element
 * @returns {T[]} Returns the new array of combined values
 * @example
 * unionWith([[{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }]], (a, b) => a.x === b.x); // [{ 'x': 1 }, { 'x': 2 }]
 */
export function unionWith<T>(arrays: T[][], comparator: (a: T, b: T) => boolean): T[] {
  const result: T[] = [];
  const allValues = arrays.flat();
  
  for (const value of allValues) {
    if (!result.some(item => comparator(item, value))) {
      result.push(value);
    }
  }
  return result;
}

/**
 * Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons
 * @param {T[][]} arrays - The arrays to inspect
 * @param {(a: T, b: T) => boolean} comparator - The comparator invoked per element
 * @returns {T[]} Returns the new array of intersecting values
 * @example
 * intersectionWith([[{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }]], (a, b) => a.x === b.x); // [{ 'x': 1 }]
 */
export function intersectionWith<T>(arrays: T[][], comparator: (a: T, b: T) => boolean): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return [...arrays[0]];
  
  const [first, ...rest] = arrays;
  return first.filter(item => 
    rest.every(array => 
      array.some(arrayItem => comparator(item, arrayItem))
    )
  );
}

/**
 * Like xor except that it accepts comparator which is invoked to compare elements
 * @param {T[][]} arrays - The arrays to inspect
 * @param {(a: T, b: T) => boolean} comparator - The comparator invoked per element
 * @returns {T[]} Returns the new array of filtered values
 * @example
 * xorWith([[{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }]], (a, b) => a.x === b.x); // [{ 'x': 2 }]
 */
export function xorWith<T>(arrays: T[][], comparator: (a: T, b: T) => boolean): T[] {
  const allValues = arrays.flat();
  const result: T[] = [];
  
  for (const value of allValues) {
    const occurrences = allValues.filter(item => comparator(item, value)).length;
    if (occurrences === 1 && !result.some(item => comparator(item, value))) {
      result.push(value);
    }
  }
  return result;
}

/**
 * Like xor except that it accepts iteratee which is invoked for each element
 * @param {T[][]} arrays - The arrays to inspect
 * @param {(value: T) => any} iteratee - The iteratee invoked per element
 * @returns {T[]} Returns the new array of filtered values
 * @example
 * xorBy([[2.1, 1.2], [2.3, 3.4]], Math.floor); // [1.2, 3.4]
 */
export function xorBy<T>(arrays: T[][], iteratee: (value: T) => any): T[] {
  const allValues = arrays.flat();
  const counts = new Map();
  const valueMap = new Map();
  
  for (const value of allValues) {
    const key = iteratee(value);
    counts.set(key, (counts.get(key) || 0) + 1);
    if (!valueMap.has(key)) {
      valueMap.set(key, value);
    }
  }
  
  return Array.from(counts.entries())
    .filter(([_, count]) => count === 1)
    .map(([key]) => valueMap.get(key));
}

/**
 * Like zipObject except that it supports property paths
 * @param {string[]} paths - The property paths
 * @param {T[]} values - The property values
 * @returns {any} Returns the new object
 * @example
 * zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]); // { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
 */
export function zipObjectDeep<T>(paths: string[], values: T[]): any {
  const result: any = {};
  
  for (let i = 0; i < paths.length; i++) {
    if (i < values.length) {
      const path = paths[i].split('.');
      let current = result;
      
      for (let j = 0; j < path.length - 1; j++) {
        if (!current[path[j]]) {
          current[path[j]] = {};
        }
        current = current[path[j]];
      }
      
      current[path[path.length - 1]] = values[i];
    }
  }
  
  return result;
}

/**
 * Creates an array of elements corresponding to the given keys
 * @param {T[]} array - The array to modify
 * @param {T[]} values - The values to remove
 * @returns {T[]} Returns the new array with values removed
 * @example
 * pullAll([1, 2, 3, 1, 2, 3], [2, 3]); // [1, 1]
 */
export function pullAll<T>(array: T[], values: T[]): T[] {
  return array.filter(item => !values.includes(item));
}

/**
 * Like pullAll except that it accepts iteratee which is invoked for each element
 * @param {T[]} array - The array to modify
 * @param {T[]} values - The values to remove
 * @param {(value: T) => any} iteratee - The iteratee invoked per element
 * @returns {T[]} Returns the new array with values removed
 * @example
 * pullAllBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }], [{ 'x': 1 }, { 'x': 3 }], 'x'); // [{ 'x': 2 }]
 */
export function pullAllBy<T>(array: T[], values: T[], iteratee: (value: T) => any): T[] {
  const valueKeys = values.map(iteratee);
  return array.filter(item => !valueKeys.includes(iteratee(item)));
}

/**
 * Like pullAll except that it accepts comparator which is invoked to compare elements
 * @param {T[]} array - The array to modify
 * @param {T[]} values - The values to remove
 * @param {(a: T, b: T) => boolean} comparator - The comparator invoked per element
 * @returns {T[]} Returns the new array with values removed
 * @example
 * pullAllWith([{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }], [{ 'x': 3, 'y': 4 }], (a, b) => a.x === b.x); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 */
export function pullAllWith<T>(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[] {
  return array.filter(arrayItem => !values.some(valueItem => comparator(arrayItem, valueItem)));
}

/**
 * Creates a duplicate-free version of an array using SameValueZero for equality comparisons
 * @param {T[]} array - The array to inspect
 * @returns {T[]} Returns the new duplicate free array
 * @example
 * uniq([2, 1, 2]); // [2, 1]
 */
export function uniq<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Like uniq except that it accepts iteratee which is invoked for each element
 * @param {T[]} array - The array to inspect
 * @param {(value: T) => any} iteratee - The iteratee invoked per element
 * @returns {T[]} Returns the new duplicate free array
 * @example
 * uniqBy([2.1, 1.2, 2.3], Math.floor); // [2.1, 1.2]
 */
export function uniqBy<T>(array: T[], iteratee: (value: T) => any): T[] {
  const seen = new Set();
  return array.filter(item => {
    const key = iteratee(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Like uniq except that it accepts comparator which is invoked to compare elements
 * @param {T[]} array - The array to inspect
 * @param {(a: T, b: T) => boolean} comparator - The comparator invoked per element
 * @returns {T[]} Returns the new duplicate free array
 * @example
 * uniqWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }], (a, b) => a.x === b.x); // [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 */
export function uniqWith<T>(array: T[], comparator: (a: T, b: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of array) {
    if (!result.some(resultItem => comparator(item, resultItem))) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Creates an array excluding all given values using SameValueZero for equality comparisons
 * @param {T[][]} array - The array of grouped elements to process
 * @param {(...values: T[]) => R} iteratee - The function to combine regrouped values
 * @returns {R[]} Returns the new array of regrouped elements
 * @example
 * unzipWith([['1', '2'], ['3', '4'], ['5', '6']], (...group) => group.join('')); // ['135', '246']
 */
export function unzipWith<T, R>(array: T[][], iteratee: (...values: T[]) => R): R[] {
  if (array.length === 0) return [];
  
  const length = Math.max(...array.map(arr => arr.length));
  const result: R[] = [];
  
  for (let i = 0; i < length; i++) {
    const values = array.map(arr => arr[i]);
    result.push(iteratee(...values));
  }
  
  return result;
}

/**
 * Creates an array of elements sorted in ascending order
 * @param {T[]} array - The sorted array to inspect
 * @param {T} value - The value to evaluate
 * @returns {number} Returns the index at which value should be inserted into array
 * @example
 * sortedIndex([30, 50], 40); // 1
 */
export function sortedIndex<T>(array: T[], value: T): number {
  let low = 0;
  let high = array.length;
  
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (array[mid] < value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  
  return low;
}

/**
 * Like sortedIndex except that it accepts iteratee
 * @param {T[]} array - The sorted array to inspect
 * @param {T} value - The value to evaluate
 * @param {(value: T) => any} iteratee - The iteratee invoked per element
 * @returns {number} Returns the index at which value should be inserted into array
 * @example
 * sortedIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, o => o.x); // 0
 */
export function sortedIndexBy<T>(array: T[], value: T, iteratee: (value: T) => any): number {
  let low = 0;
  let high = array.length;
  const computedValue = iteratee(value);
  
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < computedValue) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  
  return low;
}

/**
 * Uses a binary search to determine the highest index at which value should be inserted
 * @param {T[]} array - The sorted array to inspect
 * @param {T} value - The value to evaluate
 * @returns {number} Returns the index at which value should be inserted into array
 * @example
 * sortedLastIndex([4, 5, 5, 5, 6], 5); // 4
 */
export function sortedLastIndex<T>(array: T[], value: T): number {
  let low = 0;
  let high = array.length;
  
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (value < array[mid]) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  
  return low;
}

/**
 * Like sortedLastIndex except that it accepts iteratee
 * @param {T[]} array - The sorted array to inspect
 * @param {T} value - The value to evaluate
 * @param {(value: T) => any} iteratee - The iteratee invoked per element
 * @returns {number} Returns the index at which value should be inserted into array
 * @example
 * sortedLastIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, o => o.x); // 1
 */
export function sortedLastIndexBy<T>(array: T[], value: T, iteratee: (value: T) => any): number {
  let low = 0;
  let high = array.length;
  const computedValue = iteratee(value);
  
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (computedValue < iteratee(array[mid])) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  
  return low;
}

/**
 * Uses a binary search to find the index of the value in the sorted array
 * @param {T[]} array - The sorted array to inspect
 * @param {T} value - The value to search for
 * @returns {number} Returns the index of the matched value, else -1
 * @example
 * sortedIndexOf([4, 5, 5, 5, 6], 5); // 1
 */
export function sortedIndexOf<T>(array: T[], value: T): number {
  const index = sortedIndex(array, value);
  return index < array.length && array[index] === value ? index : -1;
}

/**
 * Uses a binary search to find the last index of the value in the sorted array
 * @param {T[]} array - The sorted array to inspect
 * @param {T} value - The value to search for
 * @returns {number} Returns the index of the matched value, else -1
 * @example
 * sortedLastIndexOf([4, 5, 5, 5, 6], 5); // 3
 */
export function sortedLastIndexOf<T>(array: T[], value: T): number {
  const index = sortedLastIndex(array, value) - 1;
  return index >= 0 && array[index] === value ? index : -1;
}

/**
 * Creates a slice of array from start up to, but not including, end
 * @param {T[]} array - The array to slice
 * @param {number} [start=0] - The start position
 * @param {number} [end=array.length] - The end position
 * @returns {T[]} Returns the slice of array
 * @example
 * slice([1, 2, 3, 4], 2); // [3, 4]
 * slice([1, 2, 3, 4], 1, 3); // [2, 3]
 */
export function slice<T>(array: T[], start: number = 0, end: number = array.length): T[] {
  return array.slice(start, end);
}

/**
 * Joins a list of elements using a separator
 * @param {T[]} array - The array to convert
 * @param {string} [separator=','] - The element separator
 * @returns {string} Returns the joined string
 * @example
 * join(['a', 'b', 'c'], '~'); // 'a~b~c'
 */
export function join<T>(array: T[], separator: string = ','): string {
  return array.join(separator);
}

/**
 * Gets the index at which the first occurrence of value is found in array
 * @param {T[]} array - The array to inspect
 * @param {T} value - The value to search for
 * @param {number} [fromIndex=0] - The index to search from
 * @returns {number} Returns the index of the matched value, else -1
 * @example
 * indexOf([1, 2, 1, 2], 2); // 1
 * indexOf([1, 2, 1, 2], 2, 2); // 3
 */
export function indexOf<T>(array: T[], value: T, fromIndex: number = 0): number {
  return array.indexOf(value, fromIndex);
}

/**
 * Gets the index at which the last occurrence of value is found in array
 * @param {T[]} array - The array to inspect
 * @param {T} value - The value to search for
 * @param {number} [fromIndex=array.length-1] - The index to search from
 * @returns {number} Returns the index of the matched value, else -1
 * @example
 * lastIndexOf([1, 2, 1, 2], 2); // 3
 * lastIndexOf([1, 2, 1, 2], 2, 2); // 1
 */
export function lastIndexOf<T>(array: T[], value: T, fromIndex: number = array.length - 1): number {
  return array.lastIndexOf(value, fromIndex);
}