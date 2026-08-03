#!/usr/bin/env node
/**
 * Build-time PDF generation.
 *
 * Renders each section in headless Chrome at a fixed viewport and emits one
 * PDF page sized to that section's real height, then merges them into a single
 * document. Output is real vector text — selectable and searchable — rather
 * than the JPEG-per-page the in-browser export produces.
 *
 * Why per-section rather than one continuous print job: these sections range
 * from ~700px to ~2000px tall. On fixed-height pages, every section that
 * overruns by even a few pixels spills onto a near-blank trailing page (31
 * sections produced 53 pages, ~20 of them mostly white). Sizing each page to
 * its section gives native heights and no splitting, while Chrome still does
 * the text rendering.
 *
 * The fixed viewport matters too: the in-browser export inherits whatever width
 * the user's window happens to be, so a narrow window yielded a mobile-styled
 * book. Here every build renders identically.
 *
 * Failure is deliberately non-fatal — if Chromium is unavailable the site still
 * deploys and the sidebar falls back to the client-side export.
 */

import { createServer } from 'http'
import { readFile, stat, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DIST = path.resolve('dist')
const OUT = path.join(DIST, 'brand-book.pdf')

/**
 * This site deploys to a GitHub Pages project path, so the build is emitted
 * with `base: /<repo>/` and index.html asks for `/<repo>/assets/...`. The dev
 * server below serves dist at the root, so without this those requests miss,
 * fall through to the SPA index.html, and the app never boots — the generator
 * then times out waiting for data-print-ready. Strip the prefix on the way in
 * and navigate through it on the way out.
 */
const BASE_PATH = (process.env.VITE_BASE_PATH ?? '/').replace(/\/*$/, '/')

/** Wide enough for the desktop layout, and identical on every machine. */
const PAGE_WIDTH = 1440
const MAX_PAGE_HEIGHT = 4000 // guard against a runaway section

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.json': 'application/json', '.txt': 'text/plain',
}

function serveDist() {
  const server = createServer(async (req, res) => {
    try {
      let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
      // dist/ is laid out relative to the base, so drop the prefix before joining.
      if (BASE_PATH !== '/' && urlPath.startsWith(BASE_PATH)) {
        urlPath = '/' + urlPath.slice(BASE_PATH.length)
      }
      let filePath = path.join(DIST, urlPath)
      let isFile = false
      try { isFile = (await stat(filePath)).isFile() } catch { isFile = false }
      if (!isFile) filePath = path.join(DIST, 'index.html')  // SPA entry
      if (!filePath.startsWith(DIST)) { res.writeHead(403).end(); return }
      const body = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] ?? 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(404).end()
    }
  })
  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }))
  })
}

