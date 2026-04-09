/**
 * Encodes/decodes URL components
 * @param {string} text - Input text
 * @param {string} mode - 'encode' or 'decode'
 * @returns {string} Encoded or decoded string
 */
export default function urlEncode(text, mode = 'encode') {
  try {
    return mode === 'encode' ? encodeURIComponent(text) : decodeURIComponent(text);
  } catch (e) {
    return `Error: Invalid input for URL ${mode}`;
  }
}
