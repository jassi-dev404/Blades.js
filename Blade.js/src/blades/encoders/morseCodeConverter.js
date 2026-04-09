/**
 * Converts text to/from Morse code
 * @param {string} text - Input text or morse code
 * @param {string} mode - 'encode' or 'decode'
 * @returns {string} Morse code string or decoded text
 */
export default function morseCodeConverter(text, mode = 'encode') {
  const morseMap = {
    A:'.-', B:'-...', C:'-.-.', D:'-..', E:'.', F:'..-.', G:'--.', H:'....',
    I:'..', J:'.---', K:'-.-', L:'.-..', M:'--', N:'-.', O:'---', P:'.--.',
    Q:'--.-', R:'.-.', S:'...', T:'-', U:'..-', V:'...-', W:'.--', X:'-..-',
    Y:'-.--', Z:'--..', '0':'-----', '1':'.----', '2':'..---', '3':'...--',
    '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', '9':'----.',
    '.':'.-.-.-', ',':'--..--', '?':'..--..', "'":'.----.', '!':'-.-.--',
    '/':'-..-.', '(':'-.--.', ')':'-.--.-', '&':'.-...', ':':'---...',
    ';':'-.-.-.', '=':'-...-', '+':'.-.-.', '-':'-....-', '_':'..--.-',
    '"':'.-..-.', '$':'...-..-', '@':'.--.-.', ' ':' / '
  };
  const reverseMap = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v.trim(), k]));

  if (mode === 'encode') {
    return text.toUpperCase().split('').map(c => morseMap[c] || '').join(' ');
  }
  return text.split(/\s+/).map(code => reverseMap[code] || '').join('');
}
