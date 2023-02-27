import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { ExtractOptions, ExtractionResult, logErrorOptions } from './props';

/**
    Make a request with [axios](https://axios-http.com/fr/docs/intro) to return the data
    * * 🟢 Function is generic
    * * 🔴 needs [axios](https://axios-http.com/fr/docs/intro) to function
    @param {String} env
    @returns Object | data
    @example
        _API("http://localhost:8080/members")
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
    Capitalizes the given string
    * * 🟢 it can takes any string
    @param {String} str
    @returns String
    @example
        capitalize('hello')
        // Prints: Hello
*/
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
    * Removes all accents from the string.
    * * 🟢 Function is generic
    @param str - string
    @returns string.
    @example
        const cleanedText = purify("Héllo Wörld");
        console.log(cleanedText);
        // Output: "Hello World"
 */
export function purify(str: string): string {
    return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
}

/**
    Calculate newest and oldest years
    * * 🔴 needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
    * * 🟢 Function is generic
    @param {object[]} arr
    @param {string} str
    @returns Number[]
    @example
        minAndMax(ArrOfObj, 'field_ddeb')
        // Prints: [1900,2030]
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
    Returns a 4-letter acronym
    * * 🟢 Function is generic
    @param str The string
    @returns A 4-letter acronym
    @example
        getAcronym("Toto titi Mathieu Dev Wow");
        // Returns, e.g, "TTMD"
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
    Convert string without the html breaklines
    * * 🟢 Function is generic
    @example
        console.log(removeBreakLines("A String\r\n breaklines"));
        // Prints: AStringBreaklines
*/
export function removeBreakLines(str: string): string {
    return str
        .replace(/[\r\n]+/g, ' ')
        .replace(/ {2,}/g, ' ')
        .trim();
}

/**
    Sort an array of objects by a specified property
    * * 🟢 Function is generic
    * * 🟠 Use [purify]('https://www.npmjs.com/package/generic-functions.mlai') from my module
    @param {Object[]} param.arr - Array of objects to sort
    @param {string} param.prop - Property by which to sort objects
    @returns {Object[]} - Sorted array of objects
    @example
        import { sort } from 'generic-function.mlai';
        const countries = [
            { name: 'France' }
            { name: 'Australia'},
        ];

        const sortedCountries = sort({ arr: countries, prop: 'name' });
        // Prints: [ { name: 'Australia'}, { name: 'France'} ]
*/
export function sort({ arr, prop }: { arr: any[]; prop: string }): object[] {
    return arr.sort((a: any, b: any) => (purify(a[prop]) > purify(b[prop]) ? 1 : -1));
}

/**
    Flatten an object and return the values of the specified keys as a string.
    * * 🟢 Function is generic
    @param {object | object[]} obj - The object to flatten.
    @param {string[]} [keys=[]] - The keys to extract from the object. If '*' is passed, it will return all the values.
    @return {string} - The values of the specified keys as a string, separated by a comma.
    @example
        const obj = {
         "id": 1,
         "name": "John",
         "lastName": "Doe",
         "coor": {
             "lat": 23.56,
             "long": 784.542
         },
         "family": {
             "parents": [
                 { "name": "Pierre", "lastName": "Doe", "role": "father" },
                 { "name": "Blanche", "lastName": "Doe", "role": "mother" }
             ],
             "broAndSis": [
                 { "name": "Jean", "lastName": "Doe", "role": "brother" },
                 { "name": "Clementine", "lastName": "Doe", "role": "sister" }
             ]
         },
         "moneyPerTrim": [1500, 1521, 1521]
        };
        flat(obj, ['name','lastName','lat','long']);
        // 'John, Doe, 23.56, 784.542'
        flat(obj);
        // 'John, Doe, 23.56, 784.542, Pierre, Blanche, Jean, Clementine, Doe, 1500, 1521, 1521'
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
    Parse a string to a number if possible
    * * 🟢 function is generic
    @param {String} str - the String
    @return {String} - The parsed string.
    @example
        const str1 = "2"
        const str2 = "two"
        number(str1)
        // 2
        number(str2)
        // 'two'
*/
export function number(str: string): number | string {
    const num = parseFloat(str);
    return isNaN(num) ? str : num;
}

