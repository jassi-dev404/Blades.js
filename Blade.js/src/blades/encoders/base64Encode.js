/**
 * Encodes/decodes Base64
 * @param {string} text - Input text
 * @param {string} mode - 'encode' or 'decode'
 * @returns {string} Encoded or decoded string
 */
export default function base64Encode(text, mode = 'encode') {
  try {
    if (mode === 'encode') return btoa(unescape(encodeURIComponent(text)));
    return decodeURIComponent(escape(atob(text)));
  } catch (e) {
    return `Error: Invalid input for Base64 ${mode}`;
  }
}
