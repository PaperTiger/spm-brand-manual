import { Suspense, useEffect, useState } from 'react'
import { SECTIONS, SECTION_IMPORTERS } from './sections'
import { BOOK_PAGES } from './pageList'

/**
 * Print route for the build-time PDF generator. Not linked from the UI.
 *
 * `?print=1`            renders every section stacked (useful for eyeballing)
 * `?print=1&page=<id>`  renders exactly one section
 *
 * The generator uses the single-section form: it measures each section's real
 * height and emits a PDF page sized to match, then merges them. Rendering all
 * sections onto fixed-height pages instead makes Chrome spill each section that
 * overruns by even a few pixels onto a near-blank trailing page — 31 sections
 * became 53 pages, roughly 20 of them mostly white.
 */
export default function PrintBook() {
  const params = new URLSearchParams(window.location.search)
  const only = params.get('page')
  const pages = only ? BOOK_PAGES.filter(p => p.id === only) : BOOK_PAGES

  const [loaded, setLoaded] = useState(false)

  // Expose the page list so the generator can drive the loop without
  // duplicating nav-flattening logic in Node.
  useEffect(() => {
    ;(window as unknown as { __BOOK_PAGES?: typeof BOOK_PAGES }).__BOOK_PAGES = BOOK_PAGES
  }, [])

  useEffect(() => {
    const needed = only
      ? [SECTION_IMPORTERS[only]].filter(Boolean)
      : Object.values(SECTION_IMPORTERS)
    Promise.all(needed.map(load => load())).then(() => setLoaded(true))
  }, [only])

  // Signal readiness on a real condition (fonts + images settled) rather than a
  // fixed timeout, which either flakes or wastes build time.
  useEffect(() => {
    if (!loaded) return
    let cancelled = false

    async function settle() {
      if (document.fonts?.ready) await document.fonts.ready
      await Promise.all(Array.from(document.images).map(img =>
        img.complete && img.naturalWidth
          ? Promise.resolve()
          : new Promise<void>(resolve => {
              img.addEventListener('load', () => resolve(), { once: true })
              img.addEventListener('error', () => resolve(), { once: true })
            })))
      await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())))
      if (!cancelled) document.documentElement.setAttribute('data-print-ready', 'true')
    }

    settle()
    return () => {
      cancelled = true
      document.documentElement.removeAttribute('data-print-ready')
    }
  }, [loaded, only])

  if (!loaded) return null

  return (
    <div className="print-book">
      <Suspense fallback={null}>
        {pages.map(page => {
          const Section = SECTIONS[page.id]
          if (!Section) return null
          return (
            <section key={page.id} className="print-book-page">
              <Section />
            </section>
          )
        })}
      </Suspense>
    </div>
  )
}
