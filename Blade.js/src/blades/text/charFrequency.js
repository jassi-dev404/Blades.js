/**
 * Analyzes character frequency in text
 * @param {string} text - Input text
 * @returns {{char: string, count: number, percentage: number}[]} Array sorted by frequency
 */
export default function charFrequency(text) {
  const freq = {};
  const total = text.length;
  for (const char of text) {
    if (char === ' ') continue;
    freq[char] = (freq[char] || 0) + 1;
  }
  return Object.entries(freq)
    .map(([char, count]) => ({ char, count, percentage: parseFloat(((count / total) * 100).toFixed(2)) }))
    .sort((a, b) => b.count - a.count);
}
