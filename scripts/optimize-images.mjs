/**
 * Re-encodes the photos in public/ to sensible display sizes.
 *
 * The originals were 1200px JPEGs regardless of how large they are ever shown,
 * so a phone downloaded roughly four times the pixels it could display. This
 * writes a WebP alongside each JPEG and caps both at the width actually used.
 *
 * Run with: node scripts/optimize-images.mjs
 */
import { readdir, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

// fileURLToPath, not .pathname: the project path contains a space.
const DIR = fileURLToPath(new URL('../public/', import.meta.url))

// Widest the image is ever rendered, x2 for high-density screens.
const MAX_WIDTH = {
  'p-': 1000, // product galleries: half-width cards / page hero
  'g-': 900, // grade cards: third-width
  'v-': 800, // colour cards: quarter-width
  facility: 1200,
  logo: 320,
}

function capFor(name) {
  for (const [prefix, width] of Object.entries(MAX_WIDTH)) {
    if (name.startsWith(prefix)) return width
  }
  return 1000
}

const files = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f))
let before = 0
let after = 0

for (const file of files) {
  const path = join(DIR, file)
  before += (await stat(path)).size

  const cap = capFor(file)
  const base = sharp(path).rotate()
  const meta = await base.metadata()
  const width = Math.min(cap, meta.width ?? cap)

  const jpeg = await sharp(path)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer()
  await writeFile(path, jpeg)
  after += jpeg.length

  const webp = await sharp(path)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 76 })
    .toBuffer()
  const webpPath = path.replace(/\.jpe?g$/i, '.webp')
  await writeFile(webpPath, webp)
  after += webp.length
}

const mb = (n) => (n / 1024 / 1024).toFixed(2)
console.log(
  `${files.length} images: ${mb(before)} MB -> ${mb(after)} MB (JPEG + WebP)`,
)
