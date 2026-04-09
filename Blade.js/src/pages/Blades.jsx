import { useState, useEffect, useRef } from 'react'
import { delay, motion } from 'framer-motion'
import * as blades from '../blades'

const bladesList = [
  {
    name: 'colorPalette', label: 'Color Palette',
    inputs: [{ key: 'count', type: 'number', default: 5 }],
    execute: (v) => blades.colorPalette(v.count || 5), isColors: true
  },
  {
    name: 'colorHarmony', label: 'Color Harmony',
    inputs: [{ key: 'hex', type: 'text', default: '#FF5733' }, { key: 'type', type: 'select', default: 'complementary', options: ['complementary', 'analogous', 'triadic', 'split-complementary'] }],
    execute: (v) => blades.colorHarmony(v.hex, v.type), isColors: true
  },
  {
    name: 'passwordGenerator', label: 'Password Generator',
    inputs: [{ key: 'length', type: 'number', default: 12 }, { key: 'uppercase', type: 'checkbox', default: true }, { key: 'lowercase', type: 'checkbox', default: true }, { key: 'numbers', type: 'checkbox', default: true }, { key: 'symbols', type: 'checkbox', default: true }],
    execute: (v) => blades.passwordGenerator(v)
  },
  {
    name: 'loremGenerator', label: 'Lorem Ipsum',
    inputs: [{ key: 'sentences', type: 'number', default: 3 }, { key: 'paragraphs', type: 'number', default: 0 }, { key: 'words', type: 'number', default: 0 }],
    execute: (v) => blades.loremGenerator(v)
  },
  {
    name: 'uuidGenerator', label: 'UUID v4',
    inputs: [], execute: () => blades.uuidGenerator()
  },
  {
    name: 'patternGenerator', label: 'CSS Pattern',
    inputs: [{ key: 'type', type: 'select', default: 'stripes', options: ['stripes', 'dots', 'grid', 'zigzag'] }, { key: 'color', type: 'text', default: '#000000' }, { key: 'backgroundColor', type: 'text', default: '#ffffff' }, { key: 'size', type: 'number', default: 20 }],
    execute: (v) => blades.patternGenerator(v)
  },
  {
    name: 'gradientGenerator', label: 'CSS Gradient',
    inputs: [{ key: 'type', type: 'select', default: 'linear', options: ['linear', 'radial'] }, { key: 'colors', type: 'text', default: '#FF5733, #33FF57' }, { key: 'angle', type: 'number', default: 135 }],
    execute: (v) => blades.gradientGenerator({ ...v, colors: v.colors.split(',').map(c => c.trim()) })
  },
  {
    name: 'boxShadowGenerator', label: 'CSS Box Shadow',
    inputs: [{ key: 'x', type: 'number', default: 4 }, { key: 'y', type: 'number', default: 6 }, { key: 'blur', type: 'number', default: 15 }, { key: 'spread', type: 'number', default: 0 }, { key: 'opacity', type: 'number', default: 0.1 }, { key: 'color', type: 'text', default: '#000000' }, { key: 'inset', type: 'checkbox', default: false }],
    execute: (v) => blades.boxShadowGenerator(v)
  },
  {
    name: 'currencyConverter', label: 'Currency',
    inputs: [{ key: 'amount', type: 'number', default: 100 }, { key: 'fromCurrency', type: 'currency', default: 'USD' }, { key: 'toCurrency', type: 'currency', default: 'EUR' }],
    execute: (v) => { const r = blades.currencyConverter(v.amount, v.fromCurrency, v.toCurrency); return `${v.amount} ${v.fromCurrency} = ${r.convertedAmount} ${v.toCurrency} (rate: ${r.rate})`; }
  },
  {
    name: 'temperatureConverter', label: 'Temperature',
    inputs: [{ key: 'value', type: 'number', default: 100 }, { key: 'fromUnit', type: 'select', default: 'celsius', options: ['celsius', 'fahrenheit', 'kelvin'] }, { key: 'toUnit', type: 'select', default: 'fahrenheit', options: ['celsius', 'fahrenheit', 'kelvin'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.temperatureConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'lengthConverter', label: 'Length',
    inputs: [{ key: 'value', type: 'number', default: 1 }, { key: 'fromUnit', type: 'select', default: 'mile', options: ['meter', 'kilometer', 'mile', 'foot', 'inch', 'centimeter', 'millimeter', 'yard', 'nautical mile'] }, { key: 'toUnit', type: 'select', default: 'kilometer', options: ['meter', 'kilometer', 'mile', 'foot', 'inch', 'centimeter', 'millimeter', 'yard', 'nautical mile'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.lengthConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'weightConverter', label: 'Weight',
    inputs: [{ key: 'value', type: 'number', default: 1 }, { key: 'fromUnit', type: 'select', default: 'kilogram', options: ['kilogram', 'gram', 'pound', 'ounce', 'milligram', 'metric ton', 'us ton'] }, { key: 'toUnit', type: 'select', default: 'pound', options: ['kilogram', 'gram', 'pound', 'ounce', 'milligram', 'metric ton', 'us ton'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.weightConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'speedConverter', label: 'Speed',
    inputs: [{ key: 'value', type: 'number', default: 100 }, { key: 'fromUnit', type: 'select', default: 'km/h', options: ['km/h', 'mph', 'm/s', 'knots', 'ft/s'] }, { key: 'toUnit', type: 'select', default: 'mph', options: ['km/h', 'mph', 'm/s', 'knots', 'ft/s'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.speedConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'timeConverter', label: 'Time',
    inputs: [{ key: 'value', type: 'number', default: 1 }, { key: 'fromUnit', type: 'select', default: 'hours', options: ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'] }, { key: 'toUnit', type: 'select', default: 'minutes', options: ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.timeConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'dataSizeConverter', label: 'Data Size',
    inputs: [{ key: 'value', type: 'number', default: 1 }, { key: 'fromUnit', type: 'select', default: 'gigabytes', options: ['bytes', 'kilobytes', 'megabytes', 'gigabytes', 'terabytes', 'petabytes', 'bits', 'kilobits', 'megabits'] }, { key: 'toUnit', type: 'select', default: 'megabytes', options: ['bytes', 'kilobytes', 'megabytes', 'gigabytes', 'terabytes', 'petabytes', 'bits', 'kilobits', 'megabits'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.dataSizeConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'numberBaseConverter', label: 'Number Base',
    inputs: [{ key: 'value', type: 'text', default: '255' }, { key: 'fromBase', type: 'select', default: 'decimal', options: ['binary', 'octal', 'decimal', 'hex'] }, { key: 'toBase', type: 'select', default: 'hex', options: ['binary', 'octal', 'decimal', 'hex'] }],
    execute: (v) => `${v.value} (${v.fromBase}) = ${blades.numberBaseConverter(v.value, v.fromBase, v.toBase)} (${v.toBase})`
  },
  {
    name: 'romanNumeralConverter', label: 'Roman Numerals',
    inputs: [{ key: 'value', type: 'text', default: '1994' }, { key: 'direction', type: 'select', default: 'toRoman', options: ['toRoman', 'fromRoman'] }],
    execute: (v) => blades.romanNumeralConverter(v.value, v.direction)
  },
  {
    name: 'angleConverter', label: 'Angle',
    inputs: [{ key: 'value', type: 'number', default: 180 }, { key: 'fromUnit', type: 'select', default: 'degrees', options: ['degrees', 'radians', 'gradians', 'turns'] }, { key: 'toUnit', type: 'select', default: 'radians', options: ['degrees', 'radians', 'gradians', 'turns'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.angleConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'caseConverter', label: 'Case Converter',
    inputs: [{ key: 'text', type: 'text', default: 'hello world' }, { key: 'type', type: 'select', default: 'title', options: ['upper', 'lower', 'title', 'sentence'] }],
    execute: (v) => blades.caseConverter(v.text, v.type)
  },
  {
    name: 'wordCounter', label: 'Word Counter',
    inputs: [{ key: 'text', type: 'textarea', default: 'Hello world. How are you?' }],
    execute: (v) => JSON.stringify(blades.wordCounter(v.text), null, 2)
  },
  {
    name: 'textReverser', label: 'Text Reverser',
    inputs: [{ key: 'text', type: 'text', default: 'hello world' }, { key: 'mode', type: 'select', default: 'characters', options: ['characters', 'words'] }],
    execute: (v) => blades.textReverser(v.text, v.mode)
  },
  {
    name: 'palindromeChecker', label: 'Palindrome',
    inputs: [{ key: 'text', type: 'text', default: 'racecar' }],
    execute: (v) => JSON.stringify(blades.palindromeChecker(v.text))
  },
  {
    name: 'slugify', label: 'Slugify',
    inputs: [{ key: 'text', type: 'text', default: 'Hello World — Café & Résumé' }, { key: 'separator', type: 'text', default: '-' }],
    execute: (v) => blades.slugify(v.text, { separator: v.separator })
  },
  {
    name: 'emailExtractor', label: 'Email Extractor',
    inputs: [{ key: 'text', type: 'textarea', default: 'Contact john@test.com or support@site.org' }],
    execute: (v) => blades.emailExtractor(v.text).join(', ') || 'No emails found'
  },
  {
    name: 'charFrequency', label: 'Char Frequency',
    inputs: [{ key: 'text', type: 'text', default: 'hello world' }],
    execute: (v) => blades.charFrequency(v.text).slice(0, 10).map(c => `${c.char}: ${c.count} (${c.percentage}%)`).join('\n')
  },
  {
    name: 'findReplace', label: 'Find & Replace',
    inputs: [{ key: 'text', type: 'textarea', default: 'Hello world, hello again' }, { key: 'find', type: 'text', default: 'hello' }, { key: 'replace', type: 'text', default: 'hi' }, { key: 'caseSensitive', type: 'checkbox', default: false }, { key: 'replaceAll', type: 'checkbox', default: true }],
    execute: (v) => { const r = blades.findReplace(v.text, v.find, v.replace, { caseSensitive: v.caseSensitive, replaceAll: v.replaceAll }); return `Result: "${r.result}"\nReplacements: ${r.count}`; }
  },
  {
    name: 'base64Encode', label: 'Base64',
    inputs: [{ key: 'text', type: 'text', default: 'Hello World' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.base64Encode(v.text, v.mode)
  },
  {
    name: 'urlEncode', label: 'URL Encode',
    inputs: [{ key: 'text', type: 'text', default: 'Hello World!' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.urlEncode(v.text, v.mode)
  },
  {
    name: 'htmlEntityEncode', label: 'HTML Entities',
    inputs: [{ key: 'text', type: 'text', default: '<div class="test">' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.htmlEntityEncode(v.text, v.mode)
  },
  {
    name: 'hexConverter', label: 'Hex',
    inputs: [{ key: 'text', type: 'text', default: 'Hello' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.hexConverter(v.text, v.mode)
  },
  {
    name: 'binaryConverter', label: 'Binary',
    inputs: [{ key: 'text', type: 'text', default: 'Hi' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.binaryConverter(v.text, v.mode)
  },
  {
    name: 'morseCodeConverter', label: 'Morse Code',
    inputs: [{ key: 'text', type: 'text', default: 'SOS' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.morseCodeConverter(v.text, v.mode)
  },
  {
    name: 'bmiCalculator', label: 'BMI',
    inputs: [{ key: 'weightKg', type: 'number', default: 70 }, { key: 'heightCm', type: 'number', default: 175 }],
    execute: (v) => { const r = blades.bmiCalculator(v.weightKg, v.heightCm); return `BMI: ${r.bmi}\nCategory: ${r.category}`; }
  },
  {
    name: 'percentageCalculator', label: 'Percentage',
    inputs: [{ key: 'value', type: 'number', default: 25 }, { key: 'total', type: 'number', default: 200 }],
    execute: (v) => `${v.value} is ${blades.percentageCalculator(v.value, v.total)}% of ${v.total}`
  },
  {
    name: 'discountCalculator', label: 'Discount',
    inputs: [{ key: 'price', type: 'number', default: 100 }, { key: 'discountPercent', type: 'number', default: 25 }],
    execute: (v) => { const r = blades.discountCalculator(v.price, v.discountPercent); return `Final: $${r.finalPrice}\nSave: $${r.savings}`; }
  },
  {
    name: 'ageCalculator', label: 'Age',
    inputs: [{ key: 'birthDate', type: 'date', default: '1995-06-15' }],
    execute: (v) => { const r = blades.ageCalculator(v.birthDate); return `${r.years}y ${r.months}m ${r.days}d\nNext birthday: ${r.nextBirthday}`; }
  },
  {
    name: 'factorial', label: 'Factorial',
    inputs: [{ key: 'n', type: 'number', default: 10 }],
    execute: (v) => `${v.n}! = ${blades.factorial(v.n)}`
  },
  {
    name: 'fibonacci', label: 'Fibonacci',
    inputs: [{ key: 'n', type: 'number', default: 10 }],
    execute: (v) => blades.fibonacci(v.n).join(', ')
  },
  {
    name: 'primeChecker', label: 'Prime',
    inputs: [{ key: 'n', type: 'number', default: 17 }],
    execute: (v) => { const r = blades.primeChecker(v.n); return `Prime: ${r.isPrime}\nNearest: ${r.nearestPrime}\nFactors: ${r.factors.join(', ')}`; }
  },
  {
    name: 'gcdLcm', label: 'GCD & LCM',
    inputs: [{ key: 'a', type: 'number', default: 12 }, { key: 'b', type: 'number', default: 18 }],
    execute: (v) => { const r = blades.gcdLcm(v.a, v.b); return `GCD: ${r.gcd}\nLCM: ${r.lcm}`; }
  },
  {
    name: 'randomNumber', label: 'Random Number',
    inputs: [{ key: 'min', type: 'number', default: 1 }, { key: 'max', type: 'number', default: 100 }, { key: 'count', type: 'number', default: 1 }, { key: 'integer', type: 'checkbox', default: true }],
    execute: (v) => blades.randomNumber(v).toString()
  },
  {
    name: 'fileSizeFormatter', label: 'File Size',
    inputs: [{ key: 'bytes', type: 'number', default: 1048576 }],
    execute: (v) => blades.fileSizeFormatter(v.bytes)
  },
  {
    name: 'qrGenerator', label: 'QR Code',
    inputs: [{ key: 'text', type: 'text', default: 'https://example.com' }, { key: 'size', type: 'number', default: 200 }],
    execute: (v) => 'SVG rendered below', isSvg: true
  },
  {
    name: 'colorConverter', label: 'Color Converter',
    inputs: [{ key: 'color', type: 'text', default: '#FF5733' }, { key: 'toFormat', type: 'select', default: 'rgb', options: ['rgb', 'hsl'] }],
    execute: (v) => JSON.stringify(blades.colorConverter(v.color, v.toFormat))
  },
  {
    name: 'colorContrast', label: 'Color Contrast',
    inputs: [{ key: 'color1', type: 'text', default: '#000000' }, { key: 'color2', type: 'text', default: '#FFFFFF' }],
    execute: (v) => { const r = blades.colorContrast(v.color1, v.color2); return `Ratio: ${r.ratio}:1\nLevel: ${r.level}`; }
  },
  {
    name: 'randomColor', label: 'Random Color',
    inputs: [{ key: 'format', type: 'select', default: 'hex', options: ['hex', 'rgb', 'hsl'] }, { key: 'hue', type: 'select', default: 'random', options: ['random', 'warm', 'cool', 'pastel'] }],
    execute: (v) => blades.randomColor(v)
  },
  {
    name: 'dateDifference', label: 'Date Diff',
    inputs: [{ key: 'date1', type: 'date', default: '2020-01-01' }, { key: 'date2', type: 'date', default: '2025-06-15' }],
    execute: (v) => { const r = blades.dateDifference(v.date1, v.date2); return `${r.years}y ${r.months}m ${r.days}d\nTotal: ${r.totalDays} days`; }
  },
  {
    name: 'dateFormatter', label: 'Date Format',
    inputs: [{ key: 'date', type: 'date', default: '2025-04-09' }, { key: 'format', type: 'select', default: 'weekday', options: ['iso', 'us', 'eu', 'weekday', 'relative', 'unix'] }],
    execute: (v) => blades.dateFormatter(v.date, v.format)
  },
  {
    name: 'simpleHash', label: 'Hash',
    inputs: [{ key: 'text', type: 'text', default: 'hello world' }, { key: 'algorithm', type: 'select', default: 'djb2', options: ['djb2', 'sdbm', 'xor'] }],
    execute: (v) => blades.simpleHash(v.text, v.algorithm)
  },
  {
    name: 'checksumGenerator', label: 'Checksum',
    inputs: [{ key: 'text', type: 'text', default: 'hello world' }],
    execute: (v) => JSON.stringify(blades.checksumGenerator(v.text))
  },
  {
    name: 'textDiff', label: 'Text Diff',
    inputs: [{ key: 'text1', type: 'textarea', default: 'Hello world' }, { key: 'text2', type: 'textarea', default: 'Hello universe' }],
    execute: (v) => { const r = blades.textDiff(v.text1, v.text2); return `Added: ${r.added}\nRemoved: ${r.removed}\nSimilarity: ${r.similarity}%`; }
  },
  {
    name: 'templateEngine', label: 'Template',
    inputs: [{ key: 'template', type: 'textarea', default: 'Hello {{name}}, age {{age}}' }, { key: 'data', type: 'textarea', default: '{"name":"John","age":30}' }],
    execute: (v) => { try { return blades.templateEngine(v.template, JSON.parse(v.data)); } catch (e) { return 'Invalid JSON'; } }
  },
  {
    name: 'truncate', label: 'Truncate',
    inputs: [{ key: 'text', type: 'text', default: 'This is a very long sentence' }, { key: 'maxLength', type: 'number', default: 15 }],
    execute: (v) => blades.truncate(v.text, v.maxLength)
  },
  {
    name: 'initials', label: 'Initials',
    inputs: [{ key: 'name', type: 'text', default: 'John Fitzgerald Kennedy' }],
    execute: (v) => blades.initials(v.name)
  },
  {
    name: 'repeatText', label: 'Repeat',
    inputs: [{ key: 'text', type: 'text', default: 'Ha' }, { key: 'count', type: 'number', default: 5 }],
    execute: (v) => blades.repeatText(v.text, v.count)
  },
  {
    name: 'cookieClicker', label: 'Cookie Clicker',
    inputs: [], isInteractive: true,
    render: () => {
      const [cookies, setCookies] = useState(0)
      const [perClick, setPerClick] = useState(1)
      const [perSecond, setPerSecond] = useState(0)
      const [grandmaCost, setGrandmaCost] = useState(50)
      const [clickPowerCost, setClickPowerCost] = useState(25)
      const [grandmas, setGrandmas] = useState(0)
      const [clickPowerLevel, setClickPowerLevel] = useState(0)
      useEffect(() => {
        if (perSecond === 0) return
        const iv = setInterval(() => {
          setCookies(prev => prev + perSecond)
        }, 1000)
        return () => clearInterval(iv)
      }, [perSecond])
      const buyClickPower = () => {
        if (cookies >= clickPowerCost) {
          setCookies(prev => prev - clickPowerCost)
          setClickPowerLevel(prev => prev + 1)
          setPerClick(prev => prev + 1)
          setClickPowerCost(prev => Math.floor(prev * 1.5))
        }
      }
      const buyGrandma = () => {
        if (cookies >= grandmaCost) {
          setCookies(prev => prev - grandmaCost)
          setGrandmas(prev => prev + 1)
          setPerSecond(prev => prev + 5)
          setGrandmaCost(prev => Math.floor(prev * 1.15))
        }
      }
      return (
        <div className="text-center">
          <div style={{ fontSize: 24, marginBottom: 10 }}>🍪 {Math.floor(cookies)} cookies</div>
          <div style={{ fontSize: 12, marginBottom: 10, color: '#666' }}>
            per click: {perClick} | per second: {perSecond}
          </div>
          <button
            onClick={() => setCookies(prev => prev + perClick)}
            style={{ fontSize: 48, padding: '20px 30px', borderRadius: '50%', border: 'none', background: 'none', cursor: 'pointer', transition: 'transform 0.1s' }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            🍪
          </button>
          <div style={{ marginTop: 15, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={buyClickPower}
              disabled={cookies < clickPowerCost}
              style={{ padding: '6px 12px', opacity: cookies >= clickPowerCost ? 1 : 0.5, cursor: cookies >= clickPowerCost ? 'pointer' : 'not-allowed', borderRadius: 4, border: '1px solid #ccc' }}
            >
              Click Power ({clickPowerLevel}) - {clickPowerCost} 🍪
            </button>
            <button
              onClick={buyGrandma}
              disabled={cookies < grandmaCost}
              style={{ padding: '6px 12px', opacity: cookies >= grandmaCost ? 1 : 0.5, cursor: cookies >= grandmaCost ? 'pointer' : 'not-allowed', borderRadius: 4, border: '1px solid #ccc' }}
            >
              Grandma ({grandmas}) - {grandmaCost} 🍪
            </button>
          </div>
        </div>
      )
    }
  },
  {
    name: 'userAgent', label: 'User Agent',
    inputs: [], execute: () => JSON.stringify(blades.userAgent(), null, 2)
  },
  {
    name: 'viewportInfo', label: 'Viewport',
    inputs: [], execute: () => JSON.stringify(blades.viewportInfo(), null, 2)
  },
  {
    name: 'downloadFile', label: 'Download',
    inputs: [{ key: 'content', type: 'textarea', default: 'Hello World' }, { key: 'filename', type: 'text', default: 'hello.txt' }, { key: 'mimeType', type: 'text', default: 'text/plain' }],
    execute: (v) => { blades.downloadFile(v.content, v.filename, v.mimeType); return 'Downloaded'; }
  },
  {
    name: 'timezoneConverter', label: 'Time',
    inputs: [{ key: 'timezone', type: 'select', default: 'America/New_York', options: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Australia/Sydney'] }],
    execute: (v) => new Date().toLocaleString('en-US', { timeZone: v.timezone })
  },
  {
    name: 'emojiExtractor', label: 'Emoji',
    inputs: [{ key: 'text', type: 'text', default: 'Hello 👋 World 🌍🔥' }],
    execute: (v) => { const r = blades.emojiExtractor(v.text); return r.length ? r.join(', ') : 'None found'; }
  },
  {
    name: 'stopwatch', label: 'Stopwatch',
    inputs: [], isInteractive: true,
    render: () => {
      const [sw] = useState(() => blades.stopwatch())
      const [time, setTime] = useState(0)
      const [running, setRunning] = useState(false)
      useEffect(() => {
        if (!running) return
        const iv = setInterval(() => {
          if (!sw.isRunning()) { clearInterval(iv); setRunning(false); return; }
          setTime(sw.getTime())
        }, 30)
        return () => clearInterval(iv)
      }, [running, sw])
      return (
        <div>
          <div style={{ fontSize: 28, margin: '10px 0' }}>{(time / 1000).toFixed(3)}s</div>
          <button onClick={() => { sw.start(); setRunning(true) }} disabled={running} className=''>Start</button>{' '}
          <button onClick={() => { sw.stop(); setRunning(false) }} disabled={!running}>Stop</button>{' '}
          <button onClick={() => { sw.reset(); setTime(0); setRunning(false) }}>Reset</button>
        </div>
      )
    }
  },
  {
    name: 'timer', label: 'Timer',
    inputs: [{ key: 'duration', type: 'number', default: 5 }],
    isInteractive: true,
    render: (props) => {
      const dur = (props.duration || 5) * 1000
      const [time, setTime] = useState(dur)
      const [running, setRunning] = useState(false)
      const ivRef = useRef(null)
      useEffect(() => {
        if (!running) return
        ivRef.current = setInterval(() => {
          setTime(prev => {
            if (prev <= 50) { clearInterval(ivRef.current); setRunning(false); alert("DONE!!!"); return 0 }
            return prev - 50
          })
        }, 50)
        return () => clearInterval(ivRef.current)
      }, [running])
      const addTime = (ms) => setTime(p => p + ms)
      return (
        <div>
          <div style={{ fontSize: 28, margin: '10px 0' }}>{(time / 1000).toFixed(1)}s</div>
          <button onClick={() => { if (running || time <= 0) return; setRunning(true) }}>Start</button>{' '}
          <button onClick={() => { clearInterval(ivRef.current); setRunning(false) }} disabled={!running}>Pause</button>{' '}
          <button onClick={() => { clearInterval(ivRef.current); setRunning(false); setTime(dur) }}>Reset</button>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => addTime(1000)}>+1s</button>{' '}
            <button onClick={() => addTime(5000)}>+5s</button>{' '}
            <button onClick={() => addTime(10000)}>+10s</button>{' '}
            <button onClick={() => addTime(60000)}>+60s</button>
          </div>
        </div>
      )
    }
  }
]

const currencyCodes = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY', 'CHF', 'CAD', 'AUD', 'KRW', 'BRL', 'MXN', 'RUB', 'ZAR', 'SGD', 'HKD', 'NOK', 'SEK', 'DKK', 'NZD', 'THB', 'MYR', 'PHP', 'IDR', 'PLN', 'TRY', 'ILS', 'ARS', 'COP', 'VND', 'EGP', 'PKR', 'NGN', 'AED', 'SAR', 'CZK', 'HUF', 'CLP', 'PEN']

// FIX 3: Reusable card variant for stagger children
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

function BladeCard({ blade }) {
  const [values, setValues] = useState(() => {
    const init = {}
    blade.inputs.forEach(i => init[i.key] = i.default)
    return init
  })
  const [output, setOutput] = useState('')
  const [colorOutput, setColorOutput] = useState([])
  const [svgOutput, setSvgOutput] = useState('')

  const handleChange = (key, value) => setValues(prev => ({ ...prev, [key]: value }))

  const handleExecute = async () => {
    if (blade.isColors) {
      setColorOutput(blade.execute(values))
      setOutput('')
      setSvgOutput('')
      return
    }
    if (blade.isSvg) {
      setSvgOutput(blades.qrGenerator(values.text, values.size))
      setOutput('SVG rendered below')
      setColorOutput([])
      return
    }
    setOutput(blade.execute(values))
    setColorOutput([])
    setSvgOutput('')
  }

  if (blade.isInteractive) {
    return (
      // FIX 3: Wrap interactive cards in motion.div so stagger works
      <motion.div variants={cardVariants} whileHover={{ scale: 1.03 }} className="border border-gray-300 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">{blade.label}</h3>
        {blade.render({ ...values, handleChange })}
      </motion.div>
    )
  }

  return (
    // FIX 3: Wrap every card in motion.div so stagger works
    <motion.div variants={cardVariants} whileHover={{ scale: 1.03 }} className="border border-gray-300 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">{blade.label}</h3>
      {blade.inputs.map(input => (
        <div key={input.key} className="mb-2">
          <label className="block text-sm mb-1">{input.key}</label>
          {input.type === 'select' ? (
            <select value={values[input.key]} onChange={e => handleChange(input.key, e.target.value)} className="w-full p-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(55 65 81)] focus:border-transparent">
              {input.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : input.type === 'currency' ? (
            <select value={values[input.key]} onChange={e => handleChange(input.key, e.target.value)} className="w-full p-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(55 65 81)] focus:border-transparent">
              {currencyCodes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          ) : input.type === 'checkbox' ? (
            <input type="checkbox" checked={values[input.key]} onChange={e => handleChange(input.key, e.target.checked)} className="focus:outline-none focus:ring-2 focus:ring-[rgb(55 65 81)] rounded" />
          ) : input.type === 'textarea' ? (
            <textarea value={values[input.key]} onChange={e => handleChange(input.key, e.target.value)} rows={2} className="w-full p-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(55 65 81)] focus:border-transparent" />
          ) : (
            <input type={input.type} value={values[input.key]} onChange={e => handleChange(input.key, e.target.type === 'number' ? +e.target.value : e.target.value)} className="w-full p-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(55 65 81)] focus:border-transparent" />
          )}
        </div>
      ))}
      <motion.button whileHover={{ scale: 1.1, backgroundColor: "rgb(55 65 81)" }} onClick={handleExecute} className="mt-2 px-4 py-1.5 bg-gray-800 text-white rounded">Execute</motion.button>
      {colorOutput.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {colorOutput.map((c, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 rounded-md border border-gray-300 mb-1" style={{ backgroundColor: c }}></div>
              <code className="text-xs">{c}</code>
            </div>
          ))}
        </div>
      )}
      {output && <pre className="bg-gray-100 p-3 mt-2 whitespace-pre-wrap break-words text-sm">{output}</pre>}
      {svgOutput && <div dangerouslySetInnerHTML={{ __html: svgOutput }} />}
    </motion.div>
  )
}

export default function Blades() {
  // FIX 2: Fixed typo "transiton" → "transition"
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07, // Slightly faster stagger for many items
      },
    },
  }

  return (
    <div className="p-10 font-mono">
      <div className='flex flex-col'>
        <motion.section
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.25,
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-4xl mb-2"
          >
            Blades 
            <span> </span>
            <span className='text-xl text-gray-600'>
              (a swiss army knife web app for all your utility needs)
            </span>
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 }
            }}
            className="mb-8"
          >
            {bladesList.length} blades
          </motion.p>
        </motion.section>

      </div>


      {/* FIX 3: Removed broken nested grids — motion.section IS the stagger parent,
          cards render directly inside the grid as motion.div children */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {bladesList.map(blade => (
          <BladeCard key={blade.name} blade={blade} />
        ))}
      </motion.div>
    </div>
  )
}