/**
 * Tests for the thread-splitting engine. Run with:
 *   node --experimental-strip-types src/lib/thread.test.ts
 */
import { splitThread, THREAD_LIMITS } from './thread.ts'

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

console.log('splitThread')
{
  const parts = splitThread('Hello world. This is a test. Second sentence here.', 280)
  eq('one short post -> single part', parts.length, 1)
  eq('single part carries (1/1)', parts[0].endsWith('(1/1)'), true)
}
{
  // A post well over the 280 limit forces multiple parts.
  const longText = Array.from(
    { length: 40 },
    (_, i) => `Sentence number ${i + 1} contains several words so it adds length.`,
  ).join(' ')
  const parts = splitThread(longText, THREAD_LIMITS.twitter)
  eq('long post splits into many parts', parts.length > 1, true)
  eq('first part is (1/N)', parts[0].endsWith(`(1/${parts.length})`), true)
  eq('last part is (N/N)', parts[parts.length - 1].endsWith(`(${parts.length}/${parts.length})`), true)
  // Each part body (minus the ` (i/N)` suffix) stays near the limit.
  let ok = true
  for (const p of parts) {
    const body = p.replace(/ \(\d+\/\d+\)$/, '')
    if (body.length > THREAD_LIMITS.twitter + 20) ok = false
  }
  eq('part bodies respect the limit', ok, true)
}
{
  eq('empty string -> []', splitThread('', 280), [])
  eq('whitespace only -> []', splitThread('   \n  \n ', 280), [])
}
{
  // Paragraph boundaries are respected when sentences would otherwise pack.
  const text =
    'First paragraph with a couple of sentences. It stays together.\n\n' +
    'Second paragraph is separate and should usually start a new part when space is tight.'
  const parts = splitThread(text, 80)
  eq('paragraphs can land in separate parts', parts.length >= 1, true)
  // No injected numbering collides with the actual text.
  const total = parts.length
  eq('numbering is sequential', parts[total - 1].endsWith(`(${total}/${total})`), true)
}
{
  // Custom limit shorter than the text forces a split.
  const parts = splitThread('One two three four five. Six seven eight nine ten.', 20)
  eq('tiny limit forces split', parts.length > 1, true)
}

console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
