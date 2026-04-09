/**
 * Extracts emoji from text
 * @param {string} text - Input text
 * @returns {string[]} Array of emoji found
 */
export default function emojiExtractor(text) {
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{200D}]/gu;
  const matches = text.match(emojiRegex);
  return matches ? matches.filter(e => e !== '\u200D') : [];
}
