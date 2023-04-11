import request from "axios";
import { decodeHTML } from 'entities';
import objectHash from 'object-hash';
import dayjs, { Dayjs } from "dayjs";
import {
    ExtractionResult,
    logErrorOptions,
    timeUnit,
    timeUnitMap,
    formatType,
    codeISO,
    typeOfCountries,
    FlatOptions,
    compareTypes_o,
    compareTypes_t,
    number_t,
} from "./types";
import { mlProp } from "./props";

const {
    Dates: { DATE_ISO },
    Reg: { allSpaces },
} = mlProp;
/**
    Make a request with [axios](https://axios-http.com/fr/docs/intro) to return the data
    * * 🟢 Function is generic
    * * 🔴 needs [axios](https://axios-http.com/fr/docs/intro) to function
    @param {String} env
    @return Object | data
    @example
        api("http://localhost:8080/members")
*/
export async function api(env: string): Promise<object[]> {
    const res = await request({
        url: env,
        method: "GET",
    });
    if (res.status != 200)
        throw new Error("axios request is different from 200");
    return res.data;
}

/**
    Capitalizes the given string
    * * 🟢 it can takes any string
    @param {String} str
    @return String
    @example
        capitalize('hello')
        // Hello
*/
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
    * Removes all accents from the string.
    * * 🟢 Function is generic
    @param str - string
    @return string.
    @example
        const cleanedText = purify("Héllo Wörld");
        console.log(cleanedText);
        // Output: "Hello World"
 */
export function purify(str: any): string {
    return typeof str === "string"
        ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : "";
}

/**
    Calculate newest and oldest years
    * * 🔴 needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
    * * 🟢 Function is generic
    @param {object[]} arr
    @param {string} str
    @return Number[]
    @example
        minAndMax(ArrOfObj, 'field_ddeb')
        // [1900,2030]
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
        max: Math.round(dayjs(Date.now()).year() / 10) * 10 + 10,
    };
}

/**
    Returns a 4-letter acronym
    * * 🟢 Function is generic
    @param str The string
    @return A 4-letter acronym
    @example
        getAcronym("Toto titi Mathieu Dev Wow");
        // Returns, e.g, "TTMD"
*/
export function getInitials(str: string): string {
    return str
        .trim()
        .split(/\s+/)
        .reduce((initials: string[], word: string) => {
            const firstLetter = word.charAt(0);
            if (/^[A-Za-z]$/.test(firstLetter) && initials.length < 4) {
                if (/^[A-Z]$/.test(firstLetter)) {
                    initials.push(firstLetter);
                } else if (initials.filter(c => /^[A-Z]$/.test(c)).length === 0) {
                    initials.push(firstLetter.toUpperCase());
                }
            }
            return initials;
        }, [])
        .join("");
}

/**
    Convert string without the html breaklines
    * * 🟢 Function is generic
    @example
        console.log(removeBreakLines("A String\r\n breaklines"));
        // AStringBreaklines
*/
export function removeBreakLines(str: string): string {
    return str
        .replace(/[\r\n]+/g, " ")
        .replace(/ {2,}/g, " ")
        .trim();
}

/**
    Sort an array of objects by a specified property
    * * 🟢 Function is generic
    * * 🟠 Use [purify]('https://www.npmjs.com/package/generic-functions.mlai') from my module
    @param {Object[]} param.arr - Array of objects to sort
    @param {string} param.prop - Property by which to sort objects
    @return {Object[]} - Sorted array of objects
    @example
        import { sort } from 'generic-function.mlai';
        const countries = [
            { name: 'France' }
            { name: 'Australia'},
        ];

        const sortedCountries = sort({ arr: countries, prop: 'name' });
        // [ { name: 'Australia'}, { name: 'France'} ]
*/
export function sort({ arr, prop }: { arr: any[]; prop: string }): object[] {
    return arr.sort((a: any, b: any) =>
        purify(a[prop]) > purify(b[prop]) ? -1 : 1
    );
}

/**
    Flatten an object and return the values of the specified keys as a string.
    * * 🟢 Function is generic
    * * 🟠 can't take parent object or array ( c.f example below, ex: family )
    @param {any} data - The object to flatten.
    @param {string[]} [options.props] - The keys to extract from the data
    @return {string} - The values of the specified keys as a string, separated by a comma.
    @example
        const data = [
            {
                "id": 1,
                "name": "John",
                "lastName": "Doe",
                "isAlive": false,
                "coor": {
                    "state": "France",
                    "city": "Paris",
                    "zip": null,
                    "lat": true,
                    "long": 784.542,
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
            }
        ]
        console.log(flat(data, {acceptALl: true}));
        // "1, John, Doe, false, France, Paris, null, true, 784.542, Pierre, Doe, father, Blanche, Doe, mother, Jean, Doe, brother, Clementine, Doe, sister, 1500, 1521, 1521"
        flat(data, { props: ["city"] });
        // "Paris"
 */
