import axios from 'axios';
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
    { code: 'VC', value: 'Saint Vincent and the Grenadines' },
    { code: 'GF', value: 'Guiana' },
    { code: 'FO', value: 'Faroe Islands' },
    { code: 'PK', value: 'Islamic Republic of Pakistan' },
    { code: 'FJ', value: 'Republic of Fiji' },
    { code: 'MN', value: 'Mongolia' },
    { code: 'CC', value: 'Territory of the Cocos (Keeling) Islands' },
    { code: 'FM', value: 'Federated States of Micronesia' },
    { code: 'NO', value: 'Kingdom of Norway' },
    { code: 'MR', value: 'Islamic Republic of Mauritania' },
    { code: 'ES', value: 'Kingdom of Spain' },
    { code: 'TR', value: 'Republic of Turkey' },
    { code: 'AE', value: 'United Arab Emirates' },
    { code: 'CD', value: 'Democratic Republic of the Congo' },
    { code: 'NC', value: 'New Caledonia' },
    { code: 'RW', value: 'Republic of Rwanda' },
    { code: 'AU', value: 'Commonwealth of Australia' },
    { code: 'IM', value: 'Isle of Man' },
    { code: 'ID', value: 'Republic of Indonesia' },
    { code: 'ZM', value: 'Republic of Zambia' },
    { code: 'JE', value: 'Bailiwick of Jersey' },
    { code: 'UY', value: 'Oriental Republic of Uruguay' },
    { code: 'CA', value: 'Canada' },
    { code: 'PE', value: 'Republic of Peru' },
    { code: 'MS', value: 'Montserrat' },
    { code: 'AG', value: 'Antigua and Barbuda' },
    { code: 'DM', value: 'Commonwealth of Dominica' },
    { code: 'KH', value: 'Kingdom of Cambodia' },
    { code: 'FK', value: 'Falkland Islands' },
    { code: 'GU', value: 'Guam' },
    { code: 'PG', value: 'Independent State of Papua New Guinea' },
    { code: 'SC', value: 'Republic of Seychelles' },
    { code: 'LR', value: 'Republic of Liberia' },
    { code: 'CV', value: 'Republic of Cabo Verde' },
    { code: 'GD', value: 'Grenada' },
    { code: 'CU', value: 'Republic of Cuba' },
    { code: 'DJ', value: 'Republic of Djibouti' },
    { code: 'LB', value: 'Lebanese Republic' },
    { code: 'MM', value: 'Republic of the Union of Myanmar' },
    { code: 'KY', value: 'Cayman Islands' },
    { code: 'GA', value: 'Gabonese Republic' },
    { code: 'PF', value: 'French Polynesia' },
    { code: 'ZA', value: 'Republic of South Africa' },
    { code: 'SR', value: 'Republic of Suriname' },
    { code: 'CR', value: 'Republic of Costa Rica' },
    { code: 'CF', value: 'Central African Republic' },
    { code: 'TC', value: 'Turks and Caicos Islands' },
    { code: 'LI', value: 'Principality of Liechtenstein' },
    { code: 'NU', value: 'Niue' },
    { code: 'UM', value: 'United States Minor Outlying Islands' },
    { code: 'KP', value: "Democratic People's Republic of Korea" },
    { code: 'UA', value: 'Ukraine' },
    { code: 'GW', value: 'Republic of Guinea-Bissau' },
    { code: 'AQ', value: 'Antarctica' },
    { code: 'YT', value: 'Department of Mayotte' },
    { code: 'TV', value: 'Tuvalu' },
    { code: 'MA', value: 'Kingdom of Morocco' },
    { code: 'MD', value: 'Republic of Moldova' },
    { code: 'OM', value: 'Sultanate of Oman' },
    { code: 'IT', value: 'Italian Republic' },
    { code: 'YE', value: 'Republic of Yemen' },
    { code: 'KW', value: 'State of Kuwait' },
    { code: 'PR', value: 'Commonwealth of Puerto Rico' },
    { code: 'PS', value: 'State of Palestine' },
    { code: 'CO', value: 'Republic of Colombia' },
    { code: 'MK', value: 'Republic of North Macedonia' },
    { code: 'QA', value: 'State of Qatar' },
    { code: 'TW', value: 'Republic of China (Taiwan)' },
    { code: 'MG', value: 'Republic of Madagascar' },
    { code: 'BS', value: 'Commonwealth of the Bahamas' },
    { code: 'CW', value: 'Country of Curaçao' },
    { code: 'SB', value: 'Solomon Islands' },
    { code: 'SH', value: 'Saint Helena, Ascension and Tristan da Cunha' },
    { code: 'HN', value: 'Republic of Honduras' },
    { code: 'AM', value: 'Republic of Armenia' },
    { code: 'GT', value: 'Republic of Guatemala' },
    { code: 'TG', value: 'Togolese Republic' },
    { code: 'SN', value: 'Republic of Senegal' },
    { code: 'CZ', value: 'Czech Republic' },
    { code: 'XK', value: 'Republic of Kosovo' },
    { code: 'MH', value: 'Republic of the Marshall Islands' },
    { code: 'MU', value: 'Republic of Mauritius' },
    { code: 'GE', value: 'Georgia' },
    { code: 'PH', value: 'Republic of the Philippines' },
    { code: 'AL', value: 'Republic of Albania' },
    { code: 'JM', value: 'Jamaica' },
    { code: 'RS', value: 'Republic of Serbia' },
    { code: 'CL', value: 'Republic of Chile' },
    { code: 'GY', value: 'Co-operative Republic of Guyana' },
    { code: 'TZ', value: 'United Republic of Tanzania' },
    { code: 'BD', value: "People's Republic of Bangladesh" },
    { code: 'EC', value: 'Republic of Ecuador' },
    { code: 'CY', value: 'Republic of Cyprus' },
    { code: 'DO', value: 'Dominican Republic' },
    { code: 'GS', value: 'South Georgia and the South Sandwich Islands' },
    { code: 'AX', value: 'Åland Islands' },
    { code: 'FI', value: 'Republic of Finland' },
    { code: 'KR', value: 'Republic of Korea' },
    { code: 'BF', value: 'Burkina Faso' },
    { code: 'NF', value: 'Territory of Norfolk Island' },
    { code: 'PT', value: 'Portuguese Republic' },
    { code: 'BB', value: 'Barbados' },
    { code: 'JO', value: 'Hashemite Kingdom of Jordan' },
    { code: 'NG', value: 'Federal Republic of Nigeria' },
    { code: 'BH', value: 'Kingdom of Bahrain' },
    {
        code: 'KI',
        value: 'Independent and Sovereign Republic of Kiribati'
    },
    { code: 'ST', value: 'Democratic Republic of São Tomé and Príncipe' },
    { code: 'CN', value: "People's Republic of China" },
    { code: 'CH', value: 'Swiss Confederation' },
    { code: 'KE', value: 'Republic of Kenya' },
    { code: 'MV', value: 'Republic of the Maldives' },
    { code: 'SV', value: 'Republic of El Salvador' },
    { code: 'KN', value: 'Federation of Saint Christopher and Nevis' },
    { code: 'BN', value: 'Nation of Brunei, Abode of Peace' },
    { code: 'BJ', value: 'Republic of Benin' },
    { code: 'GN', value: 'Republic of Guinea' },
    {
        code: 'MO',
        value: "Macao Special Administrative Region of the People's Republic of China"
    },
    { code: 'US', value: 'United States of America' },
    { code: 'ER', value: 'State of Eritrea' },
    { code: 'SE', value: 'Kingdom of Sweden' },
    {
        code: 'TF',
        value: 'Territory of the French Southern and Antarctic Lands'
    },
    { code: 'GH', value: 'Republic of Ghana' },
    { code: 'DK', value: 'Kingdom of Denmark' },
    { code: 'BG', value: 'Republic of Bulgaria' },
    { code: 'BW', value: 'Republic of Botswana' },
    { code: 'IR', value: 'Islamic Republic of Iran' },
    { code: 'BV', value: 'Bouvet Island' },
    { code: 'BO', value: 'Plurinational State of Bolivia' },
    { code: 'PN', value: 'Pitcairn Group of Islands' },
    { code: 'BY', value: 'Republic of Belarus' },
    { code: 'BM', value: 'Bermuda' },
    { code: 'KZ', value: 'Republic of Kazakhstan' },
    { code: 'LA', value: "Lao People's Democratic Republic" },
    { code: 'UZ', value: 'Republic of Uzbekistan' },
    { code: 'MY', value: 'Malaysia' },
    { code: 'VG', value: 'Virgin Islands' },
    { code: 'PM', value: 'Saint Pierre and Miquelon' },
    { code: 'IS', value: 'Iceland' },
    { code: 'GR', value: 'Hellenic Republic' },
    { code: 'PY', value: 'Republic of Paraguay' },
    { code: 'CM', value: 'Republic of Cameroon' },
    { code: 'PW', value: 'Republic of Palau' },
    { code: 'BR', value: 'Federative Republic of Brazil' },
    { code: 'BL', value: 'Collectivity of Saint Barthélemy' },
    { code: 'AI', value: 'Anguilla' },
    { code: 'ET', value: 'Federal Democratic Republic of Ethiopia' },
    { code: 'DE', value: 'Federal Republic of Germany' },
    { code: 'HU', value: 'Hungary' },
    { code: 'SD', value: 'Republic of the Sudan' },
    { code: 'SO', value: 'Federal Republic of Somalia' },
    { code: 'LT', value: 'Republic of Lithuania' },
    { code: 'AO', value: 'Republic of Angola' },
    { code: 'GQ', value: 'Republic of Equatorial Guinea' },
    { code: 'SA', value: 'Kingdom of Saudi Arabia' },
    { code: 'EE', value: 'Republic of Estonia' },
    { code: 'LU', value: 'Grand Duchy of Luxembourg' },
    { code: 'ZW', value: 'Republic of Zimbabwe' },
    { code: 'NZ', value: 'New Zealand' },
    { code: 'VE', value: 'Bolivarian Republic of Venezuela' },
    { code: 'GM', value: 'Republic of the Gambia' },
    { code: 'WF', value: 'Territory of the Wallis and Futuna Islands' },
    { code: 'BE', value: 'Kingdom of Belgium' },
    { code: 'BZ', value: 'Belize' },
    { code: 'EH', value: 'Sahrawi Arab Democratic Republic' },
    { code: 'SI', value: 'Republic of Slovenia' },
    { code: 'SY', value: 'Syrian Arab Republic' },
    { code: 'JP', value: 'Japan' },
    { code: 'RU', value: 'Russian Federation' },
    { code: 'LS', value: 'Kingdom of Lesotho' },
    { code: 'IE', value: 'Republic of Ireland' },
    { code: 'ME', value: 'Montenegro' },
    { code: 'AD', value: 'Principality of Andorra' },
    { code: 'NL', value: 'Kingdom of the Netherlands' },
    { code: 'LV', value: 'Republic of Latvia' },
    { code: 'TN', value: 'Tunisian Republic' },
    { code: 'AW', value: 'Aruba' },
    { code: 'HR', value: 'Republic of Croatia' },
    { code: 'ML', value: 'Republic of Mali' },
    { code: 'AF', value: 'Islamic Republic of Afghanistan' },
    { code: 'SL', value: 'Republic of Sierra Leone' },
    { code: 'IQ', value: 'Republic of Iraq' },
    { code: 'KM', value: 'Union of the Comoros' },
    { code: 'EG', value: 'Arab Republic of Egypt' },
    { code: 'VN', value: 'Socialist Republic of Vietnam' },
    { code: 'VA', value: 'Vatican City State' },
    { code: 'SX', value: 'Sint Maarten' },
    { code: 'SK', value: 'Slovak Republic' },
    { code: 'SG', value: 'Republic of Singapore' },
    { code: 'CK', value: 'Cook Islands' },
    { code: 'SZ', value: 'Kingdom of Eswatini' },
    { code: 'TO', value: 'Kingdom of Tonga' },
    { code: 'CG', value: 'Republic of the Congo' },
    { code: 'GG', value: 'Bailiwick of Guernsey' },
    { code: 'GP', value: 'Guadeloupe' },
    { code: 'NA', value: 'Republic of Namibia' },
    { code: 'TT', value: 'Republic of Trinidad and Tobago' },
    { code: 'BT', value: 'Kingdom of Bhutan' },
    {
        code: 'HK',
        value: "Hong Kong Special Administrative Region of the People's Republic of China"
    },
    { code: 'SS', value: 'Republic of South Sudan' },
    { code: 'SM', value: 'Republic of San Marino' },
    { code: 'TJ', value: 'Republic of Tajikistan' },
    { code: 'UG', value: 'Republic of Uganda' },
    { code: 'WS', value: 'Independent State of Samoa' },
    { code: 'DZ', value: "People's Democratic Republic of Algeria" },
    { code: 'CI', value: "Republic of Côte d'Ivoire" },
    { code: 'VI', value: 'Virgin Islands of the United States' },
    { code: 'AZ', value: 'Republic of Azerbaijan' },
    { code: 'LK', value: 'Democratic Socialist Republic of Sri Lanka' },
    { code: 'CX', value: 'Territory of Christmas Island' },
    { code: 'TD', value: 'Republic of Chad' },
    { code: 'AR', value: 'Argentine Republic' },
    { code: 'IN', value: 'Republic of India' },
    { code: 'MF', value: 'Saint Martin' },
    { code: 'HT', value: 'Republic of Haiti' },
    { code: 'LC', value: 'Saint Lucia' },
    { code: 'NP', value: 'Federal Democratic Republic of Nepal' },
    { code: 'TK', value: 'Tokelau' },
    { code: 'TM', value: 'Turkmenistan' },
    { code: 'IL', value: 'State of Israel' },
    { code: 'BQ', value: 'Bonaire, Sint Eustatius and Saba' },
    { code: 'MT', value: 'Republic of Malta' },
    { code: 'MP', value: 'Commonwealth of the Northern Mariana Islands' },
    { code: 'MW', value: 'Republic of Malawi' },
    { code: 'GI', value: 'Gibraltar' },
    { code: 'VU', value: 'Republic of Vanuatu' },
    {
        code: 'GB',
        value: 'United Kingdom of Great Britain and Northern Ireland'
    },
    { code: 'MQ', value: 'Martinique' },
    { code: 'MX', value: 'United Mexican States' },
    { code: 'BA', value: 'Bosnia and Herzegovina' },
    { code: 'RO', value: 'Romania' },
    { code: 'SJ', value: 'Svalbard og Jan Mayen' },
    { code: 'HM', value: 'Heard Island and McDonald Islands' },
    { code: 'IO', value: 'British Indian Ocean Territory' },
    { code: 'RE', value: 'Réunion Island' },
    { code: 'KG', value: 'Kyrgyz Republic' },
    { code: 'TH', value: 'Kingdom of Thailand' },
    { code: 'BI', value: 'Republic of Burundi' },
    { code: 'GL', value: 'Greenland' },
    { code: 'AT', value: 'Republic of Austria' },
    { code: 'FR', value: 'French Republic' },
    { code: 'MC', value: 'Principality of Monaco' },
    { code: 'NR', value: 'Republic of Nauru' },
    { code: 'NE', value: 'Republic of Niger' },
    { code: 'AS', value: 'American Samoa' },
    { code: 'MZ', value: 'Republic of Mozambique' },
    { code: 'TL', value: 'Democratic Republic of Timor-Leste' },
    { code: 'NI', value: 'Republic of Nicaragua' },
    { code: 'PA', value: 'Republic of Panama' },
    { code: 'PL', value: 'Republic of Poland' },
    { code: 'LY', value: 'State of Libya' }
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
