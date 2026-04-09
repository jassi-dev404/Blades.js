/**
 * Converts text to/from binary
 * @param {string} text - Input text or binary string
 * @param {string} mode - 'encode' or 'decode'
 * @returns {string} Binary string or decoded text
 */
export default function binaryConverter(text, mode = 'encode') {
  if (mode === 'encode') {
    return [...text].map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  }
  return text.split(/\s+/).map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}
