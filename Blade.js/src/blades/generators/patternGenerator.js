/**
 * Generates CSS pattern strings
 * @param {Object} options - Pattern options
 * @param {string} options.type - Pattern type: 'stripes', 'dots', 'grid', 'zigzag'
 * @param {string} options.color - Pattern color (default '#000000')
 * @param {string} options.backgroundColor - Background color (default '#ffffff')
 * @param {number} options.size - Pattern size in px (default 20)
 * @returns {string} CSS background property value
 */
export default function patternGenerator({ type = 'stripes', color = '#000000', backgroundColor = '#ffffff', size = 20 } = {}) {
  switch (type) {
    case 'stripes':
      return `repeating-linear-gradient(45deg, ${color}, ${color} 2px, ${backgroundColor} 2px, ${backgroundColor} ${size}px)`;
    case 'dots':
      return `radial-gradient(circle, ${color} 2px, ${backgroundColor} 2px)`;
    case 'grid':
      return `
        linear-gradient(to right, ${color} 1px, transparent 1px),
        linear-gradient(to bottom, ${color} 1px, transparent 1px)
      `.trim();
    case 'zigzag':
      return `linear-gradient(135deg, ${color} 25%, transparent 25%) -${size}px 0,
        linear-gradient(225deg, ${color} 25%, transparent 25%) -${size}px 0,
        linear-gradient(315deg, ${color} 25%, transparent 25%),
        linear-gradient(45deg, ${color} 25%, transparent 25%)`;
    default:
      return '';
  }
}
