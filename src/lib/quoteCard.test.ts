/**
 * Tests for the Quote Card design/layout engine. Run with:
 *   node --experimental-strip-types src/lib/quoteCard.test.ts
 */
import {
  ASPECT_DIMENSIONS,
  ASPECT_RATIOS,
  QUOTE_PRESETS,
  QUOTE_PRESET_STYLES,
  attributionFontSize,
  buildFileName,
  fitFontSize,
  formatAttribution,
  getAspectDimensions,
  getPreset,
  normalizeQuote,
  slugify,
  type AspectRatioId,
} from './quoteCard.ts'

let passed = 0
let failed = 0

function eq(name: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual)
  const e = JSON.stringify(expected)
  if (a === e) {
    passed++
    console.log('  ✓ ' + name)
  } else {
    failed++
    console.error('  ✗ ' + name)
    console.error('      expected: ' + e)
    console.error('      actual:   ' + a)
  }
}

console.log('presets')
{
  eq('exposes exactly 4 presets', QUOTE_PRESETS.length, 4)
  eq(
    'preset ids match the spec',
    [...QUOTE_PRESETS],
    ['dark', 'xiaohongshu', 'gradient', 'paper'],
  )
  const missing = QUOTE_PRESETS.filter((id) => {
    const p = QUOTE_PRESET_STYLES[id]
    return !p || !p.surface || !p.text || !p.font
  })
  eq('every preset defines surface/text/font', missing, [])
  eq('getPreset round-trips the id', getPreset('paper').id, 'paper')
  eq('dark + gradient are flagged dark', [getPreset('dark').dark, getPreset('gradient').dark], [true, true])
  eq(
    'xiaohongshu + paper are flagged light',
    [getPreset('xiaohongshu').dark, getPreset('paper').dark],
    [false, false],
  )
  eq('xiaohongshu uses a rounded inner sheet', (getPreset('xiaohongshu').panel?.radiusRatio ?? 0) > 0.03, true)
}

console.log('aspect ratios')
{
  eq('exposes exactly 3 ratios', ASPECT_RATIOS.length, 3)
  eq('ratio ids match the spec', [...ASPECT_RATIOS], ['1:1', '4:5', '16:9'])
  eq('1:1 is square 1080', getAspectDimensions('1:1'), { width: 1080, height: 1080 })
  eq('4:5 is the IG / Xiaohongshu feed size', getAspectDimensions('4:5'), { width: 1080, height: 1350 })
  eq('16:9 is landscape HD', getAspectDimensions('16:9'), { width: 1920, height: 1080 })
  const ratioOk = ASPECT_RATIOS.every((r) => {
    const [w, h] = r.split(':').map(Number)
    const d = ASPECT_DIMENSIONS[r]
    return Math.abs(d.width / d.height - w / h) < 0.001
  })
  eq('declared dimensions match the declared ratio', ratioOk, true)
}

console.log('fitFontSize')
{
  const short = fitFontSize('Stay hungry.', '1:1')
  const medium = fitFontSize('x'.repeat(200), '1:1')
  const long = fitFontSize('x'.repeat(600), '1:1')
  eq('short quote hits the max size', short, Math.round(1080 * 0.075))
  eq('longer quote shrinks', medium < short, true)
  eq('very long quote shrinks further', long < medium, true)
  eq('never drops below the min size', fitFontSize('x'.repeat(5000), '1:1') >= Math.round(1080 * 0.022), true)
  eq('empty text does not divide by zero', Number.isFinite(fitFontSize('', '1:1')), true)

  // Monotonic: growing the quote must never grow the font.
  let monotonic = true
  for (const ratio of ASPECT_RATIOS as readonly AspectRatioId[]) {
    let prev = Infinity
    for (let n = 1; n <= 900; n += 17) {
      const size = fitFontSize('x'.repeat(n), ratio)
      if (size > prev) monotonic = false
      prev = size
    }
  }
  eq('size is monotonically non-increasing in length', monotonic, true)

  eq(
    'code points (emoji) count as one glyph, not two UTF-16 units',
    fitFontSize('🚀'.repeat(50), '1:1'),
    fitFontSize('x'.repeat(50), '1:1'),
  )
  eq('16:9 allows a larger cap than 1:1', fitFontSize('Hi', '16:9') > fitFontSize('Hi', '1:1'), true)
}

console.log('derived sizes')
{
  eq('attribution is smaller than the quote', attributionFontSize(80) < 80, true)
  eq('attribution has a readable floor', attributionFontSize(10), 20)
}

console.log('slugify + buildFileName')
{
  eq('lowercases and hyphenates', slugify('Stay Hungry, Stay Foolish!'), 'stay-hungry-stay-foolish')
  eq('strips accents', slugify('Café déjà vu'), 'cafe-deja-vu')
  eq('drops non-latin scripts', slugify('你好 world'), 'world')
  eq('never leaves a trailing hyphen', slugify('hello!!!').endsWith('-'), false)
  eq('caps the slug length', slugify('a'.repeat(120)).length <= 40, true)
  eq(
    'file name carries preset + ratio + slug',
    buildFileName('Stay hungry, stay foolish', 'dark', '1:1'),
    'postcraft-quote-dark-1x1-stay-hungry-stay-foolish.png',
  )
  eq(
    'unsluggable text falls back to "quote"',
    buildFileName('你好', 'paper', '4:5'),
    'postcraft-quote-paper-4x5-quote.png',
  )
  eq('16:9 is filename-safe', buildFileName('hi', 'gradient', '16:9'), 'postcraft-quote-gradient-16x9-hi.png')
}

console.log('normalizeQuote + attribution')
{
  eq('trims the whole quote', normalizeQuote('  hello  '), 'hello')
  eq('normalises CRLF', normalizeQuote('a\r\nb'), 'a\nb')
  eq('collapses 3+ blank lines to one', normalizeQuote('a\n\n\n\n\nb'), 'a\n\nb')
  eq('keeps a single intentional blank line', normalizeQuote('a\n\nb'), 'a\n\nb')
  eq('strips trailing spaces per line', normalizeQuote('a   \nb\t\n'), 'a\nb')
  eq('does not truncate long quotes', normalizeQuote('x'.repeat(900)).length, 900)
  eq('formats an author with an em dash', formatAttribution(' Steve Jobs '), '— Steve Jobs')
  eq('blank author yields an empty line', formatAttribution('   '), '')
}

console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
