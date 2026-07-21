import { lazy, Suspense, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import PageNav from './components/PageNav'
import brand from './brand.config'

const SECTIONS: Record<string, React.LazyExoticComponent<() => React.ReactElement>> = {
  home:                 lazy(() => import('./sections/home/Cover')),
  'vi-intro':           lazy(() => import('./sections/home/ViIntro')),
  'logo-horizontal':    lazy(() => import('./sections/logo/FullLogo')),
  'logo-compact':       lazy(() => import('./sections/logo/CompactLogo')),
  'h-logo-mark':        lazy(() => import('./sections/logo/LogoMark')),
  'logo-avatar':        lazy(() => import('./sections/logo/LogoAvatar')),
  'logo-positioning':   lazy(() => import('./sections/logo/LogoPositioning')),
  'logo-avoid':         lazy(() => import('./sections/logo/LogoAvoid')),
  'color-intro':        lazy(() => import('./sections/color/ColorIntro')),
  'primary-palette':    lazy(() => import('./sections/color/PrimaryPalette')),
  'secondary-palette':  lazy(() => import('./sections/color/SecondaryPalette')),
  'color-combinations': lazy(() => import('./sections/color/ColorCombinations')),
  'color-pathways':     lazy(() => import('./sections/color/ColorPathways')),
  'type-intro':         lazy(() => import('./sections/typography/TypeIntro')),
  'fg-overview':        lazy(() => import('./sections/typography/TypeOverview')),
  'fg-usage':           lazy(() => import('./sections/typography/TypeUsage')),
  'fg-specimen':        lazy(() => import('./sections/typography/TypeSpecimen')),
  'fg-scale':           lazy(() => import('./sections/typography/TypeScale')),
  'google-fallback':    lazy(() => import('./sections/typography/GoogleFallback')),
  'type-fallback':      lazy(() => import('./sections/typography/SystemFallback')),
  'type-oldstandard':   lazy(() => import('./sections/typography/OldStandard')),
  'type-pairing':       lazy(() => import('./sections/typography/TypePairing')),
  'type-emphasis':      lazy(() => import('./sections/typography/TypeEmphasis')),
  'type-avoid':         lazy(() => import('./sections/typography/TypeAvoid')),
  'photo-dos':          lazy(() => import('./sections/photography/PhotoDos')),
  'symbols':            lazy(() => import('./sections/symbols/Symbols')),
  'pattern':            lazy(() => import('./sections/symbols/Pattern')),
  'motion':             lazy(() => import('./sections/motion/Motion')),
  'logo-cobranding':    lazy(() => import('./sections/logo/Cobranding')),
  'dataviz-colors':     lazy(() => import('./sections/dataviz/DataVizColors')),
  'dataviz-charts':     lazy(() => import('./sections/dataviz/DataVizCharts')),
  'app-intro':          lazy(() => import('./sections/applications/AppIntro')),
  'app-examples':       lazy(() => import('./sections/applications/AppExamples')),
  'print-specs':        lazy(() => import('./sections/print/PrintSpecs')),
}


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

  const handleDownloadPdf = async () => {
    const main = document.querySelector<HTMLElement>('.main')
    if (!main) return
    setPdfGenerating(true)

    const sidebar  = document.querySelector<HTMLElement>('.sidebar')
    const mHeader  = document.querySelector<HTMLElement>('.mobile-header')
    const overlay  = document.querySelector<HTMLElement>('.sidebar-overlay')
    const pageNavs = document.querySelectorAll<HTMLElement>('.page-nav')

    const prevSidebarDisplay = sidebar?.style.display ?? ''
    if (sidebar) sidebar.style.display = 'none'

    const chrome = [mHeader, overlay].filter(Boolean) as HTMLElement[]
    chrome.forEach(el => { el.style.visibility = 'hidden' })

    const prevPageNavDisplays = Array.from(pageNavs).map(el => el.style.display)
    pageNavs.forEach(el => { el.style.display = 'none' })

    const prevMarginLeft = main.style.marginLeft
    main.style.marginLeft = '0'

    const origScrollY = window.scrollY
    window.scrollTo(0, 0)

    await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())))

    try {
      const { toCanvas } = await import('html-to-image')
      const { default: jsPDF } = await import('jspdf')

      const captureW = main.offsetWidth
      const captureH = main.scrollHeight

      const canvas = await toCanvas(main, {
        pixelRatio: 2,
        width: captureW,
        height: captureH,
        backgroundColor: '#ffffff',
      })

      const pxToPt = 72 / 96
      const pdfW = (canvas.width / 2) * pxToPt
      const pdfH = (canvas.height / 2) * pxToPt

      const pdf = new jsPDF({
        orientation: pdfW > pdfH ? 'l' : 'p',
        unit: 'pt',
        format: [pdfW, pdfH],
        compress: true,
      })

      pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pdfW, pdfH)
      const slug = brand.meta.client.toLowerCase().replace(/\s+/g, '-')
      pdf.save(`${slug}-${currentPage}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
      alert('PDF generation failed — see console for details.')
    } finally {
      if (sidebar) sidebar.style.display = prevSidebarDisplay
      chrome.forEach(el => { el.style.visibility = '' })
      pageNavs.forEach((el, i) => { el.style.display = prevPageNavDisplays[i] })
      main.style.marginLeft = prevMarginLeft
      window.scrollTo(0, origScrollY)
      setPdfGenerating(false)
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
      />

      <main className="main">
        <Suspense fallback={<div style={{ padding: 64, fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, color: 'var(--charcoal, #283F1A)' }}>Loading…</div>}>
          <Section />
        </Suspense>
        <PageNav currentPage={currentPage} onNavigate={navigate} />
      </main>
    </div>
  )
}
