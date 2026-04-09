/**
 * Generates CSS gradient strings
 * @param {Object} options - Gradient options
 * @param {string} options.type - Gradient type: 'linear' or 'radial'
 * @param {string[]} options.colors - Array of color stops (default ['#FF5733', '#33FF57'])
 * @param {number} options.angle - Angle in degrees for linear gradients (default 135)
 * @returns {string} CSS gradient value
 */
export default function gradientGenerator({ type = 'linear', colors = ['#FF5733', '#33FF57'], angle = 135 } = {}) {
  if (type === 'radial') {
    return `radial-gradient(circle, ${colors.join(', ')})`;
  }
  return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
}
