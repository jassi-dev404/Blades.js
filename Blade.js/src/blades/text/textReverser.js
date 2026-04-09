/**
 * Reverses text by words or characters
 * @param {string} text - Input text
 * @param {string} mode - 'words' or 'characters'
 * @returns {string} Reversed text
 */
export default function textReverser(text, mode = 'characters') {
  if (mode === 'words') {
    return text.split(/\s+/).reverse().join(' ');
  }
  return [...text].reverse().join('');
}
