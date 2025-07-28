<p align="center">
  <img src="docs/gf.png" alt="generic-functions logo" width="160" />
<br />
<h1 align="center">generic-functions</h1>
</p>

[![npm version][npm-badge]][npm-url] [![Open issues][issues-badge]][issues-url] [![TypeScript][typescript-badge]][typescript-url] [![License: MIT][license-badge]][license-url]

> A comprehensive, lightweight utility library

## 🚀 Features

- **🌳 Tree-shakable**: Import only what you need for optimal bundle size
- **📦 Zero dependencies**: Lightweight core with no external deps
- **⚡ High performance**: Optimized implementations inspired by lodash
- **🔒 Type-safe**: Full TypeScript support with detailed type definitions
- **📚 Comprehensive**: 100+ utility functions across multiple categories

## 📦 Installation

```bash
npm install generic-functions.mlai
```

```bash
yarn add generic-functions.mlai
```

```bash
pnpm add generic-functions.mlai
```

## 🏗️ Project Structure

```
src/
├── core/                    # Core utility modules
│   ├── array.ts            # Array manipulation utilities
│   ├── collection.ts       # Collection utilities (arrays & objects)
│   ├── date.ts             # Date/time utilities
│   ├── function.ts         # Function utilities (debounce, throttle, etc.)
│   ├── math.ts             # Mathematical operations
│   ├── number.ts           # Number parsing and manipulation
│   ├── object.ts           # Object manipulation utilities
│   ├── string.ts           # String manipulation utilities
│   ├── type.ts             # Type checking utilities
│   ├── utility.ts          # General utility functions
│   └── index.ts            # Core module exports
├── utils/                   # Optional heavy utilities
│   └── index.ts            # Utils module exports
├── constants/               # Useful constants and patterns
│   └── index.ts            # Constants exports
└── index.ts                # Main entry point
```

## 🎯 Usage Examples

### Import Usage (Tree-shakable with tsup)

Import functions directly from the main package - tsup automatically handles tree-shaking:

```typescript
// All utilities are available from the main package
import { 
  // String utilities
  trim, capitalize, purify, camelCase,
  // Array utilities  
  sort, getUnique, chunk, flatten,
  // Date utilities
  formatDate, now, addTime, isBetween,
  // Object utilities
  get, set, merge, pick, omit,
  // Math utilities
  sum, mean, clamp, random,
  // Type checking
  isString, isArray, isObject, isFunction,
  // Function utilities
  debounce, throttle, memoize, curry
} from 'generic-functions.mlai';

// Usage examples
console.log(trim('  hello world  ')); // 'hello world'
console.log(capitalize('hello')); // 'Hello'
console.log(formatDate(new Date(), 'DD/MM/YYYY')); // '25/12/2023'
console.log(sum([1, 2, 3, 4])); // 10
console.log(get({ a: { b: { c: 42 } } }, 'a.b.c')); // 42
```

### Alternative import patterns

```typescript
// Import everything (not recommended for production)
import * as gf from 'generic-functions.mlai';

console.log(gf.trim('  hello world  ')); // 'hello world'
console.log(gf.formatDate(new Date(), 'DD/MM/YYYY')); // '25/12/2023'
console.log(gf.debounce(() => console.log('debounced!'), 300));
```

## 📋 API Reference

All functions are available as named imports from the main package:

```typescript
import { functionName } from 'generic-functions.mlai';
```

### String Utilities

| Function | Description | Example |
|----------|-------------|---------|
| `purify(str)` | Removes accents from string | `purify('café')` → `'cafe'` |
| `capitalize(str)` | Capitalizes first character | `capitalize('hello')` → `'Hello'` |
| `camelCase(str)` | Converts to camelCase | `camelCase('hello world')` → `'helloWorld'` |
| `kebabCase(str)` | Converts to kebab-case | `kebabCase('Hello World')` → `'hello-world'` |
| `trim(str, chars?)` | Trims whitespace or specified chars | `trim('  hello  ')` → `'hello'` |

### Array Utilities

| Function | Description | Example |
|----------|-------------|---------|
| `chunk(array, size)` | Creates chunks of specified size | `chunk([1,2,3,4], 2)` → `[[1,2], [3,4]]` |
| `flatten(array)` | Flattens array one level | `flatten([1, [2, 3]])` → `[1, 2, 3]` |
| `uniq(array)` | Removes duplicates | `uniq([1, 2, 2, 3])` → `[1, 2, 3]` |
| `difference(array, values)` | Array difference | `difference([1,2,3], [2,3])` → `[1]` |

