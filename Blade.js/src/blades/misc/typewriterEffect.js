/**
 * Creates typewriter effect text animation steps
 * @param {string} text - Full text
 * @param {Object} options - Options
 * @param {number} options.step - Current step (character count to show)
 * @returns {string} Text up to current step
 */
export default function typewriterEffect(text, { step = 0 } = {}) {
  return text.substring(0, step);
}
