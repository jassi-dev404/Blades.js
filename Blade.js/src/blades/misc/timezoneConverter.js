/**
 * Converts time between timezones using Intl API
 * @param {string|Date} date - Input date
 * @param {string} toTimezone - Target timezone (e.g. 'America/New_York')
 * @param {Object} options - Formatting options
 * @returns {string} Formatted time in target timezone
 */
export default function timezoneConverter(date, toTimezone, options = {}) {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    timeZone: toTimezone,
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true, ...options
  });
}
