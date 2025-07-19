/**
 * Function utility functions
 * No external dependencies - includes lodash-inspired methods
 */

/**
 * Creates a function that invokes func with the this binding of thisArg and arguments of the created function
 * @param func - The function to bind
 * @param thisArg - The this binding of func
 * @param partials - The arguments to be partially applied
 * @returns Returns the new bound function
 * @example
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 * const object = { 'user': 'fred' };
 * const bound = bind(greet, object, 'hi');
 * bound('!'); // => 'hi fred!'
 */
export function bind<T extends (...args: any[]) => any> (func: T, thisArg: any, ...partials: any[]): T {
  return function (this: any, ...args: any[]) {
    return func.apply(thisArg, [...partials, ...args]);
  } as T;
}

/**
 * Creates a function that invokes the method at object[key] with arguments
 * @param object - The object to query
 * @param key - The key of the method to bind
 * @param partials - The arguments to be partially applied
 * @returns Returns the new bound function
 * @throws {TypeError} Throws if the method is not a function
 * @example
 * const object = {
 *   'user': 'fred',
 *   'greet': function(greeting, punctuation) {
 *     return greeting + ' ' + this.user + punctuation;
 *   }
 * };
 * const bound = bindKey(object, 'greet', 'hi');
 * bound('!'); // => 'hi fred!'
 */
export function bindKey<T> (object: T, key: keyof T, ...partials: any[]): (...args: any[]) => any {
  return function (...args: any[]) {
    const method = object[key];
    if (typeof method === 'function') {
      return (method as any).apply(object, [...partials, ...args]);
    }
    throw new TypeError(`${String(key)} is not a function`);
  };
}

/**
 * Creates a function that accepts up to n arguments, ignoring any additional arguments
 * @param func - The function to cap arguments for
 * @param n - The arity cap (defaults to func.length)
 * @returns Returns the new capped function
 * @example
 * ['6', '8', '10'].map(ary(parseInt, 1)); // => [6, 8, 10]
 */
export function ary<T extends (...args: any[]) => any> (func: T, n: number = func.length): (...args: any[]) => ReturnType<T> {
  return function (...args: any[]) {
    return func(...args.slice(0, n));
  };
}

/**
 * Creates a function that invokes func with arguments reversed
 * @param func - The function to flip arguments for
 * @returns Returns the new flipped function
 * @example
 * const flipped = flip(function(a, b, c) {
 *   return [a, b, c];
 * });
 * flipped('a', 'b', 'c'); // => ['c', 'b', 'a']
 */
export function flip<T extends (...args: any[]) => any> (func: T): (...args: Parameters<T>) => ReturnType<T> {
  return function (...args: Parameters<T>) {
    return func(...args.reverse());
  };
}

/**
 * Creates a function that memoizes the result of func
 * @param func - The function to have its output memoized
 * @param resolver - The function to resolve the cache key (optional)
 * @returns Returns the new memoized function
 * @example
 * const object = { 'a': 1, 'b': 2 };
 * const other = { 'c': 3, 'd': 4 };
 * const values = memoize(function(obj) { return Object.values(obj); });
 * values(object); // => [1, 2]
 * values(other); // => [3, 4]
 */
export function memoize<T extends (...args: any[]) => any> (func: T, resolver?: (...args: Parameters<T>) => any): T {
  const cache = new Map();

  const memoized = function (...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  } as T;

  (memoized as any).cache = cache;
  return memoized;
}

/**
 * Creates a function that negates the result of the predicate func
 * @param predicate - The predicate to negate
 * @returns Returns the new negated function
 * @example
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 * const isOdd = negate(isEven);
 * isOdd(3); // => true
 */
export function negate<T extends (...args: any[]) => boolean> (predicate: T): (...args: Parameters<T>) => boolean {
  return function (...args: Parameters<T>) {
    return !predicate(...args);
  };
}

/**
 * Creates a function that is restricted to invoking func once
 * @param func - The function to restrict
 * @returns Returns the new restricted function
 * @example
 * const initialize = once(createApplication);
 * initialize(); // creates the application
 * initialize(); // returns the cached result
 */
export function once<T extends (...args: any[]) => any> (func: T): T {
  let called = false;
  let result: ReturnType<T>;

  return function (...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = func(...args);
    }
    return result;
  } as T;
}

/**
 * Creates a function that invokes func with its arguments transformed
 * @param func - The function to wrap
 * @param transforms - The argument transforms
 * @returns Returns the new function
 * @example
 * function doubled(n) {
 *   return n * 2;
 * }
 * function square(n) {
 *   return n * n;
 * }
 * const func = overArgs(function(x, y) {
 *   return [x, y];
 * }, square, doubled);
 * func(9, 3); // => [81, 6]
 */
export function overArgs<T extends (...args: any[]) => any> (func: T, ...transforms: ((...args: any[]) => any)[]): (...args: any[]) => ReturnType<T> {
  return function (...args: any[]) {
    const transformedArgs = args.map((arg, index) => {
      const transform = transforms[index];
      return transform ? transform(arg) : arg;
    });
    return func(...transformedArgs);
  };
}

