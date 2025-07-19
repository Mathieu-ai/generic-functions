/**
 * Lightweight date utility functions
 * No external dependencies - uses native Date API
 */

export type TimeUnit = "hour" | "minute" | "second" | "millisecond" | "day" | "month" | "year";
export type FormatType = "DATE" | "TIME" | "DATE_TIME";
export type CodeISO = "AD" | "AT" | "BE" | "BG" | "CH" | "CY" | "CZ" | "DE" | "DK" | "EE" | "ES" | "FI" | "FR" | "GB" | "GR" | "HR" | "HU" | "IE" | "IS" | "IT" | "LI" | "LT" | "LU" | "LV" | "MC" | "MT" | "NL" | "NO" | "PL" | "PT" | "RO" | "SE" | "SI" | "SK" | "SM" | "TR" | "US" | "CA" | "JP" | "CN" | "KR";

/**
 * Format a date to string using a custom format pattern
 * @param date - The date to format (Date object or date string)
 * @param format - The format string pattern (supports YYYY, MM, DD, HH, mm, ss)
 * @returns Formatted date string, or empty string if date is invalid
 * @example
 * ```typescript
 * formatDate(new Date(), 'DD/MM/YYYY') // '25/12/2023'
 * formatDate('2023-12-25', 'HH:mm:ss') // '00:00:00'
 * formatDate('invalid', 'DD/MM/YYYY') // ''
 * ```
 */
export function formatDate (date: string | Date, format: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const pad = (n: number) => n.toString().padStart(2, '0');

  const replacements: Record<string, string> = {
    'YYYY': d.getFullYear().toString(),
    'MM': pad(d.getMonth() + 1),
    'DD': pad(d.getDate()),
    'HH': pad(d.getHours()),
    'mm': pad(d.getMinutes()),
    'ss': pad(d.getSeconds())
  };

  let result = format;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(key, 'g'), value);
  }

  return result;
}

/**
 * Check if a value is a valid Date object
 * @param date - The value to check for date validity
 * @returns True if the value is a valid Date object, false otherwise
 * @example
 * ```typescript
 * isDate(new Date()) // true
 * isDate('2023-12-25') // false (string, not Date object)
 * isDate(new Date('invalid')) // false (invalid date)
 * ```
 */
export function isDate (date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Get the current date and time, optionally formatted
 * @param format - Optional format string to apply to the current date
 * @returns Current date as Date object, or formatted string if format is provided
 * @example
 * ```typescript
 * now() // Date object for current time
 * now('DD/MM/YYYY HH:mm') // '25/12/2023 14:30'
 * ```
 */
export function now (format?: string): string | Date {
  const currentDate = new Date();
  return format ? formatDate(currentDate, format) : currentDate;
}

/**
 * Calculate the number of seconds remaining until tomorrow (midnight)
 * @returns Number of seconds until the next day begins
 * @example
 * ```typescript
 * // If current time is 23:30:00
 * secondsToTomorrow() // 1800 (30 minutes = 1800 seconds)
 * ```
 */
export function secondsToTomorrow (): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
}

/**
 * Check if a given number differs from the current time's corresponding unit
 * @param nb - The number to compare against the current time unit
 * @param unit - The time unit to compare (hour, minute, second, day, month, year)
 * @returns True if the number differs from the current time's unit value
 * @example
 * ```typescript
 * // If current time is 14:30:45 on 25th December 2023
 * isDateDifferent(15, 'hour') // true (current hour is 14)
 * isDateDifferent(30, 'minute') // false (current minute is 30)
 * isDateDifferent(2023, 'year') // false (current year is 2023)
 * ```
 */
export function isDateDifferent (nb: number, unit: TimeUnit): boolean {
  const now = new Date();

  switch (unit) {
    case 'hour':
      return nb !== now.getHours();
    case 'minute':
      return nb !== now.getMinutes();
    case 'second':
      return nb !== now.getSeconds();
    case 'day':
      return nb !== now.getDate();
    case 'month':
      return nb !== now.getMonth() + 1;
    case 'year':
      return nb !== now.getFullYear();
    default:
      return false;
  }
}

/**
 * Get the date/time format string for a specific country and format type
 * @param format - The type of format to retrieve (DATE, TIME, or DATE_TIME)
 * @param iso - The ISO country code
 * @returns The format string for the specified country and type, or null if not found
 * @example
 * ```typescript
 * getFormat('DATE', 'US') // 'MM/DD/YYYY'
 * getFormat('DATE', 'FR') // 'DD/MM/YYYY'
 * getFormat('TIME', 'US') // 'HH:mm:ss'
 * getFormat('DATE_TIME', 'DE') // 'DD.MM.YYYY, HH:mm:ss'
 * ```
 */
export function getFormat (format: FormatType, iso: CodeISO): string | null {
  const dateFormats: Record<CodeISO, string> = {
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
  };

  const dateFormat = dateFormats[iso];

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
 * Check if a date falls between two other dates (inclusive)
 * @param date - The date to check (Date object or date string)
 * @param start - The start date of the range (Date object or date string)
 * @param end - The end date of the range (Date object or date string)
 * @returns True if the date is between start and end dates (inclusive)
 * @example
 * ```typescript
 * isBetween('2023-12-25', '2023-12-01', '2023-12-31') // true
 * isBetween(new Date('2023-11-30'), '2023-12-01', '2023-12-31') // false
 * isBetween('2023-12-01', '2023-12-01', '2023-12-31') // true (inclusive)
 * ```
 */
export function isBetween (date: Date | string, start: Date | string, end: Date | string): boolean {
  const d = new Date(date);
  const s = new Date(start);
  const e = new Date(end);

  return d >= s && d <= e;
}

/**
 * Add a specified amount of time to a date
 * @param date - The base date to add time to (Date object or date string)
 * @param amount - The amount of time to add (can be negative to subtract)
 * @param unit - The time unit for the amount (millisecond, second, minute, hour, day, month, year)
 * @returns A new Date object with the added time
 * @example
 * ```typescript
 * addTime(new Date('2023-12-25'), 5, 'day') // 2023-12-30
 * addTime('2023-12-25T10:00:00', 2, 'hour') // 2023-12-25T12:00:00
 * addTime(new Date(), -1, 'month') // One month ago
 * addTime('2023-01-31', 1, 'month') // 2023-02-28 (handles month overflow)
 * ```
 */
export function addTime (date: Date | string, amount: number, unit: TimeUnit): Date {
  const d = new Date(date);

  switch (unit) {
    case 'millisecond':
      d.setMilliseconds(d.getMilliseconds() + amount);
      break;
    case 'second':
      d.setSeconds(d.getSeconds() + amount);
      break;
    case 'minute':
      d.setMinutes(d.getMinutes() + amount);
      break;
    case 'hour':
      d.setHours(d.getHours() + amount);
      break;
    case 'day':
      d.setDate(d.getDate() + amount);
      break;
    case 'month':
      d.setMonth(d.getMonth() + amount);
      break;
    case 'year':
      d.setFullYear(d.getFullYear() + amount);
      break;
  }

  return d;
}
