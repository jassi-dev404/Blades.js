/**
 * Checks if text is a palindrome
 * @param {string} text - Input text
 * @returns {{isPalindrome: boolean, cleanedText: string}}
 */
export default function palindromeChecker(text) {
  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = [...cleaned].reverse().join('');
  return { isPalindrome: cleaned === reversed, cleanedText: cleaned };
}