/**
 * Creates a function that invokes func with partials prepended to the arguments it receives
 * @param func - The function to partially apply arguments to
 * @param partials - The arguments to be partially applied
 * @returns Returns the new partially applied function
 * @example
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 * const sayHelloTo = partial(greet, 'hello');
 * sayHelloTo('fred'); // => 'hello fred'
 */
export function partial<T extends (...args: any[]) => any> (func: T, ...partials: any[]): (...args: any[]) => ReturnType<T> {
  return function (...args: any[]) {
    return func(...partials, ...args);
  };
}

/**
 * Like partial except that partially applied arguments are appended to the arguments it receives
 * @param func - The function to partially apply arguments to
 * @param partials - The arguments to be partially applied
 * @returns Returns the new partially applied function
 * @example
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 * const greetFred = partialRight(greet, 'fred');
 * greetFred('hi'); // => 'hi fred'
 */
export function partialRight<T extends (...args: any[]) => any> (func: T, ...partials: any[]): (...args: any[]) => ReturnType<T> {
  return function (...args: any[]) {
    return func(...args, ...partials);
  };
}

/**
 * Creates a function that invokes func with arguments arranged according to the specified indexes
 * @param func - The function to rearrange arguments for
 * @param indexes - The arranged argument indexes
 * @returns Returns the new function
 * @example
 * const rearged = rearg(function(a, b, c) {
 *   return [a, b, c];
 * }, 2, 0, 1);
 * rearged('b', 'c', 'a'); // => ['a', 'b', 'c']
 */
export function rearg<T extends (...args: any[]) => any> (func: T, ...indexes: number[]): (...args: any[]) => ReturnType<T> {
  return function (...args: any[]) {
    const reorderedArgs = indexes.map(index => args[index]);
    return func(...reorderedArgs);
  };
}

/**
 * Creates a function that invokes func with the this binding of the created function and an array of arguments
 * @param func - The function to spread arguments over
 * @returns Returns the new function
 * @example
 * const say = spread(function(who, what) {
 *   return who + ' says ' + what;
 * });
 * say(['fred', 'hello']); // => 'fred says hello'
 */
export function spread<T extends (args: any[]) => any> (func: T): (...args: any[]) => ReturnType<T> {
  return function (...args: any[]) {
    return func(args);
  };
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @param options - The options object
 * @param options.leading - Specify invoking on the leading edge of the timeout (default: true)
 * @param options.trailing - Specify invoking on the trailing edge of the timeout (default: true)
 * @returns Returns the new throttled function
 * @example
 * // Avoid excessively updating the position while scrolling.
 * const throttled = throttle(updatePosition, 100);
 * window.addEventListener('scroll', throttled);
 */
export function throttle<T extends (...args: any[]) => any> (func: T, wait: number, options: { leading?: boolean; trailing?: boolean } = {}): T & { cancel (): void; flush (): ReturnType<T> | undefined } {
  let timeout: NodeJS.Timeout | null = null;
  let lastCallTime = 0;
  let lastArgs: Parameters<T> | null = null;
  let result: ReturnType<T>;

  const { leading = true, trailing = true } = options;

  function invokeFunc () {
    if (lastArgs) {
      result = func(...lastArgs);
      lastArgs = null;
    }
    return result;
  }

  function leadingEdge () {
    lastCallTime = Date.now();
    if (leading) {
      return invokeFunc();
    }
    return result;
  }

  function trailingEdge () {
    timeout = null;
    if (trailing && lastArgs) {
      return invokeFunc();
    }
    lastArgs = null;
    return result;
  }

  const throttled = function (...args: Parameters<T>): ReturnType<T> {
    const now = Date.now();

    if (!lastCallTime && !leading) {
      lastCallTime = now;
    }

    const remaining = wait - (now - lastCallTime);
    lastArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCallTime = now;
      return invokeFunc();
    } else if (!timeout && trailing) {
      timeout = setTimeout(trailingEdge, remaining);
    }

    return result;
  } as T & { cancel (): void; flush (): ReturnType<T> | undefined };

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastCallTime = 0;
    lastArgs = null;
  };

  throttled.flush = function () {
    return timeout ? trailingEdge() : result;
  };

  return throttled;
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options - The options object
 * @param options.leading - Specify invoking on the leading edge of the timeout (default: false)
 * @param options.trailing - Specify invoking on the trailing edge of the timeout (default: true)
 * @param options.maxWait - The maximum time func is allowed to be delayed before it's invoked
 * @returns Returns the new debounced function
 * @example
 * // Avoid costly calculations while the window size is in flux.
 * const debounced = debounce(calculateLayout, 150);
 * window.addEventListener('resize', debounced);
 */
