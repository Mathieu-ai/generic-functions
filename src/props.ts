/**
    Object with all the properties
*/
export const MLAIP={
    /**
        Where all regexps are defined to identify different type of strings
        * * 🟢 generic, it is a Object
        @@return Object
        @example
            // { delHtmlTag : ..., ... }
    */
    Reg: {
        /**
            Identify string in html tag
            * * 🟢 generic, it is a regexp
            @@return Regexp
        */
        htmlTag: new RegExp( /.*?>([^<]*)/ ),
        /**
            Identify Brackets in html tag
            * * 🟢 generic, it is a regexp
            @@return Regexp
        */
        inBrackets: new RegExp( /\[[^\[\]]*\]/ ),
        /**
            Identify Strings in html tag
            * * 🟢 generic, it is a regexp
            @@return Regexp
        */
        inStrings: new RegExp( /.*?\"([^\"]*)/ ),
        /**
            Identify html tag or arrays (brackets)
            * * 🟢 generic, it is a regexp
         *   @return Regexp
        */
        TagRegex: new RegExp(
            /<([a-z][a-z0-9]*)[^>]*>([^<]*)<\/\1>|(\[(.*?)\])/i
        ),
        /**
            Identify the first open Parenthese
            * * 🟢 generic, it is a regexp
            @return Regexp
        */
        openParentheses: new RegExp( /^(.*?)\(/ ),
        /**
            Identify all spaces
            * * 🟢 generic, it is a regexp
            @return Regexp
        */
        allSpaces: new RegExp( /\S+/g ),
        /**
            Identify Date type string
            * * 🟢 generic, it is a regexp
            @return Regexp
        */
        datetime_regex: new RegExp(
            /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[\+-]\d{2}:\d{2})?)$/
        ),
    },

    /**
        Object with dates properties
        * * 🟢 generic, it is a Object
        @return Object
    */
    Dates: {
        /**
            Return Day, month and year
            * * 🟢 generic, it is a string
            @return String
            @example
                // "DD/MM/YYYY"
        */
        DATE: "DD/MM/YYYY",
        /**
            Return the hours with minutes
            * * 🟢 generic, it is a string
            @return String
            @example
                // "HH:mm:ss"
        */
        TIME: "HH:mm",
        /**
            Return the Date with Hours and minutes
            * * 🟢 generic, it is a string
            @return String
            @example
                // "DD/MM/YYYY,HH:mm:ss"
        */
        DATE_TIME: "DD/MM/YYYY,HH:mm:ss",
        /**
            Return all countries with date format
            * * 🟢 generic, it is a Object
            @return Object
            @example
                // { ..., 'FR': 'DD/MM/YYYY',... }
        */
        DATE_ISO: {
            AD: "DD/MM/YYYY",
            AT: "DD.MM.YYYY",
            BE: "DD/MM/YYYY",
            BG: "DD.MM.YYYY",
            CH: "DD.MM.YYYY",
            CY: "DD/MM/YYYY",
            CZ: "DD.MM.YYYY",
            DE: "DD.MM.YYYY",
            DK: "DD.MM.YYYY",
            EE: "DD.MM.YYYY",
            ES: "DD/MM/YYYY",
            FI: "DD.MM.YYYY",
            FR: "DD/MM/YYYY",
            GB: "DD/MM/YYYY",
            GR: "DD/MM/YYYY",
            HR: "DD.MM.YYYY",
            HU: "YYYY.MM.DD.",
            IE: "DD/MM/YYYY",
            IS: "DD.MM.YYYY",
            IT: "DD/MM/YYYY",
            LI: "DD.MM.YYYY",
            LT: "YYYY.MM.DD",
            LU: "DD/MM/YYYY",
            LV: "DD.MM.YYYY",
            MC: "DD/MM/YYYY",
            MT: "DD/MM/YYYY",
            NL: "DD-MM-YYYY",
            NO: "DD.MM.YYYY",
            PL: "DD.MM.YYYY",
            PT: "DD/MM/YYYY",
            RO: "DD.MM.YYYY",
            SE: "YYYY-MM-DD",
            SI: "DD.MM.YYYY",
            SK: "DD.MM.YYYY",
            SM: "DD/MM/YYYY",
            TR: "DD.MM.YYYY",
            US: "MM/DD/YYYY",
            CA: "MM/DD/YYYY",
            JP: "YYYY年MM月DD日",
            CN: "YYYY年MM月DD日",
            KR: "YYYY-MM-DD",
        },
    },

    /**
        Custom response codes
        * * 🟢 generic, it is a Object
        @return Object
    */
    ResCodes: {
        /**
            Custom Property
            * * 🟢 generic, it is a number
            @return Number
            @example
                // 0
        */
        NOT_INIT: 0,
        /**
            Custom Property
            * * 🟢 generic, it is a number
            @return Number
            @example
                // 1
        */
        IS_INIT: 1,
        /**
            Custom Property
            * * 🟢 generic, it is a number
            @return Number
            @example
                // 2
        */
        NOT_FOUND_INIT: 2,
        /**
            Custom Property
            * * 🟢 generic, it is a number
            @return Number
            @example
                // 9
        */
        NOT_FOUND: 9,
    },

    /**
        Custom Array
        * * 🟢 generic, it is a array
        @return Array
        @example
            // [{...}, { ...}]
    */
    typeOfData: [
        {
            type: "success",
            color: "teal-3",
            icon: "alpha-a-circle",
            state: "Active member",
        },
        {
            type: "warning",
            color: "blue-4",
            icon: "alpha-a-circle",
            state: "Affiliate member",
        },
        {
            type: "info",
            color: "cyan-11",
            icon: "alpha-a-circle",
            state: "Associate member",
        },
        {
            type: "error",
            color: "grey-4",
            icon: "alpha-s-circle",
            state: "Suspended",
        },
        {
            type: "error",
            color: "grey-7",
            icon: "alpha-a-circle",
            state: "Excluded",
        },
        {
            type: "info",
            color: "blue-11",
            icon: "person_add",
            state: "recent",
        },
        {
            type: "warning",
            color: "light-blue-5",
            icon: "directions_boat",
            state: "Freight",
        },
        {
            type: "info",
            color: "cyan-5",
            icon: "person",
            state: "Passenger",
        },
        {
            type: "warning",
            color: "teal-4",
            icon: "business",
            state: "Infra- structure",
        },
        {
            type: "info",
            color: "teal-12",
            icon: "data_thresholding",
            state: "Holding",
        },
        {
            type: "info",
            color: "green-3",
            icon: "integration_instructions",
            state: "Integrated",
        },
        {
            type: "warning",
            color: "blue-grey-7",
            icon: "alt_route",
            state: "Other",
        }
    ],
};