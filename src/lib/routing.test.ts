/**
 * Tests for the multilingual routing matrix and the generated sitemap.
 * Run with:
 *   node --experimental-strip-types src/lib/routing.test.ts
 *
 * These also act as the contract test between the runtime router and
 * public/sitemap.xml: both must describe the exact same 35 URLs.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { DOMAIN, LOCALES } from '../config/i18n.ts'
import { PAGES, PAGE_PATH, PAGE_DEFAULT_TOOL, MATRIX_PAGES } from '../config/pages.ts'
import {
  buildPath,
  getAllRouteUrls,
  getAlternateUrls,
  parsePath,
} from './routing.ts'

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

console.log('matrix shape')
{
  eq('7 landing-page templates', PAGES.length, 7)
  eq('5 locales', LOCALES.length, 5)
  eq('7 × 5 = 35 landing pages', PAGES.length * LOCALES.length, 35)
  eq(
    'the Phase 1 URLs are never renamed',
    [PAGE_PATH.root, PAGE_PATH.ig, PAGE_PATH.linkedin, PAGE_PATH.twitter],
    ['', 'instagram-line-break-generator', 'linkedin-text-bold-italic', 'twitter-character-counter'],
  )
  eq(
    'the 3 Phase 2 URLs are live',
    [PAGE_PATH.threadSplitter, PAGE_PATH.quoteCard, PAGE_PATH.igBreaker],
    ['tweet-thread-splitter', 'quote-card-generator', 'instagram-line-breaker'],
  )
  eq('every non-root page is cross-linked in the footer', MATRIX_PAGES.length, PAGES.length - 1)
  eq('path segments are unique', new Set(Object.values(PAGE_PATH)).size, PAGES.length)
  eq(
    'the new pages open the tool they rank for',
    [PAGE_DEFAULT_TOOL.threadSplitter, PAGE_DEFAULT_TOOL.quoteCard, PAGE_DEFAULT_TOOL.igBreaker],
    ['thread', 'quote', 'thread'],
  )
}

console.log('buildPath')
{
  eq('en root has no prefix', buildPath('en', 'root'), '/')
  eq('en page has no locale prefix', buildPath('en', 'quoteCard'), '/quote-card-generator')
  eq('non-en root is the bare locale', buildPath('es', 'root'), '/es')
  eq('non-en page is /locale/segment', buildPath('de', 'threadSplitter'), '/de/tweet-thread-splitter')
  eq('pt line breaker', buildPath('pt', 'igBreaker'), '/pt/instagram-line-breaker')
}

console.log('parsePath')
{
  // Every canonical path must parse back to the exact route that produced it.
  const broken: string[] = []
  for (const page of PAGES) {
    for (const locale of LOCALES) {
      const path = buildPath(locale, page)
      const parsed = parsePath(path)
      if (parsed.locale !== locale || parsed.page !== page || parsed.path !== path) {
        broken.push(`${path} -> ${parsed.locale}/${parsed.page}`)
      }
    }
  }
  eq('all 35 canonical paths round-trip', broken, [])

  eq('trailing slashes are tolerated', parsePath('/fr/quote-card-generator/').page, 'quoteCard')
  eq('trailing slash on a locale root', parsePath('/es/'), { locale: 'es', page: 'root', path: '/es' })
  eq('unknown segment falls back to root', parsePath('/not-a-page').page, 'root')
  eq('unknown segment keeps the locale', parsePath('/de/not-a-page').locale, 'de')
  eq('an /en prefix is not a locale route', parsePath('/en').page, 'root')
  eq('empty path is the en root', parsePath('/'), { locale: 'en', page: 'root', path: '/' })
}

console.log('hreflang alternates')
{
  const alts = getAlternateUrls('quoteCard')
  eq('one alternate per locale', alts.length, 5)
  eq(
    'hreflang codes match the locale list',
    alts.map((a) => a.hreflang),
    [...LOCALES],
  )
  eq('en alternate is prefix-free', alts[0].href, DOMAIN + '/quote-card-generator')
  eq('es alternate is prefixed', alts[1].href, DOMAIN + '/es/quote-card-generator')
  eq('all alternate URLs are absolute', alts.every((a) => a.href.startsWith('https://')), true)

  const everyPageHasFive = PAGES.every((p) => getAlternateUrls(p).length === LOCALES.length)
  eq('every page exposes the full alternate set', everyPageHasFive, true)
}

console.log('getAllRouteUrls')
{
  const urls = getAllRouteUrls()
  eq('yields 35 URLs', urls.length, 35)
  eq('all 35 are unique', new Set(urls).size, 35)
  eq('starts at the en root', urls[0], DOMAIN + '/')
  eq('ends at the pt line breaker', urls[34], DOMAIN + '/pt/instagram-line-breaker')
}

console.log('public/sitemap.xml')
{
  const here = dirname(fileURLToPath(import.meta.url))
  const xml = readFileSync(join(here, '..', '..', 'public', 'sitemap.xml'), 'utf8')

  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  eq('sitemap lists 35 URLs', locs.length, 35)
  eq('sitemap URLs match the router exactly', locs, getAllRouteUrls())

  const alternates = [...xml.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1])
  eq('every URL carries 5 locales + x-default', alternates.length, 35 * 6)
  eq('x-default appears once per URL', alternates.filter((h) => h === 'x-default').length, 35)

  // Each <url> block must point x-default at the English variant of that page.
  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1])
  const badDefault = blocks.filter((b) => {
    const xd = b.match(/hreflang="x-default" href="([^"]+)"/)?.[1] ?? ''
    const en = b.match(/hreflang="en" href="([^"]+)"/)?.[1] ?? ''
    return xd !== en
  })
  eq('x-default always targets the en URL', badDefault.length, 0)

  eq('the root page keeps priority 1.0', /<loc>https:\/\/postcraft\.100ideas\.net\/<\/loc>[\s\S]*?<priority>1\.0<\/priority>/.test(xml), true)
  eq('the 3 new pages are in the sitemap', ['tweet-thread-splitter', 'quote-card-generator', 'instagram-line-breaker'].every((s) => xml.includes(s)), true)
}

console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
