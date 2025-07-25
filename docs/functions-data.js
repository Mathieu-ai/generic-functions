// Auto-generated documentation data
// Generated on 2025-07-24T23:44:58.189Z
// Package: generic-functions.mlai v0.9.7
// Repository: https://github.com/Mathieu-ai/generic-functions.git
// License: MIT
// Author: Mathieu-ai

const functionsData = [
  {
    "name": "checkLength",
    "category": "array",
    "description": "Check if array length is less than size, return array or fallback",
    "syntax": "checkLength(first: T[], second: string, size: number): T[] | string",
    "params": [
      {
        "name": "first",
        "type": "T[]",
        "description": "The array to check",
        "optional": false
      },
      {
        "name": "second",
        "type": "string",
        "description": "Fallback value",
        "optional": false
      },
      {
        "name": "size",
        "type": "number",
        "description": "Size threshold",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The array or fallback based on size"
    },
    "example": "checkLength()",
    "since": "0.8.0"
  },
  {
    "name": "chunk",
    "category": "array",
    "description": "Creates an array of elements split into groups the length of size",
    "syntax": "chunk(array: T[], size?: number): T[][]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to process",
        "optional": false
      },
      {
        "name": "size",
        "type": "number",
        "description": "=1] - The length of each chunk",
        "optional": true
      }
    ],
    "returns": {
      "type": "T[][]",
      "description": "Returns the new array of chunks"
    },
    "example": "chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]\nchunk([1, 2, 3, 4, 5], 3); // [[1, 2, 3], [4, 5]]",
    "since": "0.9.0"
  },
  {
    "name": "compact",
    "category": "array",
    "description": "Creates an array with all falsy values removed",
    "syntax": "compact(array: (T | null | undefined | false | 0 | \"\")[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "(T | null | undefined | false | 0 | \"\")[]",
        "description": "The array to compact",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of filtered values"
    },
    "example": "compact([0, 1, false, 2, '', 3]); // [1, 2, 3]",
    "since": "0.9.0"
  },
  {
    "name": "concat",
    "category": "array",
    "description": "Creates a new array concatenating array with any additional arrays and/or values",
    "syntax": "concat(array: T[], values: (T | T[])[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to concatenate",
        "optional": false
      },
      {
        "name": "values",
        "type": "(T | T[])[]",
        "description": "The values to concatenate",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new concatenated array"
    },
    "example": "concat([1], 2, [3], [[4]]); // [1, 2, 3, [4]]",
    "since": "0.9.0"
  },
  {
    "name": "difference",
    "category": "array",
    "description": "Creates an array of array values not included in the other given arrays",
    "syntax": "difference(array: T[], values: T[][]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[][]",
        "description": "The values to exclude",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of filtered values"
    },
    "example": "difference([2, 1], [2, 3]); // [1]",
    "since": "0.9.0"
  },
  {
    "name": "differenceBy",
    "category": "array",
    "description": "Like difference except that it accepts iteratee which is invoked for each element",
    "syntax": "differenceBy(array: T[], values: T[], iteratee: (value: T) => any): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[]",
        "description": "The values to exclude",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => any",
        "description": "The iteratee invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of filtered values"
    },
    "example": "differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]",
    "since": "0.9.0"
  },
  {
    "name": "differenceWith",
    "category": "array",
    "description": "Like difference except that it accepts comparator which is invoked to compare elements",
    "syntax": "differenceWith(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[]",
        "description": "The values to exclude",
        "optional": false
      },
      {
        "name": "comparator",
        "type": "(a: T, b: T) => boolean",
        "description": "The comparator invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of filtered values"
    },
    "example": "differenceWith([{ 'x': 1 }, { 'x': 2 }], [{ 'x': 1 }], (a, b) => a.x === b.x); // [{ 'x': 2 }]",
    "since": "0.9.0"
  },
  {
    "name": "drop",
    "category": "array",
    "description": "Creates a slice of array with n elements dropped from the beginning",
    "syntax": "drop(array: T[], n?: number): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      },
      {
        "name": "n",
        "type": "number",
        "description": "=1] - The number of elements to drop",
        "optional": true
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "drop([1, 2, 3]); // [2, 3]\ndrop([1, 2, 3], 2); // [3]",
    "since": "0.9.0"
  },
  {
    "name": "dropRight",
    "category": "array",
    "description": "Creates a slice of array with n elements dropped from the end",
    "syntax": "dropRight(array: T[], n?: number): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      },
      {
        "name": "n",
        "type": "number",
        "description": "=1] - The number of elements to drop",
        "optional": true
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "dropRight([1, 2, 3]); // [1, 2]\ndropRight([1, 2, 3], 2); // [1]",
    "since": "0.9.0"
  },
  {
    "name": "dropRightWhile",
    "category": "array",
    "description": "Creates a slice of array excluding elements dropped from the end",
    "syntax": "dropRightWhile(array: T[], predicate: (value: T) => boolean): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T) => boolean",
        "description": "The function invoked per iteration",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "dropRightWhile([1, 2, 3, 4], n => n > 2); // [1, 2]",
    "since": "0.9.0"
  },
  {
    "name": "dropWhile",
    "category": "array",
    "description": "Creates a slice of array excluding elements dropped from the beginning",
    "syntax": "dropWhile(array: T[], predicate: (value: T) => boolean): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T) => boolean",
        "description": "The function invoked per iteration",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "dropWhile([1, 2, 3, 4], n => n < 3); // [3, 4]",
    "since": "0.9.0"
  },
  {
    "name": "fill",
    "category": "array",
    "description": "Fills elements of array with value from start up to, but not including, end",
    "syntax": "fill(array: T[], value: T, start?: number, end?: number): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to fill",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to fill array with",
        "optional": false
      },
      {
        "name": "start",
        "type": "number",
        "description": "=0] - The start position",
        "optional": true
      },
      {
        "name": "end",
        "type": "number",
        "description": "=array.length] - The end position",
        "optional": true
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the filled array"
    },
    "example": "fill([1, 2, 3], 'a'); // ['a', 'a', 'a']\nfill([4, 6, 8, 10], '*', 1, 3); // [4, '*', '*', 10]",
    "since": "0.9.0"
  },
  {
    "name": "filterData",
    "category": "array",
    "description": "Filters an array of objects based on provided parameters",
    "syntax": "filterData(arr: T[], param: i_func_filterData): T[]",
    "params": [
      {
        "name": "arr",
        "type": "T[]",
        "description": "The array of objects to be filtered",
        "optional": false
      },
      {
        "name": "param",
        "type": "i_func_filterData",
        "description": "The filtering parameters",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the filtered array containing objects of type T"
    },
    "example": "const data = [\n  { field_search: 'John Doe', state: [{ state: 'active' }], ddeb: '2023-01-15' },\n  { field_search: 'Jane Smith', state: [{ state: 'inactive' }], ddeb: '2024-02-20' }\n];\nfilterData(data, {\n  sW: 'John',\n  tbRS: [],\n  selections: [{ selection: ['active'], property: 'state' }]\n});\n// [{ field_search: 'John Doe', state: [{ state: 'active' }], ddeb: '2023-01-15' }]",
    "since": "0.9.7"
  },
  {
    "name": "findIndex",
    "category": "array",
    "description": "Returns the first index at which a given element can be found",
    "syntax": "findIndex(array: T[], predicate: (value: T, index: number, array: T[]) => boolean, fromIndex?: number): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T, index: number, array: T[]) => boolean",
        "description": "The function invoked per iteration",
        "optional": false
      },
      {
        "name": "fromIndex",
        "type": "number",
        "description": "=0] - The index to search from",
        "optional": true
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index of the found element, else -1"
    },
    "example": "findIndex([1, 2, 3, 4], n => n % 2 === 0); // 1",
    "since": "0.9.0"
  },
  {
    "name": "findLastIndex",
    "category": "array",
    "description": "Like findIndex except that it iterates over elements from right to left",
    "syntax": "findLastIndex(array: T[], predicate: (value: T, index: number, array: T[]) => boolean, fromIndex?: number): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T, index: number, array: T[]) => boolean",
        "description": "The function invoked per iteration",
        "optional": false
      },
      {
        "name": "fromIndex",
        "type": "number",
        "description": "=array.length-1] - The index to search from",
        "optional": true
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index of the found element, else -1"
    },
    "example": "findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2",
    "since": "0.9.0"
  },
  {
    "name": "flatten",
    "category": "array",
    "description": "Flattens array a single level deep",
    "syntax": "flatten(array: (T | T[])[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "(T | T[])[]",
        "description": "The array to flatten",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new flattened array"
    },
    "example": "flatten([1, [2, [3, [4]], 5]]); // [1, 2, [3, [4]], 5]",
    "since": "0.9.0"
  },
  {
    "name": "flattenDeep",
    "category": "array",
    "description": "Recursively flattens array",
    "syntax": "flattenDeep(array: any[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "any[]",
        "description": "The array to flatten",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new flattened array"
    },
    "example": "flattenDeep([1, [2, [3, [4]], 5]]); // [1, 2, 3, 4, 5]",
    "since": "0.9.0"
  },
  {
    "name": "flattenDepth",
    "category": "array",
    "description": "Recursively flatten array up to depth times",
    "syntax": "flattenDepth(array: any[], depth?: number): T[]",
    "params": [
      {
        "name": "array",
        "type": "any[]",
        "description": "The array to flatten",
        "optional": false
      },
      {
        "name": "depth",
        "type": "number",
        "description": "=1] - The maximum recursion depth",
        "optional": true
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new flattened array"
    },
    "example": "flattenDepth([1, [2, [3, [4]], 5]], 1); // [1, 2, [3, [4]], 5]\nflattenDepth([1, [2, [3, [4]], 5]], 2); // [1, 2, 3, [4], 5]",
    "since": "0.9.0"
  },
  {
    "name": "getLastElement",
    "category": "array",
    "description": "Get the last element(s) from an array or object",
    "syntax": "getLastElement(data: T[] | Record<string, any>): T[] | Record<string, any>",
    "params": [
      {
        "name": "data",
        "type": "T[] | Record<string, any>",
        "description": "The data to get last element from",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The last element(s)"
    },
    "example": "getLastElement()",
    "since": "0.8.0"
  },
  {
    "name": "getUnique",
    "category": "array",
    "description": "Get unique values from an array",
    "syntax": "getUnique(data: T[], field?: string): T[]",
    "params": [
      {
        "name": "data",
        "type": "T[]",
        "description": "The array to filter",
        "optional": false
      },
      {
        "name": "field",
        "type": "string",
        "description": "Optional field to use for uniqueness in objects",
        "optional": true
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns array of unique values"
    },
    "example": "getUnique([1, 2, 2, 3]); // [1, 2, 3]\ngetUnique([{id: 1}, {id: 2}, {id: 1}], 'id'); // [{id: 1}, {id: 2}]",
    "since": "0.8.0"
  },
  {
    "name": "head",
    "category": "array",
    "description": "Gets the first element of array",
    "syntax": "head(array: T[]): T | undefined",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "T | undefined",
      "description": "Returns the first element of array"
    },
    "example": "head([1, 2, 3]); // 1\nhead([]); // undefined",
    "since": "0.9.7"
  },
  {
    "name": "indexOf",
    "category": "array",
    "description": "Gets the index at which the first occurrence of value is found in array",
    "syntax": "indexOf(array: T[], value: T, fromIndex?: number): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to search for",
        "optional": false
      },
      {
        "name": "fromIndex",
        "type": "number",
        "description": "=0] - The index to search from",
        "optional": true
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index of the matched value, else -1"
    },
    "example": "indexOf([1, 2, 1, 2], 2); // 1\nindexOf([1, 2, 1, 2], 2, 2); // 3",
    "since": "0.9.0"
  },
  {
    "name": "initial",
    "category": "array",
    "description": "Gets all but the last element of array",
    "syntax": "initial(array: T[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "initial([1, 2, 3]); // [1, 2]",
    "since": "0.9.7"
  },
  {
    "name": "intersection",
    "category": "array",
    "description": "Creates an array of unique values that are included in all given arrays",
    "syntax": "intersection(arrays: T[][]): T[]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to inspect",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of intersecting values"
    },
    "example": "intersection([2, 1], [2, 3]); // [2]",
    "since": "0.9.0"
  },
  {
    "name": "intersectionBy",
    "category": "array",
    "description": "Like intersection except that it accepts iteratee",
    "syntax": "intersectionBy(arrays: T[][], iteratee: (value: T) => any): T[]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to inspect",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => any",
        "description": "The iteratee invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of intersecting values"
    },
    "example": "intersectionBy([[2.1, 1.2], [2.3, 3.4]], Math.floor); // [2.1]",
    "since": "0.9.0"
  },
  {
    "name": "intersectionWith",
    "category": "array",
    "description": "Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons",
    "syntax": "intersectionWith(arrays: T[][], comparator: (a: T, b: T) => boolean): T[]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to inspect",
        "optional": false
      },
      {
        "name": "comparator",
        "type": "(a: T, b: T) => boolean",
        "description": "The comparator invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of intersecting values"
    },
    "example": "intersectionWith([[{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }]], (a, b) => a.x === b.x); // [{ 'x': 1 }]",
    "since": "0.9.0"
  },
  {
    "name": "join",
    "category": "array",
    "description": "Joins a list of elements using a separator",
    "syntax": "join(array: T[], separator?: string): string",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to convert",
        "optional": false
      },
      {
        "name": "separator",
        "type": "string",
        "description": "=','] - The element separator",
        "optional": true
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the joined string"
    },
    "example": "join(['a', 'b', 'c'], '~'); // 'a~b~c'",
    "since": "0.9.0"
  },
  {
    "name": "last",
    "category": "array",
    "description": "Gets the last element of array",
    "syntax": "last(array: T[]): T | undefined",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "T | undefined",
      "description": "Returns the last element of array"
    },
    "example": "last([1, 2, 3]); // 3\nlast([]); // undefined",
    "since": "0.9.7"
  },
  {
    "name": "lastIndexOf",
    "category": "array",
    "description": "Gets the index at which the last occurrence of value is found in array",
    "syntax": "lastIndexOf(array: T[], value: T, fromIndex?: number): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to search for",
        "optional": false
      },
      {
        "name": "fromIndex",
        "type": "number",
        "description": "=array.length-1] - The index to search from",
        "optional": true
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index of the matched value, else -1"
    },
    "example": "lastIndexOf([1, 2, 1, 2], 2); // 3\nlastIndexOf([1, 2, 1, 2], 2, 2); // 1",
    "since": "0.9.7"
  },
  {
    "name": "nth",
    "category": "array",
    "description": "Gets the element at index n of array",
    "syntax": "nth(array: T[], n?: number): T | undefined",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      },
      {
        "name": "n",
        "type": "number",
        "description": "=0] - The index of the element to return",
        "optional": true
      }
    ],
    "returns": {
      "type": "T | undefined",
      "description": "Returns the nth element of array"
    },
    "example": "nth(['a', 'b', 'c', 'd'], 1); // 'b'\nnth(['a', 'b', 'c', 'd'], -2); // 'c'",
    "since": "0.9.7"
  },
  {
    "name": "pull",
    "category": "array",
    "description": "Removes all given values from array",
    "syntax": "pull(array: T[], values: T[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to modify",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[]",
        "description": "The values to remove",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array with values removed"
    },
    "example": "pull([1, 2, 3, 1, 2, 3], 2, 3); // [1, 1]",
    "since": "0.9.0"
  },
  {
    "name": "pullAll",
    "category": "array",
    "description": "Creates an array of elements corresponding to the given keys",
    "syntax": "pullAll(array: T[], values: T[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to modify",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[]",
        "description": "The values to remove",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array with values removed"
    },
    "example": "pullAll([1, 2, 3, 1, 2, 3], [2, 3]); // [1, 1]",
    "since": "0.9.7"
  },
  {
    "name": "pullAllBy",
    "category": "array",
    "description": "Like pullAll except that it accepts iteratee which is invoked per element",
    "syntax": "pullAllBy(array: T[], values: T[], iteratee: (value: T) => any): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to modify",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[]",
        "description": "The values to remove",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => any",
        "description": "The iteratee invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array with values removed"
    },
    "example": "pullAllBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }], [{ 'x': 1 }, { 'x': 3 }], 'x'); // [{ 'x': 2 }]",
    "since": "0.9.7"
  },
  {
    "name": "pullAllWith",
    "category": "array",
    "description": "Like pullAll except that it accepts comparator which is invoked to compare elements",
    "syntax": "pullAllWith(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to modify",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[]",
        "description": "The values to remove",
        "optional": false
      },
      {
        "name": "comparator",
        "type": "(a: T, b: T) => boolean",
        "description": "The comparator invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array with values removed"
    },
    "example": "pullAllWith([{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }], [{ 'x': 3, 'y': 4 }], (a, b) => a.x === b.x); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]",
    "since": "0.9.7"
  },
  {
    "name": "pullAt",
    "category": "array",
    "description": "Removes elements from array corresponding to indexes",
    "syntax": "pullAt(array: T[], indexes: number[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to modify",
        "optional": false
      },
      {
        "name": "indexes",
        "type": "number[]",
        "description": "The indexes of elements to remove",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array with elements removed"
    },
    "example": "pullAt(['a', 'b', 'c', 'd'], 1, 3); // ['a', 'c']",
    "since": "0.9.0"
  },
  {
    "name": "randomString",
    "category": "array",
    "description": "Get a random string from an array",
    "syntax": "randomString(arr: string[]): string",
    "params": [
      {
        "name": "arr",
        "type": "string[]",
        "description": "Array of strings",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Random string from the array"
    },
    "example": "randomString()",
    "since": "0.8.0"
  },
  {
    "name": "remove",
    "category": "array",
    "description": "Removes all elements from array that predicate returns truthy for",
    "syntax": "remove(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to modify",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T, index: number, array: T[]) => boolean",
        "description": "The function invoked per iteration",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns an array of removed elements"
    },
    "example": "const array = [1, 2, 3, 4];\nconst evens = remove(array, n => n % 2 === 0); // evens: [2, 4], array: [1, 3]",
    "since": "0.9.0"
  },
  {
    "name": "reverse",
    "category": "array",
    "description": "Reverses array so that the first element becomes the last",
    "syntax": "reverse(array: T[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to reverse",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new reversed array"
    },
    "example": "reverse([1, 2, 3]); // [3, 2, 1]",
    "since": "0.9.0"
  },
  {
    "name": "slice",
    "category": "array",
    "description": "Creates a slice of array from start up to, but not including, end",
    "syntax": "slice(array: T[], start?: number, end?: number): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to slice",
        "optional": false
      },
      {
        "name": "start",
        "type": "number",
        "description": "=0] - The start position",
        "optional": true
      },
      {
        "name": "end",
        "type": "number",
        "description": "=array.length] - The end position",
        "optional": true
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "slice([1, 2, 3, 4], 2); // [3, 4]\nslice([1, 2, 3, 4], 1, 3); // [2, 3]",
    "since": "0.9.0"
  },
  {
    "name": "sort",
    "category": "array",
    "description": "Sort an array of objects by a property",
    "syntax": "sort(options: SortOptions<T>): T[]",
    "params": [
      {
        "name": "options",
        "type": "SortOptions<T>",
        "description": "The sort options",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the sorted array"
    },
    "example": "sort({ arr: [{name: 'Bob'}, {name: 'Alice'}], prop: 'name' })\n// [{name: 'Alice'}, {name: 'Bob'}]",
    "since": "0.8.0"
  },
  {
    "name": "sortedIndex",
    "category": "array",
    "description": "Creates an array of elements sorted in ascending order",
    "syntax": "sortedIndex(array: T[], value: T): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The sorted array to inspect",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to evaluate",
        "optional": false
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index at which value should be inserted into array"
    },
    "example": "sortedIndex([30, 50], 40); // 1",
    "since": "0.9.0"
  },
  {
    "name": "sortedIndexBy",
    "category": "array",
    "description": "Like sortedIndex except that it accepts iteratee",
    "syntax": "sortedIndexBy(array: T[], value: T, iteratee: (value: T) => any): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The sorted array to inspect",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to evaluate",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => any",
        "description": "The iteratee invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index at which value should be inserted into array"
    },
    "example": "sortedIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, o => o.x); // 0",
    "since": "0.9.0"
  },
  {
    "name": "sortedIndexOf",
    "category": "array",
    "description": "Uses a binary search to find the index of the value in the sorted array",
    "syntax": "sortedIndexOf(array: T[], value: T): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The sorted array to inspect",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to search for",
        "optional": false
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index of the matched value, else -1"
    },
    "example": "sortedIndexOf([4, 5, 5, 5, 6], 5); // 1",
    "since": "0.9.0"
  },
  {
    "name": "sortedLastIndex",
    "category": "array",
    "description": "Uses a binary search to determine the highest index at which value should be inserted",
    "syntax": "sortedLastIndex(array: T[], value: T): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The sorted array to inspect",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to evaluate",
        "optional": false
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index at which value should be inserted into array"
    },
    "example": "sortedLastIndex([4, 5, 5, 5, 6], 5); // 4",
    "since": "0.9.0"
  },
  {
    "name": "sortedLastIndexBy",
    "category": "array",
    "description": "Like sortedLastIndex except that it accepts iteratee",
    "syntax": "sortedLastIndexBy(array: T[], value: T, iteratee: (value: T) => any): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The sorted array to inspect",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to evaluate",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => any",
        "description": "The iteratee invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index at which value should be inserted into array"
    },
    "example": "sortedLastIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, o => o.x); // 1",
    "since": "0.9.0"
  },
  {
    "name": "sortedLastIndexOf",
    "category": "array",
    "description": "Uses a binary search to find the last index of the value in the sorted array",
    "syntax": "sortedLastIndexOf(array: T[], value: T): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The sorted array to inspect",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to search for",
        "optional": false
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the index of the matched value, else -1"
    },
    "example": "sortedLastIndexOf([4, 5, 5, 5, 6], 5); // 3",
    "since": "0.9.0"
  },
  {
    "name": "tail",
    "category": "array",
    "description": "Gets all but the first element of array",
    "syntax": "tail(array: T[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "tail([1, 2, 3]); // [2, 3]",
    "since": "0.9.0"
  },
  {
    "name": "take",
    "category": "array",
    "description": "Creates a slice of array with n elements taken from the beginning",
    "syntax": "take(array: T[], n?: number): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      },
      {
        "name": "n",
        "type": "number",
        "description": "=1] - The number of elements to take",
        "optional": true
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "take([1, 2, 3]); // [1]\ntake([1, 2, 3], 2); // [1, 2]",
    "since": "0.9.0"
  },
  {
    "name": "takeRight",
    "category": "array",
    "description": "Creates a slice of array with n elements taken from the end",
    "syntax": "takeRight(array: T[], n?: number): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      },
      {
        "name": "n",
        "type": "number",
        "description": "=1] - The number of elements to take",
        "optional": true
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "takeRight([1, 2, 3]); // [3]\ntakeRight([1, 2, 3], 2); // [2, 3]",
    "since": "0.9.0"
  },
  {
    "name": "takeRightWhile",
    "category": "array",
    "description": "Creates a slice of array with elements taken from the end",
    "syntax": "takeRightWhile(array: T[], predicate: (value: T) => boolean): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T) => boolean",
        "description": "The function invoked per iteration",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "takeRightWhile([1, 2, 3], n => n > 1); // [2, 3]",
    "since": "0.9.0"
  },
  {
    "name": "takeWhile",
    "category": "array",
    "description": "Creates a slice of array with elements taken from the beginning",
    "syntax": "takeWhile(array: T[], predicate: (value: T) => boolean): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to query",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T) => boolean",
        "description": "The function invoked per iteration",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the slice of array"
    },
    "example": "takeWhile([1, 2, 3], n => n < 3); // [1, 2]",
    "since": "0.9.0"
  },
  {
    "name": "union",
    "category": "array",
    "description": "Creates an array of unique values from all given arrays",
    "syntax": "union(arrays: T[][]): T[]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to inspect",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of combined values"
    },
    "example": "union([2], [1, 2]); // [2, 1]",
    "since": "0.9.0"
  },
  {
    "name": "unionBy",
    "category": "array",
    "description": "Like union except that it accepts iteratee",
    "syntax": "unionBy(arrays: T[][], iteratee: (value: T) => any): T[]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to inspect",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => any",
        "description": "The iteratee invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of combined values"
    },
    "example": "unionBy([[2.1], [1.2, 2.3]], Math.floor); // [2.1, 1.2]",
    "since": "0.9.0"
  },
  {
    "name": "unionWith",
    "category": "array",
    "description": "Creates an array of unique values from all given arrays using SameValueZero for equality comparisons",
    "syntax": "unionWith(arrays: T[][], comparator: (a: T, b: T) => boolean): T[]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to inspect",
        "optional": false
      },
      {
        "name": "comparator",
        "type": "(a: T, b: T) => boolean",
        "description": "The comparator invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of combined values"
    },
    "example": "unionWith([[{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }]], (a, b) => a.x === b.x); // [{ 'x': 1 }, { 'x': 2 }]",
    "since": "0.9.0"
  },
  {
    "name": "uniq",
    "category": "array",
    "description": "Creates a duplicate-free version of an array using SameValueZero for equality comparisons",
    "syntax": "uniq(array: T[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new duplicate free array"
    },
    "example": "uniq([2, 1, 2]); // [2, 1]",
    "since": "0.9.7"
  },
  {
    "name": "uniqBy",
    "category": "array",
    "description": "Like uniq except that it accepts iteratee which is invoked for each element",
    "syntax": "uniqBy(array: T[], iteratee: (value: T) => any): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => any",
        "description": "The iteratee invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new duplicate free array"
    },
    "example": "uniqBy([2.1, 1.2, 2.3], Math.floor); // [2.1, 1.2]",
    "since": "0.9.7"
  },
  {
    "name": "uniqWith",
    "category": "array",
    "description": "Like uniq except that it accepts comparator which is invoked to compare elements",
    "syntax": "uniqWith(array: T[], comparator: (a: T, b: T) => boolean): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "comparator",
        "type": "(a: T, b: T) => boolean",
        "description": "The comparator invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new duplicate free array"
    },
    "example": "uniqWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }], (a, b) => a.x === b.x); // [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]",
    "since": "0.9.7"
  },
  {
    "name": "unzip",
    "category": "array",
    "description": "The opposite of zip; creates an array of arrays",
    "syntax": "unzip(array: T[][]): T[][]",
    "params": [
      {
        "name": "array",
        "type": "T[][]",
        "description": "The array of grouped elements to process",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[][]",
      "description": "Returns the new array of regrouped elements"
    },
    "example": "unzip([['a', 1, true], ['b', 2, false]]); // [['a', 'b'], [1, 2], [true, false]]",
    "since": "0.9.0"
  },
  {
    "name": "unzipWith",
    "category": "array",
    "description": "Creates an array excluding all given values using SameValueZero for equality comparisons",
    "syntax": "unzipWith(array: T[][], iteratee: (...values: T[]) => R): R[]",
    "params": [
      {
        "name": "array",
        "type": "T[][]",
        "description": "The array of grouped elements to process",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(...values: T[]) => R",
        "description": "The function to combine regrouped values",
        "optional": false
      }
    ],
    "returns": {
      "type": "R[]",
      "description": "Returns the new array of regrouped elements"
    },
    "example": "unzipWith([['1', '2'], ['3', '4'], ['5', '6']], (...group) => group.join('')); // ['135', '246']",
    "since": "0.9.7"
  },
  {
    "name": "without",
    "category": "array",
    "description": "Creates an array of unique values from the first array not included in the other given arrays",
    "syntax": "without(array: T[], values: T[]): T[]",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to inspect",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[]",
        "description": "The values to exclude",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of filtered values"
    },
    "example": "without([2, 1, 2, 3], 1, 2); // [3]",
    "since": "0.9.0"
  },
  {
    "name": "xor",
    "category": "array",
    "description": "Creates an array of unique values that is the symmetric difference of the given arrays",
    "syntax": "xor(arrays: T[][]): T[]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to inspect",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of filtered values"
    },
    "example": "xor([2, 1], [2, 3]); // [1, 3]",
    "since": "0.9.0"
  },
  {
    "name": "xorBy",
    "category": "array",
    "description": "Like xor except that it accepts iteratee which is invoked for each element",
    "syntax": "xorBy(arrays: T[][], iteratee: (value: T) => any): T[]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to inspect",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => any",
        "description": "The iteratee invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of filtered values"
    },
    "example": "xorBy([[2.1, 1.2], [2.3, 3.4]], Math.floor); // [1.2, 3.4]",
    "since": "0.9.0"
  },
  {
    "name": "xorWith",
    "category": "array",
    "description": "Like xor except that it accepts comparator which is invoked to compare elements",
    "syntax": "xorWith(arrays: T[][], comparator: (a: T, b: T) => boolean): T[]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to inspect",
        "optional": false
      },
      {
        "name": "comparator",
        "type": "(a: T, b: T) => boolean",
        "description": "The comparator invoked per element",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the new array of filtered values"
    },
    "example": "xorWith([[{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }]], (a, b) => a.x === b.x); // [{ 'x': 2 }]",
    "since": "0.9.0"
  },
  {
    "name": "zip",
    "category": "array",
    "description": "Creates an array that is the zip of arrays",
    "syntax": "zip(arrays: T[][]): T[][]",
    "params": [
      {
        "name": "arrays",
        "type": "T[][]",
        "description": "The arrays to process",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[][]",
      "description": "Returns the new array of grouped elements"
    },
    "example": "zip(['a', 'b'], [1, 2], [true, false]); // [['a', 1, true], ['b', 2, false]]",
    "since": "0.9.0"
  },
  {
    "name": "zipObject",
    "category": "array",
    "description": "Creates an object composed from arrays of keys and values",
    "syntax": "zipObject(keys: string[], values: T[]): Record<string, T>",
    "params": [
      {
        "name": "keys",
        "type": "string[]",
        "description": "The property names",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[]",
        "description": "The property values",
        "optional": false
      }
    ],
    "returns": {
      "type": "Record<string, T>",
      "description": "Returns the new object"
    },
    "example": "zipObject(['a', 'b'], [1, 2]); // { 'a': 1, 'b': 2 }",
    "since": "0.9.0"
  },
  {
    "name": "zipObjectDeep",
    "category": "array",
    "description": "Like zipObject except that it supports property paths",
    "syntax": "zipObjectDeep(paths: string[], values: T[]): any",
    "params": [
      {
        "name": "paths",
        "type": "string[]",
        "description": "The property paths",
        "optional": false
      },
      {
        "name": "values",
        "type": "T[]",
        "description": "The property values",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new object"
    },
    "example": "zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]); // { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }",
    "since": "0.9.7"
  },
  {
    "name": "zipWith",
    "category": "array",
    "description": "Creates an array of grouped elements",
    "syntax": "zipWith(arrays: [...T[][], ((...values: T[]) => R)]): R[]",
    "params": [
      {
        "name": "arrays",
        "type": "[...T[][], ((...values: T[]) => R)]",
        "description": "The arrays to process and the function to combine grouped values",
        "optional": false
      }
    ],
    "returns": {
      "type": "R[]",
      "description": "Returns the new array of grouped elements"
    },
    "example": "zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c); // [111, 222]",
    "since": "0.9.0"
  },
  {
    "name": "addTime",
    "category": "date",
    "description": "Add a specified amount of time to a date",
    "syntax": "addTime(date: Date | string, amount: number, unit: TimeUnit): Date",
    "params": [
      {
        "name": "date",
        "type": "Date | string",
        "description": "The base date to add time to (Date object or date string)",
        "optional": false
      },
      {
        "name": "amount",
        "type": "number",
        "description": "The amount of time to add (can be negative to subtract)",
        "optional": false
      },
      {
        "name": "unit",
        "type": "TimeUnit",
        "description": "The time unit for the amount (millisecond, second, minute, hour, day, month, year)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A new Date object with the added time"
    },
    "example": "addTime(new Date('2023-12-25'), 5, 'day') // 2023-12-30\naddTime('2023-12-25T10:00:00', 2, 'hour') // 2023-12-25T12:00:00\naddTime(new Date(), -1, 'month') // One month ago\naddTime('2023-01-31', 1, 'month') // 2023-02-28 (handles month overflow)",
    "since": "0.9.7"
  },
  {
    "name": "formatDate",
    "category": "date",
    "description": "Format a date to string using a custom format pattern",
    "syntax": "formatDate(date: string | Date, format: string): string",
    "params": [
      {
        "name": "date",
        "type": "string | Date",
        "description": "The date to format (Date object or date string)",
        "optional": false
      },
      {
        "name": "format",
        "type": "string",
        "description": "The format string pattern (supports YYYY, MM, DD, HH, mm, ss)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Formatted date string, or empty string if date is invalid"
    },
    "example": "formatDate(new Date(), 'DD/MM/YYYY') // '25/12/2023'\nformatDate('2023-12-25', 'HH:mm:ss') // '00:00:00'\nformatDate('invalid', 'DD/MM/YYYY') // ''",
    "since": "0.8.0"
  },
  {
    "name": "getFormat",
    "category": "date",
    "description": "Get the date/time format string for a specific country and format type",
    "syntax": "getFormat(format: FormatType, iso: CodeISO): string | null",
    "params": [
      {
        "name": "format",
        "type": "FormatType",
        "description": "The type of format to retrieve (DATE, TIME, or DATE_TIME)",
        "optional": false
      },
      {
        "name": "iso",
        "type": "CodeISO",
        "description": "The ISO country code",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The format string for the specified country and type, or null if not found"
    },
    "example": "getFormat('DATE', 'US') // 'MM/DD/YYYY'\ngetFormat('DATE', 'FR') // 'DD/MM/YYYY'\ngetFormat('TIME', 'US') // 'HH:mm:ss'\ngetFormat('DATE_TIME', 'DE') // 'DD.MM.YYYY, HH:mm:ss'",
    "since": "0.9.7"
  },
  {
    "name": "isBetween",
    "category": "date",
    "description": "Check if a date falls between two other dates (inclusive)",
    "syntax": "isBetween(date: Date | string, start: Date | string, end: Date | string): boolean",
    "params": [
      {
        "name": "date",
        "type": "Date | string",
        "description": "The date to check (Date object or date string)",
        "optional": false
      },
      {
        "name": "start",
        "type": "Date | string",
        "description": "The start date of the range (Date object or date string)",
        "optional": false
      },
      {
        "name": "end",
        "type": "Date | string",
        "description": "The end date of the range (Date object or date string)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if the date is between start and end dates (inclusive)"
    },
    "example": "isBetween('2023-12-25', '2023-12-01', '2023-12-31') // true\nisBetween(new Date('2023-11-30'), '2023-12-01', '2023-12-31') // false\nisBetween('2023-12-01', '2023-12-01', '2023-12-31') // true (inclusive)",
    "since": "0.9.7"
  },
  {
    "name": "isDate",
    "category": "date",
    "description": "Check if a value is a valid Date object",
    "syntax": "isDate(date: any): boolean",
    "params": [
      {
        "name": "date",
        "type": "any",
        "description": "The value to check for date validity",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if the value is a valid Date object, false otherwise"
    },
    "example": "isDate(new Date()) // true\nisDate('2023-12-25') // false (string, not Date object)\nisDate(new Date('invalid')) // false (invalid date)",
    "since": "0.9.7"
  },
  {
    "name": "isDateDifferent",
    "category": "date",
    "description": "Check if a given number differs from the current time's corresponding unit",
    "syntax": "isDateDifferent(nb: number, unit: TimeUnit): boolean",
    "params": [
      {
        "name": "nb",
        "type": "number",
        "description": "The number to compare against the current time unit",
        "optional": false
      },
      {
        "name": "unit",
        "type": "TimeUnit",
        "description": "The time unit to compare (hour, minute, second, day, month, year)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if the number differs from the current time's unit value"
    },
    "example": "// If current time is 14:30:45 on 25th December 2023\nisDateDifferent(15, 'hour') // true (current hour is 14)\nisDateDifferent(30, 'minute') // false (current minute is 30)\nisDateDifferent(2023, 'year') // false (current year is 2023)",
    "since": "0.9.7"
  },
  {
    "name": "now",
    "category": "date",
    "description": "Get the current date and time, optionally formatted",
    "syntax": "now(format?: string): string | Date",
    "params": [
      {
        "name": "format",
        "type": "string",
        "description": "Optional format string to apply to the current date",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "Current date as Date object, or formatted string if format is provided"
    },
    "example": "now() // Date object for current time\nnow('DD/MM/YYYY HH:mm') // '25/12/2023 14:30'",
    "since": "0.9.7"
  },
  {
    "name": "secondsToTomorrow",
    "category": "date",
    "description": "Calculate the number of seconds remaining until tomorrow (midnight)",
    "syntax": "secondsToTomorrow(): number",
    "params": [],
    "returns": {
      "type": "any",
      "description": "Number of seconds until the next day begins"
    },
    "example": "// If current time is 23:30:00\nsecondsToTomorrow() // 1800 (30 minutes = 1800 seconds)",
    "since": "0.9.7"
  },
  {
    "name": "ary",
    "category": "function",
    "description": "Creates a function that accepts up to n arguments, ignoring any additional arguments",
    "syntax": "ary(func: T, n?: number): (...args: any[]) => ReturnType<T>",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to cap arguments for",
        "optional": false
      },
      {
        "name": "n",
        "type": "number",
        "description": "The arity cap (defaults to func.length)",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new capped function"
    },
    "example": "['6', '8', '10'].map(ary(parseInt, 1)); // => [6, 8, 10]",
    "since": "0.9.0"
  },
  {
    "name": "bind",
    "category": "function",
    "description": "Creates a function that invokes func with the this binding of thisArg and arguments of the created function",
    "syntax": "bind(func: T, thisArg: any, partials: any[]): T",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to bind",
        "optional": false
      },
      {
        "name": "thisArg",
        "type": "any",
        "description": "The this binding of func",
        "optional": false
      },
      {
        "name": "partials",
        "type": "any[]",
        "description": "The arguments to be partially applied",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new bound function"
    },
    "example": "function greet(greeting, punctuation) {\n  return greeting + ' ' + this.user + punctuation;\n}\nconst object = { 'user': 'fred' };\nconst bound = bind(greet, object, 'hi');\nbound('!'); // => 'hi fred!'",
    "since": "0.9.0"
  },
  {
    "name": "bindKey",
    "category": "function",
    "description": "Creates a function that invokes the method at object[key] with arguments",
    "syntax": "bindKey(object: T, key: keyof T, partials: any[]): (...args: any[]) => any",
    "params": [
      {
        "name": "object",
        "type": "T",
        "description": "The object to query",
        "optional": false
      },
      {
        "name": "key",
        "type": "keyof T",
        "description": "The key of the method to bind",
        "optional": false
      },
      {
        "name": "partials",
        "type": "any[]",
        "description": "The arguments to be partially applied",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new bound function"
    },
    "example": "const object = {\n  'user': 'fred',\n  'greet': function(greeting, punctuation) {\n    return greeting + ' ' + this.user + punctuation;\n  }\n};\nconst bound = bindKey(object, 'greet', 'hi');\nbound('!'); // => 'hi fred!'",
    "since": "0.9.0"
  },
  {
    "name": "curry",
    "category": "function",
    "description": "Creates a function that accepts arguments of func and either invokes func returning its result, if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments",
    "syntax": "curry(func: T, arity?: number): any",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to curry",
        "optional": false
      },
      {
        "name": "arity",
        "type": "number",
        "description": "The arity of func (defaults to func.length)",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new curried function"
    },
    "example": "const abc = function(a, b, c) {\n  return [a, b, c];\n};\nconst curried = curry(abc);\ncurried(1)(2)(3); // => [1, 2, 3]\ncurried(1, 2)(3); // => [1, 2, 3]\ncurried(1, 2, 3); // => [1, 2, 3]",
    "since": "0.9.0"
  },
  {
    "name": "curryRight",
    "category": "function",
    "description": "This method is like curry except that arguments are applied to func in the manner of partialRight instead of partial",
    "syntax": "curryRight(func: T, arity?: number): any",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to curry",
        "optional": false
      },
      {
        "name": "arity",
        "type": "number",
        "description": "The arity of func (defaults to func.length)",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new curried function"
    },
    "example": "const abc = function(a, b, c) {\n  return [a, b, c];\n};\nconst curried = curryRight(abc);\ncurried(3)(2)(1); // => [1, 2, 3]\ncurried(2, 3)(1); // => [1, 2, 3]\ncurried(1, 2, 3); // => [1, 2, 3]",
    "since": "0.9.0"
  },
  {
    "name": "debounce",
    "category": "function",
    "description": "Creates a debounced function that delays invoking func until after wait milliseconds have elapsed",
    "syntax": "debounce(func: T, wait: number, options?: { leading?: boolean; trailing?: boolean; maxWait?: number }): T & { cancel (): void; flush (): ReturnType<T> | undefined; pending (): boolean }",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to debounce",
        "optional": false
      },
      {
        "name": "wait",
        "type": "number",
        "description": "The number of milliseconds to delay",
        "optional": false
      },
      {
        "name": "options",
        "type": "{ leading?: boolean; trailing?: boolean; maxWait?: number }",
        "description": "The options object",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new debounced function"
    },
    "example": "// Avoid costly calculations while the window size is in flux.\nconst debounced = debounce(calculateLayout, 150);\nwindow.addEventListener('resize', debounced);",
    "since": "0.9.0"
  },
  {
    "name": "flip",
    "category": "function",
    "description": "Creates a function that invokes func with arguments reversed",
    "syntax": "flip(func: T): (...args: Parameters<T>) => ReturnType<T>",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to flip arguments for",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new flipped function"
    },
    "example": "const flipped = flip(function(a, b, c) {\n  return [a, b, c];\n});\nflipped('a', 'b', 'c'); // => ['c', 'b', 'a']",
    "since": "0.9.0"
  },
  {
    "name": "memoize",
    "category": "function",
    "description": "Creates a function that memoizes the result of func",
    "syntax": "memoize(func: T, resolver?: (...args: Parameters<T>) => any): T",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to have its output memoized",
        "optional": false
      },
      {
        "name": "resolver",
        "type": "(...args: Parameters<T>) => any",
        "description": "The function to resolve the cache key (optional)",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new memoized function"
    },
    "example": "const object = { 'a': 1, 'b': 2 };\nconst other = { 'c': 3, 'd': 4 };\nconst values = memoize(function(obj) { return Object.values(obj); });\nvalues(object); // => [1, 2]\nvalues(other); // => [3, 4]",
    "since": "0.9.0"
  },
  {
    "name": "negate",
    "category": "function",
    "description": "Creates a function that negates the result of the predicate func",
    "syntax": "negate(predicate: T): (...args: Parameters<T>) => boolean",
    "params": [
      {
        "name": "predicate",
        "type": "T",
        "description": "The predicate to negate",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new negated function"
    },
    "example": "function isEven(n) {\n  return n % 2 == 0;\n}\nconst isOdd = negate(isEven);\nisOdd(3); // => true",
    "since": "0.9.0"
  },
  {
    "name": "once",
    "category": "function",
    "description": "Creates a function that is restricted to invoking func once",
    "syntax": "once(func: T): T",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to restrict",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new restricted function"
    },
    "example": "const initialize = once(createApplication);\ninitialize(); // creates the application\ninitialize(); // returns the cached result",
    "since": "0.9.0"
  },
  {
    "name": "overArgs",
    "category": "function",
    "description": "Creates a function that invokes func with its arguments transformed",
    "syntax": "overArgs(func: T, transforms: ((...args: any[]) => any)[]): (...args: any[]) => ReturnType<T>",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to wrap",
        "optional": false
      },
      {
        "name": "transforms",
        "type": "((...args: any[]) => any)[]",
        "description": "The argument transforms",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new function"
    },
    "example": "function doubled(n) {\n  return n * 2;\n}\nfunction square(n) {\n  return n * n;\n}\nconst func = overArgs(function(x, y) {\n  return [x, y];\n}, square, doubled);\nfunc(9, 3); // => [81, 6]",
    "since": "0.9.0"
  },
  {
    "name": "partial",
    "category": "function",
    "description": "Creates a function that invokes func with partials prepended to the arguments it receives",
    "syntax": "partial(func: T, partials: any[]): (...args: any[]) => ReturnType<T>",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to partially apply arguments to",
        "optional": false
      },
      {
        "name": "partials",
        "type": "any[]",
        "description": "The arguments to be partially applied",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new partially applied function"
    },
    "example": "function greet(greeting, name) {\n  return greeting + ' ' + name;\n}\nconst sayHelloTo = partial(greet, 'hello');\nsayHelloTo('fred'); // => 'hello fred'",
    "since": "0.9.0"
  },
  {
    "name": "partialRight",
    "category": "function",
    "description": "Like partial except that partially applied arguments are appended to the arguments it receives",
    "syntax": "partialRight(func: T, partials: any[]): (...args: any[]) => ReturnType<T>",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to partially apply arguments to",
        "optional": false
      },
      {
        "name": "partials",
        "type": "any[]",
        "description": "The arguments to be partially applied",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new partially applied function"
    },
    "example": "function greet(greeting, name) {\n  return greeting + ' ' + name;\n}\nconst greetFred = partialRight(greet, 'fred');\ngreetFred('hi'); // => 'hi fred'",
    "since": "0.9.0"
  },
  {
    "name": "rearg",
    "category": "function",
    "description": "Creates a function that invokes func with arguments arranged according to the specified indexes",
    "syntax": "rearg(func: T, indexes: number[]): (...args: any[]) => ReturnType<T>",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to rearrange arguments for",
        "optional": false
      },
      {
        "name": "indexes",
        "type": "number[]",
        "description": "The arranged argument indexes",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new function"
    },
    "example": "const rearged = rearg(function(a, b, c) {\n  return [a, b, c];\n}, 2, 0, 1);\nrearged('b', 'c', 'a'); // => ['a', 'b', 'c']",
    "since": "0.9.0"
  },
  {
    "name": "rest",
    "category": "function",
    "description": "Creates a function that invokes func with arguments arranged according to the specified indexes where the argument value at the first index is provided as the first argument",
    "syntax": "rest(func: T, start?: number): (...args: any[]) => ReturnType<T>",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to change the argument order for",
        "optional": false
      },
      {
        "name": "start",
        "type": "number",
        "description": "The start position of the rest parameter (defaults to func.length - 1)",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new function"
    },
    "example": "const say = rest(function(what, names) {\n  return what + ' ' + names.join(', ');\n});\nsay('hello', 'fred', 'barney', 'pebbles'); // => 'hello fred, barney, pebbles'",
    "since": "0.9.0"
  },
  {
    "name": "spread",
    "category": "function",
    "description": "Creates a function that invokes func with the this binding of the created function and an array of arguments",
    "syntax": "spread(func: T): (...args: any[]) => ReturnType<T>",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to spread arguments over",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new function"
    },
    "example": "const say = spread(function(who, what) {\n  return who + ' says ' + what;\n});\nsay(['fred', 'hello']); // => 'fred says hello'",
    "since": "0.9.0"
  },
  {
    "name": "throttle",
    "category": "function",
    "description": "Creates a throttled function that only invokes func at most once per every wait milliseconds",
    "syntax": "throttle(func: T, wait: number, options?: { leading?: boolean; trailing?: boolean }): T & { cancel (): void; flush (): ReturnType<T> | undefined }",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to throttle",
        "optional": false
      },
      {
        "name": "wait",
        "type": "number",
        "description": "The number of milliseconds to throttle invocations to",
        "optional": false
      },
      {
        "name": "options",
        "type": "{ leading?: boolean; trailing?: boolean }",
        "description": "The options object",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new throttled function"
    },
    "example": "// Avoid excessively updating the position while scrolling.\nconst throttled = throttle(updatePosition, 100);\nwindow.addEventListener('scroll', throttled);",
    "since": "0.9.0"
  },
  {
    "name": "unary",
    "category": "function",
    "description": "Creates a function that accepts up to one argument, ignoring any additional arguments",
    "syntax": "unary(func: T): (arg: Parameters<T>[0]) => ReturnType<T>",
    "params": [
      {
        "name": "func",
        "type": "T",
        "description": "The function to cap arguments for",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new capped function"
    },
    "example": "['6', '8', '10'].map(unary(parseInt)); // => [6, 8, 10]",
    "since": "0.9.0"
  },
  {
    "name": "wrap",
    "category": "function",
    "description": "Creates a function that provides value to wrapper as its first argument",
    "syntax": "wrap(value: T, wrapper: (value: T, ...args: any[]) => R): (...args: any[]) => R",
    "params": [
      {
        "name": "value",
        "type": "T",
        "description": "The value to wrap",
        "optional": false
      },
      {
        "name": "wrapper",
        "type": "(value: T, ...args: any[]) => R",
        "description": "The wrapper function",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns the new function"
    },
    "example": "const p = wrap('hello', function(greeting, name) {\n  return greeting + ' ' + name;\n});\np('world'); // => 'hello world'",
    "since": "0.9.0"
  },
  {
    "name": "add",
    "category": "math",
    "description": "Adds two numbers together",
    "syntax": "add(a: number, b: number): number",
    "params": [
      {
        "name": "a",
        "type": "number",
        "description": "The first number to add",
        "optional": false
      },
      {
        "name": "b",
        "type": "number",
        "description": "The second number to add",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The sum of a and b"
    },
    "example": "add(2, 3) // => 5\nadd(-1, 1) // => 0",
    "since": "0.8.0"
  },
  {
    "name": "ceil",
    "category": "math",
    "description": "Rounds a number up to a specified precision",
    "syntax": "ceil(number: number, precision?: number): number",
    "params": [
      {
        "name": "number",
        "type": "number",
        "description": "The number to round up",
        "optional": false
      },
      {
        "name": "precision",
        "type": "number",
        "description": "The number of decimal places to round to (defaults to 0)",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "The rounded up number"
    },
    "example": "ceil(4.006) // => 5\nceil(4.006, 2) // => 4.01\nceil(4040, -2) // => 4100\nceil(1.2345, 3) // => 1.235",
    "since": "0.8.0"
  },
  {
    "name": "divide",
    "category": "math",
    "description": "Divides the first number by the second number",
    "syntax": "divide(a: number, b: number): number",
    "params": [
      {
        "name": "a",
        "type": "number",
        "description": "The dividend (number to be divided)",
        "optional": false
      },
      {
        "name": "b",
        "type": "number",
        "description": "The divisor (number to divide by)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The quotient of a divided by b"
    },
    "example": "divide(10, 2) // => 5\ndivide(7, 3) // => 2.333...\ndivide(1, 0) // => Infinity",
    "since": "0.8.0"
  },
  {
    "name": "floor",
    "category": "math",
    "description": "Rounds a number down to a specified precision",
    "syntax": "floor(number: number, precision?: number): number",
    "params": [
      {
        "name": "number",
        "type": "number",
        "description": "The number to round down",
        "optional": false
      },
      {
        "name": "precision",
        "type": "number",
        "description": "The number of decimal places to round to (defaults to 0)",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "The rounded down number"
    },
    "example": "floor(4.006) // => 4\nfloor(4.006, 2) // => 4.00\nfloor(4090, -2) // => 4000\nfloor(1.2345, 3) // => 1.234",
    "since": "0.8.0"
  },
  {
    "name": "inRange",
    "category": "math",
    "description": "Checks if a number is within a specified range (inclusive start, exclusive end)",
    "syntax": "inRange(n: number, start: number, end?: number): boolean",
    "params": [
      {
        "name": "n",
        "type": "number",
        "description": "The number to check",
        "optional": false
      },
      {
        "name": "start",
        "type": "number",
        "description": "The start of the range (inclusive). If end is not specified, this becomes the end and start becomes 0",
        "optional": false
      },
      {
        "name": "end",
        "type": "number",
        "description": "The end of the range (exclusive). Optional parameter",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if the number is within the range, false otherwise"
    },
    "example": "inRange(3, 2, 4) // => true\ninRange(4, 8) // => true (equivalent to inRange(4, 0, 8))\ninRange(4, 2) // => false\ninRange(2, 2, 4) // => true (start is inclusive)\ninRange(4, 2, 4) // => false (end is exclusive)\ninRange(1.2, 2, 1) // => true (start and end are swapped automatically)",
    "since": "0.8.0"
  },
  {
    "name": "max",
    "category": "math",
    "description": "Finds the maximum value in an array of numbers",
    "syntax": "max(array: number[]): number | undefined",
    "params": [
      {
        "name": "array",
        "type": "number[]",
        "description": "The array of numbers to search",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The maximum value in the array, or undefined if array is empty"
    },
    "example": "max([1, 5, 3, 9, 2]) // => 9\nmax([-1, -5, -3]) // => -1\nmax([]) // => undefined",
    "since": "0.8.0"
  },
  {
    "name": "maxBy",
    "category": "math",
    "description": "Finds the element in an array that produces the maximum value when passed through an iteratee function",
    "syntax": "maxBy(array: T[], iteratee: (value: T) => number): T | undefined",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to iterate over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => number",
        "description": "The function invoked per iteration, should return a number for comparison",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The element that produces the maximum value, or undefined if array is empty"
    },
    "example": "const objects = [{ n: 1 }, { n: 9 }, { n: 3 }];\nmaxBy(objects, o => o.n) // => { n: 9 }\nconst people = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }];\nmaxBy(people, p => p.age) // => { name: 'Jane', age: 30 }",
    "since": "0.8.0"
  },
  {
    "name": "mean",
    "category": "math",
    "description": "Computes the arithmetic mean (average) of all values in an array",
    "syntax": "mean(array: number[]): number",
    "params": [
      {
        "name": "array",
        "type": "number[]",
        "description": "The array of numbers to calculate the mean for",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The arithmetic mean of the array, or 0 if array is empty"
    },
    "example": "mean([1, 2, 3, 4, 5]) // => 3\nmean([10, 20]) // => 15\nmean([]) // => 0",
    "since": "0.8.0"
  },
  {
    "name": "meanBy",
    "category": "math",
    "description": "Computes the arithmetic mean of all values in an array after applying an iteratee function",
    "syntax": "meanBy(array: T[], iteratee: (value: T) => number): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to iterate over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => number",
        "description": "The function invoked per iteration, should return a number",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The arithmetic mean after applying the iteratee to each element, or 0 if array is empty"
    },
    "example": "const objects = [{ n: 4 }, { n: 2 }, { n: 8 }];\nmeanBy(objects, o => o.n) // => 4.666...\nconst people = [{ age: 25 }, { age: 30 }, { age: 35 }];\nmeanBy(people, p => p.age) // => 30",
    "since": "0.8.0"
  },
  {
    "name": "min",
    "category": "math",
    "description": "Finds the minimum value in an array of numbers",
    "syntax": "min(array: number[]): number | undefined",
    "params": [
      {
        "name": "array",
        "type": "number[]",
        "description": "The array of numbers to search",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The minimum value in the array, or undefined if array is empty"
    },
    "example": "min([1, 5, 3, 9, 2]) // => 1\nmin([-1, -5, -3]) // => -5\nmin([]) // => undefined",
    "since": "0.8.0"
  },
  {
    "name": "minBy",
    "category": "math",
    "description": "Finds the element in an array that produces the minimum value when passed through an iteratee function",
    "syntax": "minBy(array: T[], iteratee: (value: T) => number): T | undefined",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to iterate over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => number",
        "description": "The function invoked per iteration, should return a number for comparison",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The element that produces the minimum value, or undefined if array is empty"
    },
    "example": "const objects = [{ n: 1 }, { n: 9 }, { n: 3 }];\nminBy(objects, o => o.n) // => { n: 1 }\nconst people = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }];\nminBy(people, p => p.age) // => { name: 'John', age: 25 }",
    "since": "0.8.0"
  },
  {
    "name": "multiply",
    "category": "math",
    "description": "Multiplies two numbers together",
    "syntax": "multiply(a: number, b: number): number",
    "params": [
      {
        "name": "a",
        "type": "number",
        "description": "The first number to multiply",
        "optional": false
      },
      {
        "name": "b",
        "type": "number",
        "description": "The second number to multiply",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The product of a and b"
    },
    "example": "multiply(3, 4) // => 12\nmultiply(-2, 5) // => -10\nmultiply(0, 100) // => 0",
    "since": "0.8.0"
  },
  {
    "name": "round",
    "category": "math",
    "description": "Rounds a number to a specified precision",
    "syntax": "round(number: number, precision?: number): number",
    "params": [
      {
        "name": "number",
        "type": "number",
        "description": "The number to round",
        "optional": false
      },
      {
        "name": "precision",
        "type": "number",
        "description": "The number of decimal places to round to (defaults to 0)",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "The rounded number"
    },
    "example": "round(4.006) // => 4\nround(4.006, 2) // => 4.01\nround(4060, -2) // => 4100\nround(1.2345, 3) // => 1.235",
    "since": "0.8.0"
  },
  {
    "name": "std",
    "category": "math",
    "description": "Computes the standard deviation of an array of numbers",
    "syntax": "std(array: number[]): number",
    "params": [
      {
        "name": "array",
        "type": "number[]",
        "description": "The array of numbers to calculate standard deviation for",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The standard deviation of the array, or 0 if array is empty"
    },
    "example": "std([2, 4, 4, 4, 5, 5, 7, 9]) // => 2.138...\nstd([1, 1, 1, 1]) // => 0\nstd([]) // => 0",
    "since": "0.9.0"
  },
  {
    "name": "subtract",
    "category": "math",
    "description": "Subtracts the second number from the first number",
    "syntax": "subtract(a: number, b: number): number",
    "params": [
      {
        "name": "a",
        "type": "number",
        "description": "The number to subtract from (minuend)",
        "optional": false
      },
      {
        "name": "b",
        "type": "number",
        "description": "The number to subtract (subtrahend)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The difference of a minus b"
    },
    "example": "subtract(5, 3) // => 2\nsubtract(1, 4) // => -3\nsubtract(0, 0) // => 0",
    "since": "0.8.0"
  },
  {
    "name": "sum",
    "category": "math",
    "description": "Computes the sum of all values in an array",
    "syntax": "sum(array: number[]): number",
    "params": [
      {
        "name": "array",
        "type": "number[]",
        "description": "The array of numbers to sum",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The total sum of all numbers in the array, or 0 if array is empty"
    },
    "example": "sum([1, 2, 3, 4]) // => 10\nsum([]) // => 0\nsum([-1, 1]) // => 0",
    "since": "0.8.0"
  },
  {
    "name": "sumBy",
    "category": "math",
    "description": "Computes the sum of all values in an array after applying an iteratee function to each element",
    "syntax": "sumBy(array: T[], iteratee: (value: T) => number): number",
    "params": [
      {
        "name": "array",
        "type": "T[]",
        "description": "The array to iterate over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => number",
        "description": "The function invoked per iteration, should return a number",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The total sum after applying the iteratee to each element"
    },
    "example": "const objects = [{ n: 4 }, { n: 2 }, { n: 8 }];\nsumBy(objects, o => o.n) // => 14\nconst strings = ['a', 'bb', 'ccc'];\nsumBy(strings, s => s.length) // => 6",
    "since": "0.8.0"
  },
  {
    "name": "variance",
    "category": "math",
    "description": "Computes the variance of an array of numbers",
    "syntax": "variance(array: number[]): number",
    "params": [
      {
        "name": "array",
        "type": "number[]",
        "description": "The array of numbers to calculate variance for",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The variance of the array, or 0 if array is empty"
    },
    "example": "variance([2, 4, 4, 4, 5, 5, 7, 9]) // => 4.571...\nvariance([1, 1, 1, 1]) // => 0\nvariance([]) // => 0",
    "since": "0.9.0"
  },
  {
    "name": "clamp",
    "category": "number",
    "description": "Clamp a number between min and max values",
    "syntax": "clamp(value: number, min: number, max: number): number",
    "params": [
      {
        "name": "value",
        "type": "number",
        "description": "The value to clamp",
        "optional": false
      },
      {
        "name": "min",
        "type": "number",
        "description": "Minimum allowed value (inclusive)",
        "optional": false
      },
      {
        "name": "max",
        "type": "number",
        "description": "Maximum allowed value (inclusive)",
        "optional": false
      }
    ],
    "returns": {
      "type": "number",
      "description": "The clamped value between min and max"
    },
    "example": "clamp(5, 0, 10) // 5\nclamp(-5, 0, 10) // 0\nclamp(15, 0, 10) // 10",
    "since": "0.8.0"
  },
  {
    "name": "number",
    "category": "number",
    "description": "Parse string to number if possible",
    "syntax": "number(data: NumberInput, options?: NumberOptions): NumberInput | number",
    "params": [
      {
        "name": "data",
        "type": "NumberInput",
        "description": "The data to parse",
        "optional": false
      },
      {
        "name": "options",
        "type": "NumberOptions",
        "description": "={ deep: false }] - Parse options",
        "optional": true
      }
    ],
    "returns": {
      "type": "NumberInput | number",
      "description": "Parsed number or original value if parsing fails"
    },
    "example": "number('123') // 123\nnumber('abc') // 'abc'\nnumber(['1', '2', 'abc']) // [1, 2, 'abc']\nnumber({ a: '123', b: 'abc' }, { deep: true }) // { a: 123, b: 'abc' }",
    "since": "0.8.0"
  },
  {
    "name": "parseFloat",
    "category": "number",
    "description": "Parse float with optional precision",
    "syntax": "parseFloat(data: string | number, precision?: number): number | string | number",
    "params": [
      {
        "name": "data",
        "type": "string | number",
        "description": "The data to parse as a floating point number",
        "optional": false
      },
      {
        "name": "precision",
        "type": "number",
        "description": "Number of decimal places to round to",
        "optional": true
      }
    ],
    "returns": {
      "type": "number | string | number",
      "description": "Parsed float rounded to specified precision, or original value if parsing fails"
    },
    "example": "parseFloat('3.14159') // 3.14159\nparseFloat('3.14159', 2) // 3.14\nparseFloat('abc') // 'abc'",
    "since": "0.8.0"
  },
  {
    "name": "random",
    "category": "number",
    "description": "Generate random number between min and max",
    "syntax": "random(min?: number, max?: number): number",
    "params": [
      {
        "name": "min",
        "type": "number",
        "description": "=0] - Minimum value (inclusive)",
        "optional": true
      },
      {
        "name": "max",
        "type": "number",
        "description": "=1] - Maximum value (exclusive)",
        "optional": true
      }
    ],
    "returns": {
      "type": "number",
      "description": "Random floating point number in the specified range"
    },
    "example": "random() // Random number between 0 and 1\nrandom(5, 10) // Random number between 5 and 10",
    "since": "0.8.0"
  },
  {
    "name": "randomInt",
    "category": "number",
    "description": "Generate random integer between min and max",
    "syntax": "randomInt(min?: number, max?: number): number",
    "params": [
      {
        "name": "min",
        "type": "number",
        "description": "=0] - Minimum value (inclusive)",
        "optional": true
      },
      {
        "name": "max",
        "type": "number",
        "description": "=100] - Maximum value (inclusive)",
        "optional": true
      }
    ],
    "returns": {
      "type": "number",
      "description": "Random integer in the specified range"
    },
    "example": "randomInt() // Random integer between 0 and 100\nrandomInt(1, 6) // Random integer between 1 and 6 (like a dice roll)",
    "since": "0.8.0"
  },
  {
    "name": "assign",
    "category": "object",
    "description": "Assigns own enumerable string keyed properties of source objects to the destination object",
    "syntax": "assign(target: T, sources: Partial<T>[]): T",
    "params": [
      {
        "name": "target",
        "type": "T",
        "description": "The destination object to assign properties to",
        "optional": false
      },
      {
        "name": "sources",
        "type": "Partial<T>[]",
        "description": "The source objects to copy properties from",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The target object with assigned properties"
    },
    "example": "assign({ a: 1 }, { b: 2 }, { c: 3 }) // { a: 1, b: 2, c: 3 }",
    "since": "0.9.7"
  },
  {
    "name": "at",
    "category": "object",
    "description": "Gets the values at multiple paths of an object",
    "syntax": "at(obj: any, paths: (string | string[])[]): (T | undefined)[]",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to query",
        "optional": false
      },
      {
        "name": "paths",
        "type": "(string | string[])[]",
        "description": "The property paths to get values from",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "An array of resolved values"
    },
    "example": "at({ a: 1, b: { c: 2 } }, 'a', 'b.c', 'missing') // [1, 2, undefined]",
    "since": "0.9.7"
  },
  {
    "name": "clone",
    "category": "object",
    "description": "Creates a shallow clone of an object",
    "syntax": "clone(obj: T): T",
    "params": [
      {
        "name": "obj",
        "type": "T",
        "description": "The object to clone",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A shallow clone of the object"
    },
    "example": "const obj = { a: 1, b: { c: 2 } }\nconst cloned = clone(obj) // cloned.b === obj.b (same reference)",
    "since": "0.9.7"
  },
  {
    "name": "cloneDeep",
    "category": "object",
    "description": "Creates a deep clone of an object",
    "syntax": "cloneDeep(obj: T): T",
    "params": [
      {
        "name": "obj",
        "type": "T",
        "description": "The object to clone",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A deep clone of the object"
    },
    "example": "const obj = { a: 1, b: { c: 2 } }\nconst cloned = cloneDeep(obj) // cloned.b !== obj.b (different reference)",
    "since": "0.9.7"
  },
  {
    "name": "conformsTo",
    "category": "object",
    "description": "Checks if an object conforms to a source by invoking predicate properties with corresponding object values",
    "syntax": "conformsTo(obj: T, source: Partial<Record<keyof T, (value: any) => boolean>>): boolean",
    "params": [
      {
        "name": "obj",
        "type": "T",
        "description": "The object to inspect",
        "optional": false
      },
      {
        "name": "source",
        "type": "Partial<Record<keyof T, (value: any) => boolean>>",
        "description": "The object of predicate functions",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if the object conforms, false otherwise"
    },
    "example": "conformsTo({ a: 1, b: 2 }, { a: n => n > 0, b: n => n < 5 }) // true",
    "since": "0.9.7"
  },
  {
    "name": "create",
    "category": "object",
    "description": "Creates an object that inherits from the given prototype object",
    "syntax": "create(prototype: T | null, properties?: Record<string, any>): T",
    "params": [
      {
        "name": "prototype",
        "type": "T | null",
        "description": "The object to inherit from (can be null)",
        "optional": false
      },
      {
        "name": "properties",
        "type": "Record<string, any>",
        "description": "Optional properties to assign to the new object",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "A new object inheriting from the prototype"
    },
    "example": "const proto = { greet: () => 'hello' }\nconst obj = create(proto, { name: 'John' }) // obj.greet() works and obj.name === 'John'",
    "since": "0.9.7"
  },
  {
    "name": "defaults",
    "category": "object",
    "description": "Assigns properties of source objects to the destination object for all destination properties that resolve to undefined",
    "syntax": "defaults(obj: T, sources: Partial<T>[]): T",
    "params": [
      {
        "name": "obj",
        "type": "T",
        "description": "The destination object",
        "optional": false
      },
      {
        "name": "sources",
        "type": "Partial<T>[]",
        "description": "The source objects",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The destination object with default values assigned"
    },
    "example": "defaults({ a: 1 }, { a: 3, b: 2 }, { c: 3 }) // { a: 1, b: 2, c: 3 }",
    "since": "0.9.7"
  },
  {
    "name": "defaultsDeep",
    "category": "object",
    "description": "Recursively assigns default properties from source objects to the destination object",
    "syntax": "defaultsDeep(obj: T, sources: any[]): T",
    "params": [
      {
        "name": "obj",
        "type": "T",
        "description": "The destination object",
        "optional": false
      },
      {
        "name": "sources",
        "type": "any[]",
        "description": "The source objects",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The destination object with deep default values assigned"
    },
    "example": "defaultsDeep({ a: { x: 1 } }, { a: { y: 2, x: 3 }, b: 4 }) // { a: { x: 1, y: 2 }, b: 4 }",
    "since": "0.9.7"
  },
  {
    "name": "entries",
    "category": "object",
    "description": "Creates an array of own enumerable string keyed-value pairs for an object",
    "syntax": "entries(obj: Record<string, T>): [string, T][]",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "An array of key-value pairs"
    },
    "example": "entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]",
    "since": "0.9.7"
  },
  {
    "name": "entriesIn",
    "category": "object",
    "description": "Creates an array of own and inherited enumerable string keyed-value pairs for an object",
    "syntax": "entriesIn(obj: Record<string, T>): [string, T][]",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "An array of key-value pairs including inherited properties"
    },
    "example": "const obj = Object.create({ inherited: 'value' })\nobj.own = 'property'\nentriesIn(obj) // [['own', 'property'], ['inherited', 'value']]",
    "since": "0.9.7"
  },
  {
    "name": "findLastKey",
    "category": "object",
    "description": "Finds the last key of an object where the predicate returns truthy",
    "syntax": "findLastKey(collection: Record<string, T>, predicate: (value: T, key: string, collection: Record<string, T>) => boolean): string | undefined",
    "params": [
      {
        "name": "collection",
        "type": "Record<string, T>",
        "description": "The object to inspect",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T, key: string, collection: Record<string, T>) => boolean",
        "description": "The function invoked per property",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The key of the matched element, else undefined"
    },
    "example": "findLastKey({ a: 1, b: 2, c: 3 }, n => n > 1) // 'c'",
    "since": "0.9.7"
  },
  {
    "name": "flat",
    "category": "object",
    "description": "Flatten an object and extract values",
    "syntax": "flat(data: any, options?: FlatOptions): string",
    "params": [
      {
        "name": "data",
        "type": "any",
        "description": "The data to flatten",
        "optional": false
      },
      {
        "name": "options",
        "type": "FlatOptions",
        "description": "Flatten options",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "Flattened string of values joined by commas"
    },
    "example": "flat({ a: 1, b: { c: 2 } }) // '1, 2'\nflat({ a: 1, b: { c: 2 } }, { props: ['a'] }) // '1'",
    "since": "0.8.0"
  },
  {
    "name": "forIn",
    "category": "object",
    "description": "Iterates over own and inherited enumerable string keyed properties of an object",
    "syntax": "forIn(obj: Record<string, T>, iteratee: (value: T, key: string) => void): Record<string, T>",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to iterate over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T, key: string) => void",
        "description": "The function invoked per property",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The original object"
    },
    "example": "forIn({ a: 1, b: 2 }, (value, key) => console.log(key, value))",
    "since": "0.9.7"
  },
  {
    "name": "forInRight",
    "category": "object",
    "description": "Like forIn except that it iterates over properties in the opposite order",
    "syntax": "forInRight(obj: Record<string, T>, iteratee: (value: T, key: string) => void): Record<string, T>",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to iterate over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T, key: string) => void",
        "description": "The function invoked per property",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The original object"
    },
    "example": "forInRight({ a: 1, b: 2 }, (value, key) => console.log(key, value)) // logs 'b 2' then 'a 1'",
    "since": "0.9.7"
  },
  {
    "name": "forOwn",
    "category": "object",
    "description": "Iterates over own enumerable string keyed properties of an object",
    "syntax": "forOwn(obj: Record<string, T>, iteratee: (value: T, key: string) => void): Record<string, T>",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to iterate over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T, key: string) => void",
        "description": "The function invoked per property",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The original object"
    },
    "example": "forOwn({ a: 1, b: 2 }, (value, key) => console.log(key, value))",
    "since": "0.9.7"
  },
  {
    "name": "forOwnRight",
    "category": "object",
    "description": "Like forOwn except that it iterates over properties in the opposite order",
    "syntax": "forOwnRight(obj: Record<string, T>, iteratee: (value: T, key: string) => void): Record<string, T>",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to iterate over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T, key: string) => void",
        "description": "The function invoked per property",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The original object"
    },
    "example": "forOwnRight({ a: 1, b: 2 }, (value, key) => console.log(key, value)) // logs 'b 2' then 'a 1'",
    "since": "0.9.7"
  },
  {
    "name": "fromPairs",
    "category": "object",
    "description": "Creates an object from an array of key-value pairs",
    "syntax": "fromPairs(pairs: [string, T][]): Record<string, T>",
    "params": [
      {
        "name": "pairs",
        "type": "[string, T][]",
        "description": "The array of key-value pairs",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The new object"
    },
    "example": "fromPairs([['a', 1], ['b', 2]]) // { a: 1, b: 2 }",
    "since": "0.9.7"
  },
  {
    "name": "functions",
    "category": "object",
    "description": "Creates an array of function property names from own enumerable properties of an object",
    "syntax": "functions(obj: any): string[]",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to inspect",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "An array of function property names"
    },
    "example": "functions({ a: 1, b: () => {}, c: 'string', d: function() {} }) // ['b', 'd']",
    "since": "0.9.7"
  },
  {
    "name": "functionsIn",
    "category": "object",
    "description": "Creates an array of function property names from own and inherited enumerable properties of an object",
    "syntax": "functionsIn(obj: any): string[]",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to inspect",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "An array of function property names including inherited ones"
    },
    "example": "const obj = Object.create({ inheritedFn: () => {} })\nobj.ownFn = () => {}\nfunctionsIn(obj) // ['ownFn', 'inheritedFn']",
    "since": "0.9.7"
  },
  {
    "name": "get",
    "category": "object",
    "description": "Gets the value at the specified path of an object",
    "syntax": "get(obj: any, path: string | string[], defaultValue?: T): T",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to query",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the property to get (string with dots or array of keys)",
        "optional": false
      },
      {
        "name": "defaultValue",
        "type": "T",
        "description": "The value returned if the resolved value is undefined",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "The resolved value or default value"
    },
    "example": "get({ a: { b: { c: 3 } } }, 'a.b.c') // 3\nget({ a: { b: { c: 3 } } }, ['a', 'b', 'c']) // 3\nget({}, 'a.b.c', 'default') // 'default'",
    "since": "0.9.7"
  },
  {
    "name": "getObjectKeysByType",
    "category": "object",
    "description": "Get object keys by value type",
    "syntax": "getObjectKeysByType(obj: object, type: string): string[]",
    "params": [
      {
        "name": "obj",
        "type": "object",
        "description": "The object to analyze",
        "optional": false
      },
      {
        "name": "type",
        "type": "string",
        "description": "The type to filter by ('string', 'number', 'boolean', etc.)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Array of keys whose values match the specified type"
    },
    "example": "getObjectKeysByType({ a: 1, b: 'hello', c: true }, 'string') // ['b']",
    "since": "0.9.7"
  },
  {
    "name": "getObjectValueByPath",
    "category": "object",
    "description": "Get value from object by path",
    "syntax": "getObjectValueByPath(obj: any, path: string[]): T | null",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to traverse",
        "optional": false
      },
      {
        "name": "path",
        "type": "string[]",
        "description": "Array of keys representing the path to the desired value",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The value at the specified path or null if not found"
    },
    "example": "getObjectValueByPath({ a: { b: { c: 42 } } }, ['a', 'b', 'c']) // 42\ngetObjectValueByPath({ items: [{ name: 'John' }, { name: 'Jane' }] }, ['items', 'name']) // ['John', 'Jane']",
    "since": "0.9.7"
  },
  {
    "name": "getValueType",
    "category": "object",
    "description": "Gets the type of a value",
    "syntax": "getValueType(value: any): string",
    "params": [
      {
        "name": "value",
        "type": "any",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The type as a string ('string', 'number', 'object', etc.)"
    },
    "example": "getValueType('hello') // 'string'\ngetValueType(42) // 'number'\ngetValueType({}) // 'object'",
    "since": "0.9.7"
  },
  {
    "name": "has",
    "category": "object",
    "description": "Checks if the specified path exists as a direct property of the object",
    "syntax": "has(obj: any, path: string | string[]): boolean",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to query",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path to check (string with dots or array of keys)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if path exists, false otherwise"
    },
    "example": "has({ a: { b: { c: 3 } } }, 'a.b.c') // true\nhas({ a: { b: { c: 3 } } }, 'a.b.d') // false",
    "since": "0.9.7"
  },
  {
    "name": "hasIn",
    "category": "object",
    "description": "Checks if the specified path exists as an own property of the object",
    "syntax": "hasIn(obj: any, path: string | string[]): boolean",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to query",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path to check (string with dots or array of keys)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if path exists as own property, false otherwise"
    },
    "example": "hasIn({ a: { b: 2 } }, 'a.b') // true",
    "since": "0.9.7"
  },
  {
    "name": "invert",
    "category": "object",
    "description": "Creates an object that inverts the keys and values of the input object",
    "syntax": "invert(obj: T): Record<string, string>",
    "params": [
      {
        "name": "obj",
        "type": "T",
        "description": "The object to invert",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The inverted object"
    },
    "example": "invert({ a: 1, b: 2, c: 1 }) // { '1': 'c', '2': 'b' }",
    "since": "0.9.7"
  },
  {
    "name": "invertBy",
    "category": "object",
    "description": "Creates an inverted object where the inverted keys are generated from running each element through an iteratee",
    "syntax": "invertBy(obj: Record<string, T>, iteratee: (value: T) => string): Record<string, string[]>",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to invert",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T) => string",
        "description": "The iteratee function to transform values into keys",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The inverted object with arrays of original keys"
    },
    "example": "invertBy({ a: 1, b: 2, c: 1 }, value => `group${value}`) // { group1: ['a', 'c'], group2: ['b'] }",
    "since": "0.9.7"
  },
  {
    "name": "invoke",
    "category": "object",
    "description": "Invokes the method at the specified path of an object",
    "syntax": "invoke(obj: any, path: string | string[], args: any[]): any",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to query",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the method to invoke",
        "optional": false
      },
      {
        "name": "args",
        "type": "any[]",
        "description": "The arguments to invoke the method with",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The result of the invoked method"
    },
    "example": "invoke({ a: { b: Math.max } }, 'a.b', 1, 2, 3) // 3",
    "since": "0.9.7"
  },
  {
    "name": "isEmpty",
    "category": "object",
    "description": "Check if a value is empty",
    "syntax": "isEmpty(value: string | object | any[], options?: { props?: boolean }): boolean",
    "params": [
      {
        "name": "value",
        "type": "string | object | any[]",
        "description": "The value to check (string, object, or array)",
        "optional": false
      },
      {
        "name": "options",
        "type": "{ props?: boolean }",
        "description": "Check options",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if the value is considered empty, false otherwise"
    },
    "example": "isEmpty('') // true\nisEmpty([]) // true\nisEmpty({}) // true\nisEmpty({ a: '' }, { props: true }) // true",
    "since": "0.9.7"
  },
  {
    "name": "isEqual",
    "category": "object",
    "description": "Performs a deep comparison between two values to determine if they are equivalent",
    "syntax": "isEqual(a: any, b: any): boolean",
    "params": [
      {
        "name": "a",
        "type": "any",
        "description": "The first value to compare",
        "optional": false
      },
      {
        "name": "b",
        "type": "any",
        "description": "The second value to compare",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if the values are equivalent, false otherwise"
    },
    "example": "isEqual([1, 2, 3], [1, 2, 3]) // true\nisEqual({ a: 1 }, { a: 1 }) // true\nisEqual({ a: 1 }, { a: 2 }) // false",
    "since": "0.9.7"
  },
  {
    "name": "keys",
    "category": "object",
    "description": "Creates an array of own enumerable property names of an object",
    "syntax": "keys(obj: Record<string, T>): string[]",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "An array of property names"
    },
    "example": "keys({ a: 1, b: 2, c: 3 }) // ['a', 'b', 'c']",
    "since": "0.9.7"
  },
  {
    "name": "mapKeys",
    "category": "object",
    "description": "Creates an object with the same values as the input object and keys generated by running each property through an iteratee function",
    "syntax": "mapKeys(obj: Record<string, T>, iteratee: (value: T, key: string) => string): Record<string, T>",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to map over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T, key: string) => string",
        "description": "The function invoked per property (value, key) => newKey",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A new object with transformed keys"
    },
    "example": "mapKeys({ a: 1, b: 2 }, (value, key) => key.toUpperCase()) // { A: 1, B: 2 }",
    "since": "0.9.7"
  },
  {
    "name": "mapValues",
    "category": "object",
    "description": "Creates an object with the same keys as the input object and values generated by running each property through an iteratee function",
    "syntax": "mapValues(obj: Record<string, T>, iteratee: (value: T, key: string) => R): Record<string, R>",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to map over",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(value: T, key: string) => R",
        "description": "The function invoked per property (value, key) => newValue",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A new object with transformed values"
    },
    "example": "mapValues({ a: 1, b: 2 }, x => x * 2) // { a: 2, b: 4 }\nmapValues({ a: 'hello', b: 'world' }, (value, key) => `${key}: ${value}`) // { a: 'a: hello', b: 'b: world' }",
    "since": "0.9.7"
  },
  {
    "name": "merge",
    "category": "object",
    "description": "Recursively merges own and inherited enumerable string keyed properties of source objects into the destination object",
    "syntax": "merge(target: T, sources: any[]): T",
    "params": [
      {
        "name": "target",
        "type": "T",
        "description": "The destination object to merge into",
        "optional": false
      },
      {
        "name": "sources",
        "type": "any[]",
        "description": "The source objects to merge from",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The target object with merged properties"
    },
    "example": "merge({ a: { x: 1 } }, { a: { y: 2 }, b: 3 }) // { a: { x: 1, y: 2 }, b: 3 }",
    "since": "0.9.7"
  },
  {
    "name": "mergeWith",
    "category": "object",
    "description": "Like merge except that it accepts a customizer function which is invoked to produce the merged values",
    "syntax": "mergeWith(target: T, source: any, customizer: (objValue: any, srcValue: any, key: string) => any): T",
    "params": [
      {
        "name": "target",
        "type": "T",
        "description": "The destination object to merge into",
        "optional": false
      },
      {
        "name": "source",
        "type": "any",
        "description": "The source object to merge from",
        "optional": false
      },
      {
        "name": "customizer",
        "type": "(objValue: any, srcValue: any, key: string) => any",
        "description": "The function to customize assigned values (objValue, srcValue, key) => mergedValue",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The target object with custom merged properties"
    },
    "example": "mergeWith({ a: [1] }, { a: [2] }, (obj, src) => Array.isArray(obj) ? obj.concat(src) : undefined) // { a: [1, 2] }",
    "since": "0.9.7"
  },
  {
    "name": "method",
    "category": "object",
    "description": "Creates a function that invokes the method at a specified path of a given object",
    "syntax": "method(path: string | string[], args: any[]): (obj: any) => any",
    "params": [
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the method to invoke",
        "optional": false
      },
      {
        "name": "args",
        "type": "any[]",
        "description": "The arguments to invoke the method with",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A function that takes an object and invokes the method"
    },
    "example": "const fn = method('toUpperCase')\nfn('hello') // 'HELLO'",
    "since": "0.9.7"
  },
  {
    "name": "methodOf",
    "category": "object",
    "description": "Creates a function that invokes the method at a given path of the specified object",
    "syntax": "methodOf(obj: any, args: any[]): (path: string | string[]) => any",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to query",
        "optional": false
      },
      {
        "name": "args",
        "type": "any[]",
        "description": "The arguments to invoke the method with",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A function that takes a path and invokes the method"
    },
    "example": "const fn = methodOf('hello world')\nfn('split') // ['hello', 'world']",
    "since": "0.9.7"
  },
  {
    "name": "omit",
    "category": "object",
    "description": "Creates an object composed of all properties except the specified ones",
    "syntax": "omit(obj: T, keys: K[]): Omit<T, K>",
    "params": [
      {
        "name": "obj",
        "type": "T",
        "description": "The source object to omit from",
        "optional": false
      },
      {
        "name": "keys",
        "type": "K[]",
        "description": "The property keys to omit",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A new object without the specified properties"
    },
    "example": "omit({ a: 1, b: 2, c: 3 }, 'a', 'c') // { b: 2 }",
    "since": "0.9.7"
  },
  {
    "name": "omitBy",
    "category": "object",
    "description": "Creates an object composed of properties that do not satisfy the predicate function",
    "syntax": "omitBy(obj: Record<string, T>, predicate: (value: T, key: string) => boolean): Partial<Record<string, T>>",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The source object to omit from",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T, key: string) => boolean",
        "description": "The function invoked per property (value, key) => boolean",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A new object with properties that fail the predicate test"
    },
    "example": "omitBy({ a: 1, b: 2, c: 3 }, value => value > 1) // { a: 1 }",
    "since": "0.9.7"
  },
  {
    "name": "pick",
    "category": "object",
    "description": "Creates an object composed of the picked object properties",
    "syntax": "pick(obj: T, keys: K[]): Pick<T, K>",
    "params": [
      {
        "name": "obj",
        "type": "T",
        "description": "The source object to pick from",
        "optional": false
      },
      {
        "name": "keys",
        "type": "K[]",
        "description": "The property keys to pick",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A new object with only the specified properties"
    },
    "example": "pick({ a: 1, b: 2, c: 3 }, 'a', 'c') // { a: 1, c: 3 }",
    "since": "0.9.7"
  },
  {
    "name": "pickBy",
    "category": "object",
    "description": "Creates an object composed of properties that satisfy the predicate function",
    "syntax": "pickBy(obj: Record<string, T>, predicate: (value: T, key: string) => boolean): Partial<Record<string, T>>",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The source object to pick from",
        "optional": false
      },
      {
        "name": "predicate",
        "type": "(value: T, key: string) => boolean",
        "description": "The function invoked per property (value, key) => boolean",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "A new object with properties that pass the predicate test"
    },
    "example": "pickBy({ a: 1, b: 2, c: 3 }, value => value > 1) // { b: 2, c: 3 }",
    "since": "0.9.7"
  },
  {
    "name": "result",
    "category": "object",
    "description": "Gets the value at path of object. If the resolved value is a function, it's invoked and its result is returned",
    "syntax": "result(obj: any, path: string | string[], defaultValue?: T): T",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to query",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the property to get",
        "optional": false
      },
      {
        "name": "defaultValue",
        "type": "T",
        "description": "The value returned if the resolved value is undefined",
        "optional": true
      }
    ],
    "returns": {
      "type": "any",
      "description": "The resolved value, function result, or default value"
    },
    "example": "result({ a: () => 42 }, 'a') // 42\nresult({ a: 5 }, 'a') // 5",
    "since": "0.9.7"
  },
  {
    "name": "set",
    "category": "object",
    "description": "Sets the value at the specified path of an object",
    "syntax": "set(obj: any, path: string | string[], value: T): any",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to modify",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the property to set (string with dots or array of keys)",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to set",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The modified object"
    },
    "example": "set({}, 'a.b.c', 3) // { a: { b: { c: 3 } } }\nset({}, ['a', 'b', 'c'], 3) // { a: { b: { c: 3 } } }",
    "since": "0.9.7"
  },
  {
    "name": "setWith",
    "category": "object",
    "description": "Like set except that it accepts a customizer which is invoked to produce the objects of path",
    "syntax": "setWith(obj: any, path: string | string[], value: T, customizer: (value: any, key: string, object: any) => any): any",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to modify",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the property to set",
        "optional": false
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value to set",
        "optional": false
      },
      {
        "name": "customizer",
        "type": "(value: any, key: string, object: any) => any",
        "description": "The function to customize assigned values",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The modified object"
    },
    "example": "setWith({}, 'a[0].b.c', 4, Object) // { a: { '0': { b: { c: 4 } } } }",
    "since": "0.9.7"
  },
  {
    "name": "toPairs",
    "category": "object",
    "description": "Creates an array of own enumerable string keyed-value pairs for an object (alias for entries)",
    "syntax": "toPairs(obj: Record<string, T>): [string, T][]",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "An array of key-value pairs"
    },
    "example": "toPairs({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]",
    "since": "0.9.7"
  },
  {
    "name": "toPairsIn",
    "category": "object",
    "description": "Creates an array of own and inherited enumerable string keyed-value pairs for an object (alias for entriesIn)",
    "syntax": "toPairsIn(obj: Record<string, T>): [string, T][]",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "An array of key-value pairs including inherited properties"
    },
    "example": "const obj = Object.create({ inherited: 'value' })\nobj.own = 'property'\ntoPairsIn(obj) // [['own', 'property'], ['inherited', 'value']]",
    "since": "0.9.7"
  },
  {
    "name": "transform",
    "category": "object",
    "description": "Transforms an object by running each own enumerable string keyed property through a transform function",
    "syntax": "transform(obj: Record<string, T>, transform: (result: R, value: T, key: string) => void, accumulator: R): R",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to transform",
        "optional": false
      },
      {
        "name": "transform",
        "type": "(result: R, value: T, key: string) => void",
        "description": "The transform function (result, value, key) => void",
        "optional": false
      },
      {
        "name": "accumulator",
        "type": "R",
        "description": "The initial accumulator value",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The accumulated result"
    },
    "example": "transform({ a: 1, b: 2 }, (result, value, key) => { result[key] = value * 2 }, {}) // { a: 2, b: 4 }",
    "since": "0.9.7"
  },
  {
    "name": "unset",
    "category": "object",
    "description": "Removes the property at the specified path of an object",
    "syntax": "unset(obj: any, path: string | string[]): boolean",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to modify",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the property to unset (string with dots or array of keys)",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "True if the property is deleted, false otherwise"
    },
    "example": "const obj = { a: { b: { c: 3 } } }\nunset(obj, 'a.b.c') // true, obj becomes { a: { b: {} } }",
    "since": "0.9.7"
  },
  {
    "name": "update",
    "category": "object",
    "description": "Sets the value at path of object using an updater function",
    "syntax": "update(obj: any, path: string | string[], updater: (value: any) => T): any",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to modify",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the property to set",
        "optional": false
      },
      {
        "name": "updater",
        "type": "(value: any) => T",
        "description": "The function to produce the updated value",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The modified object"
    },
    "example": "update({ a: 1 }, 'a', n => n * 2) // { a: 2 }",
    "since": "0.9.7"
  },
  {
    "name": "updateWith",
    "category": "object",
    "description": "Like update except that it accepts a customizer which is invoked to produce the updated value",
    "syntax": "updateWith(obj: any, path: string | string[], updater: (value: any) => T, customizer: (value: any, key: string, object: any) => any): any",
    "params": [
      {
        "name": "obj",
        "type": "any",
        "description": "The object to modify",
        "optional": false
      },
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the property to set",
        "optional": false
      },
      {
        "name": "updater",
        "type": "(value: any) => T",
        "description": "The function to produce the updated value",
        "optional": false
      },
      {
        "name": "customizer",
        "type": "(value: any, key: string, object: any) => any",
        "description": "The function to customize assigned values",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "The modified object"
    },
    "example": "updateWith({}, 'a.b', () => 'value', () => ({})) // { a: { b: 'value' } }",
    "since": "0.9.7"
  },
  {
    "name": "values",
    "category": "object",
    "description": "Creates an array of own enumerable property values of an object",
    "syntax": "values(obj: Record<string, T>): T[]",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, T>",
        "description": "The object to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "An array of property values"
    },
    "example": "values({ a: 1, b: 2, c: 3 }) // [1, 2, 3]",
    "since": "0.9.7"
  },
  {
    "name": "camelCase",
    "category": "string",
    "description": "Converts string to camelCase",
    "syntax": "camelCase(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the camel cased string"
    },
    "example": "camelCase('hello world'); // 'helloWorld'\ncamelCase('hello-world'); // 'helloWorld'",
    "since": "0.9.0"
  },
  {
    "name": "capitalize",
    "category": "string",
    "description": "Capitalizes the first character of a string",
    "syntax": "capitalize(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to capitalize",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the capitalized string"
    },
    "example": "capitalize('hello'); // 'Hello'\ncapitalize('WORLD'); // 'WORLD'",
    "since": "0.8.0"
  },
  {
    "name": "deburr",
    "category": "string",
    "description": "Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters",
    "syntax": "deburr(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to deburr",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the deburred string"
    },
    "example": "deburr('déjà vu'); // 'deja vu'\ndeburr('niño'); // 'nino'",
    "since": "0.8.0"
  },
  {
    "name": "endsWith",
    "category": "string",
    "description": "Checks if string ends with target string",
    "syntax": "endsWith(str: string, target: string, position?: number): boolean",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to check",
        "optional": false
      },
      {
        "name": "target",
        "type": "string",
        "description": "The target string",
        "optional": false
      },
      {
        "name": "position",
        "type": "number",
        "description": "The position to check from",
        "optional": true
      }
    ],
    "returns": {
      "type": "boolean",
      "description": "Returns true if the string ends with the target"
    },
    "example": "endsWith('hello world', 'world'); // true\nendsWith('hello world', 'hello', 5); // true",
    "since": "0.8.0"
  },
  {
    "name": "escape",
    "category": "string",
    "description": "Converts characters to HTML entities",
    "syntax": "escape(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to escape",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the escaped string"
    },
    "example": "escape('hello & world'); // 'hello &amp; world'\nescape('<div>hello</div>'); // '&lt;div&gt;hello&lt;/div&gt;'",
    "since": "0.8.0"
  },
  {
    "name": "escapeRegExp",
    "category": "string",
    "description": "Escapes RegExp special characters",
    "syntax": "escapeRegExp(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to escape",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the escaped string"
    },
    "example": "escapeRegExp('hello.world?'); // 'hello\\.world\\?'\nescapeRegExp('^hello$'); // '\\^hello\\$'",
    "since": "0.8.0"
  },
  {
    "name": "kebabCase",
    "category": "string",
    "description": "Converts string to kebab-case",
    "syntax": "kebabCase(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the kebab cased string"
    },
    "example": "kebabCase('hello world'); // 'hello-world'\nkebabCase('HelloWorld'); // 'hello-world'",
    "since": "0.9.0"
  },
  {
    "name": "lowerCase",
    "category": "string",
    "description": "Converts string to lower case",
    "syntax": "lowerCase(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the lower cased string"
    },
    "example": "lowerCase('HELLO WORLD'); // 'hello world'\nlowerCase('Hello-World'); // 'hello world'",
    "since": "0.8.0"
  },
  {
    "name": "lowerFirst",
    "category": "string",
    "description": "Converts the first character of string to lower case",
    "syntax": "lowerFirst(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the string with the first character lowercased"
    },
    "example": "lowerFirst('Hello'); // 'hello'\nlowerFirst('JavaScript'); // 'javaScript'",
    "since": "0.8.0"
  },
  {
    "name": "pad",
    "category": "string",
    "description": "Pads string on the left and right sides",
    "syntax": "pad(str: string, length: number, chars?: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to pad",
        "optional": false
      },
      {
        "name": "length",
        "type": "number",
        "description": "The length of the resulting string",
        "optional": false
      },
      {
        "name": "chars",
        "type": "string",
        "description": "=' '] - The characters to pad with",
        "optional": true
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the padded string"
    },
    "example": "pad('hello', 10); // '  hello   '\npad('hello', 10, '-'); // '--hello----'",
    "since": "0.8.0"
  },
  {
    "name": "padEnd",
    "category": "string",
    "description": "Pads string on the right side",
    "syntax": "padEnd(str: string, length: number, chars?: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to pad",
        "optional": false
      },
      {
        "name": "length",
        "type": "number",
        "description": "The length of the resulting string",
        "optional": false
      },
      {
        "name": "chars",
        "type": "string",
        "description": "=' '] - The characters to pad with",
        "optional": true
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the padded string"
    },
    "example": "padEnd('hello', 10); // 'hello     '\npadEnd('hello', 10, '-'); // 'hello-----'",
    "since": "0.8.0"
  },
  {
    "name": "padStart",
    "category": "string",
    "description": "Pads string on the left side",
    "syntax": "padStart(str: string, length: number, chars?: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to pad",
        "optional": false
      },
      {
        "name": "length",
        "type": "number",
        "description": "The length of the resulting string",
        "optional": false
      },
      {
        "name": "chars",
        "type": "string",
        "description": "=' '] - The characters to pad with",
        "optional": true
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the padded string"
    },
    "example": "padStart('hello', 10); // '     hello'\npadStart('hello', 10, '-'); // '-----hello'",
    "since": "0.8.0"
  },
  {
    "name": "parseInt",
    "category": "string",
    "description": "Converts string to an integer of the specified radix",
    "syntax": "parseInt(str: string, radix?: number): number",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      },
      {
        "name": "radix",
        "type": "number",
        "description": "=10] - The radix to use",
        "optional": true
      }
    ],
    "returns": {
      "type": "number",
      "description": "Returns the converted integer"
    },
    "example": "parseInt('10'); // 10\nparseInt('10', 2); // 2",
    "since": "0.8.0"
  },
  {
    "name": "pascalCase",
    "category": "string",
    "description": "Converts string to PascalCase",
    "syntax": "pascalCase(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the Pascal cased string"
    },
    "example": "pascalCase('hello world'); // 'HelloWorld'\npascalCase('hello-world'); // 'HelloWorld'",
    "since": "0.9.0"
  },
  {
    "name": "purify",
    "category": "string",
    "description": "Removes all accents from a string",
    "syntax": "purify(str: any): string",
    "params": [
      {
        "name": "str",
        "type": "any",
        "description": "The string to purify",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the string without accents"
    },
    "example": "purify('café'); // 'cafe'\npurify('naïve'); // 'naive'",
    "since": "0.8.0"
  },
  {
    "name": "removeBreakLines",
    "category": "string",
    "description": "Remove breaklines from string",
    "syntax": "removeBreakLines(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to process",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the string without breaklines"
    },
    "example": "removeBreakLines('hello\\nworld'); // 'hello world'\nremoveBreakLines('line1\\r\\nline2'); // 'line1 line2'",
    "since": "0.8.0"
  },
  {
    "name": "repeat",
    "category": "string",
    "description": "Repeats string n times",
    "syntax": "repeat(str: string, n: number): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to repeat",
        "optional": false
      },
      {
        "name": "n",
        "type": "number",
        "description": "The number of times to repeat the string",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the repeated string"
    },
    "example": "repeat('hello', 3); // 'hellohellohello'\nrepeat('abc', 2); // 'abcabc'",
    "since": "0.8.0"
  },
  {
    "name": "replace",
    "category": "string",
    "description": "Replaces matches for pattern in string with replacement",
    "syntax": "replace(str: string, pattern: string | RegExp, replacement: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to search and replace in",
        "optional": false
      },
      {
        "name": "pattern",
        "type": "string | RegExp",
        "description": "The pattern to match",
        "optional": false
      },
      {
        "name": "replacement",
        "type": "string",
        "description": "The replacement string",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the string with replacements"
    },
    "example": "replace('hello world', 'world', 'there'); // 'hello there'\nreplace('hello 123', /\\d+/, '456'); // 'hello 456'",
    "since": "0.8.0"
  },
  {
    "name": "snakeCase",
    "category": "string",
    "description": "Converts string to snake_case",
    "syntax": "snakeCase(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the snake cased string"
    },
    "example": "snakeCase('hello world'); // 'hello_world'\nsnakeCase('HelloWorld'); // 'hello_world'",
    "since": "0.9.0"
  },
  {
    "name": "split",
    "category": "string",
    "description": "Splits string by separator",
    "syntax": "split(str: string, separator?: string | RegExp, limit?: number): string[]",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to split",
        "optional": false
      },
      {
        "name": "separator",
        "type": "string | RegExp",
        "description": "The separator to split by",
        "optional": true
      },
      {
        "name": "limit",
        "type": "number",
        "description": "The maximum number of splits",
        "optional": true
      }
    ],
    "returns": {
      "type": "string[]",
      "description": "Returns the array of split strings"
    },
    "example": "split('hello,world', ','); // ['hello', 'world']\nsplit('hello world', /\\s+/); // ['hello', 'world']",
    "since": "0.8.0"
  },
  {
    "name": "startCase",
    "category": "string",
    "description": "Converts first character to uppercase and rest to lowercase",
    "syntax": "startCase(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the start cased string"
    },
    "example": "startCase('hello world'); // 'Hello world'\nstartCase('hELLO wORLD'); // 'Hello world'",
    "since": "0.9.0"
  },
  {
    "name": "startsWith",
    "category": "string",
    "description": "Checks if string starts with target string",
    "syntax": "startsWith(str: string, target: string, position?: number): boolean",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to check",
        "optional": false
      },
      {
        "name": "target",
        "type": "string",
        "description": "The target string",
        "optional": false
      },
      {
        "name": "position",
        "type": "number",
        "description": "=0] - The position to check from",
        "optional": true
      }
    ],
    "returns": {
      "type": "boolean",
      "description": "Returns true if the string starts with the target"
    },
    "example": "startsWith('hello world', 'hello'); // true\nstartsWith('hello world', 'world', 6); // true",
    "since": "0.8.0"
  },
  {
    "name": "template",
    "category": "string",
    "description": "Converts string to template string",
    "syntax": "template(string: string, options?: { interpolate?: RegExp; evaluate?: RegExp; escape?: RegExp }): (data: any) => string",
    "params": [
      {
        "name": "string",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      },
      {
        "name": "options",
        "type": "{ interpolate?: RegExp; evaluate?: RegExp; escape?: RegExp }",
        "description": "The options for the template",
        "optional": true
      }
    ],
    "returns": {
      "type": "Function",
      "description": "Returns the template function"
    },
    "example": "const compiled = template('hello <%= name %>!');\ncompiled({ name: 'world' }); // 'hello world!'\nconst compiled = template('number: <%= number %>', { interpolate: /<%=([\\s\\S]+?)%>/g });\ncompiled({ number: 42 }); // 'number: 42'",
    "since": "0.8.0"
  },
  {
    "name": "toArray",
    "category": "string",
    "description": "Converts string to an array of its characters",
    "syntax": "toArray(str: string): string[]",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string[]",
      "description": "Returns the array of characters"
    },
    "example": "toArray('hello'); // ['h', 'e', 'l', 'l', 'o']\ntoArray('abc'); // ['a', 'b', 'c']",
    "since": "0.8.0"
  },
  {
    "name": "toLowerCase",
    "category": "string",
    "description": "Converts string to lowercase",
    "syntax": "toLowerCase(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the lower cased string"
    },
    "example": "toLowerCase('HELLO'); // 'hello'\ntoLowerCase('HeLLo'); // 'hello'",
    "since": "0.8.0"
  },
  {
    "name": "toUpperCase",
    "category": "string",
    "description": "Converts string to uppercase",
    "syntax": "toUpperCase(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the upper cased string"
    },
    "example": "toUpperCase('hello'); // 'HELLO'\ntoUpperCase('HeLLo'); // 'HELLO'",
    "since": "0.8.0"
  },
  {
    "name": "trim",
    "category": "string",
    "description": "Removes leading and trailing whitespace",
    "syntax": "trim(str: string, chars?: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to trim",
        "optional": false
      },
      {
        "name": "chars",
        "type": "string",
        "description": "The characters to remove",
        "optional": true
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the trimmed string"
    },
    "example": "trim('  hello  '); // 'hello'\ntrim('---hello---', '-'); // 'hello'",
    "since": "0.8.0"
  },
  {
    "name": "trimEnd",
    "category": "string",
    "description": "Removes trailing whitespace",
    "syntax": "trimEnd(str: string, chars?: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to trim",
        "optional": false
      },
      {
        "name": "chars",
        "type": "string",
        "description": "The characters to remove",
        "optional": true
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the trimmed string"
    },
    "example": "trimEnd('  hello  '); // '  hello'\ntrimEnd('---hello---', '-'); // '---hello'",
    "since": "0.8.0"
  },
  {
    "name": "trimStart",
    "category": "string",
    "description": "Removes leading whitespace",
    "syntax": "trimStart(str: string, chars?: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to trim",
        "optional": false
      },
      {
        "name": "chars",
        "type": "string",
        "description": "The characters to remove",
        "optional": true
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the trimmed string"
    },
    "example": "trimStart('  hello  '); // 'hello  '\ntrimStart('---hello---', '-'); // 'hello---'",
    "since": "0.8.0"
  },
  {
    "name": "truncate",
    "category": "string",
    "description": "Truncates string if it's longer than the given maximum string length",
    "syntax": "truncate(str: string, options?: { length?: number; omission?: string; separator?: string | RegExp }): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to truncate",
        "optional": false
      },
      {
        "name": "options",
        "type": "{ length?: number; omission?: string; separator?: string | RegExp }",
        "description": "The options for truncating",
        "optional": true
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the truncated string"
    },
    "example": "truncate('hello world', { length: 10 }); // 'hello worl...'\ntruncate('hello world', { length: 10, separator: ' ' }); // 'hello...'",
    "since": "0.8.0"
  },
  {
    "name": "unescape",
    "category": "string",
    "description": "Converts HTML entities to characters",
    "syntax": "unescape(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to unescape",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the unescaped string"
    },
    "example": "unescape('&lt;div&gt;hello&lt;/div&gt;'); // '<div>hello</div>'\nunescape('&amp;copy; 2023'); // '© 2023'",
    "since": "0.8.0"
  },
  {
    "name": "upperCase",
    "category": "string",
    "description": "Converts string to UPPER_CASE",
    "syntax": "upperCase(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the upper cased string"
    },
    "example": "upperCase('hello world'); // 'HELLO WORLD'\nupperCase('hello-world'); // 'HELLO WORLD'",
    "since": "0.8.0"
  },
  {
    "name": "upperFirst",
    "category": "string",
    "description": "Converts the first character of string to upper case",
    "syntax": "upperFirst(str: string): string",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to convert",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the string with the first character uppercased"
    },
    "example": "upperFirst('hello'); // 'Hello'\nupperFirst('javaScript'); // 'JavaScript'",
    "since": "0.8.0"
  },
  {
    "name": "words",
    "category": "string",
    "description": "Removes leading and trailing whitespace or specified characters",
    "syntax": "words(str: string, pattern?: RegExp): string[]",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "The string to process",
        "optional": false
      },
      {
        "name": "pattern",
        "type": "RegExp",
        "description": "The pattern to match words",
        "optional": true
      }
    ],
    "returns": {
      "type": "string[]",
      "description": "Returns the array of words"
    },
    "example": "words('  hello world  '); // ['hello', 'world']\nwords('---hello---world---', /-/); // ['hello', 'world']",
    "since": "0.8.0"
  },
  {
    "name": "isArguments",
    "category": "type",
    "description": "Checks if value is an arguments object",
    "syntax": "isArguments(value: unknown): value is IArguments",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is an arguments object, else false"
    },
    "example": "isArguments(function() { return arguments; }())\n// => true\nisArguments([1, 2, 3])\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isArrayBuffer",
    "category": "type",
    "description": "Checks if value is classified as an ArrayBuffer object",
    "syntax": "isArrayBuffer(value: unknown): value is ArrayBuffer",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is an ArrayBuffer, else false"
    },
    "example": "isArrayBuffer(new ArrayBuffer(2))\n// => true\nisArrayBuffer(new Array(2))\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isArrayLike",
    "category": "type",
    "description": "Checks if value is array-like. A value is considered array-like if it's not a function and has a valid length property",
    "syntax": "isArrayLike(value: unknown): value is { length: number }",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is array-like, else false"
    },
    "example": "isArrayLike([1, 2, 3])\n// => true\nisArrayLike('abc')\n// => true\nisArrayLike(Function)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isArrayLikeObject",
    "category": "type",
    "description": "Checks if value is array-like and not a function. This method is like isArrayLike except that it also checks if value is an object",
    "syntax": "isArrayLikeObject(value: unknown): value is object & { length: number }",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is an array-like object, else false"
    },
    "example": "isArrayLikeObject([1, 2, 3])\n// => true\nisArrayLikeObject('abc')\n// => true\nisArrayLikeObject(Function)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isBoolean",
    "category": "type",
    "description": "Checks if value is classified as a boolean primitive or object",
    "syntax": "isBoolean(value: unknown): value is boolean",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a boolean, else false"
    },
    "example": "isBoolean(false)\n// => true\nisBoolean(null)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isBuffer",
    "category": "type",
    "description": "Checks if value is a buffer",
    "syntax": "isBuffer(value: unknown): boolean",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a buffer, else false"
    },
    "example": "isBuffer(Buffer.alloc(2))\n// => true\nisBuffer(new Uint8Array(2))\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isElement",
    "category": "type",
    "description": "Checks if value is likely a DOM element",
    "syntax": "isElement(value: unknown): value is Element",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a DOM element, else false"
    },
    "example": "isElement(document.body)\n// => true\nisElement('<body>')\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isEqualWith",
    "category": "type",
    "description": "Like isEqual except that it accepts customizer which is invoked to compare values. If customizer returns undefined, comparisons are handled by the method instead. The customizer is invoked with up to six arguments: (objValue, othValue [, index|key, object, other, stack]).",
    "syntax": "isEqualWith(a: unknown, b: unknown, customizer: (objValue: unknown, othValue: unknown, key?: string) => boolean | undefined): boolean",
    "params": [
      {
        "name": "a",
        "type": "unknown",
        "description": "The value to compare",
        "optional": false
      },
      {
        "name": "b",
        "type": "unknown",
        "description": "The other value to compare",
        "optional": false
      },
      {
        "name": "customizer",
        "type": "(objValue: unknown, othValue: unknown, key?: string) => boolean | undefined",
        "description": "The function to customize comparisons",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if the values are equivalent, else false"
    },
    "example": "function isGreeting(value) {\n  return /^h(?:i|ello)$/.test(value);\n}\nfunction customizer(objValue, othValue) {\n  if (isGreeting(objValue) && isGreeting(othValue)) {\n    return true;\n  }\n}\nisEqualWith(['hello'], ['hi'], customizer)\n// => true",
    "since": "0.9.0"
  },
  {
    "name": "isError",
    "category": "type",
    "description": "Checks if value is an Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, or URIError object",
    "syntax": "isError(value: unknown): value is Error",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is an error object, else false"
    },
    "example": "isError(new Error)\n// => true\nisError(Error)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isFinite",
    "category": "type",
    "description": "Checks if value is a finite primitive number. Note: This method is based on Number.isFinite",
    "syntax": "isFinite(value: unknown): value is number",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a finite number, else false"
    },
    "example": "isFinite(3)\n// => true\nisFinite(Number.MIN_VALUE)\n// => true\nisFinite(Infinity)\n// => false\nisFinite('3')\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isFunction",
    "category": "type",
    "description": "Checks if value is classified as a Function object",
    "syntax": "isFunction(value: unknown): value is Function",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a function, else false"
    },
    "example": "isFunction(() => {})\n// => true\nisFunction(/abc/)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isInteger",
    "category": "type",
    "description": "Checks if value is an integer. Note: This method is based on Number.isInteger",
    "syntax": "isInteger(value: unknown): value is number",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is an integer, else false"
    },
    "example": "isInteger(3)\n// => true\nisInteger(Number.MIN_VALUE)\n// => false\nisInteger(Infinity)\n// => false\nisInteger('3')\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isLength",
    "category": "type",
    "description": "Checks if value is a valid array-like length. Note: This method is loosely based on ToLength operation",
    "syntax": "isLength(value: unknown): boolean",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a valid length, else false"
    },
    "example": "isLength(3)\n// => true\nisLength(Number.MIN_VALUE)\n// => false\nisLength(Infinity)\n// => false\nisLength('3')\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isMap",
    "category": "type",
    "description": "Checks if value is classified as a Map object",
    "syntax": "isMap(value: unknown): value is Map<unknown, unknown>",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a map, else false"
    },
    "example": "isMap(new Map)\n// => true\nisMap(new WeakMap)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isMatch",
    "category": "type",
    "description": "Performs a partial deep comparison between object and source to determine if object contains equivalent property values. Note: This method is equivalent to partial application with a source object",
    "syntax": "isMatch(object: unknown, source: unknown): boolean",
    "params": [
      {
        "name": "object",
        "type": "unknown",
        "description": "The object to inspect",
        "optional": false
      },
      {
        "name": "source",
        "type": "unknown",
        "description": "The object of property values to match",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if object is a match, else false"
    },
    "example": "const object = { 'a': 1, 'b': 2 };\nisMatch(object, { 'b': 2 })\n// => true\nisMatch(object, { 'b': 1 })\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isMatchWith",
    "category": "type",
    "description": "Like isMatch except that it accepts customizer which is invoked to compare values. If customizer returns undefined, comparisons are handled by the method instead. The customizer is invoked with five arguments: (objValue, srcValue, index|key, object, source).",
    "syntax": "isMatchWith(object: unknown, source: unknown, customizer: (objValue: unknown, srcValue: unknown, key: string) => boolean | undefined): boolean",
    "params": [
      {
        "name": "object",
        "type": "unknown",
        "description": "The object to inspect",
        "optional": false
      },
      {
        "name": "source",
        "type": "unknown",
        "description": "The object of property values to match",
        "optional": false
      },
      {
        "name": "customizer",
        "type": "(objValue: unknown, srcValue: unknown, key: string) => boolean | undefined",
        "description": "The function to customize comparisons",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if object is a match, else false"
    },
    "example": "function isGreeting(value) {\n  return /^h(?:i|ello)$/.test(value);\n}\nfunction customizer(objValue, srcValue) {\n  if (isGreeting(objValue) && isGreeting(srcValue)) {\n    return true;\n  }\n}\nconst object = { 'greeting': 'hello' };\nconst source = { 'greeting': 'hi' };\nisMatchWith(object, source, customizer)\n// => true",
    "since": "0.9.0"
  },
  {
    "name": "isNaN",
    "category": "type",
    "description": "Checks if value is NaN. Note: This method is based on Number.isNaN and not global isNaN which returns true for undefined and other non-number values",
    "syntax": "isNaN(value: unknown): boolean",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is NaN, else false"
    },
    "example": "isNaN(NaN)\n// => true\nisNaN(new Number(NaN))\n// => true\nisNaN(undefined)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isNative",
    "category": "type",
    "description": "Checks if value is a pristine native function. Note: This method can't reliably detect native functions in the presence of the core-js package",
    "syntax": "isNative(value: unknown): boolean",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a native function, else false"
    },
    "example": "isNative(Array.prototype.push)\n// => true\nisNative(() => {})\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isNil",
    "category": "type",
    "description": "Checks if value is null or undefined",
    "syntax": "isNil(value: unknown): value is null | undefined",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is nullish, else false"
    },
    "example": "isNil(null)\n// => true\nisNil(void 0)\n// => true\nisNil(NaN)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isNull",
    "category": "type",
    "description": "Checks if value is null",
    "syntax": "isNull(value: unknown): value is null",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is null, else false"
    },
    "example": "isNull(null)\n// => true\nisNull(void 0)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isNumber",
    "category": "type",
    "description": "Checks if value is classified as a Number primitive or object. Note: To exclude Infinity, -Infinity, and NaN, which are classified as numbers, use the isFinite method",
    "syntax": "isNumber(value: unknown): value is number",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a number, else false"
    },
    "example": "isNumber(3)\n// => true\nisNumber(Number.MIN_VALUE)\n// => true\nisNumber(Infinity)\n// => true\nisNumber('3')\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isObject",
    "category": "type",
    "description": "Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))",
    "syntax": "isObject(value: unknown): value is object",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is an object, else false"
    },
    "example": "isObject({})\n// => true\nisObject([1, 2, 3])\n// => true\nisObject(() => {})\n// => true\nisObject(null)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isObjectLike",
    "category": "type",
    "description": "Checks if value is object-like. A value is object-like if it's not null and has a typeof result of \"object\"",
    "syntax": "isObjectLike(value: unknown): value is object",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is object-like, else false"
    },
    "example": "isObjectLike({})\n// => true\nisObjectLike([1, 2, 3])\n// => true\nisObjectLike(() => {})\n// => false\nisObjectLike(null)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isPlainObject",
    "category": "type",
    "description": "Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null",
    "syntax": "isPlainObject(value: unknown): boolean",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a plain object, else false"
    },
    "example": "function Foo() {\n  this.a = 1;\n}\nisPlainObject(new Foo)\n// => false\nisPlainObject([1, 2, 3])\n// => false\nisPlainObject({ 'x': 0, 'y': 0 })\n// => true\nisPlainObject(Object.create(null))\n// => true",
    "since": "0.9.0"
  },
  {
    "name": "isRegExp",
    "category": "type",
    "description": "Checks if value is classified as a RegExp object",
    "syntax": "isRegExp(value: unknown): value is RegExp",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a regexp, else false"
    },
    "example": "isRegExp(/abc/)\n// => true\nisRegExp('/abc/')\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isSafeInteger",
    "category": "type",
    "description": "Checks if value is a safe integer. An integer is safe if it's an IEEE-754 double precision number which isn't the result of a rounded unsafe integer. Note: This method is based on Number.isSafeInteger",
    "syntax": "isSafeInteger(value: unknown): value is number",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a safe integer, else false"
    },
    "example": "isSafeInteger(3)\n// => true\nisSafeInteger(Number.MIN_VALUE)\n// => false\nisSafeInteger(Infinity)\n// => false\nisSafeInteger('3')\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isSet",
    "category": "type",
    "description": "Checks if value is classified as a Set object",
    "syntax": "isSet(value: unknown): value is Set<unknown>",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a set, else false"
    },
    "example": "isSet(new Set)\n// => true\nisSet(new WeakSet)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isString",
    "category": "type",
    "description": "Checks if value is classified as a String primitive or object",
    "syntax": "isString(value: unknown): value is string",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a string, else false"
    },
    "example": "isString('abc')\n// => true\nisString(1)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isSymbol",
    "category": "type",
    "description": "Checks if value is classified as a Symbol primitive or object",
    "syntax": "isSymbol(value: unknown): value is symbol",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a symbol, else false"
    },
    "example": "isSymbol(Symbol.iterator)\n// => true\nisSymbol('abc')\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isTypedArray",
    "category": "type",
    "description": "Checks if value is classified as a typed array",
    "syntax": "isTypedArray(value: unknown): boolean",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a typed array, else false"
    },
    "example": "isTypedArray(new Uint8Array)\n// => true\nisTypedArray([])\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isUndefined",
    "category": "type",
    "description": "Checks if value is undefined",
    "syntax": "isUndefined(value: unknown): value is undefined",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is undefined, else false"
    },
    "example": "isUndefined(void 0)\n// => true\nisUndefined(null)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isWeakMap",
    "category": "type",
    "description": "Checks if value is classified as a WeakMap object",
    "syntax": "isWeakMap(value: unknown): value is WeakMap<object, unknown>",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a weak map, else false"
    },
    "example": "isWeakMap(new WeakMap)\n// => true\nisWeakMap(new Map)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "isWeakSet",
    "category": "type",
    "description": "Checks if value is classified as a WeakSet object",
    "syntax": "isWeakSet(value: unknown): value is WeakSet<object>",
    "params": [
      {
        "name": "value",
        "type": "unknown",
        "description": "The value to check",
        "optional": false
      }
    ],
    "returns": {
      "type": "any",
      "description": "Returns true if value is a weak set, else false"
    },
    "example": "isWeakSet(new WeakSet)\n// => true\nisWeakSet(new Set)\n// => false",
    "since": "0.9.0"
  },
  {
    "name": "api",
    "category": "utility",
    "description": "Simple HTTP client using fetch (no axios dependency)",
    "syntax": "api(url: string, options?: RequestOptions): Promise<T | { ok: false; message: string }>",
    "params": [
      {
        "name": "url",
        "type": "string",
        "description": "Request URL",
        "optional": false
      },
      {
        "name": "options",
        "type": "RequestOptions",
        "description": "={}] - Request options including method, headers, and body",
        "optional": true
      }
    ],
    "returns": {
      "type": "Promise<T | { ok: false; message: string ",
      "description": ">} Promise with response data or error object"
    },
    "example": "// GET request\nconst data = await api('https://api.example.com/users');\n// POST request\nconst result = await api('https://api.example.com/users', {\n  method: 'POST',\n  body: { name: 'John' }\n});",
    "since": "0.9.8"
  },
  {
    "name": "constant",
    "category": "utility",
    "description": "Creates a function that returns value",
    "syntax": "constant(value: T): () => T",
    "params": [
      {
        "name": "value",
        "type": "T",
        "description": "The value to wrap in a function",
        "optional": false
      }
    ],
    "returns": {
      "type": "() => T",
      "description": "Returns the new constant function"
    },
    "example": "const getAnswer = constant(42);\ngetAnswer(); // 42",
    "since": "0.9.7"
  },
  {
    "name": "extractFromString",
    "category": "utility",
    "description": "Extract value from string using regex",
    "syntax": "extractFromString(str: string, regex: RegExp, type: T): T extends 'string' ? string : T extends 'number' ? number : T extends 'boolean' ? boolean : T extends 'array' ? unknown[] : T extends 'date' ? Date : unknown",
    "params": [
      {
        "name": "str",
        "type": "string",
        "description": "Input string to extract from",
        "optional": false
      },
      {
        "name": "regex",
        "type": "RegExp",
        "description": "Regular expression with capture groups",
        "optional": false
      },
      {
        "name": "type",
        "type": "T",
        "description": "Expected return type ('string' | 'number' | 'boolean' | 'array' | 'date')",
        "optional": false
      }
    ],
    "returns": {
      "type": "ExtractedValue",
      "description": "Extracted and converted value based on type"
    },
    "example": "extractFromString('Price: $25.99', /\\$(\\d+\\.\\d+)/, 'number'); // 25.99\nextractFromString('Active: true', /Active: (\\w+)/, 'boolean'); // true\nextractFromString('Date: 2023-12-25', /Date: (.+)/, 'date'); // Date object",
    "since": "0.9.8"
  },
  {
    "name": "getCountry",
    "category": "utility",
    "description": "Find country by various criteria",
    "syntax": "getCountry({ cc, cn, cf }: { cc?: string; cn?: string; cf?: string }, countries: Country[]): Partial<Country>",
    "params": [
      {
        "name": "{ cc, cn, cf }",
        "type": "{ cc?: string; cn?: string; cf?: string }",
        "description": "The { cc, cn, cf } parameter",
        "optional": false
      },
      {
        "name": "countries",
        "type": "Country[]",
        "description": "Array of countries to search in",
        "optional": false
      }
    ],
    "returns": {
      "type": "Partial<Country>",
      "description": "Found country or empty object if not found"
    },
    "example": "const country = getCountry({ cc: 'US' }, countries);\nconst country2 = getCountry({ cn: 'France' }, countries);",
    "since": "0.9.8"
  },
  {
    "name": "hash",
    "category": "utility",
    "description": "Simple hash function (lightweight alternative to object-hash)",
    "syntax": "hash(obj: unknown): string",
    "params": [
      {
        "name": "obj",
        "type": "unknown",
        "description": "Object or value to hash",
        "optional": false
      }
    ],
    "returns": {
      "type": "string",
      "description": "Simple hash string in base 36"
    },
    "example": "hash('hello'); // \"1k4xd\"\nhash({ a: 1, b: 2 }); // \"1x3k2d\"",
    "since": "0.9.8"
  },
  {
    "name": "identity",
    "category": "utility",
    "description": "Returns the first argument it receives",
    "syntax": "identity(value: T): T",
    "params": [
      {
        "name": "value",
        "type": "T",
        "description": "The value to return",
        "optional": false
      }
    ],
    "returns": {
      "type": "T",
      "description": "Returns value"
    },
    "example": "identity(42); // 42\nidentity('hello'); // 'hello'",
    "since": "0.9.7"
  },
  {
    "name": "iteratee",
    "category": "utility",
    "description": "Creates a function that invokes the iteratee with the arguments it receives",
    "syntax": "iteratee(func?: ((value: T) => R) | Record<string, unknown> | string | [string, unknown] | null): (value: T) => R",
    "params": [
      {
        "name": "func",
        "type": "((value: T) => R) | Record<string, unknown> | string | [string, unknown] | null",
        "description": "The iteratee to transform",
        "optional": true
      }
    ],
    "returns": {
      "type": "(value: T) => R",
      "description": "Returns the callback"
    },
    "example": "iteratee('name')({ name: 'John' }); // 'John'\niteratee(['age', 25])({ age: 25 }); // true",
    "since": "0.9.7"
  },
  {
    "name": "matches",
    "category": "utility",
    "description": "Creates a function that performs a partial deep comparison between a given object and source",
    "syntax": "matches(source: Partial<T>): (obj: T) => boolean",
    "params": [
      {
        "name": "source",
        "type": "Partial<T>",
        "description": "The object of property values to match",
        "optional": false
      }
    ],
    "returns": {
      "type": "(obj: T) => boolean",
      "description": "Returns the new spec function"
    },
    "example": "const isActive = matches({ active: true });\nisActive({ active: true, name: 'John' }); // true",
    "since": "0.9.7"
  },
  {
    "name": "matchesProperty",
    "category": "utility",
    "description": "Creates a function that performs a partial deep comparison between the value at path of a given object to srcValue",
    "syntax": "matchesProperty(path: string | string[], srcValue: unknown): (obj: T) => boolean",
    "params": [
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the property to get",
        "optional": false
      },
      {
        "name": "srcValue",
        "type": "unknown",
        "description": "The value to match",
        "optional": false
      }
    ],
    "returns": {
      "type": "(obj: T) => boolean",
      "description": "Returns the new spec function"
    },
    "example": "const isJohn = matchesProperty('name', 'John');\nisJohn({ name: 'John', age: 25 }); // true",
    "since": "0.9.7"
  },
  {
    "name": "noop",
    "category": "utility",
    "description": "A method that returns undefined",
    "syntax": "noop(): undefined",
    "params": [],
    "returns": {
      "type": "undefined",
      "description": "Returns undefined"
    },
    "example": "noop(); // undefined",
    "since": "0.9.7"
  },
  {
    "name": "property",
    "category": "utility",
    "description": "Creates a function that returns the value at path of a given object",
    "syntax": "property(path: string | string[]): (obj: Record<string, unknown>) => T | undefined",
    "params": [
      {
        "name": "path",
        "type": "string | string[]",
        "description": "The path of the property to get",
        "optional": false
      }
    ],
    "returns": {
      "type": "(obj: Record<string, unknown>) => T | undefined",
      "description": "Returns the new accessor function"
    },
    "example": "const getName = property('name');\ngetName({ name: 'John' }); // 'John'\nconst getDeep = property(['user', 'profile', 'name']);\ngetDeep({ user: { profile: { name: 'Jane' } } }); // 'Jane'",
    "since": "0.9.7"
  },
  {
    "name": "propertyOf",
    "category": "utility",
    "description": "The opposite of property; creates a function that returns the value at a given path of object",
    "syntax": "propertyOf(obj: Record<string, unknown>): (path: string | string[]) => unknown",
    "params": [
      {
        "name": "obj",
        "type": "Record<string, unknown>",
        "description": "The object to query",
        "optional": false
      }
    ],
    "returns": {
      "type": "(path: string | string[]) => unknown",
      "description": "Returns the new accessor function"
    },
    "example": "const object = { a: { b: 2 } };\nconst at = propertyOf(object);\nat('a.b'); // 2\nat(['a', 'b']); // 2",
    "since": "0.9.7"
  },
  {
    "name": "range",
    "category": "utility",
    "description": "Creates an array of numbers progressing from start up to, but not including, end",
    "syntax": "range(start: number, end?: number, step?: number): number[]",
    "params": [
      {
        "name": "start",
        "type": "number",
        "description": "The start of the range",
        "optional": false
      },
      {
        "name": "end",
        "type": "number",
        "description": "The end of the range",
        "optional": true
      },
      {
        "name": "step",
        "type": "number",
        "description": "=1] - The value to increment or decrement by",
        "optional": true
      }
    ],
    "returns": {
      "type": "number[]",
      "description": "Returns the range of numbers"
    },
    "example": "range(4); // [0, 1, 2, 3]\nrange(1, 5); // [1, 2, 3, 4]\nrange(0, 20, 5); // [0, 5, 10, 15]",
    "since": "0.9.7"
  },
  {
    "name": "rangeRight",
    "category": "utility",
    "description": "Like range except that it populates values in descending order",
    "syntax": "rangeRight(start: number, end?: number, step?: number): number[]",
    "params": [
      {
        "name": "start",
        "type": "number",
        "description": "The start of the range",
        "optional": false
      },
      {
        "name": "end",
        "type": "number",
        "description": "The end of the range",
        "optional": true
      },
      {
        "name": "step",
        "type": "number",
        "description": "=1] - The value to increment or decrement by",
        "optional": true
      }
    ],
    "returns": {
      "type": "number[]",
      "description": "Returns the range of numbers"
    },
    "example": "rangeRight(4); // [3, 2, 1, 0]\nrangeRight(1, 5); // [4, 3, 2, 1]",
    "since": "0.9.7"
  },
  {
    "name": "stubArray",
    "category": "utility",
    "description": "Stub function that returns an empty array",
    "syntax": "stubArray(): any[]",
    "params": [],
    "returns": {
      "type": "any[]",
      "description": "Returns a new empty array"
    },
    "example": "stubArray(); // []",
    "since": "0.9.7"
  },
  {
    "name": "stubFalse",
    "category": "utility",
    "description": "Stub function that returns false",
    "syntax": "stubFalse(): false",
    "params": [],
    "returns": {
      "type": "false",
      "description": "Returns false"
    },
    "example": "stubFalse(); // false",
    "since": "0.9.7"
  },
  {
    "name": "stubObject",
    "category": "utility",
    "description": "Stub function that returns an empty object",
    "syntax": "stubObject(): object",
    "params": [],
    "returns": {
      "type": "object",
      "description": "Returns a new empty object"
    },
    "example": "stubObject(); // {}",
    "since": "0.9.7"
  },
  {
    "name": "stubString",
    "category": "utility",
    "description": "Stub function that returns an empty string",
    "syntax": "stubString(): string",
    "params": [],
    "returns": {
      "type": "string",
      "description": "Returns an empty string"
    },
    "example": "stubString(); // ''",
    "since": "0.9.7"
  },
  {
    "name": "stubTrue",
    "category": "utility",
    "description": "Stub function that returns true",
    "syntax": "stubTrue(): true",
    "params": [],
    "returns": {
      "type": "true",
      "description": "Returns true"
    },
    "example": "stubTrue(); // true",
    "since": "0.9.7"
  },
  {
    "name": "times",
    "category": "utility",
    "description": "Invokes the iteratee n times, returning an array of the results",
    "syntax": "times(n: number, iteratee: (index: number) => T): T[]",
    "params": [
      {
        "name": "n",
        "type": "number",
        "description": "The number of times to invoke iteratee",
        "optional": false
      },
      {
        "name": "iteratee",
        "type": "(index: number) => T",
        "description": "The function invoked per iteration",
        "optional": false
      }
    ],
    "returns": {
      "type": "T[]",
      "description": "Returns the array of results"
    },
    "example": "times(3, i => i * 2); // [0, 2, 4]\ntimes(4, () => 'a'); // ['a', 'a', 'a', 'a']",
    "since": "0.9.7"
  },
  {
    "name": "uniqueId",
    "category": "utility",
    "description": "Generates a unique ID",
    "syntax": "uniqueId(prefix?: string): string",
    "params": [
      {
        "name": "prefix",
        "type": "string",
        "description": "=''] - The value to prefix the ID with",
        "optional": true
      }
    ],
    "returns": {
      "type": "string",
      "description": "Returns the unique ID"
    },
    "example": "uniqueId(); // '8h3k2d'\nuniqueId('user_'); // 'user_8h3k2d'",
    "since": "0.9.7"
  }
];

