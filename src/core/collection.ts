/**
 * Collection utility functions (arrays and objects)
 * No external dependencies - includes lodash-inspired methods
 */

/**
 * Checks if predicate returns truthy for all elements of collection.
 * Iteration is stopped once predicate returns falsy.
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param predicate - The function invoked per iteration
 * @returns Returns true if all elements pass the predicate check, else false
 * 
 * @example
 * every([2, 4, 6], x => x % 2 === 0) // => true
 * every({a: 2, b: 4, c: 5}, x => x % 2 === 0) // => false
 */
export function every<T> (collection: T[], predicate: (value: T, index: number, collection: T[]) => boolean): boolean;
export function every<T> (collection: Record<string, T>, predicate: (value: T, key: string, collection: Record<string, T>) => boolean): boolean;
export function every<T> (collection: T[] | Record<string, T>, predicate: any): boolean {
  if (Array.isArray(collection)) {
    return collection.every(predicate);
  }
  return Object.entries(collection).every(([key, value]) => predicate(value, key, collection));
}

/**
 * Iterates over elements of collection and invokes iteratee for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param iteratee - The function invoked per iteration
 * @returns Returns the original collection
 * 
 * @example
 * forEach([1, 2], value => console.log(value))
 * forEach({a: 1, b: 2}, (value, key) => console.log(key, value))
 */
export function forEach<T> (collection: T[], iteratee: (value: T, index: number, collection: T[]) => void): T[];
export function forEach<T> (collection: Record<string, T>, iteratee: (value: T, key: string, collection: Record<string, T>) => void): Record<string, T>;
export function forEach<T> (collection: T[] | Record<string, T>, iteratee: any): T[] | Record<string, T> {
  if (Array.isArray(collection)) {
    collection.forEach(iteratee);
    return collection;
  }
  Object.entries(collection).forEach(([key, value]) => iteratee(value, key, collection));
  return collection;
}

/**
 * Creates an array of values by running each element in collection through iteratee.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param iteratee - The function invoked per iteration
 * @returns Returns the new mapped array
 * 
 * @example
 * map([1, 2, 3], x => x * 2) // => [2, 4, 6]
 * map({a: 1, b: 2}, x => x * 2) // => [2, 4]
 */
export function map<T, R> (collection: T[], iteratee: (value: T, index: number, collection: T[]) => R): R[];
export function map<T, R> (collection: Record<string, T>, iteratee: (value: T, key: string, collection: Record<string, T>) => R): R[];
export function map<T, R> (collection: T[] | Record<string, T>, iteratee: any): R[] {
  if (Array.isArray(collection)) {
    return collection.map(iteratee);
  }
  return Object.entries(collection).map(([key, value]) => iteratee(value, key, collection));
}

/**
 * Iterates over elements of collection, returning an array of all elements predicate returns truthy for.
 * The predicate is invoked with three arguments: (value, index|key, collection).
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param predicate - The function invoked per iteration
 * @returns Returns the new filtered array
 * 
 * @example
 * filter([1, 2, 3, 4], x => x % 2 === 0) // => [2, 4]
 * filter({a: 1, b: 2, c: 3}, x => x > 1) // => [2, 3]
 */
export function filter<T> (collection: T[], predicate: (value: T, index: number, collection: T[]) => boolean): T[];
export function filter<T> (collection: Record<string, T>, predicate: (value: T, key: string, collection: Record<string, T>) => boolean): T[];
export function filter<T> (collection: T[] | Record<string, T>, predicate: any): T[] {
  if (Array.isArray(collection)) {
    return collection.filter(predicate);
  }
  return Object.entries(collection)
    .filter(([key, value]) => predicate(value, key, collection))
    .map(([_, value]) => value);
}

/**
 * Iterates over elements of collection, returning the first element predicate returns truthy for.
 * The predicate is invoked with three arguments: (value, index|key, collection).
 * 
 * @param collection - The collection to inspect (array or object)
 * @param predicate - The function invoked per iteration
 * @returns Returns the matched element, else undefined
 * 
 * @example
 * find([1, 2, 3, 4], x => x > 2) // => 3
 * find({a: 1, b: 2, c: 3}, x => x > 2) // => 3
 */
