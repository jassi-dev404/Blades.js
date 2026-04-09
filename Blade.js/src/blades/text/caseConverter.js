/**
 * Converts text case
 * @param {string} text - Input text
 * @param {string} type - 'upper', 'lower', 'title', 'sentence'
 * @returns {string} Converted text
 */
export default function caseConverter(text, type = 'upper') {
  switch (type) {
    case 'upper': return text.toUpperCase();
    case 'lower': return text.toLowerCase();
    case 'title': return text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
    case 'sentence': return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
    default: return text;
  }
}
