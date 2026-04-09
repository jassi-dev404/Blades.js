# Blade.js — Simple Import Guide

## How to Import (Pick One)

```js
// OPTION 1: Import specific blades you need (recommended)
import { colorPalette, slugify, base64Encode } from './blades';

// OPTION 2: Import everything at once
import * as blades from './blades';
// Use as: blades.colorPalette(5), blades.slugify('hello')

// OPTION 3: Import a single blade directly
import colorPalette from './blades/generators/colorPalette';
```

**Path shortcut:** All imports are from `'./blades'` — no need to type long paths.

---

## 🎨 Generators

### `colorPalette(count?)` → `['#hex', '#hex', ...]`

```js
import { colorPalette } from './blades';

colorPalette(5);
// ['#a3f2c1', '#e4b8f0', '#7c3aed', '#f59e0b', '#10b981']
```

| Param | Type | Default | What it does |
|-------|------|---------|-------------|
| count | number | 5 | How many colors to generate |

---

### `colorHarmony(hex, type?)` → `['#hex', '#hex', ...]`

```js
import { colorHarmony } from './blades';

colorHarmony('#FF5733', 'complementary'); // ['#FF5733', '#33C1FF']
colorHarmony('#FF5733', 'triadic');       // ['#FF5733', '#33FF57', '#5733FF']
colorHarmony('#FF5733', 'analogous');     // 3 similar colors
colorHarmony('#FF5733', 'split-complementary'); // 3 split colors
```

| Param | Type | Default | Options |
|-------|------|---------|--------|
| hex | string | required | Any hex color, with or without `#` |
| type | string | `'complementary'` | `'complementary'`, `'analogous'`, `'triadic'`, `'split-complementary'` |

---

### `passwordGenerator({length, uppercase, lowercase, numbers, symbols})` → `'string'`

```js
import { passwordGenerator } from './blades';

passwordGenerator();                                        // default: 12 chars, all types
passwordGenerator({ length: 20 });                          // longer password
passwordGenerator({ length: 8, numbers: false });           // no numbers
passwordGenerator({ uppercase: true, symbols: false });     // letters only
```

| Option | Type | Default | Description |
|--------|------|---------|------------|
| length | number | 12 | Password length |
| uppercase | boolean | true | Include A-Z |
| lowercase | boolean | true | Include a-z |
| numbers | boolean | true | Include 0-9 |
| symbols | boolean | true | Include !@#$%^&* |

---

### `loremGenerator({sentences, paragraphs, words})` → `'string'`

```js
import { loremGenerator } from './blades';

loremGenerator({ sentences: 3 });    // 3 sentences
loremGenerator({ paragraphs: 2 });   // 2 paragraphs (overrides sentences)
loremGenerator({ words: 10 });       // exactly 10 words (overrides both)
```

Pick **only one**: `sentences` OR `paragraphs` OR `words`.

---

### `uuidGenerator()` → `'string'`

```js
import { uuidGenerator } from './blades';

uuidGenerator(); // 'a3f1b8c7-4d2e-4f9a-b1c3-7e8d9f0a1b2c'
```

No params needed.

---

### `patternGenerator({type, color, backgroundColor, size})` → `'css-string'`

```js
import { patternGenerator } from './blades';

patternGenerator({ type: 'stripes' });
// 'repeating-linear-gradient(45deg, #000, #000 2px, #fff 2px, #fff 20px)'

patternGenerator({ type: 'dots', color: '#333', size: 30 });
patternGenerator({ type: 'grid' });
patternGenerator({ type: 'zigzag' });
```

| Option | Type | Default | Options |
|--------|------|---------|--------|
| type | string | `'stripes'` | `'stripes'`, `'dots'`, `'grid'`, `'zigzag'` |
| color | string | `'#000000'` | Any hex color |
| backgroundColor | string | `'#ffffff'` | Any hex color |
| size | number | 20 | Pattern size in px |

**Use it:** `element.style.background = patternGenerator({ type: 'dots' })`

