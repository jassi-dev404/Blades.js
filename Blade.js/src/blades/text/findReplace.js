/**
 * Find and replace in text
 * @param {string} text - Input text
 * @param {string} find - Text to find
 * @param {string} replace - Replacement text
 * @param {Object} options - Options
 * @param {boolean} options.caseSensitive - Case sensitive search (default false)
 * @param {boolean} options.replaceAll - Replace all occurrences (default true)
 * @returns {{result: string, count: number}}
 */
export default function findReplace(text, find, replace, { caseSensitive = false, replaceAll = true } = {}) {
  let flags = 'g';
  if (!caseSensitive) flags += 'i';
  const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, flags);
  const matches = text.match(regex);
  const count = matches ? matches.length : 0;
  return { result: text.replace(regex, replace), count };
}