### Object Utilities

| Function | Description | Example |
|----------|-------------|---------|
| `get(obj, path, default?)` | Gets value at path | `get({a:{b:1}}, 'a.b')` → `1` |
| `set(obj, path, value)` | Sets value at path | `set({}, 'a.b', 1)` → `{a:{b:1}}` |
| `merge(target, ...sources)` | Deep merge objects | `merge({a:1}, {b:2})` → `{a:1,b:2}` |
| `pick(obj, ...keys)` | Pick specified properties | `pick({a:1,b:2}, 'a')` → `{a:1}` |

### Math Utilities

| Function | Description | Example |
|----------|-------------|---------|
| `sum(numbers)` | Sum of array | `sum([1,2,3])` → `6` |
| `mean(numbers)` | Average of array | `mean([1,2,3])` → `2` |
| `clamp(num, min, max)` | Clamps number to range | `clamp(10, 0, 5)` → `5` |
| `random(min?, max?)` | Random number in range | `random(1, 10)` → `7.23...` |

### Date Utilities

| Function | Description | Example |
|----------|-------------|---------|
| `formatDate(date, format)` | Format date with pattern | `formatDate(new Date(), 'DD/MM/YYYY')` |
| `addTime(date, amount, unit)` | Add time to date | `addTime(date, 5, 'day')` |
| `isBetween(date, start, end)` | Check if date in range | `isBetween(date, start, end)` |

### Function Utilities

| Function | Description | Example |
|----------|-------------|---------|
| `debounce(fn, wait)` | Debounce function calls | `debounce(fn, 300)` |
| `throttle(fn, wait)` | Throttle function calls | `throttle(fn, 100)` |
| `memoize(fn)` | Memoize function results | `memoize(expensiveFn)` |
| `curry(fn)` | Curry function arguments | `curry(fn)(a)(b)(c)` |

## 🔧 Development

### Prerequisites

- Node.js 16+
- TypeScript 4.5+

### Setup

```bash
# Clone the repository
git clone https://github.com/Mathieu-ai/generic-functions.git
cd generic-functions

# Install dependencies
npm install

# Build the project
npm run build

# Run tests (when available)
npm test
```

### Build Process

```bash
# Clean dist folder
npm run clean

# Build TypeScript
npm run build

# Copy additional files
npm run copy-files

# Full build process
npm run prepare-dist
```

### Project Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run clean` | Remove dist folder |
| `npm run copy-files` | Copy package.json and other files to dist |
| `npm run prepare-dist` | Full build process |
| `npm run prepare` | Pre-publish build |

## 🚀 Migration from v0.x

The new version uses tsup for optimal bundling and tree-shaking. All imports should now come from the main package:

**Before (v0.x with subpaths):**

```typescript
import { api, now } from 'generic-functions.mlai/core/date';
import { trim } from 'generic-functions.mlai/core/string';
```

**After (v0.9+ with tsup):**

```typescript
// Import everything from the main package - tsup handles tree-shaking automatically
import { now, trim, api } from 'generic-functions.mlai';
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Submit a pull request

### Code Style

- Use TypeScript with strict type checking
- Follow existing code patterns and naming conventions
- Add JSDoc comments for all public functions
- Include usage examples in documentation

## 📄 License

This project is [MIT licensed](LICENSE).

## 🔗 Links

- [npm package](https://www.npmjs.com/package/generic-functions.mlai)
- [GitHub repository](https://github.com/Mathieu-ai/generic-functions)
- [Issues](https://github.com/Mathieu-ai/generic-functions/issues)

---

Made with ❤️ by [Mathieu AI](https://github.com/Mathieu-ai)

[npm-url]: https://www.npmjs.com/package/generic-functions.mlai
[npm-badge]: https://img.shields.io/npm/v/generic-functions.mlai?style=for-the-badge
[issues-badge]: https://img.shields.io/github/issues/Mathieu-ai/generic-functions?style=for-the-badge
[issues-url]: https://github.com/Mathieu-ai/generic-functions/issues
[typescript-badge]: https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge
[typescript-url]: https://github.com/microsoft/TypeScript
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge
[license-url]: https://opensource.org/licenses/MIT