---

### `gradientGenerator({type, colors, angle})` → `'css-string'`

```js
import { gradientGenerator } from './blades';

gradientGenerator({ type: 'linear', colors: ['#FF5733', '#33FF57'], angle: 90 });
// 'linear-gradient(90deg, #FF5733, #33FF57)'

gradientGenerator({ type: 'radial', colors: ['#667eea', '#764ba2'] });
// 'radial-gradient(circle, #667eea, #764ba2)'
```

| Option | Type | Default | Notes |
|--------|------|---------|-------|
| type | string | `'linear'` | `'linear'` or `'radial'` |
| colors | string[] | `['#FF5733', '#33FF57']` | Array of 2+ colors |
| angle | number | 135 | Only for linear gradients |

---

### `boxShadowGenerator({x, y, blur, spread, opacity, color, inset})` → `'css-string'`

```js
import { boxShadowGenerator } from './blades';

boxShadowGenerator();                                  // default shadow
boxShadowGenerator({ x: 0, y: 4, blur: 12 });          // subtle
boxShadowGenerator({ inset: true, color: '#aa3bff' }); // purple inner shadow
```

| Option | Type | Default |
|--------|------|---------|
| x | number | 4 |
| y | number | 6 |
| blur | number | 15 |
| spread | number | 0 |
| opacity | number | 0.1 |
| color | string | `'#000000'` |
| inset | boolean | false |

---

## 🔄 Converters

### `currencyConverter(amount, from, to)` → `{convertedAmount, rate}`

```js
import { currencyConverter } from './blades';

currencyConverter(100, 'USD', 'EUR');  // { convertedAmount: 92, rate: 0.92 }
currencyConverter(50, 'GBP', 'INR');   // { convertedAmount: 5261.51, rate: 105.23 }
currencyConverter(1, 'USD', 'JPY');    // { convertedAmount: 149.5, rate: 149.5 }
```

**Supported:** `USD`, `EUR`, `GBP`, `INR`, `JPY`, `CNY`, `CHF`, `CAD`, `AUD`, `KRW`

---

### `temperatureConverter(value, from, to)` → `number`

```js
import { temperatureConverter } from './blades';

temperatureConverter(100, 'celsius', 'fahrenheit');    // 212
temperatureConverter(32, 'fahrenheit', 'kelvin');      // 273.15
temperatureConverter(0, 'kelvin', 'celsius');          // -273.15
```

**Units:** `celsius`, `fahrenheit`, `kelvin`

---

### `lengthConverter(value, from, to)` → `number`

```js
import { lengthConverter } from './blades';

lengthConverter(1, 'mile', 'kilometer');    // 1.609344
lengthConverter(5, 'foot', 'centimeter');   // 152.4
lengthConverter(100, 'meter', 'yard');      // 109.36133
```

**Units:** `meter`, `kilometer`, `mile`, `foot`, `inch`, `centimeter`, `millimeter`, `yard`, `nautical mile`

---

### `weightConverter(value, from, to)` → `number`

```js
import { weightConverter } from './blades';

weightConverter(1, 'kilogram', 'pound');   // 2.204623
weightConverter(16, 'ounce', 'gram');      // 453.592369
```

**Units:** `kilogram`, `gram`, `pound`, `ounce`, `milligram`, `metric ton`, `us ton`

---

### `speedConverter(value, from, to)` → `number`

```js
import { speedConverter } from './blades';

speedConverter(100, 'km/h', 'mph');  // 62.1371
speedConverter(60, 'knots', 'km/h'); // 111.12
```

**Units:** `km/h`, `mph`, `m/s`, `knots`, `ft/s`

---

### `timeConverter(value, from, to)` → `number`

```js
import { timeConverter } from './blades';

timeConverter(1, 'hours', 'minutes');   // 60
timeConverter(2, 'weeks', 'days');      // 14
timeConverter(365, 'days', 'years');    // 1
```