const constantsData = [
  {
    "name": "COUNTRY_DATE_FORMATS",
    "type": "constant",
    "description": "Country date formats by ISO code",
    "value": "Object",
    "preview": "{ AD, AT, BE, BG, CH, ... }",
    "category": "constants",
    "hierarchy": [
      {
        "path": "AD",
        "key": "AD",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "AT",
        "key": "AT",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "BE",
        "key": "BE",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "BG",
        "key": "BG",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "CH",
        "key": "CH",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "CY",
        "key": "CY",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "CZ",
        "key": "CZ",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "DE",
        "key": "DE",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "DK",
        "key": "DK",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "EE",
        "key": "EE",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "ES",
        "key": "ES",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "FI",
        "key": "FI",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "FR",
        "key": "FR",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "GB",
        "key": "GB",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "GR",
        "key": "GR",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "HR",
        "key": "HR",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "HU",
        "key": "HU",
        "value": "YYYY.MM.DD.",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"YYYY.MM.DD.\""
      },
      {
        "path": "IE",
        "key": "IE",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "IS",
        "key": "IS",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "IT",
        "key": "IT",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "LI",
        "key": "LI",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "LT",
        "key": "LT",
        "value": "YYYY.MM.DD",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"YYYY.MM.DD\""
      },
      {
        "path": "LU",
        "key": "LU",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "LV",
        "key": "LV",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "MC",
        "key": "MC",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "MT",
        "key": "MT",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "NL",
        "key": "NL",
        "value": "DD-MM-YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD-MM-YYYY\""
      },
      {
        "path": "NO",
        "key": "NO",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "PL",
        "key": "PL",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "PT",
        "key": "PT",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "RO",
        "key": "RO",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "SE",
        "key": "SE",
        "value": "YYYY-MM-DD",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"YYYY-MM-DD\""
      },
      {
        "path": "SI",
        "key": "SI",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "SK",
        "key": "SK",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "SM",
        "key": "SM",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "TR",
        "key": "TR",
        "value": "DD.MM.YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD.MM.YYYY\""
      },
      {
        "path": "US",
        "key": "US",
        "value": "MM/DD/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"MM/DD/YYYY\""
      },
      {
        "path": "CA",
        "key": "CA",
        "value": "MM/DD/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"MM/DD/YYYY\""
      },
      {
        "path": "JP",
        "key": "JP",
        "value": "YYYY年MM月DD日",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"YYYY年MM月DD日\""
      },
      {
        "path": "CN",
        "key": "CN",
        "value": "YYYY年MM月DD日",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"YYYY年MM月DD日\""
      },
      {
        "path": "KR",
        "key": "KR",
        "value": "YYYY-MM-DD",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"YYYY-MM-DD\""
      }
    ],
    "hasHierarchy": true,
    "since": "0.8.0"
  },
  {
    "name": "DATE_FORMATS",
    "type": "constant",
    "description": "Date format constants",
    "value": "Object",
    "preview": "{ DATE, TIME, DATE_TIME }",
    "category": "constants",
    "hierarchy": [
      {
        "path": "DATE",
        "key": "DATE",
        "value": "DD/MM/YYYY",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY\""
      },
      {
        "path": "TIME",
        "key": "TIME",
        "value": "HH:mm",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"HH:mm\""
      },
      {
        "path": "DATE_TIME",
        "key": "DATE_TIME",
        "value": "DD/MM/YYYY,HH:mm:ss",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"DD/MM/YYYY,HH:mm:ss\""
      }
    ],
    "hasHierarchy": true,
    "since": "0.8.0"
  },
  {
    "name": "REGEX",
    "type": "constant",
    "description": "Common regular expressions",
    "value": "Object",
    "preview": "{ htmlTag, inBrackets, inStrings, tagRegex, openParentheses, ... }",
    "category": "constants",
    "hierarchy": [
      {
        "path": "htmlTag",
        "key": "htmlTag",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      },
      {
        "path": "inBrackets",
        "key": "inBrackets",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      },
      {
        "path": "inStrings",
        "key": "inStrings",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      },
      {
        "path": "tagRegex",
        "key": "tagRegex",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      },
      {
        "path": "openParentheses",
        "key": "openParentheses",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      },
      {
        "path": "allSpaces",
        "key": "allSpaces",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      },
      {
        "path": "datetime",
        "key": "datetime",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      },
      {
        "path": "email",
        "key": "email",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      },
      {
        "path": "url",
        "key": "url",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      },
      {
        "path": "number",
        "key": "number",
        "value": {},
        "type": "object",
        "level": 0,
        "hasChildren": true,
        "children": 0
      }
    ],
    "hasHierarchy": true,
    "since": "0.8.0"
  },
  {
    "name": "RESPONSE_CODES",
    "type": "constant",
    "description": "Response codes",
    "value": "Object",
    "preview": "{ NOT_INIT, IS_INIT, NOT_FOUND_INIT, NOT_FOUND }",
    "category": "constants",
    "hierarchy": [
      {
        "path": "NOT_INIT",
        "key": "NOT_INIT",
        "value": 0,
        "type": "number",
        "level": 0,
        "hasChildren": false,
        "preview": "0"
      },
      {
        "path": "IS_INIT",
        "key": "IS_INIT",
        "value": 1,
        "type": "number",
        "level": 0,
        "hasChildren": false,
        "preview": "1"
      },
      {
        "path": "NOT_FOUND_INIT",
        "key": "NOT_FOUND_INIT",
        "value": 2,
        "type": "number",
        "level": 0,
        "hasChildren": false,
        "preview": "2"
      },
      {
        "path": "NOT_FOUND",
        "key": "NOT_FOUND",
        "value": 9,
        "type": "number",
        "level": 0,
        "hasChildren": false,
        "preview": "9"
      }
    ],
    "hasHierarchy": true,
    "since": "0.8.0"
  },
  {
    "name": "STATUS_COLORS",
    "type": "constant",
    "description": "Common colors for status indicators",
    "value": "Object",
    "preview": "{ ACTIVE, INACTIVE, PENDING, ERROR, WARNING, ... }",
    "category": "constants",
    "hierarchy": [
      {
        "path": "ACTIVE",
        "key": "ACTIVE",
        "value": "green",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"green\""
      },
      {
        "path": "INACTIVE",
        "key": "INACTIVE",
        "value": "grey",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"grey\""
      },
      {
        "path": "PENDING",
        "key": "PENDING",
        "value": "orange",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"orange\""
      },
      {
        "path": "ERROR",
        "key": "ERROR",
        "value": "red",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"red\""
      },
      {
        "path": "WARNING",
        "key": "WARNING",
        "value": "yellow",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"yellow\""
      },
      {
        "path": "INFO",
        "key": "INFO",
        "value": "blue",
        "type": "string",
        "level": 0,
        "hasChildren": false,
        "preview": "\"blue\""
      }
    ],
    "hasHierarchy": true,
    "since": "0.9.0"
  }
];

// Package information
const packageInfo = {
  "name": "generic-functions.mlai",
  "version": "0.9.7",
  "description": "A comprehensive, lightweight utility library",
  "author": {
    "name": "Mathieu-ai",
    "email": "mathieu.lievre.pro@outlook.com",
    "url": "https://github.com/Mathieu-ai"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Mathieu-ai/generic-functions.git"
  },
  "homepage": "https://github.com/Mathieu-ai/generic-functions#readme",
  "bugs": {
    "url": "https://github.com/Mathieu-ai/generic-functions/issues"
  }
};

// Export for use in documentation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { functionsData, constantsData, packageInfo };
}