import axios from 'axios';
import dayjs from 'dayjs';
import { ExtractOptions, ExtractionResult } from './props';

/**
 * Make a request with [axios](https://axios-http.com/fr/docs/intro) to return the data
 * * 🟢 Function is generic as long the api is valid
 * * 🔴 needs [axios](https://axios-http.com/fr/docs/intro) to function
 * * Example :
 * ```js
 * _API("http://localhost:8080/members")
 * ```
 * ___
 * @param {String} env
 * @returns Object | data
 */
export async function api(env: string): Promise<object[]> {
    const res = await axios.request({
        url: env,
        method: 'GET'
    });
    if (res.status != 200) throw new Error('axios request is different from 200');
    return res.data;
}

/**
 * Capitalizes the given string
 * * 🟢 it can takes any string
 * * Example :
 * ```js
 * capitalize('hello')
 * // Prints: Hello
 * ```
 * ___
 * @param {String} str
 * @returns String
 */
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Removes all accents from the string.
 *
 * @param str - string
 * @returns string.
 *
 * @example
 * ```typescript
 * const textWithDiacritics = "Héllo Wörld";
 * const cleanedText = cleanText(textWithDiacritics);
 * console.log(cleanedText);
 * // Output: "Hello World"
 * ```
 */
export function cleanText(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Calculate newest and oldest years
 * * 🔴 needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
 * * 🟢 it can takes any Array of objects
 * * Example :
 * ```js
 * minAndMax(ArrOfObj, 'field_ddeb')
 * // Prints: [1900,2030]
 * ```
 * ___
 * @param {object[]} arr
 * @param {string} str
 * @returns Number[]
 */
export function minAndMaxYears(
    arr: any[],
    str: string
): {
    min: number;
    max: number;
} {
    let min = 0;
    arr.forEach((m) => {
        const year = dayjs(m[str]).year();
        if (!min || year < min) min = year;
    });
    return {
        min: Math.round(min / 10) * 10,
        max: Math.round(dayjs(Date.now()).year() / 10) * 10 + 10
    };
}

/**
 * Returns a 4-letter acronym
 *
 * @param str The string
 * @returns A 4-letter acronym
 *
 * @example
 * getAcronym("Toto titi Mathieu Dev Wow");
 * // Returns, e.g, "TTMD"
 */
export function getInitials(str: string): string {
    // maps the first letter of each word
    const initials = str.split(' ').map((word) => word[0]);
    let result = '';
    for (let i = 0; i < 4 && initials.length > 0; i++) {
        // random index within the initials length
        const randomIndex = Math.floor(Math.random() * initials.length);
        // adds the character
        result += initials[randomIndex];
        // removes the character that was just added to the result
        initials.splice(randomIndex, 1);
    }
    return result.toUpperCase();
}

/**
 * Convert `a` without the html breaklines and with [`lodash`](https://lodash.com/docs/4.17.15#camelCase), it's transformed to camelCase
 *
 * ```js
 * const str = "A String\r\n breaklines";
 * console.log(removeBreakLines(str));
 * // Prints: AStringBreaklines
 * ```
 */
export function removeBreakLines(str: string): string {
    return str
        .replace(/[\r\n]+/g, ' ')
        .replace(/ {2,}/g, ' ')
        .trim();
}

/**
 * Sort an array of objects by a specified property
 * * 🟠 Use [cleanText]('https://www.npmjs.com/package/generic-functions.mlai') from my module
 * @param {Object[]} param.arr - Array of objects to sort
 * @param {string} param.prop - Property by which to sort objects
 * @returns {Object[]} - Sorted array of objects
 *
 * @example
 * import { mlFn } from 'generic-function.mlai';
 *
 * const countries = [
 *  { name: 'Australia', population: 24016400 },
 *  { name: 'Germany', population: 83783942 }
 *  { name: 'Brazil', population: 210147125 },
 * ];
 *
 * const sortedCountries = mlFn.sort({ arr: countries, prop: 'name' });
 * // sortedCountries is now [
 * //  { name: 'Australia', population: 24016400 },
 * //  { name: 'Brazil', population: 210147125 },
 * //  { name: 'Germany', population: 83783942 }
 * // ]
 */
export function sort({ arr, prop }: { arr: any[]; prop: string }): object[] {
    return arr.sort((a: any, b: any) => (cleanText(a[prop]) > cleanText(b[prop]) ? 1 : -1));
}

/**
 * Simplify a string by lowercasing and removing diacritical marks
 *
 *  🟠 Use [cleanText]('https://www.npmjs.com/package/generic-functions.mlai') from my module
 * @param {string} str - The string to simplify
 * @returns {string} - The simplified string
 *
 * @example
 * import { mlFn } from 'generic-function.mlai';
 *
 * const originalString = 'Héllö Wörld!';
 *
 * const simplifiedString = mlFn.simplify(originalString);
 * // simplifiedString is now 'hello world!'
 */
export function simplify(str?: string): string {
    return str ? cleanText(str.toLowerCase()) : '';
}

/**
 * Flatten an object and return the values of the specified keys as a string.
 *
 * @param {object | object[]} obj - The object to flatten.
 * @param {string[]} [keys=[]] - The keys to extract from the object. If '*' is passed, it will return all the values.
 * @return {string} - The values of the specified keys as a string, separated by a comma.
 *
 * @example
 *
 * const obj = {
 *  "id": 1,
 *  "name": "John",
 *  "lastName": "Doe",
 *  "coor": {
 *      "lat": 23.56,
 *      "long": 784.542
 *  },
 *  "family": {
 *      "parents": [
 *          { "name": "Pierre", "lastName": "Doe", "role": "father" },
 *          { "name": "Blanche", "lastName": "Doe", "role": "mother" }
 *      ],
 *      "broAndSis": [
 *          { "name": "Jean", "lastName": "Doe", "role": "brother" },
 *          { "name": "Clementine", "lastName": "Doe", "role": "sister" }
 *      ]
 *  },
 *  "moneyPerTrim": [1500, 1521, 1521]
 * };
 * flat(obj, ['name','lastName','lat','long']);
 * // 'John, Doe, 23.56, 784.542'
 * flat(obj, ['*']);
 * // 'John, Doe, 23.56, 784.542, Pierre, Blanche, Jean, Clementine, Doe, 1500, 1521, 1521'
 */
export function flat(obj: object | object[] | number | string | boolean, keys: string[] = []): string {
    const result: (string | number | boolean)[] = [];

    function iterate(o: object | object[] | number | string | boolean) {
        if (Array.isArray(o)) {
            o.forEach((val) => iterate(val));
        } else if (typeof o === 'object') {
            Object.entries(o).forEach(([key, val]) => {
                if (keys.length === 0 || keys.includes('*')) {
                    iterate(val);
                } else if (keys.includes(key) && !Array.isArray(val)) {
                    result.push(val);
                }
            });
        } else {
            result.push(o);
        }
    }

    iterate(obj);
    return result.join(', ').replace(', ,', ',');
}

/**
 * Get a country from a list of countries based on a country code or a country name.
 *
 * 🟠- Use [simplify]('https://www.npmjs.com/package/generic-functions.mlai') from my module
 * @param {{ cc?: string; cn?: string }} { cc, cn } - An object containing the country code (cc) and/or country name (cn) to search for.
 * @param {type[]} countries - The list of countries to search in.
 * @return {(type | undefined)} - The found country, or undefined if not found.
 *
 * @example
 *
 * const countries = [
 *      { "name": { "common": "United States", "official": "United States of America" }, "cca2": "US" },
 *      { "name": { "common": "France", "official": "French Republic" }, "cca2": "FR" },
 *      { "name": { "common": "Germany", "official": "Federal Republic of Germany" }, "cca2": "DE" },
 *  ]
 *
 * GetCountry({ cc: 'US' }, countries)
 * // { "name": { "common": "United States", "official": "United States of America" }, "cca2": "US" }
 *
 * GetCountry({ cn: 'france' }, countries)
 * // { "name": { "common": "France", "official": "French Republic" }, "cca2": "FR" }
 */
export function GetCountry({ cc, cn }: { cc?: string; cn?: string }, countries: any[]): object | undefined {
    const searchInAltNames = (altNames: string) => {
        if (!altNames) return false;
        return altNames.split(',').some((alt: any) => alt.trim() === simplify(cn));
    };

    return countries
        .sort((a, b) => (a.cca2 > b.cca2 ? 1 : -1))
        .find(({ name, altNames, cca2 }) => simplify(name.common) === simplify(cn) || simplify(name.official) === simplify(cn) || searchInAltNames(simplify(altNames)) || cca2 === cc);
}

/**
 * Parse a string to a number if possible
 *
 * 🟢 function is generic
 * @param {String} str - the String
 * @return {String} - The parsed string.
 *
 * @example
 *```typescript
 * const str1 = "2"
 * const str2 = "two"
 * number(str1)
 * // 2
 * number(str2)
 * // 'two'
 *```
 */
export function number(str: string): number | string {
    const num = parseFloat(str);
    return isNaN(num) ? str : num;
}

/**
 * Extracts a value from a string using a regex to extract the value with it specific type.
 * @param {ExtractOptions} options - object containing the string to extract from, the regular expression to use, and the desired data type of the extracted value.
 * @returns {ExtractionResult} - The value with its data type or empty string if no there's no match.
 * @example
 * ```js
 * const str = "The meaning of life is 42";
 * const reg = /\d+/;
 * const type = "number";
 * console.log(extractFromString({ str, reg, type }));
 * // 42
 * ```
 */
export function extractFromString({ str, reg, type }: ExtractOptions): ExtractionResult {
    const match = str.match(reg);
    if (match) {
        switch (type) {
            case 'string':
                return match[2] || '';
            case 'boolean':
                // true if the second captured group is 'true' or 'false'
                return match[2] === 'true' || 'false' ? match[2] : null;
            case 'array':
                // return the splitted fourth captured group and parse each with the number function
                return match[4].split(',').map((item: string) => number(item));
            case 'number':
                return parseInt(match[2]) || 0;
            case 'date':
                // parse string to Date
                const datetime = new Date(match[2]);
                // parse failed => new Date
                return isNaN(datetime.getTime()) ? new Date() : datetime;
            default:
                // type not recognized => return string
                return match[0];
        }
    } else {
        return '';
    }
}

/**
 * Logs information from an Axios error or app error
 *
 * @param {any} err - The error object
 * @returns {void}
 */
export function logError(err: any): void {
    if (err.isAxiosError) {
        console.error('Axios error:');
        console.error(`Message: ${err.message}`);
        console.error(`Status code: ${err.response.status}`);
        console.error(`URL: ${err.config.url}`);
    } else {
        console.error('Application error:');
        console.error(`Message: ${err.message}`);
        console.error(`Stack trace: ${err.stack}`);
    }
}

/**
 * Capitalize the value passed
 *
 * @param data The data to handle (string, object, or array)
 *
 * @returns The handled data
 *
 * @throws Error if the data is not a string, object, or array
 *
 * @example
 *
 * handleData('Hello World');
 * // returns "HELLO WORLD"
 *
 * handleData({ message: 'Hello World' });
 * // returns { message: "HELLO WORLD" }
 *
 * handleData([1, 'Hello World', { message: 'Hello World' }]);
 * // returns [1, "HELLO WORLD", { message: "HELLO WORLD" }]
 */
export function toUpperCase(data: string | object | any[] | any): string | object | any[] {
    if (typeof data === 'string') {
        return data.toUpperCase();
    }
    if (Array.isArray(data)) {
        return data.map((item) => toUpperCase(item));
    }
    if (typeof data === 'object') {
        const upperCaseData: { [key: string]: string | object | any[] } = {};
        for (const key in data) {
            upperCaseData[key] = toUpperCase(data[key]);
        }
        return upperCaseData;
    }
    return data;
}
