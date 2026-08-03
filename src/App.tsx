import { lazy, Suspense, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import PageNav from './components/PageNav'
import brand from './brand.config'
import { BOOK_PAGES } from './pageList'
import { SECTIONS, SECTION_IMPORTERS } from './sections'
import { exportCurrentPage, exportFullBook } from './pdfExport'

const PrintBook = lazy(() => import('./PrintBook'))

/** `?print=1` renders every section stacked for the build-time PDF generator. */
const IS_PRINT_ROUTE = typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).get('print') === '1'


function hexLuminance(hex: string): number {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  const lin = (x: number) => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function useBrandTokens() {
  useEffect(() => {
    const tokenDecls = Object.entries(brand.tokens).map(([k, v]) => `--${k}: ${v}`).join('; ')

    const primarySorted = [...brand.colors.primary].sort((a, b) => hexLuminance(a.hex) - hexLuminance(b.hex))
    const darkest  = primarySorted[0]
    const lightest = primarySorted[primarySorted.length - 1]
    const overviewDecls = `--fg-overview-bg: ${darkest.hex}; --fg-overview-text: ${lightest.hex}`

    const t = brand.typography
    const fontVars = `--display-font: '${t.displayFont}'; --body-font: '${t.bodyFont}'`

    // Per-scale letter-spacing/line-height custom properties, e.g. --ts-headline-l-ls,
    // so document chrome (headings, body copy) tracks the brand's Figma text styles
    // instead of hardcoded values.
    const scaleDecls = brand.typeScale.map(s => {
      const slug = s.name.toLowerCase().replace(/\s+/g, '-')
      return `--ts-${slug}-ls: ${s.ls}; --ts-${slug}-lh: ${s.lh}`
    }).join('; ')

    const style = document.createElement('style')
    style.textContent = `:root { ${tokenDecls}; ${overviewDecls}; ${fontVars}; ${scaleDecls} }`
    document.head.appendChild(style)

    // Favicon from brand mark
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null
    if (!link) { link = document.createElement('link') as HTMLLinkElement; document.head.appendChild(link) }
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = brand.meta.coverSealImage

    document.title = `${brand.meta.client}, ${brand.meta.title}`
    return () => { document.head.removeChild(style) }
  }, [])
}

function MobileHeader({ onOpen, onHome }: { onOpen: () => void; onHome: () => void }) {
  const [logoError, setLogoError] = useState(false)
  const hasLogo = !!brand.meta.sidebarLogoImage
  return (
    <header className="mobile-header">
      <button className="hamburger" onClick={onOpen} aria-label="Open menu">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M0 1h18M0 7h18M0 13h18" stroke="#283F1A" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      <div onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        {hasLogo && !logoError && (
          <img
            src={brand.meta.sidebarLogoImage}
            alt={brand.meta.client}
            style={{ height: 32, width: 'auto', display: 'block' }}
            onError={() => setLogoError(true)}
          />
        )}
        {(!hasLogo || logoError) && (
          <span style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 600, fontSize: 14,
            letterSpacing: '-0.02em', color: 'var(--charcoal, #283F1A)' }}>
            {brand.meta.nameLine1}{brand.meta.nameLine2 ? ' ' + brand.meta.nameLine2 : ''}
          </span>
        )}
      </div>
    </header>
  )
}

