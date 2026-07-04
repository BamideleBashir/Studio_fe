import { API_URL_RAW } from "./api/apiConfig"

export const renderServerImage = (location: string) => {
  // if it starts with http, return as is
  if (location.startsWith("http")) return location
  // otherwise, return the full path
  return (`${API_URL_RAW}${location}`);
}

export const textShortener = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

// Scape keywords are stored as a flat array of strings, but some legacy/creation
// paths saved a single comma-joined string as the array's only element (e.g.
// ["car,yacht,pole"]). Splitting every entry on commas normalizes both shapes
// into a clean, deduplicated list of individual keywords for display.
export const parseKeywords = (keywords?: string[] | string | null): string[] => {
  if (!keywords) return [];
  const raw = Array.isArray(keywords) ? keywords : [keywords];
  const seen = new Set<string>();
  const result: string[] = [];

  raw
    .flatMap((k) => String(k).split(","))
    .map((k) => k.trim())
    .filter(Boolean)
    .forEach((k) => {
      const key = k.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(k);
      }
    });

  return result;
};