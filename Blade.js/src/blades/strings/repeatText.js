/**
 * Repeats text N times with optional separator
 * @param {string} text - Input text
 * @param {number} count - Number of repetitions
 * @param {string} separator - Separator between repetitions (default '')
 * @returns {string} Repeated string
 */
export default function repeatText(text, count = 1, separator = '') {
  return Array(count).fill(text).join(separator);
}
