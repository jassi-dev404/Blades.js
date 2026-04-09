/**
 * Converts a time value from one unit to another.
 * @param {number} value - The time value to convert.
 * @param {string} fromUnit - Source unit: seconds, minutes, hours, days, weeks, milliseconds, months, years
 * @param {string} toUnit - Target unit: seconds, minutes, hours, days, weeks, milliseconds, months, years
 * @returns {number} Converted time value rounded to 4 decimal places
 */
export default function timeConverter(value, fromUnit, toUnit) {
  const toSeconds = {
    milliseconds: 0.001, seconds: 1, minutes: 60, hours: 3600,
    days: 86400, weeks: 604800, months: 2592000, years: 31536000
  };
  if (!toSeconds[fromUnit] || !toSeconds[toUnit]) {
    throw new Error('Invalid time unit');
  }
  const seconds = value * toSeconds[fromUnit];
  return parseFloat((seconds / toSeconds[toUnit]).toFixed(4));
}
