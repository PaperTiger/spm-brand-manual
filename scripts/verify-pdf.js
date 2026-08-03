#!/usr/bin/env node
/**
 * Structural checks on the generated brand book PDF.
 *
 * Used two ways:
 *   - imported by generate-pdf.js, so a bad render fails the build
 *   - `npm run verify-pdf`, to check an existing dist/brand-book.pdf
 *
 * These assertions encode the failure modes actually hit while building this:
 * near-blank spill pages from fixed-height pagination, raster-only output when
 * text failed to embed, and sections silently dropped from the merge.
 */

import { readFile, stat } from 'fs/promises'
import { existsSync } from 'fs'
import zlib from 'zlib'
import path from 'path'
import { pathToFileURL } from 'url'

/** Chrome hides page objects inside compressed streams; inflate to read them. */
function inflateAll(buf) {
  const parts = [buf]
  const re = /stream\r?\n/g
  const s = buf.toString('latin1')
  let m
  while ((m = re.exec(s)) !== null) {
    const start = m.index + m[0].length
    const end = s.indexOf('endstream', start)
    if (end < 0) continue
    try { parts.push(zlib.inflateSync(buf.subarray(start, end))) } catch { /* not deflate */ }
  }
  return Buffer.concat(parts)
}

export function inspectPdf(buf) {
  const t = inflateAll(buf).toString('latin1')
  const boxes = [...t.matchAll(/\/MediaBox\s*\[\s*([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s*\]/g)]
    .map(m => ({
      w: Math.round(parseFloat(m[3]) - parseFloat(m[1])),
      h: Math.round(parseFloat(m[4]) - parseFloat(m[2])),
    }))
  return {
    bytes: buf.length,
    pages: boxes.length,
    sizes: boxes,
    widths: [...new Set(boxes.map(b => b.w))],
    fonts: (t.match(/\/FontFile[23]?/g) ?? []).length,
  }
}

/**
 * @returns {{ok: boolean, problems: string[], info: object}}
 */
export function verifyPdf(buf, { expectedPages, expectedWidthPt, minPageHeightPt = 200 } = {}) {
  const info = inspectPdf(buf)
  const problems = []

  if (info.pages === 0) problems.push('no pages found')

  if (expectedPages != null && info.pages !== expectedPages) {
    problems.push(`expected ${expectedPages} pages, found ${info.pages} — sections were dropped or split`)
  }

  // Vector text is the entire reason for this pipeline. Zero embedded fonts
  // means it silently degraded to images.
  if (info.fonts === 0) {
    problems.push('no embedded fonts — text is not selectable, output is raster')
  }

  if (info.widths.length > 1) {
    problems.push(`inconsistent page widths: ${info.widths.join(', ')}pt — capture width was not deterministic`)
  }
  if (expectedWidthPt != null && info.widths[0] !== expectedWidthPt) {
    problems.push(`page width ${info.widths[0]}pt, expected ${expectedWidthPt}pt`)
  }

  // A very short page is the signature of the fixed-height pagination bug:
  // a section spilling a sliver onto an otherwise blank trailing page.
  const shorties = info.sizes
    .map((s, i) => ({ ...s, page: i + 1 }))
    .filter(s => s.h < minPageHeightPt)
  if (shorties.length) {
    problems.push(`${shorties.length} near-blank page(s) under ${minPageHeightPt}pt: ` +
      shorties.map(s => `p${s.page} (${s.h}pt)`).join(', '))
  }

  if (info.bytes < 100_000) {
    problems.push(`file is only ${(info.bytes / 1024).toFixed(0)} KB — suspiciously small`)
  }

  return { ok: problems.length === 0, problems, info }
}

// Standalone: npm run verify-pdf
// pathToFileURL, not string interpolation: this repo's path contains spaces,
// which import.meta.url percent-encodes and process.argv[1] does not — the
// naive comparison silently never matches, so the check would never run.
// argv[1] is undefined when this module is imported from an eval context, so
// guard before converting — otherwise merely importing it throws.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const target = process.argv[2] ?? path.resolve('dist/brand-book.pdf')
  if (!existsSync(target)) {
    console.error(`[verify] ${target} not found — run \`npm run build\` first.`)
    process.exit(1)
  }
  const buf = await readFile(target)
  const { ok, problems, info } = verifyPdf(buf, { expectedWidthPt: 1080 })
  const { size } = await stat(target)

  console.log(`[verify] ${path.basename(target)}`)
  console.log(`         pages:        ${info.pages}`)
  console.log(`         width:        ${info.widths.join(', ')}pt`)
  console.log(`         heights:      ${Math.min(...info.sizes.map(s => s.h))}–${Math.max(...info.sizes.map(s => s.h))}pt`)
  console.log(`         fonts:        ${info.fonts} (vector text)`)
  console.log(`         size:         ${(size / 1024 / 1024).toFixed(1)} MB`)

  if (ok) {
    console.log('[verify] PASS')
  } else {
    console.error('[verify] FAIL')
    problems.forEach(p => console.error(`         - ${p}`))
    process.exit(1)
  }
}
