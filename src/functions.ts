import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { decodeHTML } from 'entities';
import objectHash from 'object-hash';
import dayjs, { Dayjs } from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend( isBetween )

import {
    codeISO,
    formatType,
    func_Number_O,
    i_country,
    i_func_compareTypes,
    i_func_extractFromString,
    i_func_filterData,
    i_func_flat,
    logErrorOptions,
    o,
    t_AO,
    t_NSB,
    t_NSONBA,
    t_SNBO,
    timeUnit,
    timeUnitMap
} from "./types";
import { MLAIP } from './props'

const { Reg: { allSpaces }, Dates: { DATE_ISO, DATE_TIME } }=MLAIP
/**
    Make a request with [axios](https://axios-http.com/fr/docs/intro) to return the data
    * * 🟢 Function is generic
    * * 🔴 needs [axios](https://axios-http.com/fr/docs/intro) to function
    @param {String} route The route
    @param {AxiosRequestConfig} parameters The parameters
    @param {boolean} fullLog to log the full err or not
    @return Promise<any>
    @example
        api("http://localhost:8080/members")
*/
export async function api(
    route: string,
    parameters: AxiosRequestConfig={},
    fullLog: boolean=false
) {
    const config: AxiosRequestConfig={
        url: route,
        method: 'GET',
        ...parameters,
    };

    return axios.request( config )
        .then( ( response ) => {
            return response.data;
        } )
        .catch( ( e: AxiosError ) => {
            return { ok: false, message: fullLog? e:e.message };
        } );
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
export function capitalize( str: string ) {
    return str.charAt( 0 ).toUpperCase()+str.slice( 1 );
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
export function purify( str: any ): string {
    return typeof str==="string"
        ? str.normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" )
        :"";
}

/**
    Calculates the minimum  year
    * * 🔴 needs [dayjs](https://day.js.org/docs/en/installation/installation) to function
    * * 🟢 Function is generic
    * @param arr - An array of objects
    * @param prop - The property name in each object that holds the date value.
    * @returns object with minimum and maximum years from now rounded to the nearest decade
    * @example
       const data = [
           { ddeb: '2020-01-15' },
           { ddeb: '2015-05-20' },
           { ddeb: '2018-11-30' },
       ];
       const result = minAndMaxYears(data, 'ddeb');
       // result: { min: 2010, max: 2030 }
*/
export function minAndMaxYears( arr: o[], prop: string ): { min: number, max: number } {
    let min=0
    arr.forEach( ( o ) => {
        const year=dayjs( o[ prop ] ).year()
        if( !min||year<min ) min=year
    } )

    return {
        min: Math.round( min/10 )*10,
        max: Math.round( dayjs( Date.now() ).year()/10 )*10+10,
    }
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
export function getInitials( str: string ): string {
    return str
        .trim()
        .split( /\s+/ )
        .reduce( ( initials: string[], word: string ) => {
            const firstLetter=word.charAt( 0 );
            if( /^[A-Za-z]$/.test( firstLetter )&&initials.length<4 ) {
                if( /^[A-Z]$/.test( firstLetter ) ) {
                    initials.push( firstLetter );
                } else if( initials.filter( c => /^[A-Z]$/.test( c ) ).length===0 ) {
                    initials.push( firstLetter.toUpperCase() );
                }
            }
            return initials;
        }, [] )
        .join( "" );
}

/**
    Convert string without the html breaklines
    * * 🟢 Function is generic
    @example
        console.log(removeBreakLines("A String\r\n breaklines"));
        // AStringBreaklines
*/
export function removeBreakLines( str: string ): string {
    return str
        .replace( /[\r\n]+/g, " " )
        .replace( / {2,}/g, " " )
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
export function sort<T extends o>( {
    arr,
    prop,
    ascending=true,
}: {
    arr: T[];
    prop: keyof T;
    ascending?: boolean;
} ): T[] {
    const compare=( a: T, b: T ) => {
        const valueA=a[ prop ];
        const valueB=b[ prop ];

        const sortOrder=ascending? 1:-1;
        return typeof valueA==='number'&&typeof valueB==='number'
            ? sortOrder*( valueA-valueB )
            :sortOrder*purify( String( valueA ) ).localeCompare( purify( String( valueB ) ) );
    };

    return arr.slice().sort( compare );
}

/**
    Flatten an object and return the values of the specified keys as a string
    * * 🟢 Function is generic
    @param {any} data - Object to flatten.
    @param {string[]} [options.props] - Keys to extract from the data
    @return {string} - Values of the specified keys as a string, separated by a comma
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
        console.log(flat(data));
        // "1, John, Doe, France, Paris, true, 784.542, Pierre, father, Blanche, mother, Jean, brother, Clementine, sister, 1500, 1521"
        flat(data, { props: ["city"] });
        // "Paris"
 */
export function flat( data: any, options: i_func_flat={} ): string {
    const { props=[] }=options;
    const result: string[]=[];

    const traverse=( obj: any ) => {
        for( const key in obj ) {
            const val=obj[ key ];

            if( typeof val==="object"&&val ) {
                traverse( val );
            } else if( !props.length||props.includes( key ) ) {
                if( Array.isArray( val ) ) {
                    result.push( ...val.filter( item => item ) );
                } else if( val ) {
                    result.push( val );
                }
            }
        }
    };

    traverse( data );
    return [ ...new Set( result ) ].join( ', ' );
}

/**
    Parse a string to a number if possible
    * * 🟢 function is generic
    @param {String} input - the String
    @return {String} - The parsed string.
    @example
        const str1 = "2"
        const str2 = "two"
        number(str1)
        // 2
        number(str2)
        // 'two'
*/
export function number( data: t_NSONBA, options: func_Number_O={ deep: false } ): t_NSB|t_NSONBA[]|{ [ key: string ]: t_NSONBA } {
    const { deep }=options

    if( Array.isArray( data ) ) {
        return data.map( ( item ): t_NSONBA => number( item, options ) );
    }

    if( typeof data==="object"&&data ) {
        const result: { [ key: string ]: t_NSONBA }={};
        for( const [ key, value ] of Object.entries( data ) ) {
            result[ key ]=deep? number( value, options ):value;
        }
        return result;
    }

    const parsedNumber=parseInt( data as string );
    return isNaN( parsedNumber )? ( data as t_NSB ):parsedNumber;
}

/**
    * Extracts a value from a string using a regex to extract the value with it specific type.
    * * 🟢 Function is generic
    @param {} str - the string
    @param {} reg -  the RegExp
    @param {} type - the type
    @return {t_SBAND} - The value with its data type or empty string if there's no match.
    @example
        const str = "The meaning of life is 42";
        const reg = /\d+/;
        const type = "number";
        console.log(extractFromString(str, reg, type ));
        // 42
*/
export function extractFromString<T extends keyof i_func_extractFromString>(
    str: any,
    reg: RegExp,
    type: T
): string|number|boolean|Date|null|any[]|object {
    const match=str? str.match( reg ):undefined;
    if( !match ) {
        return str;
    } else {
        switch( type ) {
            case "string":
                return convertHtmlEntities( match[ 2 ]||match[ 1 ] );
            case "boolean":
                // true if the second captured group is 'true' or 'false'
                return match[ 2 ]==="true"||"false"? match[ 2 ]:null;
            case "array":
                // return the splitted fourth captured group and parse each with the number function
                return JSON.parse( match[ 0 ] );
            case "number":
                return number( match[ 1 ] );
            case "date":
                // parse string to Date
                const datetime=new Date( match[ 2 ] );
                // parse failed => new Date
                return isNaN( datetime.getTime() )? new Date():datetime;
            default:
                // type not recognized => return string
                return match[ 0 ];
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
export function getError( { err, log }: logErrorOptions ) {
    const errorInfo={
        message: err.code||err.message,
        method: toUpperCase( err.config ),
        // url: err.request._currentUrl
    };
    if( log ) {
        console.error( "Err::" );
        console.error( errorInfo );
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
export function toUpperCase<T>( data: T ): T {
    if( typeof data==="string" ) {
        return data.toUpperCase() as any;
    }
    if( Array.isArray( data ) ) {
        return data.map( ( item ) => toUpperCase( item ) ) as any;
    }
    if( typeof data==="object" ) {
        const upperCaseData: any={};
        for( const key in data ) {
            upperCaseData[ key ]=toUpperCase( data[ key ] );
        }
        return upperCaseData as any;
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
): i_country|undefined {
    const normalizedCn=cn? purify( cn ):undefined;

    function searchInAltNames( altNames: string ) {
        return new RegExp( `\\b${ normalizedCn }\\b`, "i" ).test( altNames );
    }

    const country=countries
        .sort( ( a, b ) => ( a.cca2>b.cca2? 1:-1 ) )
        .find(
            ( { name, altNames, cca2, flag } ) =>
                name.common===normalizedCn||
                name.official===normalizedCn||
                searchInAltNames( purify( altNames ) )||
                cca2===cc||
                flag===cf
        );

    return country? country:{};
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
export function now( str?: string ): string|Dayjs {
    return str
        ? dayjs( new Date( Date.now() ) ).format( str )
        :dayjs( new Date( Date.now() ) );
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
    const now=new Date( Date.now() ).getHours();
    return -now+24*3600;
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
export function isDate( date: Date ): boolean {
    return Object.prototype.toString.call( date )==="[object Date]";
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
export function formatDate( date: string|Date, format: string ): string {
    return dayjs( date ).format( format )||"";
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
    value: string|object|any[],
    options: { props: boolean }={ props: false }
): boolean {
    switch( typeof value ) {
        case "string":
            return value.length===0;
        case "object":
            if( Array.isArray( value ) ) {
                return value.every( ( item ) => isEmpty( item, options ) );
            } else {
                if( options.props ) {
                    return Object.values( value ).every( ( prop ) =>
                        isEmpty( prop, options )
                    );
                }
                return Object.keys( value ).length===0;
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
export function trim( str: any ): string {
    return typeof str==='string'? str.match( allSpaces )?.join( " " )??"":"";
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
export function includes( input: any[]|string|object, value: string|object|number ): boolean {
    switch( typeof input ) {
        case 'string':
            return ( input as string ).includes( value as string );
        case 'object':
            if( Array.isArray( input ) ) {
                return input.includes( value );
            } else if( input ) {
                return Object.values( input ).includes( value );
            }
            break;
    }
    return false;
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
export function isDateDifferent( nb: number, unit: timeUnit ): boolean {
    const method=timeUnitMap[ unit ];
    return nb!==( dayjs()[ method ] as () => number )();
}

/**
    Get random string from an array of strings
    @param {string[]} arr
    @example
        const arr = ["I", "love", "France"]
        console.log(randomString(arr))
        // e.g: France
*/
export function randomString( arr: string[] ): string {
    return arr[ Math.floor( Math.random()*arr.length ) ];
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
export function getFormat( format: formatType, ISO: codeISO ): string|null {
    const dateFormat=DATE_ISO[ ISO ];

    switch( format ) {
        case "DATE":
            return dateFormat;
        case "TIME":
            return "HH:mm:ss";
        case "DATE_TIME":
            return `${ dateFormat }, HH:mm:ss`;
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
export function getObjectKeysByType( obj: object, type: string ): string[] {
    return Object.entries( obj )
        .filter( ( [ _, value ] ) => typeof value===type )
        .map( ( [ key, _ ] ) => key );
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
export function getValueType( value: t_SNBO ): t_SNBO {
    return typeof value as t_SNBO;
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
    data: ( any )[],
    type: string,
    options: i_func_compareTypes={}
): any[] {
    const notType=type.startsWith( '!' );

    const { getKeys=false }=options;

    return data.reduce( ( result: ( any )[], value, index ) => {
        const valueType=getValueType( value );

        const typeMatches=
            !notType&&( valueType===type.toLowerCase()||
                ( valueType==='object'&&getObjectKeysByType( value, type ).length>0 ) );

        const notTypeMatches=
            notType&&( valueType.toLowerCase()!==type.substring( 1 ).toLowerCase() );

        if( typeMatches||notTypeMatches ) {
            if( getKeys&&valueType==='object' ) {
                const keys=getObjectKeysByType( value, type );
                result.push( ...keys );
            } else {
                result.push( getKeys? number( index ):index );
            }
        }

        return result;
    }, [] );
}

/**
    Replaces HTML entities in a string with their corresponding characters
    @param str The input string
    @returns The input string replaced with their corresponding characters
    @example
        console.log(convertHtmlEntities("&amp; toto"));
        // Outputs: "& toto"
*/
export function convertHtmlEntities( str: string ): string {
    return decodeHTML( str )
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
export function getObjectValueByPath<T>( obj: any, path: string[] ): T|null {
    return path.reduce( ( o, key ) => {
        if( o&&Array.isArray( o ) ) {
            return o.map( ( item ) => getObjectValueByPath<T>( item, [ key ] ) ).flat();
        }
        return ( o&&o[ key ] )? o[ key ]:null;
    }, obj );
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
export function getUnique( data: ( any|object )[], field?: string ) {
    return data.reduce( ( uniqueValues: ( string|object )[], value ) => {
        const uniqueValue=field
            ? { ...( ( value as any )[ field.split( '.' )[ 0 ] ]||[] )[ 0 ] }
            :value

        if( field&&uniqueValue.propertyIsEnumerable.call( field.split( '.' )[ 1 ] ) ) {
            uniqueValue[ field.split( '.' )[ 1 ] ]=( ( value as any )[ field.split( '.' )[ 0 ] ]||[] )[ 0 ]?.[
                field.split( '.' )[ 1 ]
            ]
        }
        if(
            !uniqueValues.some(
                ( v ) => JSON.stringify( v )===JSON.stringify( uniqueValue ),
            )
        ) {
            uniqueValues.push( uniqueValue )
        }
        return uniqueValues
    }, [] )
}

/**
 * Returns an array with the last element of the input array of strings,
 * or an empty array if the input array is empty.
 *
 * @param strings - The array of strings to get the last element from.
 * @returns An array with the last element of the input array,
 * or an empty array if the input array is empty.
 *
 * @example
 * const arrayOfStrings = ['hello', 'world', 'how', 'are', 'you'];
 * const lastElement = getLastElement(arrayOfStrings);
 * console.log(lastElement);
 * // Output: ['you']
 */
export function getLastElement<T extends t_AO>( data: T ): T {
    if( Array.isArray( data ) ) {
        return data.length>0? [ data[ data.length-1 ] ] as T:( [] as any as T );
    } else if( typeof data==='object'&&data ) {
        const keys=Object.keys( data );
        return keys.length>0? { [ keys[ keys.length-1 ] ]: data[ keys[ keys.length-1 ] ] } as T:( {} as T );
    } else {
        return data;
    }
}

/**
    Checks if the length of the first argument is less than the given size, and returns it if it is, otherwise returns the second argument
    @param {Array.<o>} first - First argument to be checked for length
    @param {string} second - Second argument to be returned if the length of the first argument is greater than or equal to the given size
    @param {number} size - Maximum length allowed for the first argument
    @returns {string | o[]} - Either the first argument or the second argument, depending on their lengths
    @example
        console.log(checkLength("hello", "world", 5));
        // "hello"
*/
export function checkLength( first: o[], second: string, size: number ): string|o[] {
    return first.length<size? first:second
}

/**
    Filters an array of objects based on provided parameters.
    * @template T
    * @param {T[]} arr - The array of objects to be filtered.
    * @param param - The filtering parameters.
    * @returns {T[]} - The filtered array containing objects of type T.
    *
    * @description Filtering Function
    * | Parameter | Description |
    * | --- | --- |
    * | `sW` | A string containing space-separated words. The function filters objects that have a match for each word in the `field_search` property (case-insensitive). |
    * | `tbSO` | An array of strings representing selected states. The function filters objects that contain at least one of the selected states in the `state` property. |
    * | `tbRS` (optional) | An array of two numbers representing a range of years. The function filters objects that have a date in the `ddeb` property falling between the two specified years. |
    * | `field_search` (optional) | The key of the property in the objects to perform the word search. Defaults to 'field_search'. |
    * | `state` (optional) | The key of the property in the objects that contains an array of states. Defaults to 'state'. |
    * | `ddeb` (optional) | The key of the property in the objects that contains a date. Defaults to 'ddeb'. |
    * | `regex` (optional) | A regular expression string to filter words from `sW`. Defaults to '[A-Za-zÀ-ÖØ-öø-ÿ0-9]+' which matches alphabets and digits. |
    *
    * 🟠 Default Values for Optional Parameters
    * | Parameter | Default Value |
    * | --- | --- |
    * | `field_search`  | 'field_search' |
    * | `state`     | 'state' |
    * | `ddeb`  | 'ddeb' |
    * | `regex` | '[A-Za-zÀ-ÖØ-öø-ÿ0-9]+' |
*/
export function filterData<T extends o> (
    arr: T[],
    param: i_func_filterData,
): T[] {
    const {
        sW,
        tbRS,
        field_search='field_search',
        ddeb='ddeb',
        regex='[A-Za-zÀ-ÖØ-öø-ÿ0-9]+',
        selections=[],
    }=param;

    const tbExp=sW.match( new RegExp( regex, 'gi' ))||[];
    const dates=tbRS.length? tbRS.map(( e: number ) => formatDate( e.toString() , DATE_TIME )):[];

    console.log( dates )
    return arr.filter(( item: T ) => {
        for( let i=0; i<tbExp.length; i++ ) {
            const searchedWord=purify( tbExp[ i ].toUpperCase());
            if( !new RegExp( searchedWord, 'gi' ).test( item[ field_search ])) {
                return false;
            }
        }

        function checkSelections ( selectedItems: string[], itemProperty: string ) {
            for( const selected of selectedItems ) {
                const len=item[ itemProperty ].length;
                if( !len ) {
                    return false;
                }
                for( let j=0; j<len; j++ ) {
                    const itemState=item[ itemProperty ][ j ];
                    if( !includes( itemState.state, selected )) {
                        return false;
                    }
                }
            }
            return true;
        }

        for( const { selection, property } of selections ) {
            if( !checkSelections( selection, property )) {
                return false;
            }
        }
        

        if( dates?.length&&!dayjs( item[ ddeb ]).isBetween( dates[ 0 ], dates[ 1 ])) {
            return false;
        }
        return true;
    } );
}