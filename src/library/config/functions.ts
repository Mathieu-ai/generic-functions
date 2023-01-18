import axios from 'axios';
import dayjs from 'dayjs';
import { camelCase, deburr, replace, toString } from 'lodash';

/**
 * Capitalizes the given string
 * * ✔️ - it can takes any string
 * * Example :
 * ```js
 * $capitalize('hello')
 * // Prints: Hello
 * ```
 * ___
 * @param {String} str
 * @returns String
 */
export function $capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Calculate newest and oldest years
 * * 🚫 - needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
 * * ✔️ - it can takes any Array of objects
 * * Example :
 * ```js
 * $minAndMax(ArrOfObj, 'field_ddeb')
 * // Prints: [1900,2030]
 * ```
 * ___
 * @param {object[]} arr
 * @param {string} str
 * @returns Number[]
 */
export async function $minAndMaxYears(
    arr: any[],
    str: string
): Promise<{
    min: number;
    max: number;
}> {
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
 * Create a new array from the array of objects based on the passed param
 * * ✔️ - it can takes any Array of objects
 * * Example :
 * ```js
 * $getState(members, 'm.field_state')
 * // Prints: [
        {
            type: 'success',
            color: 'teal-3',
            icon: 'alpha-a-circle',
            state: 'Active member'
        }
    ]
 * ```
 * ___
 * @param {object[]} arr
 * @param {String} str
 * @returns object[]
 */
export async function $getProp(arr: any[], str: string): Promise<object[]> {
    return [...new Set(arr.map((v) => v[str]))];
}

/**
 * Remove duplicate object
 * * ✔️ - it can takes any Array of objects
 * * Example :
 * ```js
 * $removeDuplicates([ {state:"one"}, {state:"one"} ], 'state')
 * // Prints: [{state: "one"}]
 * ```
 * ___
 * @param {object[]} arr
 * @param {string} str
 * @returns object[]
 */
export async function $removeDuplicates(arr: any[], str: string): Promise<object[]> {
    return arr.filter((v, i, a) => a.findIndex((v2) => v2[str] === v[str]) === i);
}

/**
 * Get Prop in object and remove duplicates
 * * ⚠️ - calls $getState & $removeDuplicates
 * * ✔️ - it can takes any Array of objects
 * * Example :
 * ```js
 * $COPRAD([ {state:"one", title: "A"}, {state:"one", title: "B"} ], 'state')
 * // Prints: [{state: "one"}]
 * ```
 * ___
 * @param {object[]} arr
 * @param {string} str
 * @returns object[]
 */
export async function $COPRAD(arr: object[], str: string): Promise<object[]> {
    return $removeDuplicates(await $getProp(arr, str), str);
}

/**
 * * Takes a String to take the "initials"
 * * ✔️ - Function is generic, it can takes any string for any case to take the "initials"
 * * Example :
 * ```js
 * getInitials("I Love Dev")
 * // Prints: ILD
 * ```
 * @param {String} str
 * @returns String
 */
export function $getInitials(str: string): string {
    const parts = str.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0];
        }
    }
    return initials;
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
export function $removeBreakLines(str: string): string {
    return (str = str.includes('\n') ? camelCase(str.replace(/[\r\n]/gm, ' ')) : str);
}

/**
 * Function that return a transformed string
 * * 🚫 - needs [lodash](https://lodash.com/) to function
 * * ⚠️ - Functional only with Array of string or number
 * * ✔️ - generic, it is a string
 * ___
 * ```js
 * const tbNbr = ['One', 2];
 * console.log($replace(tbNbr, ',', ' '));
 * // Prints: 'One 2'
 * ```
 * ___
 * @param {Array} arr
 * @param {String} what
 * @param {String} to
 * @returns String
 */
export function $replace(arr: (string | number)[], what: string, to: string): string {
    return replace(toString(arr), what, to);
}

/**
 * * Takes the API prop in .env to make a request with axios
 * * ⚠️ - Custom response is send, it return the data that is refactored with custom function or a custom code
 * * 🚫 - needs [axios](https://axios-http.com/fr/docs/intro) to function
 * * ✔️ - Function is generic, it can takes any string as long the api is valid
 * * Example :
 * ```js
 * _API("http://localhost:8080/members")
 * ```
 * ___
 * @param {String} env
 * @returns Object | data
 */
export async function $api(env: string): Promise<object[]> {
    const res = await axios.request({
        url: env,
        method: 'GET'
    });
    if (res.status != 200) throw new Error('axios request is different from 200');
    return res.data;
}

