/**
 * Converts between length units
 * @param {number} value - Length value
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted length rounded to 6 decimal places
 */
export default function lengthConverter(value, fromUnit, toUnit) {
  const toMeters = {
    meter: 1, kilometer: 1000, mile: 1609.344, foot: 0.3048,
    inch: 0.0254, centimeter: 0.01, millimeter: 0.001, yard: 0.9144,
    'nautical mile': 1852
  };

  if (!toMeters[fromUnit] || !toMeters[toUnit]) {
    throw new Error('Invalid length unit');
  }

  const meters = value * toMeters[fromUnit];
  const result = meters / toMeters[toUnit];
  return parseFloat(result.toFixed(6));
}
