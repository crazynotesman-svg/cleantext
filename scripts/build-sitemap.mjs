// Generates public/sitemap.xml with the full 20-URL multilingual matrix.
// Run with: node scripts/build-sitemap.mjs
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const DOMAIN = 'https://postcraft.100ideas.net'
const LOCALES = ['en', 'es', 'de', 'fr', 'pt']
// [pageKey, pathSegment] — empty segment = site root.
const PAGES = [
  ['root', ''],
  ['ig', 'instagram-line-break-generator'],
  ['linkedin', 'linkedin-text-bold-italic'],
  ['twitter', 'twitter-character-counter'],
]

const buildPath = (locale, segment) =>
  locale === 'en' ? (segment ? `/${segment}` : '/') : segment ? `/${locale}/${segment}` : `/${locale}`

const url = (locale, segment) => DOMAIN + buildPath(locale, segment)
const today = new Date().toISOString().slice(0, 10)

let xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

// One <url> entry per (locale × page) = 20 URLs, each carrying the full set
// of hreflang alternates (every locale + x-default) for that page.
for (const [key, segment] of PAGES) {
  for (const locale of LOCALES) {
    xml += '  <url>\n'
    xml += `    <loc>${url(locale, segment)}</loc>\n`
    for (const alt of LOCALES) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt}" href="${url(alt, segment)}" />\n`
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', segment)}" />\n`
    xml += `    <lastmod>${today}</lastmod>\n`
    xml += '    <changefreq>weekly</changefreq>\n'
    xml += `    <priority>${key === 'root' ? '1.0' : '0.8'}</priority>\n`
    xml += '  </url>\n'
  }
}

xml += '</urlset>\n'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
writeFileSync(join(outDir, 'sitemap.xml'), xml, 'utf8')
console.log(`Wrote ${PAGES.length * LOCALES.length} URLs to public/sitemap.xml`)
