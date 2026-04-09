/**
 * Calculates WCAG contrast ratio between two colors
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {{ratio: number, level: string}} Contrast ratio and WCAG level
 */
export default function colorContrast(color1, color2) {
  const luminance = hex => {
    const h = hex.replace('#', '');
    const [r, g, b] = [0, 2, 4].map(i => {
      const c = parseInt(h.substring(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = luminance(color1);
  const l2 = luminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  let level = 'fail';
  if (ratio >= 7) level = 'AAA';
  else if (ratio >= 4.5) level = 'AA';

  return { ratio: parseFloat(ratio.toFixed(2)), level };
}
