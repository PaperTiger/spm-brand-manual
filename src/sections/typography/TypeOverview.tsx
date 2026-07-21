import { useState } from 'react'
import JSZip from 'jszip'
import brand, { darkestPrimary, lightestPrimary } from '../../brand.config'

const df = brand.typography.displayFont
const bf = brand.typography.bodyFont

const displayWeight = brand.typeScale.find(t => t.family === df && t.name.startsWith('Display'))?.weight ?? 700

async function downloadFontZip(family: string) {
  const zip = new JSZip()
  const fonts = brand.typography.fonts.filter(f => f.family === family)
  const base = import.meta.env.BASE_URL
  await Promise.all(fonts.map(async (f) => {
    const url = f.file.startsWith('http') ? f.file : `${base}${f.file.replace(/^\//, '')}`
    const resp = await fetch(url)
    if (!resp.ok) throw new Error(`Failed to fetch ${f.file}`)
    const blob = await resp.blob()
    zip.file(f.file.split('/').pop() ?? 'font', blob)
  }))
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = `${family.replace(/\s+/g, '-')}-fonts.zip`
  a.click()
  URL.revokeObjectURL(a.href)
}

export default function TypeOverview() {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await downloadFontZip(df)
    } finally {
      setDownloading(false)
    }
  }

  const showBodyBtn = bf !== df && !!brand.typography.bodyFontUrl

  return (
    <div className="fg-overview" style={{ background: darkestPrimary.hex, color: lightestPrimary.hex }}>
      {/* Left col */}
      <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 14, lineHeight: 1.4, color: 'var(--fg-overview-text)', alignSelf: 'start' }}>
        <p style={{ margin: '0 0 14px' }}>{df} is a low-contrast geometric sans-serif built for on-screen readability. Its clean, neutral structure gives {brand.meta.client} headlines presence without shouting: modern, technical, and approachable.</p>
        <p style={{ margin: '0 0 14px' }}>It carries both headlines and body copy across every {brand.meta.client} surface, in three weights: <strong>500 Medium</strong>, <strong>550</strong> for display sizes, and <strong>600 Semibold</strong> for headlines and emphasis.</p>
        <p style={{ margin: '0 0 24px' }}>Use {df} for long headlines and long body paragraphs. It pairs with <strong>Old Standard TT Italic</strong> as an accent on short headlines and section captions, never for running text.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button onClick={handleDownload} disabled={downloading} className="dl-btn" style={{ background: 'var(--fg-overview-text)', color: 'var(--fg-overview-bg)', marginTop: 0, cursor: downloading ? 'wait' : 'pointer', opacity: downloading ? 0.7 : 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {downloading ? 'Preparing…' : `Download ${df}`}
          </button>
          {showBodyBtn && (
            <a href={brand.typography.bodyFontUrl} target="_blank" rel="noopener" className="dl-btn-outline-white" style={{ marginTop: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Download {bf}
            </a>
          )}
        </div>
      </div>

      {/* Right col: large type at top, alphabet pushed to bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch' }}>
        <div style={{ containerType: 'inline-size' }}>
          <div style={{ fontFamily: `${df}, sans-serif`, fontWeight: displayWeight, fontSize: 'clamp(40px,22cqi,190px)', lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--fg-overview-text)', whiteSpace: 'nowrap', marginTop: '-0.12em' }}>{df}</div>
        </div>
        <div style={{ paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.25)', containerType: 'inline-size' }}>
          <div style={{ fontFamily: `${df}, sans-serif`, fontWeight: 500, fontSize: 'clamp(14px,5.6cqi,42px)', letterSpacing: '-0.01em', color: 'var(--fg-overview-text)', lineHeight: 1.4 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div style={{ fontFamily: `${df}, sans-serif`, fontWeight: 500, fontSize: 'clamp(14px,5.6cqi,42px)', letterSpacing: '-0.01em', color: 'var(--fg-overview-text)', lineHeight: 1.4 }}>abcdefghijklmnopqrstuvwxyz</div>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontWeight: 500, fontSize: 'clamp(11px,4.6cqi,28px)', letterSpacing: '-0.005em', color: 'var(--fg-overview-text)', lineHeight: 1.4 }}>1234567890!@#$%&amp;*.,;:/{}[]()?!</div>
        </div>
      </div>
    </div>
  )
}
