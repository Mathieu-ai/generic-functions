# generic-functions

[![npm version][npm-badge]][npm-url] [![Open issues][issues-badge]][issues-url] [![TypeScript][typescript-badge]][typescript-url]

* 💪 Essential utility functions for modern JavaScript/TypeScript
* 📦 Lightweight library (< 50KB) with zero dependencies
* 🌳 Perfect tree-shaking support
* ⚡ Fast and efficient

## Install

```bash
npm i generic-functions.mlai
```

or

```bash
yarn add generic-functions.mlai
```

or

```bash
pnpm i generic-functions.mlai
```

## Usage

### Tree-shakable imports (Recommended)

Import only what you need for optimal bundle size:

```js
// String utilities
import { trim, capitalize, purify } from 'generic-functions.mlai/core/string';

// Array utilities  
import { sort, getUnique } from 'generic-functions.mlai/core/array';

// Date utilities
import { formatDate, now } from 'generic-functions.mlai/core/date';

// Object utilities
import { flat, isEmpty } from 'generic-functions.mlai/core/object';

// Number utilities
import { number, clamp } from 'generic-functions.mlai/core/number';

// Constants
import { REGEX, DATE_FORMATS } from 'generic-functions.mlai/constants';

console.log(trim('  hello world  ')); // 'hello world'
console.log(capitalize('hello')); // 'Hello'
console.log(formatDate(new Date(), 'DD/MM/YYYY')); // '25/12/2023'
```

### All-in-one import

```js
// Load all core functions (still lightweight!)
import * as gf from 'generic-functions.mlai';

console.log(gf.trim('  hello world  ')); // 'hello world'
console.log(gf.formatDate(new Date(), 'DD/MM/YYYY')); // '25/12/2023'
```

### Category imports

```js
// Import specific categories
import * as stringUtils from 'generic-functions.mlai/core/string';
import * as dateUtils from 'generic-functions.mlai/core/date';

console.log(stringUtils.purify('Héllo')); // 'Hello'
console.log(dateUtils.now('HH:mm')); // '14:30'
```

## Architecture

This library is designed with a modular architecture for optimal tree-shaking:

- `core/string` - String manipulation functions
- `core/array` - Array utilities
- `core/object` - Object manipulation
- `core/number` - Number utilities  
- `core/date` - Date/time functions (no external dependencies)
- `constants` - Useful constants and regex patterns
- `utils` - Optional heavier utilities (import separately)

## Migration from v0.x

The new version removes heavy dependencies (axios, dayjs, etc.) for better performance. 

**Before:**
```js
import { api, now } from 'generic-functions.mlai';
```

**After:**
```js
// Use native fetch or your preferred HTTP client
import { api } from 'generic-functions.mlai/utils';
import { now } from 'generic-functions.mlai/core/date';
```

## Contributing

All contributions are welcome!

[npm-url]: https://www.npmjs.com/package/generic-functions.mlai
[npm-badge]: https://img.shields.io/node/v/generic-functions?style=for-the-badge
[size-badge]: https://badgen.net/bundlephobia/Mathieu-ai/generic-functions
[issues-badge]: https://img.shields.io/github/issues/Mathieu-ai/generic-functions?style=for-the-badge
[issues-url]: https://github.com/Mathieu-ai/generic-functions/issues
[typescript-badge]: https://img.shields.io/badge/Language-Typescript-blue?style=for-the-badge
[typescript-url]: https://github.com/microsoft/TypeScript

## License

generic-functions.mlai is [MIT licensed](LICENSE).