**Units:** `milliseconds`, `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years`

---

### `dataSizeConverter(value, from, to)` → `number`

```js
import { dataSizeConverter } from './blades';

dataSizeConverter(1, 'gigabyte', 'megabyte');   // 1024
dataSizeConverter(500, 'megabyte', 'gigabyte'); // 0.488281
```

**Units:** `bytes`, `kilobytes`, `megabytes`, `gigabytes`, `terabytes`, `petabytes`, `bits`, `kilobits`, `megabits`

---

### `numberBaseConverter(value, from, to)` → `string`

```js
import { numberBaseConverter } from './blades';

numberBaseConverter(255, 'decimal', 'hex');    // 'FF'
numberBaseConverter('FF', 'hex', 'binary');    // '11111111'
numberBaseConverter(10, 'decimal', 'octal');   // '12'
numberBaseConverter('1010', 'binary', 'hex');  // 'A'
```

**Bases:** `binary`, `octal`, `decimal`, `hex`

---

### `romanNumeralConverter(value, direction?)` → `string` or `number`

```js
import { romanNumeralConverter } from './blades';

romanNumeralConverter(1994, 'toRoman');       // 'MCMXCIV'
romanNumeralConverter('MCMXCIV', 'fromRoman');// 1994
```

| Param | Type | Options |
|-------|------|--------|
| value | number | 1–3999 (for toRoman) |
| direction | string | `'toRoman'` or `'fromRoman'` |

---

### `angleConverter(value, from, to)` → `number`

```js
import { angleConverter } from './blades';

angleConverter(180, 'degrees', 'radians');  // 3.141593
angleConverter(1, 'turns', 'degrees');      // 360
```

**Units:** `degrees`, `radians`, `gradians`, `turns`

---

## 📝 Text

### `caseConverter(text, type)` → `string`

```js
import { caseConverter } from './blades';

caseConverter('hello world', 'upper');    // 'HELLO WORLD'
caseConverter('HELLO WORLD', 'lower');    // 'hello world'
caseConverter('hello world', 'title');    // 'Hello World'
caseConverter('hello world. hi there', 'sentence'); // 'Hello world. Hi there'
caseConverter('Hello', 'toggle');         // 'hELLO'
```

**Types:** `upper`, `lower`, `title`, `sentence`, `toggle`

---

### `wordCounter(text)` → `{words, characters, charactersNoSpaces, sentences, paragraphs}`

```js
import { wordCounter } from './blades';

wordCounter('Hello world. How are you?');
// { words: 5, characters: 25, charactersNoSpaces: 21, sentences: 2, paragraphs: 1 }
```

No options. Just pass text.

---

### `textReverser(text, mode?)` → `string`

```js
import { textReverser } from './blades';

textReverser('hello');           // 'olleh' (characters mode by default)
textReverser('hello world', 'words'); // 'world hello'
```

**Modes:** `characters` (default), `words`

---

### `palindromeChecker(text)` → `{isPalindrome, cleanedText}`

```js
import { palindromeChecker } from './blades';

palindromeChecker('racecar');
// { isPalindrome: true, cleanedText: 'racecar' }

palindromeChecker('A man a plan a canal Panama');
// { isPalindrome: true, cleanedText: 'amanaplanacanalpanama' }
```

Ignores spaces, punctuation, and case automatically.

---

### `slugify(text, {separator, lowercase})` → `string`

```js
import { slugify } from './blades';

slugify('Hello World');                   // 'hello-world'
slugify('Café & Résumé', { separator: '_' }); // 'cafe_resume'
slugify('Hello World', { lowercase: false }); // 'Hello-World'
```

| Option | Type | Default |
|--------|------|--------|
| separator | string | `'-'` |
| lowercase | boolean | true |

---

### `emailExtractor(text)` → `['email1', 'email2', ...]`

```js
import { emailExtractor } from './blades';

emailExtractor('Email john@test.com or support@site.org for help');
// ['john@test.com', 'support@site.org']
```

