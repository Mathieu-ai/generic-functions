import { Dayjs } from "dayjs";

/**
    Return type of the function `extractFromString`
    * * 🟢 generic, it is a type
*/
export type ExtractionResult=string|boolean|number|Date|any[]|null;

/**
    Return type of the function `extractFromString`
    * * 🟢 generic, it is a type
*/
export interface ExtractOptions {
    str: string;
    reg: RegExp;
    type: "string"|"boolean"|"array"|"number"|"date";
}
/**
    Return type of the axios error object
    * * 🟢 generic, it is a interface
*/
export interface logErrorOptions {
    err: {
        [ key: string ]: any
    };
    log?: boolean;
}
/**
    Return type of time unit
    * * 🟢 generic, it is a type
*/
export type timeUnit=|"hour"|"minute"|"second"|"millisecond"|"day"|"month"|"year";
/**
    Return a const that possesses al Dayjs variables
    * * 🟢 generic, it is a object
*/
export const timeUnitMap: Record<timeUnit,keyof Dayjs>={
    hour: "hour",
    minute: "minute",
    second: "second",
    millisecond: "millisecond",
    day: "date",
    month: "month",
    year: "year",
};
/**
    Return type of the format date function
    * * 🟢 generic, it is a type
*/
export type formatType="DATE"|"TIME"|"DATE_TIME";
/**
    Return type of all codeISO of countries
    * * 🟢 generic, it is a type
*/
export type codeISO=|"AD"|"AT"|"BE"|"BG"|"CH"|"CY"|"CZ"|"DE"|"DK"|"EE"|"ES"|"FI"|"FR"|"GB"|"GR"|"HR"|"HU"|"IE"|"IS"|"IT"|"LI"|"LT"|"LU"|"LV"|"MC"|"MT"|"NL"|"NO"|"PL"|"PT"|"RO"|"SE"|"SI"|"SK"|"SM"|"TR"|"US"|"CA"|"JP"|"CN"|"KR";

/**
    Return interface of the getCountries function
    * * 🟢 generic, it is a interface
*/
export interface typeOfCountries {
    name: {
        common: string;
        official: string;
    };
    cca2: string;
    altNames: string;
    flag: string;
}

/**
    Return interface of the typeOfData prop in the props
    * * 🟢 generic, it is a interface
*/
export interface typeOfState {
    type: string,
    color: string,
    icon: string,
    state: string
}

/**
    Return interface of the flat function
    * * 🟢 generic, it is a interface
*/
export interface FlatOptions {
    props?: string[];
}

/**
    Return type of the compareType function
    * * 🟢 generic, it is a type
*/
export type compareTypes_o={
    getKeys?: boolean;
};

/**
    Return type of the compareType function
    * * 🟢 generic, it is a type
*/
export type compareTypes_t='string'|'number'|'boolean'|'object';

export type ArrayOrObject=Array<any>|Record<string,any>;

export interface CompareTypesOptions {
    getKeys?: boolean;
}

export type NumOrStr=number|string

/**
 * Represents an HTML entity with its code and name.
 */
export type Entity={
    /** The decimal code point for the entity. */
    code: number;
    /** The entity name or character. */
    name: string;
};

/**
 * A map of entity names to their corresponding codes and names.
 */
export interface EntityMap {
    [ key: string ]: Entity;
}

/**
 * Options for encoding behavior.
 */
export interface EncodeOptions {
    /** If true, returns ASCII entities (e.g. "&#38;") for characters above 127. */
    onlyASCII?: boolean;
}

/**
 * Options for decoding behavior.
 */
export interface DecodeOptions {
    /** If true, looks up the entity in the named entity map. Otherwise, assumes the entity is a decimal code. */
    useNamedReferences?: boolean;
}

/**
    props needed for the filterData function
*/
export type filterData_props={
    field_state: Array<{ state: string }&Record<string,any>>;
    field_search: string;
    field_period: { ddeb: any }&Record<string,any>;
};

/**
    type for the filterData function
*/
export type FilterDataProps={
    field_search: string;
    state: { state: string }[];
    ddeb: string;
};


export interface FlatOptions {
    props?: string[];
}

export interface NamedCharacter {
    code: number;
    name: string;
}

export interface NamedCharacters {
    [ name: string ]: {
        codepoints: number[];
        characters: string;
    };
}

export interface obj {
    [ key: string ]: any;
}