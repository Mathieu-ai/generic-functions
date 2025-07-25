/**
 * Country interface
 * @since 0.9.8
 */
export interface Country {
  name?: {
    common: string;
    official: string;
  };
  cca2?: string;
  altNames?: string;
  flag?: string;
}

/**
 * Find country by various criteria
 * @param {Object} searchParams - Search criteria
 * @param {string} [searchParams.cc] - Country code (ISO 3166-1 alpha-2)
 * @param {string} [searchParams.cn] - Country name (common or official)
 * @param {string} [searchParams.cf] - Country flag emoji
 * @param {Country[]} countries - Array of countries to search in
 * @returns {Partial<Country>} Found country or empty object if not found
 * @since 0.9.8
 * @example
 * const country = getCountry({ cc: 'US' }, countries);
 * const country2 = getCountry({ cn: 'France' }, countries);
 */
export function getCountry (
  { cc, cn, cf }: { cc?: string; cn?: string; cf?: string },
  countries: Country[]
): Partial<Country> {
  if (!countries || countries.length === 0) return {};

  const normalizedCn = cn?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const searchInAltNames = (altNames: string) => {
    return new RegExp(`\\b${normalizedCn}\\b`, "i").test(altNames);
  };

  const country = countries
    .sort((a, b) => (a.cca2 || '').localeCompare(b.cca2 || ''))
    .find(({ name, altNames, cca2, flag }) => {
      if (cc && cca2 === cc) return true;
      if (cf && flag === cf) return true;
      if (normalizedCn && name) {
        if (name.common === normalizedCn || name.official === normalizedCn) return true;
        if (altNames && searchInAltNames(altNames)) return true;
      }
      return false;
    });

  return country || {};
}