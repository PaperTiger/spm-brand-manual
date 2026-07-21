#!/usr/bin/env node
// Converts PNG/JPG images in public/images/{photography,applications,pattern,symbols}/
// to WebP at max 1600px wide. Deletes the originals after conversion.
// Usage: node scripts/convert-images.js

import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', 'public', 'images')

const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png'])
const DIRS = ['photography', 'applications', 'pattern', 'symbols']
const MAX_WIDTH = 1600

async function convertDir(dir) {
  const files = await readdir(dir).catch(() => [])
  let converted = 0

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!SOURCE_EXTS.has(ext)) continue

    const src = join(dir, file)
    const dest = join(dir, basename(file, ext) + '.webp')

    await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(dest)

    await unlink(src)
    console.log(`  ${file} → ${basename(dest)}`)
    converted++
  }

  return converted
}

let total = 0
for (const name of DIRS) {
  const dir = join(root, name)
  console.log(`\n${name}/`)
  total += await convertDir(dir)
}

console.log(`\n✓ ${total} image${total !== 1 ? 's' : ''} converted to WebP`)