Removes duplicates automatically.

---

### `charFrequency(text)` → `[{char, count, percentage}, ...]`

```js
import { charFrequency } from './blades';

charFrequency('hello');
// [{char:'l', count:2, percentage:40}, {char:'h', count:1, percentage:20}, ...]
```

Sorted by most frequent. Spaces are excluded.

---

### `findReplace(text, find, replace, {caseSensitive, replaceAll})` → `{result, count}`

```js
import { findReplace } from './blades';

findReplace('Hello hello HELLO', 'hello', 'hi');
// { result: 'hi hi hi', count: 3 } (case insensitive, replace all)

findReplace('Hello hello', 'Hello', 'Hi', { caseSensitive: true, replaceAll: false });
// { result: 'Hi hello', count: 1 }
```

| Option | Type | Default |
|--------|------|--------|
| caseSensitive | boolean | false |
| replaceAll | boolean | true |

---

## 🔐 Encoders

### `base64Encode(text, mode)` → `string`

```js
import { base64Encode } from './blades';

base64Encode('Hello', 'encode');  // 'SGVsbG8='
base64Encode('SGVsbG8=', 'decode'); // 'Hello'
```

**Modes:** `encode`, `decode`

---

### `urlEncode(text, mode)` → `string`

```js
import { urlEncode } from './blades';

urlEncode('Hello World!', 'encode');   // 'Hello%20World!'
urlEncode('Hello%20World%21', 'decode'); // 'Hello World!'
```

---

### `htmlEntityEncode(text, mode)` → `string`

```js
import { htmlEntityEncode } from './blades';

htmlEntityEncode('<div class="x">', 'encode'); // '&lt;div class=&quot;x&quot;&gt;'
htmlEntityEncode('&lt;div&gt;', 'decode');      // '<div>'
```

---

### `hexConverter(text, mode)` → `string`

```js
import { hexConverter } from './blades';

hexConverter('Hi', 'encode');     // '48 69'
hexConverter('48 69', 'decode');  // 'Hi'
```

---

### `binaryConverter(text, mode)` → `string`

```js
import { binaryConverter } from './blades';

binaryConverter('Hi', 'encode');     // '01001000 01101001'
binaryConverter('01001000 01101001', 'decode'); // 'Hi'
```

---

### `morseCodeConverter(text, mode)` → `string`

```js
import { morseCodeConverter } from './blades';

morseCodeConverter('SOS', 'encode');     // '... --- ...'
morseCodeConverter('... --- ...', 'decode'); // 'SOS'
```

Supports A–Z, 0–9, and punctuation.

---

## 🔢 Math

### `bmiCalculator(weightKg, heightCm)` → `{bmi, category}`

```js
import { bmiCalculator } from './blades';

bmiCalculator(70, 175);
// { bmi: 22.86, category: 'Normal' }

bmiCalculator(95, 170);
// { bmi: 32.87, category: 'Obese Class I' }
```

**Categories:** `Underweight`, `Normal`, `Overweight`, `Obese Class I`, `Obese Class II`, `Obese Class III`

---

### `percentageCalculator(value, total)` → `number`

```js
import { percentageCalculator } from './blades';

percentageCalculator(25, 200);  // 12.5 (25 is 12.5% of 200)
```

---

### `discountCalculator(price, discountPercent)` → `{finalPrice, savings}`

```js
import { discountCalculator } from './blades';

discountCalculator(100, 25);
// { finalPrice: 75, savings: 25 }
```

---

### `ageCalculator(birthDate)` → `{years, months, days, nextBirthday}`

```js
import { ageCalculator } from './blades';

ageCalculator('1995-06-15');
// { years: 30, months: 9, days: 25, nextBirthday: '2026-06-15' }
```

Accepts ISO date string or Date object.

---

### `factorial(n)` → `number` or `BigInt`

```js
import { factorial } from './blades';

factorial(5);   // 120
factorial(10);  // 3628800
factorial(25);  // BigInt: 15511210043330985984000000n
```

