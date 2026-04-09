/**
 * Generates a random password
 * @param {Object} options - Password options
 * @param {number} options.length - Password length (default 12)
 * @param {boolean} options.uppercase - Include uppercase letters (default true)
 * @param {boolean} options.lowercase - Include lowercase letters (default true)
 * @param {boolean} options.numbers - Include numbers (default true)
 * @param {boolean} options.symbols - Include symbols (default true)
 * @returns {string} Generated password
 */
export default function passwordGenerator({ length = 12, uppercase = true, lowercase = true, numbers = true, symbols = true } = {}) {
  let chars = '';
  if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}