async function main() {
  if (!existsSync(path.join(DIST, 'index.html'))) {
    console.warn('[pdf] dist/index.html missing — run vite build first. Skipping.')
    return
  }

  let PDFDocument, verifyPdf
  try {
    ;({ PDFDocument } = await import('pdf-lib'))
    ;({ verifyPdf } = await import('./verify-pdf.js'))
  } catch (err) {
    console.warn(`[pdf] dependencies unavailable (${err.message}) — skipping.`)
    return
  }

  /**
   * Two ways to get a browser, tried in order.
   *
   * Puppeteer's bundled Chromium works locally but dies on Vercel's build image
   * with "Failed to launch the browser process: Code: 127" — the binary is there,
   * the shared libraries it links against are not. @sparticuz/chromium ships a
   * self-contained build for exactly that environment, so it is the fallback
   * rather than the default (locally the bundled one is faster and simpler).
   */
  async function launchBrowser() {
    const attempts = []

    try {
      const puppeteer = (await import('puppeteer')).default
      return { browser: await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
      }), via: 'puppeteer (bundled Chromium)' }
    } catch (err) {
      attempts.push(`bundled: ${err.message.split('\n')[0]}`)
    }

    try {
      const chromium = (await import('@sparticuz/chromium')).default
      const core = (await import('puppeteer-core')).default
      const executablePath = await chromium.executablePath()
      return { browser: await core.launch({
        executablePath,
        args: [...chromium.args, '--font-render-hinting=none'],
        headless: 'shell',
      }), via: '@sparticuz/chromium' }
    } catch (err) {
      attempts.push(`sparticuz: ${err.message.split('\n')[0]}`)
    }

    return { browser: null, attempts }
  }

  const { server, port } = await serveDist()
  const base = `http://127.0.0.1:${port}`
  let browser

  try {
    // Launch is treated as an environment probe, not a build step: an image
    // without any usable Chromium should skip the PDF, not block the deploy.
    // Everything *after* a successful launch is our own code, so failures there
    // are real regressions and do fail the build.
    const launched = await launchBrowser()
    if (!launched.browser) {
      console.warn('[pdf] no usable Chromium — skipping PDF.')
      launched.attempts.forEach(a => console.warn(`[pdf]   tried ${a}`))
      console.warn('[pdf] Site will deploy; the download button falls back to the in-browser export.')
      server.close()
      return
    }
    browser = launched.browser
    console.log(`[pdf] browser: ${launched.via}`)

    const page = await browser.newPage()
    await page.setViewport({ width: PAGE_WIDTH, height: 1000, deviceScaleFactor: 2 })
    // Screen media so the PDF matches the live site.
    await page.emulateMediaType('screen')

    // Ask the app for the page order rather than re-deriving it in Node.
    await page.goto(`${base}${BASE_PATH}?print=1&page=home`, { waitUntil: 'networkidle0', timeout: 90_000 })
    await page.waitForSelector('html[data-print-ready="true"]', { timeout: 90_000 })
    const pages = await page.evaluate(() => window.__BOOK_PAGES ?? [])
    if (!pages.length) throw new Error('could not read book page list from the app')

    const merged = await PDFDocument.create()
    console.log(`[pdf] rendering ${pages.length} sections at ${PAGE_WIDTH}px wide`)

    for (const { id, label } of pages) {
      await page.goto(`${base}${BASE_PATH}?print=1&page=${encodeURIComponent(id)}`, {
        waitUntil: 'networkidle0', timeout: 90_000,
      })
      await page.waitForSelector('html[data-print-ready="true"]', { timeout: 90_000 })

      // Measure the section itself, not the viewport.
      const height = await page.evaluate(() => {
        const el = document.querySelector('.print-book-page')
        if (!el) return 0
        return Math.ceil(el.getBoundingClientRect().height)
      })
      if (!height) { console.warn(`[pdf]   ! ${id}: zero height, skipped`); continue }
      const pageHeight = Math.min(height, MAX_PAGE_HEIGHT)

      const buf = await page.pdf({
        printBackground: true,
        width: `${PAGE_WIDTH}px`,
        height: `${pageHeight}px`,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        preferCSSPageSize: false,
      })

      const doc = await PDFDocument.load(buf)
      // A correctly-sized section yields exactly one page; copy whatever we got
      // so an unexpected overflow is still included rather than silently lost.
      const copied = await merged.copyPages(doc, doc.getPageIndices())
      copied.forEach(p => merged.addPage(p))
      console.log(`[pdf]   ${String(merged.getPageCount()).padStart(2)} ${label} (${pageHeight}px)`)
    }

    const bytes = await merged.save()
    await writeFile(OUT, bytes)

    // Chromium ran, so any bad output is a real regression in this repo, not an
    // environment limitation. Fail loudly rather than silently shipping a book
    // with dropped sections, blank pages, or non-selectable text.
    const { ok, problems, info } = verifyPdf(Buffer.from(bytes), {
      expectedPages: pages.length,
      expectedWidthPt: Math.round(PAGE_WIDTH * 0.75),
    })
    if (!ok) {
      console.error('[pdf] output failed verification:')
      problems.forEach(p => console.error(`[pdf]   - ${p}`))
      throw new Error('generated PDF did not pass verification')
    }

    const { size } = await stat(OUT)
    console.log(`[pdf] wrote dist/brand-book.pdf — ${info.pages} pages, ` +
      `${info.fonts} embedded fonts, ${(size / 1024 / 1024).toFixed(1)} MB  [verified]`)
  } catch (err) {
    // Set PDF_OPTIONAL=1 to downgrade this to a warning (e.g. a CI image where
    // Chromium is flaky and you'd rather ship without the prebuilt book).
    if (process.env.PDF_OPTIONAL === '1') {
      console.warn(`[pdf] generation failed, continuing build (PDF_OPTIONAL=1): ${err.message}`)
    } else {
      console.error(`[pdf] generation failed: ${err.message}`)
      process.exitCode = 1
    }
  } finally {
    if (browser) await browser.close().catch(() => {})
    server.close()
  }
}

main()
