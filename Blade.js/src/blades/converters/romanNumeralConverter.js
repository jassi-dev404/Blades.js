/**
 * Converts between Roman numerals and integers
 * @param {string|number} value - Roman numeral string or integer
 * @param {string} direction - 'toRoman' or 'fromRoman'
 * @returns {string|number} Roman numeral string or integer
 */
export default function romanNumeralConverter(value, direction = 'toRoman') {
  if (direction === 'toRoman') {
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 3999) throw new Error('Number must be 1-3999');
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    let result = '';
    let n = num;
    for (let i = 0; i < vals.length; i++) {
      while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
    }
    return result;
  }

  const roman = value.toString().toUpperCase().trim();
  const map = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const curr = map[roman[i]];
    if (!curr) throw new Error('Invalid Roman numeral');
    const next = map[roman[i + 1]];
    if (next && curr < next) { result += next - curr; i++; }
    else { result += curr; }
  }
  return result;
}