Auto-switches to BigInt for n > 20.

---

### `fibonacci(n)` → `BigInt[]`

```js
import { fibonacci } from './blades';

fibonacci(8);
// [0, 1, 1, 2, 3, 5, 8, 13]
```

---

### `primeChecker(n)` → `{isPrime, nearestPrime, factors}`

```js
import { primeChecker } from './blades';

primeChecker(17);
// { isPrime: true, nearestPrime: 17, factors: [1, 17] }

primeChecker(20);
// { isPrime: false, nearestPrime: 19, factors: [1, 2, 4, 5, 10, 20] }
```

---

### `gcdLcm(a, b)` → `{gcd, lcm}`

```js
import { gcdLcm } from './blades';

gcdLcm(12, 18);
// { gcd: 6, lcm: 36 }
```

---

### `randomNumber({min, max, count, integer})` → `number` or `number[]`

```js
import { randomNumber } from './blades';

randomNumber({ min: 1, max: 100, integer: true });
// 42

randomNumber({ min: 0, max: 1, count: 3 });
// [0.23, 0.87, 0.01]
```

| Option | Type | Default |
|--------|------|--------|
| min | number | 0 |
| max | number | 1 |
| count | number | 1 |
| integer | boolean | false |

---

## 📋 Formatters

### `jsonFormatter(input, {indentSize, minify})` → `{formatted, isValid, error}`

```js
import { jsonFormatter } from './blades';

jsonFormatter('{"name":"John"}');
// { formatted: '{\n  "name": "John"\n}', isValid: true, error: null }

jsonFormatter('{"bad":}');
// { formatted: null, isValid: false, error: 'Unexpected token...' }

jsonFormatter('{"name":"John"}', { minify: true });
// { formatted: '{"name":"John"}', isValid: true, error: null }
```

---

### `fileSizeFormatter(bytes)` → `string`

```js
import { fileSizeFormatter } from './blades';

fileSizeFormatter(500);            // '500 B'
fileSizeFormatter(1500);           // '1.46 KB'
fileSizeFormatter(1048576);        // '1 MB'
fileSizeFormatter(1073741824);     // '1 GB'
```

---

### `phoneNumberFormatter(number, format?)` → `string`

```js
import { phoneNumberFormatter } from './blades';

phoneNumberFormatter('1234567890', 'us');            // '(123) 456-7890'
phoneNumberFormatter('+11234567890', 'international'); // '+1 123-456-7890'
phoneNumberFormatter('1234567890', 'e164');          // '+11234567890'
```

**Formats:** `us`, `international`, `e164`

---

### `numberFormatter(number, {decimals, locale, notation})` → `string`

```js
import { numberFormatter } from './blades';

numberFormatter(1234567.89, { decimals: 2, locale: 'en-US' });
// '1,234,567.89'

numberFormatter(1500000, { notation: 'compact' });
// '1.5M'
```

---

## 📱 QR

### `qrGenerator(text, size?)` → `svg-string`

```js
import { qrGenerator } from './blades';

const svg = qrGenerator('https://example.com', 200);
// Use in React: <div dangerouslySetInnerHTML={{ __html: svg }} />
```

---

## 🎨 Color Utils

### `colorConverter(color, toFormat)` → `object` or `string`

```js
import { colorConverter } from './blades';

colorConverter('#FF5733', 'rgb');   // { r: 255, g: 87, b: 51 }
colorConverter('#FF5733', 'hsl');   // { h: 11, s: 100, l: 60 }
```

**Formats:** `hex`, `rgb`, `hsl`

---

### `colorContrast(color1, color2)` → `{ratio, level}`

```js
import { colorContrast } from './blades';

colorContrast('#000000', '#FFFFFF');
// { ratio: 21, level: 'AAA' }

colorContrast('#777777', '#FFFFFF');
// { ratio: 4.47, level: 'fail' }
```

