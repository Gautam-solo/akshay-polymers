import { useEffect } from 'react'

const SITE = 'https://www.akshaypolymers.in'

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

interface Meta {
  title: string
  description: string
  /** path beginning with a slash, e.g. "/abs-granules" */
  path: string
  image?: string
}

/**
 * Keeps the document title, description, canonical URL and share tags in step
 * with the current route. Without this every page shares the homepage's
 * metadata in tabs, bookmarks, search results and link previews.
 */
export function useMeta({ title, description, path, image = '/logo.jpg' }: Meta) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)

    const canonical = tag('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.rel = 'canonical'
      return l
    }) as HTMLLinkElement
    canonical.href = `${SITE}${path}`

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${SITE}${path}`)
    setMeta('property', 'og:image', `${SITE}${image}`)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
  }, [title, description, path, image])
}