export function flat(data: any, options: FlatOptions = {}): string {
    const { props = [] } = options;
    const result: string[] = [];

    const traverse = (obj: any) => {
        for (const key in obj) {
            const val = obj[key];

            if (typeof val === "object" && val) {
                traverse(val);
            } else if (!props.length || props.includes(key)) {
                if (Array.isArray(val)) {
                    result.push(...val.filter(item => item));
                } else if (val) {
                    result.push(val);
                }
            }
        }
    };

    traverse(data);
    return result.join(', ');
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
export function number(input: number_t): number_t {
    const values = Array.isArray(input) ? input : [input];
    const convertedValues = values.map(value => {
        const num = Number(value);
        return isNaN(num) ? value : num;
    });
    return convertedValues.length === 1 ? convertedValues[0] : convertedValues;
}

/**
    * Extracts a value from a string using a regex to extract the value with it specific type.
    * * 🟢 Function is generic
    @param {ExtractOptions} options - object containing the string, the regexp and type
    @return {ExtractionResult} - The value with its data type or empty string if there's no match.
    @example
        const str = "The meaning of life is 42";
        const reg = /\d+/;
        const type = "number";
        console.log(extractFromString({ str, reg, type }));
        // 42
*/
export function extractFromString(
    str: any,
    reg: RegExp,
    type: string): ExtractionResult {
    const match = str ? str.match(reg) : undefined;
    if (!match) {
        return str;
    } else {
        switch (type) {
            case "string":
                return convertHtmlEntities(match[2] || match[1]);
            case "boolean":
                // true if the second captured group is 'true' or 'false'
                return match[2] === "true" || "false" ? match[2] : null;
            case "array":
                // return the splitted fourth captured group and parse each with the number function
                return JSON.parse(match[0]);
            case "number":
                return number(match[1]);
            case "date":
                // parse string to Date
                const datetime = new Date(match[2]);
                // parse failed => new Date
                return isNaN(datetime.getTime()) ? new Date() : datetime;
            default:
                // type not recognized => return string
                return match[0];
        }
    }
}

/**
    Return error information from an error
    * * 🟢 Function is generic
    @param options - The options
    @param options.err - The error object
    @param [options.log] - defines if the function logs the error information
    @return The error's information
*/
export function getError({ err, log }: logErrorOptions) {
    const errorInfo = {
        message: err.code || err.message,
        method: toUpperCase(err.config),
        // url: err.request._currentUrl
    };
    if (log) {
        console.error("Err::");
        console.error(errorInfo);
    } else {
        return errorInfo;
    }
}

/**
    Capitalize the value passed
    * * 🟢 Function is generic
    @param data The data to handle (string, object, or array)
    @return The handled data
    @throws Error if the data is not a string, object, or array
    @example
        handleData('Hello World');
        // "HELLO WORLD"
        handleData({ message: 'Hello World' });
        // { message: "HELLO WORLD" }
        handleData([1, 'Hello World', { message: 'Hello World' }]);
        // [1, "HELLO WORLD", { message: "HELLO WORLD" }]
*/
export function toUpperCase(
    data: string | object | any[] | any
) {
    if (typeof data === "string") {
        return data.toUpperCase();
    }
    if (Array.isArray(data)) {
        return data.map((item) => toUpperCase(item));
    }
    if (typeof data === "object") {
        const upperCaseData: { [key: string]: string | object | any[] } = {};
        for (const key in data) {
            upperCaseData[key] = toUpperCase(data[key]);
        }
        return upperCaseData;
    }
    return data;
}

/**
    Find a country from a given array of countries based on a set of search parameters
    * * 🟢 Function is generic
    @param {Object} searchParams - search parameters
    @param {string} [searchParams.cc] - 2 country code
    @param {string} [searchParams.cn] -  country name
    @param {string} [searchParams.cf] - country flag
    @param {Array} countries - An array of country
    @return {Object | undefined} - A country object or undefined if no match is found
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
export function getCountry(
    { cc, cn, cf }: { cc?: string; cn?: string; cf?: string },
    countries: any[]
): typeOfCountries | undefined {
    const normalizedCn = cn && cn !== undefined || null ? purify(cn) : undefined;

    function searchInAltNames(altNames: string) {
        return new RegExp(`\\b${normalizedCn}\\b`, "i").test(altNames);
    }

    const country = countries
        .sort((a, b) => (a.cca2 > b.cca2 ? 1 : -1))
        .find(
            ({ name, altNames, cca2, flag }) =>
                name.common === normalizedCn ||
                name.official === normalizedCn ||
                searchInAltNames(purify(altNames)) ||
                cca2 === cc ||
                flag === cf
        );

    return country ? country : {};
}

/**
    * Format current time to any format specified
    * * 🔴 needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
    * * 🟢 Function is generic
    @param {String} str
    @return String
    @example
        now(Date.now(), "DD/MM/YYYY")
        // 01/10/2022
*/
export function now(str?: string): string | Dayjs {
    return str
        ? dayjs(new Date(Date.now())).format(str)
        : dayjs(new Date(Date.now()));
}

/**
    Get number of seconds from now to midnight
    * * 🟢 Function is generic
    @return Number
    @example
        secondsToTomorrow()
        // 48087
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
    @return Boolean
    @example
        isDate("I Love Dev")
        // false
        isDate(Date.now())
        // true
 */
export function isDate(date: Date): boolean {
    return Object.prototype.toString.call(date) === "[object Date]";
}

/**
    Takes a String to format to any date format
    * * 🔴 needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
    * * 🟢 Function is generic
    @param {Date} date
    @param {String} format
    @return String
    @example
        formatDate(Date.now(), 'YYYY/MM/DD')
        // 2022/12/31
*/
export function formatDate(date: any, format: string): string {
    return typeof date === "string" || "Date" ? dayjs(date).format(format) : "";
}

/**
    Verifies if a value is empty.
    @param {string | object | any[] } value The value to verify. Can be a string, array, or object.
    @param options {object} An optional options object. Use { props: true } to iterate through object properties and verify their values' length.
    @return true if the value is empty, false otherwise.
    @example
        const a = "";
        const b = { c: "", d: "" };
        console.log(isEmpty(a))
        // true
        console.log(isEmpty(b, { props: true }))
        // true
        console.log(isEmpty(b))
        // false
*/
export function isEmpty(
    value: string | object | any[],
    options: { props: boolean } = { props: false }
): boolean {
    switch (typeof value) {
        case "string":
            return value.length === 0;
        case "object":
            if (Array.isArray(value)) {
                return value.every((item) => isEmpty(item, options));
            } else {
                if (options.props) {
                    return Object.values(value).every((prop) =>
                        isEmpty(prop, options)
                    );
                }
                return Object.keys(value).length === 0;
            }
        default:
            return true;
    }
}

/**
    removes any excessive whitespace
    @param {string} str the String
    @return string
    @example
        const str = '    I   Love   dev    and   France   ';
        const cleanedStr = trim(str);
        console.log(cleanedStr)
        // I Love dev and France
*/
export function trim(str: any): string | ExtractionResult {
    return typeof str === 'string' ? str.match(allSpaces)?.join(" ") ?? "" : "";
}

/**
    Checks if the input includes a given value.
    @param {any[] | string | object } input - The input
    @param {string | object | number } value - The value to search for in the input.
    @returns A boolean if found
    @example
        includes([1, 2, 3], 2);
        // true
        includes({ a: 1, b: 2, c: 3 }, 4);
        // false
        includes("france", "fr");
        // true
*/
export function includes<Type extends ExtractionResult>(
    input: Type,
    value: any
): boolean {
    if (!input) {
        return false;
    }
    return typeof input === "string"
        ? input.indexOf(value, 0) !== -1
        : (input !== null && Object.keys(input)
            .slice(0)
            .some((key) => Object.is(input[key], value)));
}

/**
    Determines if the given number is different from the current time in the given unit
    @param {number} nb - Number to compare. Defaults to 0
    @param {TimeUnit} unit - Unit of time to compare
    @returns {boolean} - Returns if the given number is different from the current time in that unit
    @example
        const today = new Date(Date.now()).getHours();
        console.log(isDateDifferent(today, 'hour'))
        // false
*/
export function isDateDifferent(nb: number, unit: timeUnit): ExtractionResult {
    const method = timeUnitMap[unit];
    return nb !== (dayjs()[method] as () => number)();
}

/**
    Get random string from an array of strings
    @param {string[]} arr
    @example
        const arr = ["I", "love", "France"]
        console.log(randomString(arr))
        // e.g: France
*/
export function randomString(arr: string[]): ExtractionResult {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
    Get date format from a country's ISO code and format type.
    @param format - format: 'DATE', 'TIME', or 'DATE_TIME'.
    @param ISO - Country's ISO code
    @returns Date format for the given country code and format type
    @example
        getFormat('DATE', 'FR');
        // 'DD/MM/YYYY'
*/
export function getFormat(format: formatType, ISO: codeISO) {
    const dateFormat = DATE_ISO[ISO];

    switch (format) {
        case "DATE":
            return dateFormat;
        case "TIME":
            return "HH:mm:ss";
        case "DATE_TIME":
            return `${dateFormat}, HH:mm:ss`;
        default:
            return null;
    }
}

/**
    Returns an array of keys from given object whose corresponding values have the specified type
    @template T - The type of values in the input object
    @param {Record<string, T>} obj - The input
    @param {string} type - The type
    @returns {string[]} - Array of keys from the input object whose corresponding values have the specified type
    @example
        const obj = {
            name: "John",
            age: 30,
            email: "john@example.com"
        };
        const keys = getObjectKeysByType(obj, "string");
        // ["name", "email"]
*/
export function getObjectKeysByType(obj: object, type: string): string[] {
    return Object.entries(obj)
        .filter(([_, value]) => typeof value === type)
        .map(([key, _]) => key);
}

/**
    Returns the type of a given value.
    @param value - The value to get the type of
    @returns The type of the given value
    @example
        getValueType(42);
        // "number"
        getValueType("hello world");
        // "string"
*/
export function getValueType(value: any): compareTypes_t {
    return typeof value as compareTypes_t;
}

/**
    Compares the types of elements in an array against a given type and returns an array of indices or keys that match
    @param data - The array to compare
    @param type - The type
    @param options - Optional configuration
    @param options.getKeys - returns the keys of the objects that match the type. Defaults to false.
    @returns Array of indices or keys that match the type.
    @example
        const data = [1, "hello", { name: "John", age: 30 }, true, { name: "Jane", age: 25 }];
        compareTypes(data, "number", { getKeys: true });
        // Returns [0, "age", "age"]
*/
export function compareTypes(
    data: (any)[],
    type: string,
    options: compareTypes_o = {}
): any[] {
    const notType = type.startsWith('!');

    const { getKeys = false } = options;

    return data.reduce((result: (any)[], value, index) => {
        const valueType = getValueType(value);

        const typeMatches =
            !notType && (valueType === type.toLowerCase() ||
                (valueType === 'object' && getObjectKeysByType(value, type).length > 0));

        const notTypeMatches =
            notType && (valueType.toLowerCase() !== type.substring(1).toLowerCase());

        if (typeMatches || notTypeMatches) {
            if (getKeys && valueType === 'object') {
                const keys = getObjectKeysByType(value, type);
                result.push(...keys);
            } else {
                result.push(getKeys ? number(index) : index);
            }
        }

        return result;
    }, []);
}

/**
    Replaces HTML entities in a string with their corresponding characters
    @param str The input string
    @returns The input string replaced with their corresponding characters
    @example
        console.log(convertHtmlEntities("&amp; toto"));
        // Outputs: "& toto"
*/
export function convertHtmlEntities(str: string): string {
    return decodeHTML(str)
}

/**
    Get the value of an object by its path
    @param obj - The object to traverse
    @param path - The path to the value
    @returns The value at the specified path, null if it doesn't exist
    @example
        const obj = { foo: { bar: 'baz' } };
        const path = ['foo', 'bar'];
        const value = getObjectValueByPath(obj, path); // 'baz'
*/
export function getObjectValueByPath(obj: any, path: string[]): any {
    return path.reduce((o, key) => {
        if (o && Array.isArray(o)) {
            return o.map((item) => getObjectValueByPath(item, [key])).flat();
        }
        return (o && o[key]) ? o[key] : null;
    }, obj);
}

/**
    Get an array of unique values from an array of strings or objects
    @param data - The array of strings or objects to filter
    @param field - Optional. specified field
    @returns An array of unique values.
    @example
        const data = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Alice' },
            { id: 4, name: 'Charlie' },
        ];
        const uniqueByName = getUnique(data, 'name'); 
        // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 4, name: 'Charlie' }]
*/
export function getUnique(data: (string | object)[], field?: string) {
    const fieldPath = field ? field.split('.') : [];
    const uniqueValues: (string | object)[] = [];
    const seen = new Set<string>();

    for (const value of data) {
        const uniqueValue = getObjectValueByPath(value, fieldPath);
        if (Array.isArray(uniqueValue)) {
            const uniqueValueHashes = uniqueValue.map((uv) => objectHash(uv));
            if (!uniqueValueHashes.some((hash) => seen.has(hash))) {
                uniqueValueHashes.forEach((hash) => seen.add(hash));
                uniqueValues.push(value);
            }
        } else {
            const uniqueValueHash = objectHash(uniqueValue);
            if (uniqueValue && !seen.has(uniqueValueHash)) {
                seen.add(uniqueValueHash);
                uniqueValues.push(value);
            }
        }
    }

    return uniqueValues;
}
