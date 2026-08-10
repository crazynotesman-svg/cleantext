/**
 * Tests for the symbol library + caret insertion helper. Run with:
 *   node --experimental-strip-types src/lib/symbols.test.ts
 */
import { SYMBOL_GROUPS, SYMBOL_GROUP_ORDER, insertAt } from './symbols.ts'

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

console.log('symbol groups')
eq('four ordered groups', SYMBOL_GROUP_ORDER.length, 4)
eq('every group has at least one glyph', SYMBOL_GROUP_ORDER.every((g) => SYMBOL_GROUPS[g].length > 0), true)
eq('dividers is a single decorative string', SYMBOL_GROUPS.dividers.length, 1)

console.log('insertAt')
eq('insert at caret (middle)', insertAt('Hello', 'X', 2, 2).text, 'HeXllo')
eq('insert replaces selection', insertAt('Hello', 'XY', 1, 3).text, 'HXYlo')
eq('caret lands after inserted text', insertAt('Hello', 'XY', 1, 3).caret, 3)
eq('caret lands after single-char insert', insertAt('Hello', 'X', 2, 2).caret, 3)
eq('clamps out-of-range start', insertAt('ab', 'Z', 99, 99).text, 'abZ')
eq('clamps out-of-range end keeps order', insertAt('abcd', '|', 3, 1).text, 'abc|d')
eq('empty insert is a no-op on text', insertAt('ab', '', 1, 1).text, 'ab')

console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