export function find<T> (collection: T[], predicate: (value: T, index: number, collection: T[]) => boolean): T | undefined;
export function find<T> (collection: Record<string, T>, predicate: (value: T, key: string, collection: Record<string, T>) => boolean): T | undefined;
export function find<T> (collection: T[] | Record<string, T>, predicate: any): T | undefined {
  if (Array.isArray(collection)) {
    return collection.find(predicate);
  }
  for (const [key, value] of Object.entries(collection)) {
    if (predicate(value, key, collection)) {
      return value;
    }
  }
  return undefined;
}

/**
 * This method is like find except that it returns the key of the first element 
 * predicate returns truthy for instead of the element itself.
 * 
 * @param collection - The collection to inspect
 * @param predicate - The function invoked per iteration
 * @returns Returns the key of the matched element, else undefined
 * 
 * @example
 * findKey({a: 1, b: 2, c: 3}, x => x > 2) // => 'c'
 */
export function findKey<T> (collection: Record<string, T>, predicate: (value: T, key: string, collection: Record<string, T>) => boolean): string | undefined {
  for (const [key, value] of Object.entries(collection)) {
    if (predicate(value, key, collection)) {
      return key;
    }
  }
  return undefined;
}

/**
 * This method is like find except that it iterates over elements of collection from right to left.
 * 
 * @param collection - The collection to inspect (array or object)
 * @param predicate - The function invoked per iteration
 * @returns Returns the matched element, else undefined
 * 
 * @example
 * findLast([1, 2, 3, 4], x => x % 2 === 1) // => 3
 */
export function findLast<T> (collection: T[], predicate: (value: T, index: number, collection: T[]) => boolean): T | undefined;
export function findLast<T> (collection: Record<string, T>, predicate: (value: T, key: string, collection: Record<string, T>) => boolean): T | undefined;
export function findLast<T> (collection: T[] | Record<string, T>, predicate: any): T | undefined {
  if (Array.isArray(collection)) {
    for (let i = collection.length - 1; i >= 0; i--) {
      if (predicate(collection[i], i, collection)) {
        return collection[i];
      }
    }
    return undefined;
  }
  const entries = Object.entries(collection).reverse();
  for (const [key, value] of entries) {
    if (predicate(value, key, collection)) {
      return value;
    }
  }
  return undefined;
}

/**
 * Creates a flattened array of values by running each element in collection through iteratee 
 * and flattening the mapped results. The iteratee is invoked with three arguments: 
 * (value, index|key, collection).
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param iteratee - The function invoked per iteration
 * @returns Returns the new flattened array
 * 
 * @example
 * flatMap([1, 2], x => [x, x]) // => [1, 1, 2, 2]
 */
export function flatMap<T, R> (collection: T[], iteratee: (value: T, index: number, collection: T[]) => R | R[]): R[];
export function flatMap<T, R> (collection: Record<string, T>, iteratee: (value: T, key: string, collection: Record<string, T>) => R | R[]): R[];
export function flatMap<T, R> (collection: T[] | Record<string, T>, iteratee: any): R[] {
  if (Array.isArray(collection)) {
    return map<T, R | R[]>(collection, iteratee).flat() as R[];
  } else {
    return map<T, R | R[]>(collection as Record<string, T>, iteratee).flat() as R[];
  }
}

/**
 * This method is like flatMap except that it recursively flattens the mapped results.
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param iteratee - The function invoked per iteration
 * @returns Returns the new flattened array
 * 
 * @example
 * flatMapDeep([1, 2], x => [x, [x]]) // => [1, 1, 2, 2]
 */
export function flatMapDeep<T, R> (collection: T[], iteratee: (value: T, index: number, collection: T[]) => any): R[];
export function flatMapDeep<T, R> (collection: Record<string, T>, iteratee: (value: T, key: string, collection: Record<string, T>) => any): R[];
export function flatMapDeep<T, R> (collection: T[] | Record<string, T>, iteratee: any): R[] {
  if (Array.isArray(collection)) {
    return map<T, any>(collection, iteratee).flat(Infinity) as R[];
  } else {
    return map<T, any>(collection as Record<string, T>, iteratee).flat(Infinity) as R[];
  }
}

/**
 * Creates an object composed of keys generated from the results of running each element 
 * of collection through iteratee. The order of grouped values is determined by the order 
 * they occur in collection.
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 * 
 * @example
 * groupBy(['one', 'two', 'three'], x => x.length) // => {3: ['one', 'two'], 5: ['three']}
 */
