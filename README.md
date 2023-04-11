# generic-functions

[![npm version][npm-badge]][npm-url] [![Open issues][issues-badge]][issues-url] [![TypeScript][typescript-badge]][typescript-url]

* 💪 Have some useful props & functions
* 📦 light library

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

Once you have installed the module, you can import like this:

```js
// Load all
import * as ml from 'generic-functions.mlai';
console.log( ml.trim('ff fff') );
// ff fff

// only import functions
import * as mlFunc from 'generic-functions.mlai/functions';
console.log( mlFunc.trim('ff fff') );
// ff fff

// only import properties
import { mlProp } from 'generic-functions.mlai/props';

// only import `trim` from the various functions
const { trim } = require('generic-functions.mlai/functions')
console.log( trim('ff fff') );
// ff fff

// only import the `trim` from the module
const { trim: trim2 } = require('generic-functions.mlai')
console.log( trim2('ff fff') );
// ff fff
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

