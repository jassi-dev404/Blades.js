/**
 * Generates CSS box-shadow values
 * @param {Object} options - Shadow options
 * @param {number} options.x - Horizontal offset in px (default 4)
 * @param {number} options.y - Vertical offset in px (default 6)
 * @param {number} options.blur - Blur radius in px (default 15)
 * @param {number} options.spread - Spread radius in px (default 0)
 * @param {number} options.opacity - Shadow opacity 0-1 (default 0.1)
 * @param {string} options.color - Shadow color (default '#000000')
 * @param {boolean} options.inset - Whether shadow is inset (default false)
 * @returns {string} CSS box-shadow value
 */
export default function boxShadowGenerator({ x = 4, y = 6, blur = 15, spread = 0, opacity = 0.1, color = '#000000', inset = false } = {}) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
  const insetStr = inset ? 'inset ' : '';
  return `${insetStr}${x}px ${y}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity})`;
}
