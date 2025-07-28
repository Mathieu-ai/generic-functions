// Test TypeScript imports
import { hash, purify, REGEX } from './dist/index.mjs';

console.log('Testing TypeScript imports:');
console.log('hash("test"):', hash("test"));
console.log('purify("café"):', purify("café"));
console.log('REGEX.email:', REGEX.email);