/**
 * Simplify a string by lowercasing and removing diacritical marks
 *
 *  ⚠️ - Use [deburr]('https://lodash.com/docs/4.17.15#deburr') from lodash
 * @param {string} str - The string to simplify
 * @returns {string} - The simplified string
 *
 * @example
 * import { simplify } from 'generic-function.mlai';
 *
 * const originalString = 'Héllö Wörld!';
 *
 * const simplifiedString = simplify(originalString);
 * // simplifiedString is now 'hello world!'
 */
export function $simplify(str?: string): string {
    return str ? deburr(str.toLowerCase()) : '';
}

/**
 * Get a country from a list of countries based on a country code or a country name.
 *
 * ⚠️ - Use [$simplify]('https://www.npmjs.com/package/generic-functions.mlai') from lodash
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
 * $GetCountry({ cc: 'US' }, countries)
 * // { "name": { "common": "United States", "official": "United States of America" }, "cca2": "US" }
 *
 * $GetCountry({ cn: 'france' }, countries)
 * // { "name": { "common": "France", "official": "French Republic" }, "cca2": "FR" }
 */
export async function $GetCountry({ cc, cn }: { cc?: string; cn?: string }, countries: any[]): Promise<any> {
    const searchInAltNames = (altNames: string) => {
        if (!altNames) return false;
        return altNames.split(',').some((alt: any) => alt.trim() === $simplify(cn));
    };

    return countries
        .sort((a, b) => (a.cca2 > b.cca2 ? 1 : -1))
        .find(({ name, altNames, cca2 }) => $simplify(name.common) === $simplify(cn) || $simplify(name.official) === $simplify(cn) || searchInAltNames($simplify(altNames)) || cca2 === cc);
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
 * $flat(obj, ['name','lastName','lat','long']);
 * // 'John, Doe, 23.56, 784.542'
 * $flat(obj, ['*']);
 * // 'John, Doe, 23.56, 784.542, Pierre, Blanche, Jean, Clementine, Doe, 1500, 1521, 1521'
 */
export async function $flat(obj: object | object[] | number | string | boolean, keys: string[] = []): Promise<string> {
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
 * Combines the state, bgColor, icon, and type properties of all filtered companies and
 * returns a single object with the combined properties.
 *
 * @param obj - The object that needs to be updated with the combined properties of filtered companies
 * @param tbState - An array of companies that need to be filtered
 *
 * @returns - An object with the combined properties of filtered companies
 *
 * @example
 * const companies = [
 *  { state: "California", bgColor: "red", icon: "CA", type: "state" },
 *  { state: "New York", bgColor: "blue", icon: "NY", type: "state" },
 *  { state: "Texas", bgColor: "green", icon: "TX", type: "state" }
 * ]
 * const obj = {state: "California"}
 * const result = await addState({ obj, tbState: companies });
 * console.log(result)
 * // { state: "California", bgColor: "red", icon: "CA", type: "state" }
 */
export async function $addState({ obj, tbState }: { obj: any; tbState: any[] }) {
    const filteredCompanies = tbState.filter((c) => Object.keys(obj).some((key) => obj[key] && key === c.state));
    const initialAcc = { state: '', bgColor: '', icon: '', type: '' };
    const combinedProperties = filteredCompanies.reduce((acc, curr) => {
        acc.state += `${curr.state}, `;
        acc.bgColor += `${curr.bgColor}, `;
        acc.icon += `${curr.icon}, `;
        acc.type += `${curr.type}, `;
        return acc;
    }, initialAcc);

    obj = {
        state: combinedProperties.state.slice(0, -2),
        bgColor: combinedProperties.bgColor.slice(0, -2),
        icon: combinedProperties.icon.slice(0, -2),
        type: combinedProperties.type.slice(0, -2)
    };
    return obj;
}

/**
 * Sort an array of objects by a specified property

 * ⚠️ - Use [deburr]('https://lodash.com/docs/4.17.15#deburr') from lodash
 * @param {Object[]} param.arr - Array of objects to sort
 * @param {string} param.prop - Property by which to sort objects
 * @returns {Object[]} - Sorted array of objects
 *
 * @example
 * import { $sort } from 'generic-function.mlai';
 *
 * const countries = [
 *  { name: 'Australia', population: 24016400 },
 *  { name: 'Brazil', population: 210147125 },
 *  { name: 'Germany', population: 83783942 }
 * ];
 *
 * const sortedCountries = $sort({ arr: countries, prop: 'name' });
 * // sortedCountries is now [
 * //  { name: 'Australia', population: 24016400 },
 * //  { name: 'Brazil', population: 210147125 },
 * //  { name: 'Germany', population: 83783942 }
 * // ]
 */
export function $sort({ arr, prop }: { arr: any[]; prop: string }): object[] {
    return arr.sort((a: any, b: any) => (deburr(a[prop]) > deburr(b[prop]) ? 1 : -1));
}
