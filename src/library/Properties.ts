import dayjs from 'dayjs';
import { camelCase, replace, toString } from 'lodash';

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
export async function $minAndMaxYears(arr: any[], str: string): Promise<number[]> {
    let min = 0;
    arr.forEach((m) => {
        const year = dayjs(m[str]).year();
        if (!min || year < min) min = year;
    });
    return [Math.round(min / 10) * 10, Math.round(dayjs(Date.now()).year() / 10) * 10 + 10];
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
 * Object with dates properties and function
 * * 🚫 - needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
 * * ✔️ - generic, it is a Object
 * ___
 * @returns Object
 */
export const dates = {
    format: {
        /**
         * Return Day, month and year
         * * ✔️ - generic, it is a string
         * ```js
         * // Print => "DD/MM/YYYY"
         * ```
         * ___
         * @returns String
         */
        DATE: 'DD/MM/YYYY',
        /**
         * Return the hours with minutes
         * * ✔️ - generic, it is a string
         * ```js
         * // Print => "HH:mm:ss"
         * ```
         * ___
         * @returns String
         */
        TIME: 'HH:mm',
        /**
         * Return the Date with Hours and minutes
         * * ✔️ - generic, it is a string
         * ```js
         * // Print => "DD/MM/YYYY,HH:mm:ss"
         * ```
         * ___
         * @returns String
         */
        DATE_TIME: 'DD/MM/YYYY,HH:mm:ss'
    },
    /**
     * Format current time to any format specified
     * * 🚫 - needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
     * * ✔️ - Function is generic, it can takes any string for any case to format
     * * Example :
     * ```js
     * $now(Date.now(), "DD/MM/YYYY")
     * // Prints => 01/10/2022
     * ```
     * ___
     * @param {String} str
     * @returns String
     */
    $now: function (str: string): string {
        return dayjs(new Date(Date.now())).format(str);
    },
    /**
     * Get number of seconds from now to midnight
     * * ✔️ - Function is generic, it returns a number
     * * Example :
     * ```js
     * $secondsToTomorrow()
     * // Prints => 48087
     * ```
     * ___
     * @returns Number
     */
    $secondsToTomorrow: function (): number {
        // var d = new Date()
        // const toTomorrow: number = Math.round((-d + d.setHours(24, 0, 0, 0)) / 6e4) * 60
        const now = new Date(Date.now()).getHours();
        return -now + 24 * 3600;
    },
    /**
     * * Takes a String to check if is a Date
     * * ✔️ - Function is generic, it can takes any string for any case to check if is a Date
     * * Example :
     * ```js
     * isDate("I Love Dev")
     * // Prints: false
     * isDate(Date.now())
     * // Prints: true
     * ```
     * @param {String} date
     * @returns Boolean
     */
    $isDate: function isDate(date: Date): boolean {
        return Object.prototype.toString.call(date) === '[object Date]';
    },
    /**
     *  Takes a String to format to any date format
     * * 🚫 - needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
     * * ✔️ - Function is generic, it can takes any string for any case to format if is a Date
     * * Example :
     * ```js
     * formatDate(Date.now(), 'YYYY/MM/DD')
     * // Prints: 2022/12/31
     * ```
     * @param {Date} date
     * @param {String} format
     * @returns String
     */
    $formatDate: function formatDate(date: Date, format: string): string {
        return dayjs(date).format(format);
    }
};

/**
 * Custom response codes
 * * ✔️ - generic, it is a Object
 * ___
 * @returns Number
 */
export const resCodes = {
    /**
     * Custom Property that indicates the first state of the members ( should never have this status code )
     * * ✔️ - generic, it is a number
     * ```js
     * // Prints => 0
     * ```
     * ___
     * @returns Number
     */
    NOT_INIT: 0,
    /**
     * Custom Property that indicates that the members have been initialized at least once
     * * ✔️ - generic, it is a number
     * ```js
     * // Prints => 1
     * ```
     * ___
     * @returns Number
     */
    IS_INIT: 1,
    /**
     * Custom Property that indicates that the members have been initialized at least once but the api is down
     * * ✔️ - generic, it is a number
     * ```js
     * // Prints => 2
     * ```
     * ___
     * @returns Number
     */
    NOT_FOUND_INIT: 2,
    /**
     * Custom Property that indicates that the members have not been initialized at least once and that the api is down
     * * ✔️ - generic, it is a number
     * ```js
     * // Prints: 9
     * ```
     * ___
     * @returns Number
     */
    NOT_FOUND: 9
    //INFORMATIONAL: [100, 199],
    // /**
    //  * Represents HTTP success response resCodes
    //  * * ✔️ - generic, it is a array
    //  * * ```js
    //  *  // Print => [200,299]
    //  * ```
    //  * ___
    //  * @returns Array
    //  */
    // SUCCESS: [200, 299],
    //CLIENT_ERROR: [400, 499],
    //SERVER_ERROR: [500, 599],
};

/**
 * Where all the members types are stored, most of properties are used for the front
 * * ✔️ - generic, it is a array
 * ```js
 * // Print => [{...}, { ...}]
 * ```
 * ___
 * @returns Array
 */
export const typeOfMembers: Array<{
    type: string;
    color: string;
    icon: string;
    state: string;
}> = [
    {
        type: 'success',
        color: 'teal-3',
        icon: 'alpha-a-circle',
        state: 'Active member'
    },
    {
        type: 'warning',
        color: 'blue-4',
        icon: 'alpha-a-circle',
        state: 'Affiliate member'
    },
    {
        type: 'info',
        color: 'cyan-11',
        icon: 'alpha-a-circle',
        state: 'Associate member'
    },
    {
        type: 'error',
        color: 'grey-4',
        icon: 'alpha-s-circle',
        state: 'Suspended'
    }
];

/**
 * Where all the companies types are stored, most of properties are used for the front
 * * ✔️ - generic, it is a array
 * ```js
 * // Print => [{...}, { ...}]
 * ```
 * ___
 * @returns Array
 */
export const typeOfCompanies = [
    { type: 'recent', bgColor: 'blue-11', icon: 'person_add' },
    {
        type: 'Freight',
        bgColor: 'light-blue-5',
        icon: 'directions_boat'
    },
    { type: 'Passenger', bgColor: 'cyan-5', icon: 'person' },
    { type: 'infraStructure', bgColor: 'teal-4', icon: 'business' },
    { type: 'Holding', bgColor: 'teal-12', icon: 'data_thresholding' },
    {
        type: 'Integrated',
        bgColor: 'green-3',
        icon: 'integration_instructions'
    },
    { type: 'Other', bgColor: 'blue-grey-7', icon: 'alt_route' }
];

/**
 * Where all regexps are defined to identify different types of strings
 * * ✔️ - generic, it is a Object
 * ```js
 * // Print => { delHtmlTag : ..., ... }
 * ```
 * ___
 * @returns Object
 */
export const reg = {
    /**
     * identify string in html tag
     * * ✔️ - generic, it is a regexp
     * ```js
     * // Print => /.*?>([^<]*)/
     * ```
     * ___
     * @returns String
     */
    delHtmlTag: new RegExp(/.*?>([^<]*)/)
};

/**
 * List of actual UIC's members's countries
 * * ✔️ - generic, it is a Array
 * ```js
 * // Print => [{...}, { ...}]
 * ```
 * ___
 * @returns Object[]
 */
export const countryList = [
    {
        code: 'AF',
        value: 'Afghanistan'
    },
    {
        code: 'DZ',
        value: 'Algeria'
    },
    {
        code: 'AR',
        value: 'Argentina'
    },
    {
        code: 'AM',
        value: 'Armenia'
    },
    {
        code: 'AU',
        value: 'Australia'
    },
    {
        code: 'AT',
        value: 'Austria'
    },
    {
        code: 'AZ',
        value: 'Azerbaijan'
    },
    {
        code: 'BY',
        value: 'Belarus'
    },
    {
        code: 'BE',
        value: 'Belgium'
    },
    {
        code: 'BA',
        value: 'Bosnia and Herzegovina'
    },
    {
        code: 'BR',
        value: 'Brazil'
    },
    {
        code: 'BG',
        value: 'Bulgaria'
    },
    {
        code: 'BF',
        value: 'Burkina Faso'
    },
    {
        code: 'CM',
        value: 'Cameroon'
    },
    {
        code: 'CA',
        value: 'Canada'
    },
    {
        code: 'CN',
        value: 'China'
    },
    {
        code: 'CD',
        value: 'Congo (the Democratic Republic of the)'
    },
    {
        code: 'HR',
        value: 'Croatia'
    },
    {
        code: 'CZ',
        value: 'Czech Republic (the)'
    },
    {
        code: 'CI',
        value: "Côte d'Ivoire"
    },
    {
        code: 'DK',
        value: 'Denmark'
    },
    {
        code: 'EG',
        value: 'Egypt'
    },
    {
        code: 'ET',
        value: 'Ethiopia'
    },
    {
        code: 'FI',
        value: 'Finland'
    },
    {
        code: 'FR',
        value: 'France'
    },
    {
        code: 'GA',
        value: 'Gabon'
    },
    {
        code: 'GE',
        value: 'Georgia'
    },
    {
        code: 'DE',
        value: 'Germany'
    },
    {
        code: 'GR',
        value: 'Greece'
    },
    {
        code: 'HU',
        value: 'Hungary'
    },
    {
        code: 'IN',
        value: 'India'
    },
    {
        code: 'ID',
        value: 'Indonesia'
    },
    {
        code: 'IR',
        value: 'Iran (Islamic Republic of)'
    },
    {
        code: 'IQ',
        value: 'Iraq'
    },
    {
        code: 'IE',
        value: 'Ireland'
    },
    {
        code: 'IL',
        value: 'Israel'
    },
    {
        code: 'IT',
        value: 'Italy'
    },
    {
        code: 'JP',
        value: 'Japan'
    },
    {
        code: 'JO',
        value: 'Jordan'
    },
    {
        code: 'KZ',
        value: 'Kazakhstan'
    },
    {
        code: 'KR',
        value: 'Korea (the Republic of)'
    },
    {
        code: 'LV',
        value: 'Latvia'
    },
    {
        code: 'LY',
        value: 'Libya'
    },
    {
        code: 'LT',
        value: 'Lithuania'
    },
    {
        code: 'LU',
        value: 'Luxembourg'
    },
    {
        code: 'MK',
        value: 'Macedonia (the former Yugoslav Republic of)'
    },
    {
        code: 'MY',
        value: 'Malaysia'
    },
    {
        code: 'MY',
        value: 'Mauritania'
    },
    {
        code: 'MX',
        value: 'Mexico'
    },
    {
        code: 'MN',
        value: 'Mongolia'
    },
    {
        code: 'ME',
        value: 'Montenegro'
    },
    {
        code: 'MA',
        value: 'Morocco'
    },
    {
        code: 'NL',
        value: 'Netherlands (the)'
    },
    {
        code: 'NE',
        value: 'Niger (the)'
    },
    {
        code: 'NO',
        value: 'Norway'
    },
    {
        code: 'PH',
        value: 'Philippines (the)'
    },
    {
        code: 'PL',
        value: 'Poland'
    },
    {
        code: 'PT',
        value: 'Portugal'
    },
    {
        code: 'RO',
        value: 'Romania'
    },
    {
        code: 'RU',
        value: 'Russian Federation (the)'
    },
    {
        code: 'SA',
        value: 'Saudi Arabia'
    },
    {
        code: 'SN',
        value: 'Senegal'
    },
    {
        code: 'RS',
        value: 'Serbia'
    },
    {
        code: 'SK',
        value: 'Slovakia'
    },
    {
        code: 'SO',
        value: 'Slovenia'
    },
    {
        code: 'ES',
        value: 'Spain'
    },
    {
        code: 'SD',
        value: 'Sudan (the)'
    },
    {
        code: 'SE',
        value: 'Sweden'
    },
    {
        code: 'CH',
        value: 'Switzerland'
    },
    {
        code: 'SY',
        value: 'Syrian Arab Republic'
    },
    {
        code: 'TW',
        value: 'Taiwan (Province of China)'
    },
    {
        code: 'TH',
        value: 'Thailand'
    },
    {
        code: 'TN',
        value: 'Tunisia'
    },
    {
        code: 'TR',
        value: 'Turkey'
    },
    {
        code: 'UA',
        value: 'Ukraine'
    },
    {
        code: 'AE',
        value: 'United Arab Emirates (the)'
    },
    {
        code: 'GB',
        value: 'United Kingdom of Great Britain and Northern Ireland (the)'
    },
    {
        code: 'US',
        value: 'United States of America (the)'
    },
    {
        code: 'VN',
        value: 'Viet Nam'
    },
    {
        code: 'ZM',
        value: 'Zambia'
    }
];

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
