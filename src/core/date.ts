/**
 * Lightweight date utility functions
 * No external dependencies - uses native Date API
 */

export type TimeUnit = "hour" | "minute" | "second" | "millisecond" | "day" | "month" | "year";
export type FormatType = "DATE" | "TIME" | "DATE_TIME";
export type CodeISO = "AD" | "AT" | "BE" | "BG" | "CH" | "CY" | "CZ" | "DE" | "DK" | "EE" | "ES" | "FI" | "FR" | "GB" | "GR" | "HR" | "HU" | "IE" | "IS" | "IT" | "LI" | "LT" | "LU" | "LV" | "MC" | "MT" | "NL" | "NO" | "PL" | "PT" | "RO" | "SE" | "SI" | "SK" | "SM" | "TR" | "US" | "CA" | "JP" | "CN" | "KR";

/**
 * Format a date to string
 * @param date - The date to format
 * @param format - The format string (DD/MM/YYYY, HH:mm:ss, etc.)
 * @returns Formatted date string
 * @example
 * formatDate(new Date(), 'DD/MM/YYYY') // '25/12/2023'
 */
export function formatDate(date: string | Date, format: string): string {
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
 * Check if a value is a valid date
 * @param date - The value to check
 * @returns Whether it's a valid date
 */
export function isDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Get current time formatted
 * @param format - Optional format string
 * @returns Current time as string or Date object
 */
export function now(format?: string): string | Date {
  const currentDate = new Date();
  return format ? formatDate(currentDate, format) : currentDate;
}

/**
 * Get seconds until tomorrow
 * @returns Number of seconds until midnight
 */
export function secondsToTomorrow(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  return Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
}

/**
 * Check if two dates are different by a time unit
 * @param nb - Number to compare
 * @param unit - Time unit
 * @returns Whether they are different
 */
export function isDateDifferent(nb: number, unit: TimeUnit): boolean {
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
 * Get date format by country code and format type
 * @param format - Format type
 * @param iso - Country ISO code
 * @returns Date format string
 */
export function getFormat(format: FormatType, iso: CodeISO): string | null {
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
 * Check if date is between two dates
 * @param date - Date to check
 * @param start - Start date
 * @param end - End date
 * @returns Whether date is between start and end
 */
export function isBetween(date: Date | string, start: Date | string, end: Date | string): boolean {
  const d = new Date(date);
  const s = new Date(start);
  const e = new Date(end);
  
  return d >= s && d <= e;
}

/**
 * Add time to a date
 * @param date - Base date
 * @param amount - Amount to add
 * @param unit - Time unit
 * @returns New date with added time
 */
export function addTime(date: Date | string, amount: number, unit: TimeUnit): Date {
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
