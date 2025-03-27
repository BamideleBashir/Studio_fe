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