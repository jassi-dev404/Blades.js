/**
 * Extracts initials from a name
 * @param {string} name - Full name
 * @param {Object} options - Options
 * @param {number} options.maxLength - Max initials length (default 0 = unlimited)
 * @param {string} options.separator - Separator between initials (default '')
 * @returns {string} Initials string
 */
export default function initials(name, { maxLength = 0, separator = '' } = {}) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  let result = parts.map(p => p[0].toUpperCase()).join(separator);
  if (maxLength > 0) result = result.substring(0, maxLength);
  return result;
}
