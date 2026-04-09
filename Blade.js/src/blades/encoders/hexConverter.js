/**
 * Converts text to/from hexadecimal
 * @param {string} text - Input text or hex string
 * @param {string} mode - 'encode' or 'decode'
 * @returns {string} Hex string or decoded text
 */
export default function hexConverter(text, mode = 'encode') {
  if (mode === 'encode') {
    return [...text].map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
  }
  return text.split(/\s+/).map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
}