**Levels:** `AAA` (≥7:1), `AA` (≥4.5:1), `fail`

---

### `randomColor({format, hue})` → `string`

```js
import { randomColor } from './blades';

randomColor();                                    // '#a3f2c1'
randomColor({ format: 'rgb', hue: 'warm' });      // 'rgb(242, 166, 90)'
randomColor({ format: 'hsl', hue: 'cool' });      // 'hsl(200, 70%, 60%)'
randomColor({ format: 'hex', hue: 'pastel' });    // '#b8d4f0'
```

| Option | Type | Default | Options |
|--------|------|--------|--------|
| format | string | `'hex'` | `'hex'`, `'rgb'`, `'hsl'` |
| hue | string | `'random'` | `'random'`, `'warm'`, `'cool'`, `'pastel'` |

---

## 📅 Dates

### `dateDifference(date1, date2)` → `{years, months, days, hours, minutes, seconds, totalDays}`

```js
import { dateDifference } from './blades';

dateDifference('2020-01-01', '2025-06-15');
// { years: 5, months: 5, days: 14, hours: ..., totalDays: 2012 }
```

---

### `dateFormatter(date, format)` → `string`

```js
import { dateFormatter } from './blades';

dateFormatter('2025-04-09', 'iso');       // '2025-04-09T00:00:00.000Z'
dateFormatter('2025-04-09', 'us');        // '4/9/2025'
dateFormatter('2025-04-09', 'eu');        // '09/04/2025'
dateFormatter('2025-04-09', 'weekday');   // 'Wednesday, April 9, 2025'
dateFormatter('2025-04-09', 'unix');      // '1744156800'
dateFormatter(Date.now() - 86400000, 'relative'); // '1d ago'
```

**Formats:** `iso`, `us`, `eu`, `weekday`, `unix`, `relative`

---

### `businessDays(start, end)` → `{totalDays, businessDays, weekends, weeks}`

```js
import { businessDays } from './blades';

businessDays('2025-01-01', '2025-01-31');
// { totalDays: 30, businessDays: 23, weekends: 8, weeks: 4 }
```

---

## #️⃣ Hashes

### `simpleHash(text, algorithm?)` → `string`

```js
import { simpleHash } from './blades';

simpleHash('hello');              // default: djb2
simpleHash('hello', 'djb2');      // '5381098'
simpleHash('hello', 'sdbm');      // '...'
simpleHash('hello', 'xor');       // '...'
```

**Algorithms:** `djb2`, `sdbm`, `xor`

---

### `checksumGenerator(text)` → `{crc, luhn, simple}`

```js
import { checksumGenerator } from './blades';

checksumGenerator('hello world');
// { crc: '1234567890', luhn: 3, simple: 'a1b2' }
```

---

## 🔤 Strings

### `textDiff(text1, text2)` → `{added, removed, unchanged, similarity}`

```js
import { textDiff } from './blades';

textDiff('Hello world', 'Hello universe');
// { added: 'universe', removed: 'world', unchanged: 'Hello', similarity: 50 }
```

---

### `textSimilarity(text1, text2)` → `{distance, similarity, isMatch}`

```js
import { textSimilarity } from './blades';

textSimilarity('kitten', 'sitting');
// { distance: 3, similarity: 57.14, isMatch: false }

textSimilarity('hello', 'hello');
// { distance: 0, similarity: 100, isMatch: true }
```

---

### `templateEngine(template, data)` → `string`

```js
import { templateEngine } from './blades';

templateEngine('Hello {{name}}, age {{age}}', { name: 'John', age: 30 });
// 'Hello John, age 30'

templateEngine('Hi {{user.name}}', { user: { name: 'Alice' } });
// 'Hi Alice'
```

---

### `truncate(text, maxLen?, ellipsis?)` → `string`

```js
import { truncate } from './blades';

truncate('This is a very long text', 15);      // 'This is a ver...'
truncate('Hello world', 8, ' →');              // 'Hello w →'
truncate('Short', 10);                         // 'Short' (unchanged)
```

