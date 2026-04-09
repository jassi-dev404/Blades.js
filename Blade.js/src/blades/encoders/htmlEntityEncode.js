/**
 * Encodes/decodes HTML entities
 * @param {string} text - Input text
 * @param {string} mode - 'encode' or 'decode'
 * @returns {string} Encoded or decoded string
 */
export default function htmlEntityEncode(text, mode = 'encode') {
  if (mode === 'encode') {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return text.replace(/[&<>"']/g, c => entities[c]);
  }
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}
