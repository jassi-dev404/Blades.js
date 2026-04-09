/**
 * Generates lorem ipsum text
 * @param {Object} options - Generation options
 * @param {number} options.sentences - Number of sentences (default 3)
 * @param {number} options.paragraphs - Number of paragraphs (default 1, overrides sentences)
 * @param {number} options.words - Number of words (default 0, if set overrides sentences/paragraphs)
 * @returns {string} Generated lorem text
 */
export default function loremGenerator({ sentences = 3, paragraphs = 1, words = 0 } = {}) {
  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
    'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
    'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
    'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
    'explicabo', 'nemo', 'ipsam', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit',
    'sed', 'quia', 'consequuntur', 'magni', 'dolores', 'eos', 'qui', 'ratione',
    'voluptatem', 'sequi', 'nesciunt', 'neque', 'porro', 'quisquam', 'est',
    'dolorem', 'ipsum', 'quuia', 'dolor', 'sit', 'amet', 'consectetur',
    'adipisci', 'velit', 'numquam', 'eius', 'modi', 'tempora', 'incidunt',
    'labore', 'dolore', 'magnam', 'aliquam', 'quaerat', 'voluptatem', 'ut',
    'enim', ' minima', 'veniam', 'quis', 'nostrum', 'exercitationem', 'ulla'
  ];

  function randomWord() {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  }

  function makeSentence() {
    const len = Math.floor(Math.random() * 8) + 6;
    const w = [];
    for (let i = 0; i < len; i++) w.push(randomWord());
    w[0] = w[0].charAt(0).toUpperCase() + w[0].slice(1);
    return w.join(' ') + '.';
  }

  function makeParagraph() {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    const sents = [];
    for (let i = 0; i < sentenceCount; i++) sents.push(makeSentence());
    return sents.join(' ');
  }

  if (words > 0) {
    const w = [];
    for (let i = 0; i < words; i++) w.push(randomWord());
    w[0] = w[0].charAt(0).toUpperCase() + w[0].slice(1);
    return w.join(' ') + '.';
  }

  if (paragraphs > 1) {
    const paras = [];
    for (let i = 0; i < paragraphs; i++) paras.push(makeParagraph());
    return paras.join('\n\n');
  }

  const sents = [];
  for (let i = 0; i < sentences; i++) sents.push(makeSentence());
  return sents.join(' ');
}
