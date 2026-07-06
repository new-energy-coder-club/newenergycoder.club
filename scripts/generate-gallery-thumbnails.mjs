#!/usr/bin/env node
/**
 * Gallery thumbnail generator
 *
 * Reads src/data/gallery.json, downloads every original photo, resizes it to
 * a max width of 1080px (preserving aspect ratio) and writes the result to
 * dist-gallery-thumbnails/images/gallery-thumbnails/... mirroring the CDN path.
 *
 * After running this script, upload the contents of
 * dist-gallery-thumbnails/images/gallery-thumbnails/ to
 * https://cdn.newenergycoder.club/images/gallery-thumbnails/
 * so the GalleryPage thumbnail helper can resolve them.
 *
 * Usage:
 *   pnpm generate:gallery-thumbnails
 *   THUMB_WIDTH=1920 THUMB_QUALITY=85 CONCURRENCY=12 pnpm generate:gallery-thumbnails
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const GALLERY_JSON = path.join(ROOT, 'src', 'data', 'gallery.json')
const OUTPUT_DIR = path.join(ROOT, 'dist-gallery-thumbnails')
const THUMB_WIDTH = Number(process.env.THUMB_WIDTH || 1080)
const THUMB_QUALITY = Number(process.env.THUMB_QUALITY || 82)
const LIMIT = Number(process.env.LIMIT || 0)
const CONCURRENCY = Number(process.env.CONCURRENCY || 8)

async function downloadImage(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

function getThumbnailPath(originalUrl) {
  const url = new URL(originalUrl)
  // /images/gallery/robocon/... -> dist-gallery-thumbnails/images/gallery-thumbnails/robocon/...
  const relativePath = url.pathname.replace(
    /^\/images\/gallery\//,
    '/images/gallery-thumbnails/'
  )
  return path.join(OUTPUT_DIR, relativePath)
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
}

async function processPhoto(photo) {
  const outPath = getThumbnailPath(photo.src)

  try {
    await fs.access(outPath)
    console.log(`[skip] ${photo.filename}`)
    return { ok: true, skipped: true, filename: photo.filename }
  } catch {
    // continue processing
  }

  try {
    console.log(`[download] ${photo.filename}`)
    const buffer = await downloadImage(photo.src)

    console.log(`[resize] ${photo.filename}`)
    await ensureDir(outPath)
    await sharp(buffer)
      .resize(THUMB_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .jpeg({ quality: THUMB_QUALITY, progressive: true, mozjpeg: true })
      .toFile(outPath)

    return { ok: true, skipped: false, filename: photo.filename }
  } catch (err) {
    return { ok: false, skipped: false, filename: photo.filename, error: err.message }
  }
}

/**
 * Run async tasks with a concurrency limit.
 */
function runWithConcurrency(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = []
    let index = 0
    let running = 0
    let settled = 0

    const runNext = () => {
      if (settled >= tasks.length) {
        resolve(results)
        return
      }

      while (running < limit && index < tasks.length) {
        const currentIndex = index++
        running++
        tasks[currentIndex]()
          .then(result => {
            results[currentIndex] = result
          })
          .catch(err => {
            results[currentIndex] = { ok: false, error: err.message }
          })
          .finally(() => {
            running--
            settled++
            runNext()
          })
      }
    }

    runNext()
  })
}

async function main() {
  const galleryData = JSON.parse(await fs.readFile(GALLERY_JSON, 'utf-8'))
  const photos = galleryData.flatMap(album => album.photos)
  const uniquePhotos = Array.from(new Map(photos.map(p => [p.src, p])).values())
  const photosToProcess = LIMIT > 0 ? uniquePhotos.slice(0, LIMIT) : uniquePhotos

  console.log(
    `Found ${uniquePhotos.length} unique photos, generating ${THUMB_WIDTH}px thumbnails with concurrency ${CONCURRENCY}...\n`
  )
  if (LIMIT > 0) {
    console.log(`LIMIT is set, processing only ${photosToProcess.length} photos.\n`)
  }

  const tasks = photosToProcess.map(photo => () => processPhoto(photo))
  const results = await runWithConcurrency(tasks, CONCURRENCY)

  const done = results.filter(r => r.ok).length
  const skipped = results.filter(r => r.ok && r.skipped).length
  const errors = results.filter(r => !r.ok)

  console.log(`\nDone: ${done}/${photosToProcess.length} (skipped: ${skipped})`)

  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`)
    for (const err of errors) {
      console.log(`  [error] ${err.filename}: ${err.error}`)
    }
  }

  console.log(`\nUpload the contents of:`)
  console.log(`  ${path.join(OUTPUT_DIR, 'images', 'gallery-thumbnails')}`)
  console.log(`to:`)
  console.log(`  https://cdn.newenergycoder.club/images/gallery-thumbnails/`)
  console.log(`\nThen the GalleryPage will load thumbnails first and originals on click.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