/**
    * Extracts a value from a string using a regex to extract the value with it specific type.
    * * 🟢 Function is generic
    @param {ExtractOptions} options - object containing the string, the regexp and type
    @returns {ExtractionResult} - The value with its data type or empty string if there's no match.
    @example
        const str = "The meaning of life is 42";
        const reg = /\d+/;
        const type = "number";
        console.log(extractFromString({ str, reg, type }));
        // 42
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
    * Gets error information from an Axios error
    * * 🟢 Function is generic
    @param options - The options object.
    @param options.err - The error object 
    @param [options.log] - defines if the function logs the error information . Defaults to false.
    @returns The error information's
*/
export function axiosError({ err, log }: logErrorOptions) {
    const errorInfo = {
        message: err?.message,
        code: err?.code,
        method: err.request.method,
        status: err.response.status,
        url: err.config.url
    };

    if (log) {
        console.error('Axios error:');
        console.error(errorInfo);
    } else {
        return errorInfo;
    }
}

/**
    Capitalize the value passed
    * * 🟢 Function is generic
    @param data The data to handle (string, object, or array)
    @returns The handled data
    @throws Error if the data is not a string, object, or array
    @example
        handleData('Hello World');
        // Prints: "HELLO WORLD"
        handleData({ message: 'Hello World' });
        // Prints: { message: "HELLO WORLD" }
        handleData([1, 'Hello World', { message: 'Hello World' }]);
        // Prints: [1, "HELLO WORLD", { message: "HELLO WORLD" }]
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

/*
ex: cn => 'United States' => /(\bUnited States\b)/i 

🟢 :
    'United States'
    'The United States'
    'united states'
    'UNITED STATES'

🔴 :
    'United States of America'
    'unitedstates'
    'united-state'
*/

/**
    Find a country from a given array of countries based on a set of search parameters
    * * 🟢 Function is generic
    @param {Object} searchParams - search parameters
    @param {string} [searchParams.cc] - 2 country code
    @param {string} [searchParams.cn] -  country name
    @param {string} [searchParams.cf] - country flag
    @param {Array} countries - An array of country
    @returns {Object | undefined} - A country object or undefined if no match is found
    @example
        const countries = [
            { name: { common: 'France', official: 'French Republic' }, cca2: 'FR', altNames: 'FR,French Republic,République française', flag: '🇫🇷' },
        ];
        const fr1 = getCountry({ cc: "FR" }, countries); 
        // Returns {...}
        const fr2 = getCountry({ cn: "France" }, countries); 
        // Returns {...}
        const fr3 = getCountry({ cf: "🇫🇷" }, countries); 
        // Returns {...}
        const invalid = getCountry({ cc: "INVALID" }, countries); 
        // Returns undefined
*/
export function getCountry({ cc, cn, cf }: { cc?: string; cn?: string; cf?: string }, countries: any[]): object | undefined {
    const normalizedCn = cn ? purify(cn) : undefined;

    function searchInAltNames(altNames: string) {
        return new RegExp(`\\b${normalizedCn}\\b`, 'i').test(altNames);
    }

    const country = countries
        .sort((a, b) => (a.cca2 > b.cca2 ? 1 : -1))
        .find(({ name, altNames, cca2, flag }) => name.common === normalizedCn || name.official === normalizedCn || searchInAltNames(purify(altNames)) || cca2 === cc || flag === cf);

    return country ? country : undefined;
}

/**
    * Format current time to any format specified
    * * 🔴 needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
    * * 🟢 Function is generic
    @param {String} str
    @returns String
    @example
        now(Date.now(), "DD/MM/YYYY")
        // Prints => 01/10/2022
*/
export function now(str?: string): string | Dayjs {
    return str ? dayjs(new Date(Date.now())).format(str) : dayjs(new Date(Date.now()));
}

/**
    Get number of seconds from now to midnight
    * * 🟢 Function is generic
    @returns Number
    @example
        secondsToTomorrow()
        // Prints => 48087
 */
export function secondsToTomorrow(): number {
    // var d = new Date()
    // const toTomorrow: number = Math.round((-d + d.setHours(24, 0, 0, 0)) /Example Example6e4) * 60
    const now = new Date(Date.now()).getHours();
    return -now + 24 * 3600;
}

/**
    Takes a String to check if is a Date
    * * 🟢 Function is generic
    @param {String} date
    @returns Boolean
    @example
        isDate("I Love Dev")
        // Prints: false
        isDate(Date.now())
        // Prints: true
 */
export function isDate(date: Date): boolean {
    return Object.prototype.toString.call(date) === '[object Date]';
}

/**
    Takes a String to format to any date format
    * * 🔴 needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
    * * 🟢 Function is generic
    @param {Date} date
    @param {String} format
    @returns String
    @example
        formatDate(Date.now(), 'YYYY/MM/DD')
        // Prints: 2022/12/31
*/
export function formatDate(date: Date, format: string): string {
    return dayjs(date).format(format);
}
