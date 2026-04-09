/**
 * Extracts email addresses from text
 * @param {string} text - Input text
 * @returns {string[]} Array of found email addresses
 */
export default function emailExtractor(text) {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(regex);
  return matches ? [...new Set(matches)] : [];
}