export default function App() {
  useBrandTokens()

  const [currentPage, setCurrentPage] = useState(() => window.location.hash.slice(1) || 'home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pdfGenerating, setPdfGenerating] = useState(false)
  const [bookProgress, setBookProgress] = useState<
    { done: number; total: number; label: string } | null
  >(null)

  const navigate = (id: string) => {
    setCurrentPage(id)
    window.location.hash = id
    window.scrollTo(0, 0)
    setSidebarOpen(false)
  }

  useEffect(() => {
    const onHash = () => { const id = window.location.hash.slice(1); if (id) setCurrentPage(id) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const slug = brand.meta.client.toLowerCase().replace(/\s+/g, '-')

  const handleDownloadPdf = async () => {
    setPdfGenerating(true)
    try {
      await exportCurrentPage(`${slug}-${currentPage}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
      alert('PDF generation failed — see console for details.')
    } finally {
      setPdfGenerating(false)
    }
  }

  const handleDownloadBook = async () => {
    // Prefer the build-time PDF: real vector text, native page heights, and no
    // 90-second wait. Falls back to the in-browser export in dev, or if a build
    // ran without Chromium available.
    const prebuilt = `${import.meta.env.BASE_URL}brand-book.pdf`
    try {
      const head = await fetch(prebuilt, { method: 'HEAD' })
      // The dev server answers unknown paths with index.html, so a 200 alone
      // isn't proof — the content type has to actually be a PDF.
      if (head.ok && (head.headers.get('content-type') ?? '').includes('pdf')) {
        const a = document.createElement('a')
        a.href = prebuilt
        a.download = `${slug}-brand-book.pdf`
        a.click()
        return
      }
    } catch {
      // Offline or blocked — fall through to generating it client-side.
    }

    const returnTo = currentPage
    setBookProgress({ done: 0, total: BOOK_PAGES.length, label: 'Preparing…' })
    try {
      await exportFullBook({
        pages: BOOK_PAGES,
        // Drive rendering via state only — writing the hash 34 times would
        // bury the user's real history under a stack of export steps.
        goToPage: id => setCurrentPage(id),
        preload: () => Promise.all(Object.values(SECTION_IMPORTERS).map(load => load())),
        onProgress: (done, total, label) => setBookProgress({ done, total, label }),
        fileName: `${slug}-brand-book.pdf`,
      })
    } catch (err) {
      console.error('Full book PDF failed:', err)
      alert('Full book PDF failed — see console for details.')
    } finally {
      setBookProgress(null)
      setCurrentPage(returnTo)
    }
  }

  // Pass active section to Marker so every report includes the page context
  useEffect(() => {
    ;(window as any).Marker?.setCustomData({ section: currentPage })
  }, [currentPage])

  useEffect(() => {
    ;(window as any).__brandBookPrint = handleDownloadPdf
    return () => { delete (window as any).__brandBookPrint }
  })

  const Section = SECTIONS[currentPage] ?? SECTIONS['home']

  // Print route: no sidebar, no nav, no routing — just the whole book stacked
  // so Chrome can paginate it. Returns before the normal layout entirely.
  if (IS_PRINT_ROUTE) {
    return (
      <Suspense fallback={null}>
        <PrintBook />
      </Suspense>
    )
  }

  return (
    <div className="layout">
      <MobileHeader onOpen={() => setSidebarOpen(true)} onHome={() => navigate('home')} />

      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

      <Sidebar
        currentPage={currentPage}
        onNavigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onPrint={handleDownloadPdf}
        pdfGenerating={pdfGenerating}
        onDownloadBook={handleDownloadBook}
        bookGenerating={bookProgress !== null}
      />

      <main className="main">
        <Suspense fallback={<div className="section-loading" style={{ padding: 64, fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, color: 'var(--charcoal, #283F1A)' }}>Loading…</div>}>
          <Section />
        </Suspense>
        <PageNav currentPage={currentPage} onNavigate={navigate} />
      </main>

      {bookProgress && <BookProgressOverlay {...bookProgress} />}
    </div>
  )
}

function BookProgressOverlay({ done, total, label }: { done: number; total: number; label: string }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div className="book-export-overlay" role="status" aria-live="polite">
      <div className="book-export-card">
        <div className="book-export-title">Building your brand book</div>
        <div className="book-export-step">
          {done < total ? `Page ${Math.min(done + 1, total)} of ${total}` : `${total} of ${total}`} &middot; {label}
        </div>
        <div className="book-export-track">
          <div className="book-export-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="book-export-note">This takes a minute. Please keep this tab open.</div>
      </div>
    </div>
  )
}
