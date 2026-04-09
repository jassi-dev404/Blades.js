/**
 * Counts words, characters, sentences, and paragraphs
 * @param {string} text - Input text
 * @returns {{words: number, characters: number, sentences: number, paragraphs: number, charactersNoSpaces: number}}
 */
export default function wordCounter(text) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length || (text.trim() ? 1 : 0);
  return { words, characters, charactersNoSpaces, sentences, paragraphs };
}
