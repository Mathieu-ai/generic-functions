import { Dayjs } from "dayjs";

/**
    Return type of the function `extractFromString`
    * * 🟢 generic, it is a type
*/
export type t_SBAND=string|boolean|any[]|number|Date;

export interface i_func_extractFromString {
    string: "string";
    boolean: "boolean";
    array: "array";
    number: "number";
    date: "date";
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
export const timeUnitMap: Record<timeUnit, keyof Dayjs>={
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
export interface i_country {
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
export interface type_state {
    type: string,
    color: string,
    icon: string,
    state: string
}

/**
    Return interface of the flat function
    * * 🟢 generic, it is a interface
*/
export interface i_func_flat {
    props?: string[];
}

/**
    Return type of the compareType function
    * * 🟢 generic, it is a type
*/
export interface i_func_compareTypes {
    getKeys?: boolean;
};

/**
    Return type of the compareType function
    * * 🟢 generic, it is a type
*/
export type t_SNBO='string'|'number'|'boolean'|'object';

export type t_AO=Array<any>|Record<string, any>;

export type t_NS=number|string

/**
 * Represents an HTML entity with its code and name.
 */
export type HTML_Entity={
    /** The decimal code point for the entity. */
    code: number;
    /** The entity name or character. */
    name: string;
};

/**
 * A map of entity names to their corresponding codes and names.
 */
export interface HTML_EntityMap {
    [ key: string ]: HTML_Entity;
}

/**
 * Options for encoding behavior.
 */
export interface i_func_encode {
    /** If true, returns ASCII entities (e.g. "&#38;") for characters above 127 */
    onlyASCII?: boolean;
}

/**
 * Options for decoding behavior.
 */
export interface i_func_decode {
    /** If true, looks up the entity in the named entity map. Otherwise, assumes the entity is a decimal code. */
    useNamedReferences?: boolean;
}

/**
    props needed for the filterData function
*/
export interface filterData_props {
    field_state: Array<{ state: string }&Record<string, any>>;
    field_search: string;
    field_period: { ddeb: any }&Record<string, any>;
};

export interface i_C_CN {
    code: number;
    name: string;
}

export interface i_C_OCC {
    [ name: string ]: {
        codepoints: number[];
        characters: string;
    };
}

export interface o {
    [ key: string ]: any;
}

export interface i_func_number {
    deep?: boolean;
};

export type t_SAO=string|any[]|object

export interface i_func_filterData {
    sW: string;
    tbSO: string[];
    tbRS?: number[];
    field_search?: string;
    state?: string;
    ddeb?: string;
    regex?: string;
}

export interface func_Number_O {
    deep?: boolean;
};

export type t_NSB = string | number| boolean;
export interface i_ONS {
    [key: string]: t_NSONBA;
};
export type t_A_t_NSONBA = Array<t_NSONBA>;
export type t_NSONBA = t_NSB | i_ONS | t_A_t_NSONBA;