---

### `initials(name, {maxLength, separator})` → `string`

```js
import { initials } from './blades';

initials('John Doe');                          // 'JD'
initials('John Fitzgerald Kennedy');           // 'JFK'
initials('John Doe', { maxLength: 1 });        // 'J'
initials('John Doe', { separator: '.' });      // 'J.D'
```

---

### `repeatText(text, count?, separator?)` → `string`

```js
import { repeatText } from './blades';

repeatText('Ha', 3);           // 'HaHaHa'
repeatText('Line', 3, '\n');   // 'Line\nLine\nLine'
```

---

### `censor(text, {customWords, replacement})` → `string`

```js
import { censor } from './blades';

censor('This is damn cool');
// 'This is **** cool'

censor('heck darn', { customWords: ['heck', 'darn'], replacement: '#' });
// '#### d###'
```

Comes with built-in profanity list + your custom words.

---

## 🔧 Misc

### `userAgent(uaString?)` → `{browser, os, device, isMobile, isTablet, isDesktop}`

```js
import { userAgent } from './blades';

userAgent();
// { browser: 'Chrome', os: 'macOS', device: 'Desktop', isMobile: false, isTablet: false, isDesktop: true }
```

No argument = uses browser's UA. Pass a string to parse any UA.

---

### `viewportInfo()` → `{width, height, orientation, aspectRatio, breakpoint}`

```js
import { viewportInfo } from './blades';

viewportInfo();
// { width: 1440, height: 900, orientation: 'landscape', aspectRatio: '1440:900', breakpoint: 'xl' }
```

**Breakpoints:** `mobile` (<640), `sm` (≥640), `md` (≥768), `lg` (≥1024), `xl` (≥1280)

---

### `copyToClipboard(text)` → `Promise<boolean>`

```js
import { copyToClipboard } from './blades';

const ok = await copyToClipboard('text to copy');
console.log(ok); // true or false
```

---

### `downloadFile(content, filename, mimeType?)`

```js
import { downloadFile } from './blades';

downloadFile('Hello World', 'hello.txt');
downloadFile(JSON.stringify({a:1}), 'data.json', 'application/json');
downloadFile('body { color: red }', 'style.css', 'text/css');
```

Triggers browser download instantly.

---

### `timezoneConverter(date, timezone)` → `string`

```js
import { timezoneConverter } from './blades';

timezoneConverter(new Date(), 'America/New_York');
// '09:30:45 AM'

timezoneConverter(new Date(), 'Asia/Tokyo');
// '10:30:45 PM'

timezoneConverter(new Date(), 'Europe/London');
// '02:30:45 PM'
```

Use any IANA timezone name.

---

### `emojiExtractor(text)` → `['emoji', ...]`

```js
import { emojiExtractor } from './blades';

emojiExtractor('Hello 👋 World 🌍🔥');
// ['👋', '🌍', '🔥']
```

---

### `typewriterEffect(text, {step})` → `string`

```js
import { typewriterEffect } from './blades';

typewriterEffect('Hello', { step: 0 }); // ''
typewriterEffect('Hello', { step: 3 }); // 'Hel'
typewriterEffect('Hello', { step: 5 }); // 'Hello'
```

Use with React state + setInterval for animation.

---

### `stopwatch()` → `{start, stop, reset, getTime, lap}`

```js
import { stopwatch } from './blades';

const sw = stopwatch();
sw.start();         // starts
sw.getTime();       // 5234.56 (ms)
sw.lap();           // record lap time
sw.stop();          // pauses
sw.start();         // resumes
sw.reset();         // resets everything
```

---

### `timer(durationMs)` → `{start, pause, resume, stop, getTime, onDone}`

```js
import { timer } from './blades';

const t = timer(5000); // 5 seconds countdown
t.onDone(() => console.log('Done!'));
t.start();
t.pause();
t.resume();
t.stop();      // stops and resets
t.getTime();   // ms remaining
```
