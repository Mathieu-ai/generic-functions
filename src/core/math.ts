/**
 * Math utility functions
 * No external dependencies - includes lodash-inspired methods
 */

/**
 * Adds two numbers together
 * @param a - The first number to add
 * @param b - The second number to add
 * @returns The sum of a and b
 * @example
 * ```typescript
 * add(2, 3) // => 5
 * add(-1, 1) // => 0
 * ```
 */
export function add (a: number, b: number): number {
  return a + b;
}

/**
 * Computes the sum of all values in an array
 * @param array - The array of numbers to sum
 * @returns The total sum of all numbers in the array, or 0 if array is empty
 * @example
 * ```typescript
 * sum([1, 2, 3, 4]) // => 10
 * sum([]) // => 0
 * sum([-1, 1]) // => 0
 * ```
 */
export function sum (array: number[]): number {
  return array.reduce((sum, value) => sum + value, 0);
}

/**
 * Computes the sum of all values in an array after applying an iteratee function to each element
 * @param array - The array to iterate over
 * @param iteratee - The function invoked per iteration, should return a number
 * @returns The total sum after applying the iteratee to each element
 * @example
 * ```typescript
 * const objects = [{ n: 4 }, { n: 2 }, { n: 8 }];
 * sumBy(objects, o => o.n) // => 14
 * 
 * const strings = ['a', 'bb', 'ccc'];
 * sumBy(strings, s => s.length) // => 6
 * ```
 */
export function sumBy<T> (array: T[], iteratee: (value: T) => number): number {
  return array.reduce((sum, value) => sum + iteratee(value), 0);
}

/**
 * Computes the arithmetic mean (average) of all values in an array
 * @param array - The array of numbers to calculate the mean for
 * @returns The arithmetic mean of the array, or 0 if array is empty
 * @example
 * ```typescript
 * mean([1, 2, 3, 4, 5]) // => 3
 * mean([10, 20]) // => 15
 * mean([]) // => 0
 * ```
 */
export function mean (array: number[]): number {
  return array.length ? sum(array) / array.length : 0;
}

/**
 * Computes the arithmetic mean of all values in an array after applying an iteratee function
 * @param array - The array to iterate over
 * @param iteratee - The function invoked per iteration, should return a number
 * @returns The arithmetic mean after applying the iteratee to each element, or 0 if array is empty
 * @example
 * ```typescript
 * const objects = [{ n: 4 }, { n: 2 }, { n: 8 }];
 * meanBy(objects, o => o.n) // => 4.666...
 * 
 * const people = [{ age: 25 }, { age: 30 }, { age: 35 }];
 * meanBy(people, p => p.age) // => 30
 * ```
 */
export function meanBy<T> (array: T[], iteratee: (value: T) => number): number {
  return array.length ? sumBy(array, iteratee) / array.length : 0;
}

/**
 * Finds the maximum value in an array of numbers
 * @param array - The array of numbers to search
 * @returns The maximum value in the array, or undefined if array is empty
 * @example
 * ```typescript
 * max([1, 5, 3, 9, 2]) // => 9
 * max([-1, -5, -3]) // => -1
 * max([]) // => undefined
 * ```
 */
export function max (array: number[]): number | undefined {
  return array.length ? Math.max(...array) : undefined;
}

/**
 * Finds the element in an array that produces the maximum value when passed through an iteratee function
 * @param array - The array to iterate over
 * @param iteratee - The function invoked per iteration, should return a number for comparison
 * @returns The element that produces the maximum value, or undefined if array is empty
 * @example
 * ```typescript
 * const objects = [{ n: 1 }, { n: 9 }, { n: 3 }];
 * maxBy(objects, o => o.n) // => { n: 9 }
 * 
 * const people = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }];
 * maxBy(people, p => p.age) // => { name: 'Jane', age: 30 }
 * ```
 */
export function maxBy<T> (array: T[], iteratee: (value: T) => number): T | undefined {
  if (!array.length) return undefined;

  let maxItem = array[0];
  let maxValue = iteratee(maxItem);

  for (let i = 1; i < array.length; i++) {
    const value = iteratee(array[i]);
    if (value > maxValue) {
      maxValue = value;
      maxItem = array[i];
    }
  }

  return maxItem;
}

/**
 * Finds the minimum value in an array of numbers
 * @param array - The array of numbers to search
 * @returns The minimum value in the array, or undefined if array is empty
 * @example
 * ```typescript
 * min([1, 5, 3, 9, 2]) // => 1
 * min([-1, -5, -3]) // => -5
 * min([]) // => undefined
 * ```
 */
export function min (array: number[]): number | undefined {
  return array.length ? Math.min(...array) : undefined;
}

/**
 * Finds the element in an array that produces the minimum value when passed through an iteratee function
 * @param array - The array to iterate over
 * @param iteratee - The function invoked per iteration, should return a number for comparison
 * @returns The element that produces the minimum value, or undefined if array is empty
 * @example
 * ```typescript
 * const objects = [{ n: 1 }, { n: 9 }, { n: 3 }];
 * minBy(objects, o => o.n) // => { n: 1 }
 * 
 * const people = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }];
 * minBy(people, p => p.age) // => { name: 'John', age: 25 }
 * ```
 */
