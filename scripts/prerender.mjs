/**
 * Bakes per-route <head> tags and JSON-LD into static HTML files.
 *
 * The app sets these tags at runtime too, but link-preview crawlers used by
 * WhatsApp, Facebook and LinkedIn never execute JavaScript, so without this
 * every shared URL would show the homepage's title and image. Search engines
 * also index the correct title immediately instead of waiting to render.
 *
 * Hosts serve a matching static file before applying the SPA rewrite, so
 * dist/about/index.html answers /about while unknown paths still fall through
 * to the app's 404 route.
 *
 * Run automatically as part of `npm run build`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const DIST = join(ROOT, 'dist')

const seo = JSON.parse(await readFile(join(ROOT, 'src/lib/seo.json'), 'utf8'))
const SITE = seo.site

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const PRODUCTS = {
  '/polycarbonate-granules': {
    name: 'Polycarbonate (PC) Granules',
    category: 'Engineering plastic granules',
    material: 'Polycarbonate',
  },
  '/abs-granules': {
    name: 'ABS Granules',
    category: 'Engineering plastic granules',
    material: 'Acrylonitrile Butadiene Styrene',
  },
  '/pbt-granules': {
    name: 'PBT Granules',
    category: 'Engineering plastic granules',
    material: 'Polybutylene Terephthalate',
  },
}

function productSchema(path, meta) {
  const p = PRODUCTS[path]
  if (!p) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: meta.description,
    image: `${SITE}${meta.image}`,
    category: p.category,
    material: p.material,
    url: `${SITE}${path}`,
    brand: { '@type': 'Brand', name: 'Akshay Polymers' },
    manufacturer: { '@id': `${SITE}/#business` },
  }
}

function breadcrumbSchema(path, meta) {
  if (!PRODUCTS[path]) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: PRODUCTS[path].name, item: `${SITE}${path}` },
    ],
  }
}

const template = await readFile(join(DIST, 'index.html'), 'utf8')
let written = 0

for (const [path, meta] of Object.entries(seo.routes)) {
  if (path === '/404') continue
  const url = `${SITE}${path === '/' ? '/' : path}`
  const image = `${SITE}${meta.image}`

  const head = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Akshay Polymers" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ]

  for (const schema of [productSchema(path, meta), breadcrumbSchema(path, meta)]) {
    if (schema) head.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
  }

  // Replace the template's placeholder title/description, then add the rest.
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace('</head>', `${head.join('\n    ')}\n  </head>`)

  const out = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, html)
  written++
}

console.log(`prerendered ${written} routes with static meta and JSON-LD`)
