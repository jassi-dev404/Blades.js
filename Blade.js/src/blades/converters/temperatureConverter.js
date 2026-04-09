/**
 * Converts between temperature units
 * @param {number} value - Temperature value
 * @param {string} fromUnit - Source unit: 'celsius', 'fahrenheit', 'kelvin'
 * @param {string} toUnit - Target unit: 'celsius', 'fahrenheit', 'kelvin'
 * @returns {number} Converted temperature rounded to 2 decimal places
 */
export default function temperatureConverter(value, fromUnit, toUnit) {
  const units = ['celsius', 'fahrenheit', 'kelvin'];
  if (!units.includes(fromUnit) || !units.includes(toUnit)) {
    throw new Error('Invalid unit. Use celsius, fahrenheit, or kelvin');
  }

  let celsius;
  switch (fromUnit) {
    case 'celsius': celsius = value; break;
    case 'fahrenheit': celsius = (value - 32) * 5 / 9; break;
    case 'kelvin': celsius = value - 273.15; break;
  }

  let result;
  switch (toUnit) {
    case 'celsius': result = celsius; break;
    case 'fahrenheit': result = celsius * 9 / 5 + 32; break;
    case 'kelvin': result = celsius + 273.15; break;
  }

  return parseFloat(result.toFixed(2));
}
