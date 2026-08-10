// Generates public/sitemap.xml for the full multilingual matrix
// (7 pages × 5 locales = 35 URLs).
//
// Run with:  npm run sitemap
//
// The page list, locale list and URL shapes are imported straight from the
// app's own config, so the sitemap can never drift out of sync with the
// router — adding a page or a locale is a one-line change in src/config.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { DOMAIN, LOCALES } from '../src/config/i18n.ts'
import { PAGES } from '../src/config/pages.ts'
import { buildPath } from '../src/lib/routing.ts'

const url = (locale, page) => DOMAIN + buildPath(locale, page)
const today = new Date().toISOString().slice(0, 10)

let xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

// One <url> entry per (page × locale), each carrying the full set of hreflang
// alternates (every locale + x-default) for that page.
for (const page of PAGES) {
  for (const locale of LOCALES) {
    xml += '  <url>\n'
    xml += `    <loc>${url(locale, page)}</loc>\n`
    for (const alt of LOCALES) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt}" href="${url(alt, page)}" />\n`
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', page)}" />\n`
    xml += `    <lastmod>${today}</lastmod>\n`
    xml += '    <changefreq>weekly</changefreq>\n'
    xml += `    <priority>${page === 'root' ? '1.0' : '0.8'}</priority>\n`
    xml += '  </url>\n'
  }
}

xml += '</urlset>\n'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
writeFileSync(join(outDir, 'sitemap.xml'), xml, 'utf8')
console.log(
  `Wrote ${PAGES.length * LOCALES.length} URLs (${PAGES.length} pages × ${LOCALES.length} locales) to public/sitemap.xml`,
)
