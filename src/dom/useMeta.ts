import { useEffect } from 'react'
import seo from '../lib/seo.json'

const SITE = seo.site
type RouteKey = keyof typeof seo.routes

function tag(selector: string, create: () => HTMLElement): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  const el = tag(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute(attr, key)
    return m
  })
  el.setAttribute('content', value)
}

/**
 * Applies the route's SEO metadata to the document.
 *
 * The same seo.json drives scripts/prerender.mjs, which bakes these tags into
 * a static HTML file per route at build time. That matters because crawlers
 * that never run JavaScript (WhatsApp, Facebook and LinkedIn link previews)
 * would otherwise only ever see the homepage's tags.
 */
export function useMeta(path: RouteKey) {
  useEffect(() => {
    const meta = seo.routes[path]
    if (!meta) return

    document.title = meta.title
    setMeta('name', 'description', meta.description)

    const canonical = tag('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.rel = 'canonical'
      return l
    }) as HTMLLinkElement
    canonical.href = `${SITE}${path === '/' ? '/' : path}`

    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', canonical.href)
    setMeta('property', 'og:image', `${SITE}${meta.image}`)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'Akshay Polymers')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setMeta('name', 'twitter:image', `${SITE}${meta.image}`)
  }, [path])
}
