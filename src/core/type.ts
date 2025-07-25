/**
 * Type checking utility functions
 * No external dependencies - includes lodash-inspired methods
 * @since 0.9.0
 */

import { isEqual } from "./object";

/**
 * Checks if value is an arguments object
 * @param value - The value to check
 * @returns Returns true if value is an arguments object, else false
 * @since 0.9.0
 * @example
 * isArguments(function() { return arguments; }())
 * // => true
 * 
 * isArguments([1, 2, 3])
 * // => false
 */
export function isArguments (value: unknown): value is IArguments {
  return Object.prototype.toString.call(value) === '[object Arguments]';
}

/**
 * Checks if value is classified as an ArrayBuffer object
 * @param value - The value to check
 * @returns Returns true if value is an ArrayBuffer, else false
 * @since 0.9.0
 * @example
 * isArrayBuffer(new ArrayBuffer(2))
 * // => true
 * 
 * isArrayBuffer(new Array(2))
 * // => false
 */
export function isArrayBuffer (value: unknown): value is ArrayBuffer {
  return value instanceof ArrayBuffer;
}

/**
 * Checks if value is array-like. A value is considered array-like if it's not a function and has a valid length property
 * @param value - The value to check
 * @returns Returns true if value is array-like, else false
 * @since 0.9.0
 * @example
 * isArrayLike([1, 2, 3])
 * // => true
 * 
 * isArrayLike('abc')
 * // => true
 * 
 * isArrayLike(Function)
 * // => false
 */
export function isArrayLike (value: unknown): value is { length: number } {
  return value != null && typeof value !== 'function' && isLength((value as { length?: unknown }).length);
}

/**
 * Checks if value is array-like and not a function. This method is like isArrayLike except that it also checks if value is an object
 * @param value - The value to check
 * @returns Returns true if value is an array-like object, else false
 * @since 0.9.0
 * @example
 * isArrayLikeObject([1, 2, 3])
 * // => true
 * 
 * isArrayLikeObject('abc')
 * // => true
 * 
 * isArrayLikeObject(Function)
 * // => false
 */
