/**
 * Simple template engine - replaces {{key}} with data values
 * @param {string} template - Template string with {{key}} placeholders
 * @param {Object} data - Data object
 * @returns {string} Rendered string
 */
export default function templateEngine(template, data = {}) {
  return template.replace(/\{\{([\w.]+)\}\}/g, (match, key) => {
    const keys = key.split('.');
    let value = data;
    for (const k of keys) {
      if (value === null || value === undefined) return match;
      value = value[k];
    }
    return value !== undefined && value !== null ? value : match;
  });
}
