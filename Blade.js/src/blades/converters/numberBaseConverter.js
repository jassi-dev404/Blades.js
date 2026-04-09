/**
 * Converts numbers between bases
 * @param {string|number} value - Input number
 * @param {string} fromBase - Source base: 'binary', 'octal', 'decimal', 'hex'
 * @param {string} toBase - Target base: 'binary', 'octal', 'decimal', 'hex'
 * @returns {string} Converted number as string
 */
export default function numberBaseConverter(value, fromBase, toBase) {
  const baseMap = { binary: 2, octal: 8, decimal: 10, hex: 16 };
  const from = baseMap[fromBase];
  const to = baseMap[toBase];
  if (!from || !to) throw new Error('Invalid base. Use binary, octal, decimal, or hex');
  const decimal = parseInt(value.toString(), from);
  return decimal.toString(to).toUpperCase();
}
