/**
 * Lightweight assertion harness for the text engine. Run with:
 *   node --experimental-strip-types src/lib/text.test.ts
 */
import {
  styleText,
  normalizeToAscii,
  cleanHashtags,
  fixInstagramLineBreaks,
  trimWhitespace,
  countChars,
  ZWSP,
} from './text.ts'

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

console.log('Unicode stylization')
eq('bold converts letters', styleText('Abc', 'bold'), '𝐀𝐛𝐜')
eq('bold keeps digits', styleText('A1', 'bold'), '𝐀1'.replace('1', '𝟏'))
eq('italic converts letters', styleText('Abc', 'italic'), '𝐴𝑏𝑐')
eq('monospace converts letters + digits', styleText('Ab1', 'monospace'), '𝙰𝚋1'.replace('1', '𝟷'))
eq('script lowercase contiguous', styleText('abc', 'script'), '𝒶𝒷𝒸')
eq('script uppercase exceptions', styleText('BHLRZ', 'script'), 'ℬℋℒℛℨ')
eq('boldItalic letters', styleText('Ab', 'boldItalic'), '𝒜𝒷'.replace('𝒜', '𝑨').replace('𝒷', '𝒃'))
eq('normal is pass-through', styleText('Abc 123!', 'normal'), 'Abc 123!')
eq('non-latin passes through', styleText('你好', 'bold'), '你好')

console.log('style chaining (Unicode re-encoding fix)')
eq(
  'bold -> italic equals fresh italic',
  styleText(styleText('Hello', 'bold'), 'italic'),
  styleText('Hello', 'italic'),
)
eq(
  'bold -> monospace equals fresh monospace',
  styleText(styleText('Hello', 'bold'), 'monospace'),
  styleText('Hello', 'monospace'),
)
eq(
  'script -> bold equals fresh bold',
  styleText(styleText('Hello', 'script'), 'bold'),
  styleText('Hello', 'bold'),
)
eq(
  'bold -> italic -> monospace -> normal is plain ASCII',
  styleText(
    styleText(styleText(styleText('Hello', 'bold'), 'italic'), 'monospace'),
    'normal',
  ),
  'Hello',
)
eq(
  'chaining preserves ZWSP line breaks',
  styleText(styleText(fixInstagramLineBreaks('A\nB'), 'bold'), 'italic'),
  styleText(fixInstagramLineBreaks('A\nB'), 'italic'),
)
eq(
  'chaining preserves non-latin characters',
  styleText(styleText('Hello 你好', 'bold'), 'italic'),
  styleText('Hello 你好', 'italic'),
)
eq('normalizeToAscii reverses bold', normalizeToAscii(styleText('Hello 123!', 'bold')), 'Hello 123!')
eq('normalizeToAscii reverses script + digits', normalizeToAscii(styleText('Ab9', 'script')), 'Ab9')
eq('normalizeToAscii passes plain ASCII through', normalizeToAscii('Hello 123 你好!'), 'Hello 123 你好!')

console.log('explicit mapping / Unicode gaps')
{
  const italicHello = styleText('hello', 'italic')
  // The killer regression check: italic small 'h' MUST be ℎ (U+210E), NOT the
  // reserved gap U+1D455 that a bare `charCode + offset` formula would produce.
  eq('italic h maps to letterlike ℎ (U+210E)', italicHello.codePointAt(0), 0x210e)
  eq('italic hello has exactly 5 code points', [...italicHello].length, 5)
  eq(
    'italic hello glyphs are correct',
    italicHello,
    String.fromCodePoint(0x210e, 0x1d452, 0x1d459, 0x1d459, 0x1d45c),
  )
  eq('italic hello round-trips to ASCII', normalizeToAscii(italicHello), 'hello')
}
{
  const scriptHello = styleText('hello', 'script')
  eq(
    'script hello glyphs are correct',
    scriptHello,
    String.fromCodePoint(0x1d4bd, 0x1d4ba, 0x1d4c1, 0x1d4c1, 0x1d4c4),
  )
  eq('script hello round-trips to ASCII', normalizeToAscii(scriptHello), 'hello')
}
eq(
  'chaining Bold -> Italic -> Script -> Plain returns ASCII',
  styleText(
    styleText(styleText(styleText('Hello', 'bold'), 'italic'), 'script'),
    'normal',
  ),
  'Hello',
)

console.log('cleanHashtags')
{
  const r = cleanHashtags('Loving this #js #React #js day #react!')
  eq('dedupes case-insensitively', r.hashtags, ['#js', '#React'])
  // original was "day #react!" so removing the tag faithfully leaves "day !"
  eq('strips tags from body', r.text, 'Loving this day !\n\n#js #React')
}
{
  const r = cleanHashtags('Start #alpha then #beta end')
  eq('appends block with blank line', r.text, 'Start then end\n\n#alpha #beta')
}
{
  const r = cleanHashtags('#only #tags #only')
  eq('only-tags body is empty', r.text, '#only #tags')
}

console.log('fixInstagramLineBreaks')
eq('appends ZWSP after newline', fixInstagramLineBreaks('a\nb'), 'a\n' + ZWSP + 'b')
eq('normalises CRLF', fixInstagramLineBreaks('a\r\nb'), 'a\n' + ZWSP + 'b')

console.log('trimWhitespace')
eq('drops trailing spaces', trimWhitespace('hello   \nworld'), 'hello\nworld')
eq('collapses triple blank lines', trimWhitespace('a\n\n\n\nb'), 'a\n\nb')
eq('trims whole string', trimWhitespace('  \n hi \n  '), 'hi')

console.log('countChars')
eq('counts code points not units', countChars('𝐀𝐛𝐜'), 3)
eq('counts emoji as one', countChars('a😀b'), 3)

console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
