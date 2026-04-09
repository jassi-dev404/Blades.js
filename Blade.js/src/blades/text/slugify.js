/**
 * Converts text to URL-friendly slug
 * @param {string} text - Input text
 * @param {Object} options - Options
 * @param {string} options.separator - Separator character (default '-')
 * @param {boolean} options.lowercase - Convert to lowercase (default true)
 * @returns {string} Slug string
 */
export default function slugify(text, { separator = '-', lowercase = true } = {}) {
  let result = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (lowercase) result = result.toLowerCase();
  return result
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, separator)
    .replace(new RegExp(`${separator}+`, 'g'), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '');
}