export function debounce<T extends (...args: any[]) => any> (func: T, wait: number, options: { leading?: boolean; trailing?: boolean; maxWait?: number } = {}): T & { cancel (): void; flush (): ReturnType<T> | undefined; pending (): boolean } {
  let timeout: NodeJS.Timeout | null = null;
  let maxTimeout: NodeJS.Timeout | null = null;
  let lastCallTime = 0;
  let lastInvokeTime = 0;
  let lastArgs: Parameters<T> | null = null;
  let result: ReturnType<T>;

  const { leading = false, trailing = true, maxWait } = options;

  function invokeFunc () {
    if (lastArgs) {
      const args = lastArgs;
      lastArgs = null;
      lastInvokeTime = Date.now();
      result = func(...args);
    }
    return result;
  }

  function leadingEdge () {
    lastInvokeTime = Date.now();
    if (leading) {
      return invokeFunc();
    }
    return result;
  }

  function trailingEdge () {
    timeout = null;
    if (trailing && lastArgs) {
      return invokeFunc();
    }
    lastArgs = null;
    return result;
  }

  function timerExpired () {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge();
    }
    timeout = setTimeout(timerExpired, remainingWait(time));
    return result;
  }

  function shouldInvoke (time: number) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      !lastCallTime ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  }

  function remainingWait (time: number) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxWait !== undefined
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function cancel () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    if (maxTimeout) {
      clearTimeout(maxTimeout);
      maxTimeout = null;
    }
    lastCallTime = 0;
    lastInvokeTime = 0;
    lastArgs = null;
  }

  function flush () {
    return timeout ? trailingEdge() : result;
  }

  function pending () {
    return timeout !== null;
  }

  const debounced = function (...args: Parameters<T>): ReturnType<T> {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastCallTime = time;

    if (isInvoking) {
      if (!timeout) {
        return leadingEdge();
      }
      if (maxWait) {
        timeout = setTimeout(timerExpired, wait);
        return invokeFunc();
      }
    }

    if (!timeout) {
      timeout = setTimeout(timerExpired, wait);
    }

    return result;
  } as T & { cancel (): void; flush (): ReturnType<T> | undefined; pending (): boolean };

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;

  return debounced;
}

/**
 * Creates a function that accepts up to one argument, ignoring any additional arguments
 * @param func - The function to cap arguments for
 * @returns Returns the new capped function
 * @example
 * ['6', '8', '10'].map(unary(parseInt)); // => [6, 8, 10]
 */
export function unary<T extends (...args: any[]) => any> (func: T): (arg: Parameters<T>[0]) => ReturnType<T> {
  return function (arg: Parameters<T>[0]) {
    return func(arg);
  };
}

/**
 * Creates a function that provides value to wrapper as its first argument
 * @param value - The value to wrap
 * @param wrapper - The wrapper function
 * @returns Returns the new function
 * @example
 * const p = wrap('hello', function(greeting, name) {
 *   return greeting + ' ' + name;
 * });
 * p('world'); // => 'hello world'
 */
export function wrap<T, R> (value: T, wrapper: (value: T, ...args: any[]) => R): (...args: any[]) => R {
  return function (...args: any[]) {
    return wrapper(value, ...args);
  };
}

/**
 * Creates a function that accepts arguments of func and either invokes func returning its result,
 * if at least arity number of arguments have been provided, or returns a function that accepts
 * the remaining func arguments
 * @param func - The function to curry
 * @param arity - The arity of func (defaults to func.length)
 * @returns Returns the new curried function
 * @example
 * const abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 * const curried = curry(abc);
 * curried(1)(2)(3); // => [1, 2, 3]
 * curried(1, 2)(3); // => [1, 2, 3]
 * curried(1, 2, 3); // => [1, 2, 3]
 */
export function curry<T extends (...args: any[]) => any> (func: T, arity: number = func.length): any {
  return function curried (this: any, ...args: any[]): any {
    if (args.length >= arity) {
      return func.apply(this, args);
    } else {
      return function (this: any, ...args2: any[]) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

/**
 * This method is like curry except that arguments are applied to func in the manner of partialRight instead of partial
 * @param func - The function to curry
 * @param arity - The arity of func (defaults to func.length)
 * @returns Returns the new curried function
 * @example
 * const abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 * const curried = curryRight(abc);
 * curried(3)(2)(1); // => [1, 2, 3]
 * curried(2, 3)(1); // => [1, 2, 3]
 * curried(1, 2, 3); // => [1, 2, 3]
 */
export function curryRight<T extends (...args: any[]) => any> (func: T, arity: number = func.length): any {
  return function curried (this: any, ...args: any[]): any {
    if (args.length >= arity) {
      return func.apply(this, args);
    } else {
      return function (this: any, ...args2: any[]) {
        return curried.apply(this, args2.concat(args));
      };
    }
  };
}

/**
 * Creates a function that invokes func with arguments arranged according to the specified indexes
 * where the argument value at the first index is provided as the first argument
 * @param func - The function to change the argument order for
 * @param start - The start position of the rest parameter (defaults to func.length - 1)
 * @returns Returns the new function
 * @example
 * const say = rest(function(what, names) {
 *   return what + ' ' + names.join(', ');
 * });
 * say('hello', 'fred', 'barney', 'pebbles'); // => 'hello fred, barney, pebbles'
 */
export function rest<T extends (...args: any[]) => any> (func: T, start: number = func.length - 1): (...args: any[]) => ReturnType<T> {
  return function (...args: any[]) {
    const restArgs = args.slice(start);
    const normalArgs = args.slice(0, start);
    return func(...normalArgs, restArgs);
  };
}