export function minBy<T> (array: T[], iteratee: (value: T) => number): T | undefined {
  if (!array.length) return undefined;

  let minItem = array[0];
  let minValue = iteratee(minItem);

  for (let i = 1; i < array.length; i++) {
    const value = iteratee(array[i]);
    if (value < minValue) {
      minValue = value;
      minItem = array[i];
    }
  }

  return minItem;
}

/**
 * Subtracts the second number from the first number
 * @param a - The number to subtract from (minuend)
 * @param b - The number to subtract (subtrahend)
 * @returns The difference of a minus b
 * @example
 * ```typescript
 * subtract(5, 3) // => 2
 * subtract(1, 4) // => -3
 * subtract(0, 0) // => 0
 * ```
 */
export function subtract (a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers together
 * @param a - The first number to multiply
 * @param b - The second number to multiply
 * @returns The product of a and b
 * @example
 * ```typescript
 * multiply(3, 4) // => 12
 * multiply(-2, 5) // => -10
 * multiply(0, 100) // => 0
 * ```
 */
export function multiply (a: number, b: number): number {
  return a * b;
}

/**
 * Divides the first number by the second number
 * @param a - The dividend (number to be divided)
 * @param b - The divisor (number to divide by)
 * @returns The quotient of a divided by b
 * @example
 * ```typescript
 * divide(10, 2) // => 5
 * divide(7, 3) // => 2.333...
 * divide(1, 0) // => Infinity
 * ```
 */
export function divide (a: number, b: number): number {
  return a / b;
}

/**
 * Rounds a number to a specified precision
 * @param number - The number to round
 * @param precision - The number of decimal places to round to (defaults to 0)
 * @returns The rounded number
 * @example
 * ```typescript
 * round(4.006) // => 4
 * round(4.006, 2) // => 4.01
 * round(4060, -2) // => 4100
 * round(1.2345, 3) // => 1.235
 * ```
 */
export function round (number: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

/**
 * Rounds a number up to a specified precision
 * @param number - The number to round up
 * @param precision - The number of decimal places to round to (defaults to 0)
 * @returns The rounded up number
 * @example
 * ```typescript
 * ceil(4.006) // => 5
 * ceil(4.006, 2) // => 4.01
 * ceil(4040, -2) // => 4100
 * ceil(1.2345, 3) // => 1.235
 * ```
 */
export function ceil (number: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.ceil(number * factor) / factor;
}

/**
 * Rounds a number down to a specified precision
 * @param number - The number to round down
 * @param precision - The number of decimal places to round to (defaults to 0)
 * @returns The rounded down number
 * @example
 * ```typescript
 * floor(4.006) // => 4
 * floor(4.006, 2) // => 4.00
 * floor(4090, -2) // => 4000
 * floor(1.2345, 3) // => 1.234
 * ```
 */
export function floor (number: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.floor(number * factor) / factor;
}

/**
 * Checks if a number is within a specified range (inclusive start, exclusive end)
 * @param n - The number to check
 * @param start - The start of the range (inclusive). If end is not specified, this becomes the end and start becomes 0
 * @param end - The end of the range (exclusive). Optional parameter
 * @returns True if the number is within the range, false otherwise
 * @example
 * ```typescript
 * inRange(3, 2, 4) // => true
 * inRange(4, 8) // => true (equivalent to inRange(4, 0, 8))
 * inRange(4, 2) // => false
 * inRange(2, 2, 4) // => true (start is inclusive)
 * inRange(4, 2, 4) // => false (end is exclusive)
 * inRange(1.2, 2, 1) // => true (start and end are swapped automatically)
 * ```
 */
export function inRange (n: number, start: number, end?: number): boolean {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  if (start > end) {
    [start, end] = [end, start];
  }
  return n >= start && n < end;
}

/**
 * Computes the standard deviation of an array of numbers
 * @param array - The array of numbers to calculate standard deviation for
 * @returns The standard deviation of the array, or 0 if array is empty
 * @example
 * ```typescript
 * std([2, 4, 4, 4, 5, 5, 7, 9]) // => 2.138...
 * std([1, 1, 1, 1]) // => 0
 * std([]) // => 0
 * ```
 */
export function std (array: number[]): number {
  if (array.length === 0) return 0;
  const avg = mean(array);
  const squareDiffs = array.map(value => Math.pow(value - avg, 2));
  return Math.sqrt(mean(squareDiffs));
}

/**
 * Computes the variance of an array of numbers
 * @param array - The array of numbers to calculate variance for
 * @returns The variance of the array, or 0 if array is empty
 * @example
 * ```typescript
 * variance([2, 4, 4, 4, 5, 5, 7, 9]) // => 4.571...
 * variance([1, 1, 1, 1]) // => 0
 * variance([]) // => 0
 * ```
 */
export function variance (array: number[]): number {
  if (array.length === 0) return 0;
  const avg = mean(array);
  const squareDiffs = array.map(value => Math.pow(value - avg, 2));
  return mean(squareDiffs);
}