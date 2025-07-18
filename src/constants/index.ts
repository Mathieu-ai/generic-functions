/**
 * Constants and regular expressions
 * Lightweight replacement for the heavy props module
 */

/**
 * Common regular expressions
 */
export const REGEX = {
  /** Match HTML tags */
  htmlTag: /.*?>([^<]*)/,
  
  /** Match content in brackets */
  inBrackets: /\[[^\[\]]*\]/,
  
  /** Match content in strings */
  inStrings: /.*?"([^"]*)/,
  
  /** Match HTML tags or arrays */
  tagRegex: /<([a-z][a-z0-9]*)[^>]*>([^<]*)<\/\1>|(\[(.*?)\])/i,
  
  /** Match opening parentheses */
  openParentheses: /^(.*?)\(/,
  
  /** Match all non-whitespace sequences */
  allSpaces: /\S+/g,
  
  /** Match datetime strings */
  datetime: /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[\+-]\d{2}:\d{2})?)$/,
  
  /** Match email addresses */
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  /** Match URLs */
  url: /^https?:\/\/.+/,
  
  /** Match numbers */
  number: /^-?\d+(\.\d+)?$/
} as const;

/**
 * Date format constants
 */
export const DATE_FORMATS = {
  DATE: "DD/MM/YYYY",
  TIME: "HH:mm",
  DATE_TIME: "DD/MM/YYYY,HH:mm:ss"
} as const;

/**
 * Country date formats by ISO code
 */
export const COUNTRY_DATE_FORMATS = {
  AD: "DD/MM/YYYY", AT: "DD.MM.YYYY", BE: "DD/MM/YYYY", BG: "DD.MM.YYYY",
  CH: "DD.MM.YYYY", CY: "DD/MM/YYYY", CZ: "DD.MM.YYYY", DE: "DD.MM.YYYY",
  DK: "DD.MM.YYYY", EE: "DD.MM.YYYY", ES: "DD/MM/YYYY", FI: "DD.MM.YYYY",
  FR: "DD/MM/YYYY", GB: "DD/MM/YYYY", GR: "DD/MM/YYYY", HR: "DD.MM.YYYY",
  HU: "YYYY.MM.DD.", IE: "DD/MM/YYYY", IS: "DD.MM.YYYY", IT: "DD/MM/YYYY",
  LI: "DD.MM.YYYY", LT: "YYYY.MM.DD", LU: "DD/MM/YYYY", LV: "DD.MM.YYYY",
  MC: "DD/MM/YYYY", MT: "DD/MM/YYYY", NL: "DD-MM-YYYY", NO: "DD.MM.YYYY",
  PL: "DD.MM.YYYY", PT: "DD/MM/YYYY", RO: "DD.MM.YYYY", SE: "YYYY-MM-DD",
  SI: "DD.MM.YYYY", SK: "DD.MM.YYYY", SM: "DD/MM/YYYY", TR: "DD.MM.YYYY",
  US: "MM/DD/YYYY", CA: "MM/DD/YYYY", JP: "YYYY年MM月DD日", CN: "YYYY年MM月DD日", KR: "YYYY-MM-DD"
} as const;

/**
 * Response codes
 */
export const RESPONSE_CODES = {
  NOT_INIT: 0,
  IS_INIT: 1,
  NOT_FOUND_INIT: 2,
  NOT_FOUND: 9
} as const;

/**
 * Common colors for status indicators
 */
export const STATUS_COLORS = {
  ACTIVE: "green",
  INACTIVE: "grey",
  PENDING: "orange",
  ERROR: "red",
  WARNING: "yellow",
  INFO: "blue"
} as const;
