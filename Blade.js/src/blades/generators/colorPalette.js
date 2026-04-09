/**
 * Generates a harmonious color palette
 * @param {number} count - Number of colors to generate (default 5)
 * @returns {string[]} Array of hex color strings
 */
export default function colorPalette(count = 5) {
  // Pick a random base hue
  const baseHue = Math.floor(Math.random() * 360);
  const saturation = 65 + Math.random() * 20; // 65-85%
  const lightness = 45 + Math.random() * 15;  // 45-60%

  const colors = [];

  // Generate harmonious colors using analogous + complementary spread
  for (let i = 0; i < count; i++) {
    // Distribute hues across the color wheel for harmony
    let hue;
    if (count <= 2) {
      // Complementary
      hue = (baseHue + (i * 180)) % 360;
    } else if (count <= 4) {
      // Split-complementary / triadic
      hue = (baseHue + (i * (360 / count))) % 360;
    } else {
      // Analogous spread for larger palettes
      const spread = 30; // degrees
      hue = (baseHue + (i - Math.floor(count / 2)) * spread + 360) % 360;
    }

    // Vary saturation and lightness slightly for each color
    const s = Math.min(95, saturation + (Math.random() - 0.5) * 10);
    const l = Math.min(75, lightness + (Math.random() - 0.5) * 10);

    // HSL to Hex conversion
    const sNorm = s / 100;
    const lNorm = l / 100;
    const a = sNorm * Math.min(lNorm, 1 - lNorm);
    const f = (n) => {
      const k = (n + hue / 30) % 12;
      const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * Math.max(0, Math.min(1, color))).toString(16).padStart(2, '0');
    };

    colors.push(`#${f(0)}${f(8)}${f(4)}`);
  }

  return colors;
}
