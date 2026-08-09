import { useEffect } from 'react'
import type { RouteSeo } from '../config/seoRoutes'

/** Create-or-update a <meta> tag addressed by name or property. */
function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Create-or-update the canonical <link>. */
function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Point the existing WebApplication JSON-LD at the current canonical URL. */
function setJsonLdUrl(url: string) {
  document.head
    .querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')
    .forEach((s) => {
      try {
        const data = JSON.parse(s.textContent ?? '{}')
        if (data?.['@type'] === 'WebApplication') {
          data.url = url
          s.textContent = JSON.stringify(data)
        }
      } catch {
        /* ignore malformed inline JSON */
      }
    })
}

/**
 * Sync the document head with the active route's SEO metadata.
 * Runs on every route change so direct loads and SPA navigation both update
 * title, description, canonical, Open Graph, Twitter Card and JSON-LD.
 */
export function useDocumentMeta(seo: RouteSeo) {
  useEffect(() => {
    document.title = seo.title
    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'keywords', seo.keywords)
    upsertCanonical(seo.canonical)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', seo.canonical)
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:url', seo.canonical)
    setJsonLdUrl(seo.canonical)
  }, [seo])
}
