# generic-functions

[![npm version][npm-badge]][npm-url] [![Open issues][issues-badge]][issues-url] [![TypeScript][typescript-badge]][typescript-url]

🚩 Have some useful props & functions

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

## Example

```js
import { mlFn } from 'generic-functions.mlai';

const obj = {
    id: 1,
    name: 'John',
    lastName: 'Doe',
    coor: {
        lat: 23.56,
        long: 784.542
    },
    family: {
        parents: [
            { name: 'Pierre', lastName: 'Doe', role: 'father' },
            { name: 'Blanche', lastName: 'Doe', role: 'mother' }
        ],
        broAndSis: [
            { name: 'Jean', lastName: 'Doe', role: 'brother' },
            { name: 'Clementine', lastName: 'Doe', role: 'sister' }
        ]
    },
    moneyPerTrim: [1500, 1521, 1521]
};

mlFn.flat(obj, ['name', 'lastName', 'lat', 'long']);
// 'John, Doe, 23.56, 784.542'

mlFn.flat(obj, ['*']);
// 'John, Doe, 23.56, 784.542, Pierre, Blanche, Jean, Clementine, Doe, 1500, 1521, 1521'
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
