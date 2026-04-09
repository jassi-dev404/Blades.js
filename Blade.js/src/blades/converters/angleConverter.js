/**
 * Converts an angle value from one unit to another.
 *
 * @param {number} value - The angle value to convert.
 * @param {string} fromUnit - The source unit (degrees, radians, gradians, turns).
 * @param {string} toUnit - The target unit (degrees, radians, gradians, turns).
 * @returns {number} The converted angle value rounded to 6 decimal places.
 * @throws {Error} If an unsupported angle unit is provided.
 */
export default function angleConverter(value, fromUnit, toUnit) {
  const supportedUnits = ['degrees', 'radians', 'gradians', 'turns'];

  const fromLower = fromUnit.toLowerCase();
  const toLower = toUnit.toLowerCase();

  if (!supportedUnits.includes(fromLower)) {
    throw new Error(`Unsupported angle unit: ${fromUnit}. Supported: ${supportedUnits.join(', ')}`);
  }
  if (!supportedUnits.includes(toLower)) {
    throw new Error(`Unsupported angle unit: ${toUnit}. Supported: ${supportedUnits.join(', ')}`);
  }

  if (fromLower === toLower) return value;

  // Conversion factors to degrees
  const toDegrees = {
    'degrees': 1,
    'radians': 180 / Math.PI,
    'gradians': 0.9,
    'turns': 360,
  };

  const valueInDegrees = value * toDegrees[fromLower];
  const result = valueInDegrees / toDegrees[toLower];

  return Math.round(result * 1e6) / 1e6;
}