export function groupBy<T> (collection: T[], iteratee: (value: T) => string): Record<string, T[]>;
export function groupBy<T> (collection: Record<string, T>, iteratee: (value: T) => string): Record<string, T[]>;
export function groupBy<T> (collection: T[] | Record<string, T>, iteratee: (value: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  const values = Array.isArray(collection) ? collection : Object.values(collection);

  for (const item of values) {
    const key = iteratee(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
}

/**
 * Checks if value is in collection. If collection is a string, it's checked for a substring of value,
 * otherwise SameValueZero is used for equality comparisons.
 * 
 * @param collection - The collection to inspect
 * @param value - The value to search for
 * @param fromIndex - The index to search from
 * @returns Returns true if value is found, else false
 * 
 * @example
 * includes([1, 2, 3], 1) // => true
 * includes({a: 1, b: 2}, 1) // => true
 * includes('hello', 'ell') // => true
 */
export function includes<T> (collection: T[] | Record<string, T> | string, value: T, fromIndex: number = 0): boolean {
  if (typeof collection === 'string') {
    return collection.indexOf(value as any, fromIndex) !== -1;
  }
  if (Array.isArray(collection)) {
    return collection.indexOf(value, fromIndex) !== -1;
  }
  return Object.values(collection).includes(value);
}

/**
 * Invokes the method at path of each element in collection, returning an array of the results 
 * of each invoked method. Any additional arguments are provided to each invoked method.
 * 
 * @param collection - The collection to iterate over
 * @param path - The path of the method to invoke
 * @param args - The arguments to invoke each method with
 * @returns Returns the array of results
 * 
 * @example
 * invokeMap([[5, 1, 7], [3, 2, 1]], 'sort') // => [[1, 5, 7], [1, 2, 3]]
 */
export function invokeMap<T> (collection: T[], path: string, ...args: any[]): any[] {
  return collection.map(item => {
    const method = (item as any)[path];
    return typeof method === 'function' ? method.apply(item, args) : undefined;
  });
}

/**
 * Creates an object composed of keys generated from the results of running each element 
 * of collection through iteratee. The corresponding value of each key is the last element 
 * responsible for generating the key.
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 * 
 * @example
 * keyBy([{id: 'a', dir: 'left'}, {id: 'b', dir: 'right'}], x => x.id) 
 * // => {a: {id: 'a', dir: 'left'}, b: {id: 'b', dir: 'right'}}
 */
export function keyBy<T> (collection: T[], iteratee: (value: T) => string): Record<string, T>;
export function keyBy<T> (collection: Record<string, T>, iteratee: (value: T) => string): Record<string, T>;
export function keyBy<T> (collection: T[] | Record<string, T>, iteratee: (value: T) => string): Record<string, T> {
  const result: Record<string, T> = {};
  const values = Array.isArray(collection) ? collection : Object.values(collection);

  for (const item of values) {
    const key = iteratee(item);
    result[key] = item;
  }

  return result;
}

/**
 * Creates an array of elements, sorted in ascending or descending order by the results 
 * of running each element in a collection through each iteratee.
 * 
 * @param collection - The collection to iterate over
 * @param iteratees - The iteratees to sort by
 * @param orders - The sort orders of iteratees
 * @returns Returns the new sorted array
 * 
 * @example
 * orderBy([{user: 'fred', age: 48}, {user: 'barney', age: 36}], 
 *         [x => x.user], ['desc']) 
 * // => [{user: 'fred', age: 48}, {user: 'barney', age: 36}]
 */
export function orderBy<T> (collection: T[], iteratees: ((item: T) => any)[], orders: ('asc' | 'desc')[] = []): T[] {
  return [...collection].sort((a, b) => {
    for (let i = 0; i < iteratees.length; i++) {
      const iteratee = iteratees[i];
      const order = orders[i] || 'asc';

      const aVal = iteratee(a);
      const bVal = iteratee(b);

      if (aVal < bVal) {
        return order === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return order === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
}

/**
 * Creates an array of elements split into two groups, the first of which contains elements 
 * predicate returns truthy for, the second of which contains elements predicate returns falsy for.
 * 
 * @param collection - The collection to iterate over
 * @param predicate - The function invoked per iteration
 * @returns Returns the array of grouped elements
 * 
 * @example
 * partition([1, 2, 3, 4], x => x % 2) // => [[1, 3], [2, 4]]
 */
export function partition<T> (collection: T[], predicate: (value: T) => boolean): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  for (const item of collection) {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }

  return [truthy, falsy];
}

/**
 * Reduces collection to a value which is the accumulated result of running each element 
 * in collection through iteratee, where each successive invocation is supplied the return 
 * value of the previous.
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param iteratee - The function invoked per iteration
 * @param accumulator - The initial value
 * @returns Returns the accumulated value
 * 
 * @example
 * reduce([1, 2], (sum, n) => sum + n, 0) // => 3
 * reduce({a: 1, b: 2, c: 1}, (result, value, key) => { ... }, {})
 */
export function reduce<T, R> (collection: T[], iteratee: (accumulator: R, value: T, index: number, collection: T[]) => R, accumulator: R): R;
export function reduce<T, R> (collection: Record<string, T>, iteratee: (accumulator: R, value: T, key: string, collection: Record<string, T>) => R, accumulator: R): R;
export function reduce<T, R> (collection: T[] | Record<string, T>, iteratee: any, accumulator: R): R {
  if (Array.isArray(collection)) {
    return collection.reduce(iteratee, accumulator);
  }
  let result = accumulator;
  for (const [key, value] of Object.entries(collection)) {
    result = iteratee(result, value, key, collection);
  }
  return result;
}

/**
 * This method is like reduce except that it iterates over elements of collection from right to left.
 * 
 * @param collection - The collection to iterate over
 * @param iteratee - The function invoked per iteration
 * @param accumulator - The initial value
 * @returns Returns the accumulated value
 * 
 * @example
 * reduceRight([1, 2, 3], (acc, n) => acc.concat(n), []) // => [3, 2, 1]
 */
export function reduceRight<T, R> (collection: T[], iteratee: (accumulator: R, value: T, index: number, collection: T[]) => R, accumulator: R): R {
  return collection.reduceRight(iteratee, accumulator);
}

/**
 * The opposite of filter; this method returns the elements of collection that predicate 
 * does not return truthy for.
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param predicate - The function invoked per iteration
 * @returns Returns the new filtered array
 * 
 * @example
 * reject([1, 2, 3, 4], x => x % 2 === 0) // => [1, 3]
 */
export function reject<T> (collection: T[], predicate: (value: T, index: number, collection: T[]) => boolean): T[];
export function reject<T> (collection: Record<string, T>, predicate: (value: T, key: string, collection: Record<string, T>) => boolean): T[];
export function reject<T> (collection: T[] | Record<string, T>, predicate: any): T[] {
  if (Array.isArray(collection)) {
    return collection.filter((value, index, collection) => !predicate(value, index, collection));
  }
  return Object.entries(collection)
    .filter(([key, value]) => !predicate(value, key, collection))
    .map(([_, value]) => value);
}

/**
 * Gets a random element from collection.
 * 
 * @param collection - The collection to sample
 * @returns Returns the random element
 * 
 * @example
 * sample([1, 2, 3, 4]) // => 2
 * sample({a: 1, b: 2, c: 3}) // => 2
 */
export function sample<T> (collection: T[] | Record<string, T>): T | undefined {
  if (Array.isArray(collection)) {
    return collection[Math.floor(Math.random() * collection.length)];
  }
  const values = Object.values(collection);
  return values[Math.floor(Math.random() * values.length)];
}

/**
 * Gets n random elements at unique keys from collection up to the size of collection.
 * 
 * @param collection - The collection to sample
 * @param n - The number of elements to sample
 * @returns Returns the random elements
 * 
 * @example
 * sampleSize([1, 2, 3], 2) // => [3, 1]
 * sampleSize([1, 2, 3], 4) // => [2, 3, 1]
 */
export function sampleSize<T> (collection: T[] | Record<string, T>, n: number): T[] {
  const values = Array.isArray(collection) ? collection : Object.values(collection);
  const result: T[] = [];
  const indices = new Set<number>();

  while (result.length < n && result.length < values.length) {
    const randomIndex = Math.floor(Math.random() * values.length);
    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      result.push(values[randomIndex]);
    }
  }

  return result;
}

/**
 * Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.
 * 
 * @param collection - The collection to shuffle
 * @returns Returns the new shuffled array
 * 
 * @example
 * shuffle([1, 2, 3, 4]) // => [4, 1, 3, 2]
 */
export function shuffle<T> (collection: T[] | Record<string, T>): T[] {
  const values = Array.isArray(collection) ? [...collection] : Object.values(collection);
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

/**
 * Gets the size of collection by returning its length for array-like values or the number 
 * of own enumerable string keyed properties for objects.
 * 
 * @param collection - The collection to inspect
 * @returns Returns the collection size
 * 
 * @example
 * size([1, 2, 3]) // => 3
 * size({a: 1, b: 2}) // => 2
 * size('pebbles') // => 7
 */
export function size<T> (collection: T[] | Record<string, T> | string): number {
  if (typeof collection === 'string' || Array.isArray(collection)) {
    return collection.length;
  }
  return Object.keys(collection).length;
}

/**
 * Checks if predicate returns truthy for any element of collection. Iteration is stopped 
 * once predicate returns truthy.
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param predicate - The function invoked per iteration
 * @returns Returns true if any element passes the predicate check, else false
 * 
 * @example
 * some([null, 0, 'yes', false], Boolean) // => true
 * some({a: null, b: 0, c: 'yes'}, Boolean) // => true
 */
export function some<T> (collection: T[], predicate: (value: T, index: number, collection: T[]) => boolean): boolean;
export function some<T> (collection: Record<string, T>, predicate: (value: T, key: string, collection: Record<string, T>) => boolean): boolean;
export function some<T> (collection: T[] | Record<string, T>, predicate: any): boolean {
  if (Array.isArray(collection)) {
    return collection.some(predicate);
  }
  return Object.entries(collection).some(([key, value]) => predicate(value, key, collection));
}

/**
 * Creates an array of elements, sorted in ascending order by the results of running 
 * each element in a collection through each iteratee.
 * 
 * @param collection - The collection to iterate over
 * @param iteratees - The iteratees to sort by
 * @returns Returns the new sorted array
 * 
 * @example
 * sortBy([{user: 'fred', age: 48}, {user: 'barney', age: 36}], x => x.age)
 * // => [{user: 'barney', age: 36}, {user: 'fred', age: 48}]
 */
export function sortBy<T> (collection: T[], ...iteratees: ((item: T) => any)[]): T[] {
  return [...collection].sort((a, b) => {
    for (const iteratee of iteratees) {
      const aVal = iteratee(a);
      const bVal = iteratee(b);

      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
    }
    return 0;
  });
}

/**
 * Creates an object composed of keys generated from the results of running each element 
 * of collection through iteratee. The corresponding value of each key is the number of 
 * times the key was returned by iteratee.
 * 
 * @param collection - The collection to iterate over (array or object)
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 * 
 * @example
 * countBy([6.1, 4.2, 6.3], Math.floor) // => {4: 1, 6: 2}
 * countBy(['one', 'two', 'three'], x => x.length) // => {3: 2, 5: 1}
 */
export function countBy<T> (collection: T[], iteratee: (value: T) => string): Record<string, number>;
export function countBy<T> (collection: Record<string, T>, iteratee: (value: T) => string): Record<string, number>;
export function countBy<T> (collection: T[] | Record<string, T>, iteratee: (value: T) => string): Record<string, number> {
  const result: Record<string, number> = {};
  const values = Array.isArray(collection) ? collection : Object.values(collection);

  for (const item of values) {
    const key = iteratee(item);
    result[key] = (result[key] || 0) + 1;
  }

  return result;
}

/**
 * This method is like forEach except that it iterates over elements of collection from right to left.
 * 
 * @param collection - The collection to iterate over
 * @param iteratee - The function invoked per iteration
 * @returns Returns the collection
 * 
 * @example
 * eachRight([1, 2], value => console.log(value)) // => logs `2` then `1`
 */
export function eachRight<T> (collection: T[], iteratee: (value: T, index: number, collection: T[]) => void): T[] {
  for (let i = collection.length - 1; i >= 0; i--) {
    iteratee(collection[i], i, collection);
  }
  return collection;
}

/**
 * Alias for eachRight. This method is like forEach except that it iterates over elements 
 * of collection from right to left.
 * 
 * @param collection - The collection to iterate over
 * @param iteratee - The function invoked per iteration
 * @returns Returns the collection
 * 
 * @example
 * forEachRight([1, 2], value => console.log(value)) // => logs `2` then `1`
 */
export function forEachRight<T> (collection: T[], iteratee: (value: T, index: number, collection: T[]) => void): T[] {
  return eachRight(collection, iteratee);
}
