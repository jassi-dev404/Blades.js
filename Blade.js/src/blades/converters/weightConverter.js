/**
 * Converts between weight units
 * @param {number} value - Weight value
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted weight rounded to 6 decimal places
 */
export default function weightConverter(value, fromUnit, toUnit) {
  const toKg = {
    kilogram: 1, gram: 0.001, pound: 0.45359237, ounce: 0.028349523,
    milligram: 0.000001, 'metric ton': 1000, 'us ton': 907.18474
  };

  if (!toKg[fromUnit] || !toKg[toUnit]) {
    throw new Error('Invalid weight unit');
  }

  const kg = value * toKg[fromUnit];
  const result = kg / toKg[toUnit];
  return parseFloat(result.toFixed(6));
}