export function isArrayLikeObject (value: unknown): value is object & { length: number } {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if value is classified as a boolean primitive or object
 * @param value - The value to check
 * @returns Returns true if value is a boolean, else false
 * @since 0.9.0
 * @example
 * isBoolean(false)
 * // => true
 * 
 * isBoolean(null)
 * // => false
 */
export function isBoolean (value: unknown): value is boolean {
  return value === true || value === false || (isObjectLike(value) && Object.prototype.toString.call(value) === '[object Boolean]');
}

/**
 * Checks if value is a buffer
 * @param value - The value to check
 * @returns Returns true if value is a buffer, else false
 * @since 0.9.0
 * @example
 * isBuffer(Buffer.alloc(2))
 * // => true
 * 
 * isBuffer(new Uint8Array(2))
 * // => false
 */
export function isBuffer (value: unknown): boolean {
  return value != null && typeof (value as { constructor?: unknown }).constructor === 'function' &&
    typeof ((value as { constructor: { isBuffer?: unknown } }).constructor.isBuffer) === 'function' &&
    ((value as { constructor: { isBuffer: (val: unknown) => boolean } }).constructor.isBuffer)(value);
}

/**
 * Checks if value is likely a DOM element
 * @param value - The value to check
 * @returns Returns true if value is a DOM element, else false
 * @since 0.9.0
 * @example
 * isElement(document.body)
 * // => true
 * 
 * isElement('<body>')
 * // => false
 */
export function isElement (value: unknown): value is Element {
  return isObjectLike(value) && (value as Element).nodeType === 1 && typeof (value as Element).nodeName === 'string';
}

/**
 * Like isEqual except that it accepts customizer which is invoked to compare values.
 * If customizer returns undefined, comparisons are handled by the method instead.
 * The customizer is invoked with up to six arguments: (objValue, othValue [, index|key, object, other, stack]).
 * @param a - The value to compare
 * @param b - The other value to compare
 * @param customizer - The function to customize comparisons
 * @returns Returns true if the values are equivalent, else false
 * @since 0.9.0
 * @example
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 * 
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true;
 *   }
 * }
 * 
 * isEqualWith(['hello'], ['hi'], customizer)
 * // => true
 */
export function isEqualWith (a: unknown, b: unknown, customizer: (objValue: unknown, othValue: unknown, key?: string) => boolean | undefined): boolean {
  const result = customizer(a, b);
  return result === undefined ? isEqual(a, b) : result;
}

/**
 * Checks if value is an Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, or URIError object
 * @param value - The value to check
 * @returns Returns true if value is an error object, else false
 * @since 0.9.0
 * @example
 * isError(new Error)
 * // => true
 * 
 * isError(Error)
 * // => false
 */
export function isError (value: unknown): value is Error {
  return value instanceof Error || (isObjectLike(value) && Object.prototype.toString.call(value) === '[object Error]');
}

/**
 * Checks if value is a finite primitive number.
 * Note: This method is based on Number.isFinite
 * @param value - The value to check
 * @returns Returns true if value is a finite number, else false
 * @since 0.9.0
 * @example
 * isFinite(3)
 * // => true
 * 
 * isFinite(Number.MIN_VALUE)
 * // => true
 * 
 * isFinite(Infinity)
 * // => false
 * 
 * isFinite('3')
 * // => false
 */
export function isFinite (value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Checks if value is classified as a Function object
 * @param value - The value to check
 * @returns Returns true if value is a function, else false
 * @since 0.9.0
 * @example
 * isFunction(() => {})
 * // => true
 * 
 * isFunction(/abc/)
 * // => false
 */
export function isFunction (value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 * Checks if value is an integer.
 * Note: This method is based on Number.isInteger
 * @param value - The value to check
 * @returns Returns true if value is an integer, else false
 * @since 0.9.0
 * @example
 * isInteger(3)
 * // => true
 * 
 * isInteger(Number.MIN_VALUE)
 * // => false
 * 
 * isInteger(Infinity)
 * // => false
 * 
 * isInteger('3')
 * // => false
 */
export function isInteger (value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value);
}

/**
 * Checks if value is a valid array-like length.
 * Note: This method is loosely based on ToLength operation
 * @param value - The value to check
 * @returns Returns true if value is a valid length, else false
 * @since 0.9.0
 * @example
 * isLength(3)
 * // => true
 * 
 * isLength(Number.MIN_VALUE)
 * // => false
 * 
 * isLength(Infinity)
 * // => false
 * 
 * isLength('3')
 * // => false
 */
export function isLength (value: unknown): boolean {
  return typeof value === 'number' && value >= 0 && value <= Number.MAX_SAFE_INTEGER && Math.floor(value) === value;
}

/**
 * Checks if value is classified as a Map object
 * @param value - The value to check
 * @returns Returns true if value is a map, else false
 * @since 0.9.0
 * @example
 * isMap(new Map)
 * // => true
 * 
 * isMap(new WeakMap)
 * // => false
 */
export function isMap (value: unknown): value is Map<unknown, unknown> {
  return value instanceof Map;
}

/**
 * Performs a partial deep comparison between object and source to determine if object contains equivalent property values.
 * Note: This method is equivalent to partial application with a source object
 * @param object - The object to inspect
 * @param source - The object of property values to match
 * @returns Returns true if object is a match, else false
 * @since 0.9.0
 * @example
 * const object = { 'a': 1, 'b': 2 };
 * 
 * isMatch(object, { 'b': 2 })
 * // => true
 * 
 * isMatch(object, { 'b': 1 })
 * // => false
 */
export function isMatch (object: unknown, source: unknown): boolean {
  if (!isObjectLike(object) || !isObjectLike(source)) return false;

  const sourceObj = source as Record<string, unknown>;
  const objectObj = object as Record<string, unknown>;

  for (const key in sourceObj) {
    if (!(key in objectObj) || !isEqual(objectObj[key], sourceObj[key])) {
      return false;
    }
  }
  return true;
}

/**
 * Like isMatch except that it accepts customizer which is invoked to compare values.
 * If customizer returns undefined, comparisons are handled by the method instead.
 * The customizer is invoked with five arguments: (objValue, srcValue, index|key, object, source).
 * @param object - The object to inspect
 * @param source - The object of property values to match
 * @param customizer - The function to customize comparisons
 * @returns Returns true if object is a match, else false
 * @since 0.9.0
 * @example
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 * 
 * function customizer(objValue, srcValue) {
 *   if (isGreeting(objValue) && isGreeting(srcValue)) {
 *     return true;
 *   }
 * }
 * 
 * const object = { 'greeting': 'hello' };
 * const source = { 'greeting': 'hi' };
 * 
 * isMatchWith(object, source, customizer)
 * // => true
 */
export function isMatchWith (object: unknown, source: unknown, customizer: (objValue: unknown, srcValue: unknown, key: string) => boolean | undefined): boolean {
  if (!isObjectLike(object) || !isObjectLike(source)) return false;

  const sourceObj = source as Record<string, unknown>;
  const objectObj = object as Record<string, unknown>;

  for (const key in sourceObj) {
    const result = customizer(objectObj[key], sourceObj[key], key);
    if (result === undefined) {
      if (!(key in objectObj) || !isEqual(objectObj[key], sourceObj[key])) {
        return false;
      }
    } else if (!result) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if value is NaN.
 * Note: This method is based on Number.isNaN and not global isNaN which returns true for undefined and other non-number values
 * @param value - The value to check
 * @returns Returns true if value is NaN, else false
 * @since 0.9.0
 * @example
 * isNaN(NaN)
 * // => true
 * 
 * isNaN(new Number(NaN))
 * // => true
 * 
 * isNaN(undefined)
 * // => false
 */
export function isNaN (value: unknown): boolean {
  return isNumber(value) && value !== value;
}

/**
 * Checks if value is a pristine native function.
 * Note: This method can't reliably detect native functions in the presence of the core-js package
 * @param value - The value to check
 * @returns Returns true if value is a native function, else false
 * @since 0.9.0
 * @example
 * isNative(Array.prototype.push)
 * // => true
 * 
 * isNative(() => {})
 * // => false
 */
export function isNative (value: unknown): boolean {
  return isFunction(value) && /\[native code\]/.test(value.toString());
}

/**
 * Checks if value is null or undefined
 * @param value - The value to check
 * @returns Returns true if value is nullish, else false
 * @since 0.9.0
 * @example
 * isNil(null)
 * // => true
 * 
 * isNil(void 0)
 * // => true
 * 
 * isNil(NaN)
 * // => false
 */
export function isNil (value: unknown): value is null | undefined {
  return value == null;
}

/**
 * Checks if value is null
 * @param value - The value to check
 * @returns Returns true if value is null, else false
 * @since 0.9.0
 * @example
 * isNull(null)
 * // => true
 * 
 * isNull(void 0)
 * // => false
 */
export function isNull (value: unknown): value is null {
  return value === null;
}

/**
 * Checks if value is classified as a Number primitive or object.
 * Note: To exclude Infinity, -Infinity, and NaN, which are classified as numbers, use the isFinite method
 * @param value - The value to check
 * @returns Returns true if value is a number, else false
 * @since 0.9.0
 * @example
 * isNumber(3)
 * // => true
 * 
 * isNumber(Number.MIN_VALUE)
 * // => true
 * 
 * isNumber(Infinity)
 * // => true
 * 
 * isNumber('3')
 * // => false
 */
export function isNumber (value: unknown): value is number {
  return typeof value === 'number' || (isObjectLike(value) && Object.prototype.toString.call(value) === '[object Number]');
}

/**
 * Checks if value is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
 * @param value - The value to check
 * @returns Returns true if value is an object, else false
 * @since 0.9.0
 * @example
 * isObject({})
 * // => true
 * 
 * isObject([1, 2, 3])
 * // => true
 * 
 * isObject(() => {})
 * // => true
 * 
 * isObject(null)
 * // => false
 */
export function isObject (value: unknown): value is object {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

/**
 * Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object"
 * @param value - The value to check
 * @returns Returns true if value is object-like, else false
 * @since 0.9.0
 * @example
 * isObjectLike({})
 * // => true
 * 
 * isObjectLike([1, 2, 3])
 * // => true
 * 
 * isObjectLike(() => {})
 * // => false
 * 
 * isObjectLike(null)
 * // => false
 */
export function isObjectLike (value: unknown): value is object {
  return value != null && typeof value === 'object';
}

/**
 * Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null
 * @param value - The value to check
 * @returns Returns true if value is a plain object, else false
 * @since 0.9.0
 * @example
 * function Foo() {
 *   this.a = 1;
 * }
 * 
 * isPlainObject(new Foo)
 * // => false
 * 
 * isPlainObject([1, 2, 3])
 * // => false
 * 
 * isPlainObject({ 'x': 0, 'y': 0 })
 * // => true
 * 
 * isPlainObject(Object.create(null))
 * // => true
 */
export function isPlainObject (value: unknown): boolean {
  if (!isObjectLike(value) || Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

/**
 * Checks if value is classified as a RegExp object
 * @param value - The value to check
 * @returns Returns true if value is a regexp, else false
 * @since 0.9.0
 * @example
 * isRegExp(/abc/)
 * // => true
 * 
 * isRegExp('/abc/')
 * // => false
 */
export function isRegExp (value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/**
 * Checks if value is a safe integer. An integer is safe if it's an IEEE-754 double precision number which isn't the result of a rounded unsafe integer.
 * Note: This method is based on Number.isSafeInteger
 * @param value - The value to check
 * @returns Returns true if value is a safe integer, else false
 * @since 0.9.0
 * @example
 * isSafeInteger(3)
 * // => true
 * 
 * isSafeInteger(Number.MIN_VALUE)
 * // => false
 * 
 * isSafeInteger(Infinity)
 * // => false
 * 
 * isSafeInteger('3')
 * // => false
 */
export function isSafeInteger (value: unknown): value is number {
  return isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
}

/**
 * Checks if value is classified as a Set object
 * @param value - The value to check
 * @returns Returns true if value is a set, else false
 * @since 0.9.0
 * @example
 * isSet(new Set)
 * // => true
 * 
 * isSet(new WeakSet)
 * // => false
 */
export function isSet (value: unknown): value is Set<unknown> {
  return value instanceof Set;
}

/**
 * Checks if value is classified as a String primitive or object
 * @param value - The value to check
 * @returns Returns true if value is a string, else false
 * @since 0.9.0
 * @example
 * isString('abc')
 * // => true
 * 
 * isString(1)
 * // => false
 */
export function isString (value: unknown): value is string {
  return typeof value === 'string' || (isObjectLike(value) && Object.prototype.toString.call(value) === '[object String]');
}

/**
 * Checks if value is classified as a Symbol primitive or object
 * @param value - The value to check
 * @returns Returns true if value is a symbol, else false
 * @since 0.9.0
 * @example
 * isSymbol(Symbol.iterator)
 * // => true
 * 
 * isSymbol('abc')
 * // => false
 */
export function isSymbol (value: unknown): value is symbol {
  return typeof value === 'symbol' || (isObjectLike(value) && Object.prototype.toString.call(value) === '[object Symbol]');
}

/**
 * Checks if value is classified as a typed array
 * @param value - The value to check
 * @returns Returns true if value is a typed array, else false
 * @since 0.9.0
 * @example
 * isTypedArray(new Uint8Array)
 * // => true
 * 
 * isTypedArray([])
 * // => false
 */
export function isTypedArray (value: unknown): boolean {
  return isObjectLike(value) && /^\[object (Int8|Uint8|Uint8Clamped|Int16|Uint16|Int32|Uint32|Float32|Float64)Array\]$/.test(Object.prototype.toString.call(value));
}

/**
 * Checks if value is undefined
 * @param value - The value to check
 * @returns Returns true if value is undefined, else false
 * @since 0.9.0
 * @example
 * isUndefined(void 0)
 * // => true
 * 
 * isUndefined(null)
 * // => false
 */
export function isUndefined (value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if value is classified as a WeakMap object
 * @param value - The value to check
 * @returns Returns true if value is a weak map, else false
 * @since 0.9.0
 * @example
 * isWeakMap(new WeakMap)
 * // => true
 * 
 * isWeakMap(new Map)
 * // => false
 */
export function isWeakMap (value: unknown): value is WeakMap<object, unknown> {
  return value instanceof WeakMap;
}

/**
 * Checks if value is classified as a WeakSet object
 * @param value - The value to check
 * @returns Returns true if value is a weak set, else false
 * @since 0.9.0
 * @example
 * isWeakSet(new WeakSet)
 * // => true
 * 
 * isWeakSet(new Set)
 * // => false
 */
export function isWeakSet (value: unknown): value is WeakSet<object> {
  return value instanceof WeakSet;
}
