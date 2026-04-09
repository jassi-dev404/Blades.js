/**
 * Generates color harmony from a base color
 * @param {string} baseHex - Base hex color (e.g. 'FF5733')
 * @param {string} type - Harmony type: 'complementary', 'analogous', 'triadic', 'split-complementary'
 * @returns {string[]} Array of harmonious hex color strings
 */
export default function colorHarmony(baseHex, type = 'complementary') {
  const hex = baseHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const hsl = rgbToHsl(r, g, b);
  const harmonies = [];

  switch (type) {
    case 'complementary':
      harmonies.push(baseHex);
      harmonies.push(hslToHex((hsl[0] + 180) % 360, hsl[1], hsl[2]));
      break;
    case 'analogous':
      harmonies.push(hslToHex((hsl[0] - 30 + 360) % 360, hsl[1], hsl[2]));
      harmonies.push(baseHex);
      harmonies.push(hslToHex((hsl[0] + 30) % 360, hsl[1], hsl[2]));
      break;
    case 'triadic':
      harmonies.push(baseHex);
      harmonies.push(hslToHex((hsl[0] + 120) % 360, hsl[1], hsl[2]));
      harmonies.push(hslToHex((hsl[0] + 240) % 360, hsl[1], hsl[2]));
      break;
    case 'split-complementary':
      harmonies.push(baseHex);
      harmonies.push(hslToHex((hsl[0] + 150) % 360, hsl[1], hsl[2]));
      harmonies.push(hslToHex((hsl[0] + 210) % 360, hsl[1], hsl[2]));
      break;
  }

  return harmonies;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
