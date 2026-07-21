import { createElement, useState } from 'react'
import JSZip from 'jszip'
import brand from '../../brand.config'
import { CompactLogoSvg, LogoMarkSvg } from './LogoSvg'
import { avatarBgs, faviconVariants, faviconSizes } from '../../brandAssets'

// Three lockups from the stylesheet: full (mark + spm + communications),
// compact (mark + spm) and mark (monogram). Each ships in the two-colour
// primary, its inverse, and a one-colour knockout per brand colour.
const LOGO_LOCKUPS = ['full', 'compact', 'mark']
const LOGO_COLORS = [
  'primary', 'primary-inverse',
  'jam', 'fern', 'cornflower', 'salt', 'silk', 'honeydew',
  'black', 'white',
]

const LOGO_FILES = LOGO_LOCKUPS.flatMap(lockup =>
  LOGO_COLORS.map(color => `logo-${lockup}-${color}.svg`)
)

// Dynamic import so react-dom/server is only loaded when the button is clicked
async function svgStringFromComponent(element: React.ReactElement): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server')
  return renderToStaticMarkup(element)
}

async function svgToPng(svgString: string, width: number, height: number): Promise<Blob> {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) { URL.revokeObjectURL(url); reject(new Error('No 2D context')); return }
      ctx.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(url)
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('toBlob failed')), 'image/png')
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('SVG image load failed')) }
    img.src = url
  })
}

function stripOuterSvgTag(svgStr: string): string {
  return svgStr
    .replace(/^<svg[^>]*>/, '')
    .replace(/<\/svg>$/, '')
    .replace(/\s+xmlns="[^"]*"/g, '')
}

async function buildAvatarSvg(bg: string, mark: string, wm: string, inner: string): Promise<string> {
  const logoStr = await svgStringFromComponent(
    createElement(CompactLogoSvg, { markFill: mark, wordmarkFill: wm, innerTextFill: inner })
  )
  const logoBody = stripOuterSvgTag(logoStr)
  const size = 400
  const logoW = Math.round(size * 0.78)
  const logoH = Math.round(logoW * 503 / 1293)
  const x = Math.round((size - logoW) / 2)
  const y = Math.round((size - logoH) / 2)
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${bg}"/><svg x="${x}" y="${y}" width="${logoW}" height="${logoH}" viewBox="0 0 1293 503" fill="none">${logoBody}</svg></svg>`
}

async function buildFaviconSvg(bg: string, mark: string, inner: string, size: number): Promise<string> {
  const logoStr = await svgStringFromComponent(
    createElement(LogoMarkSvg, { markFill: mark, innerTextFill: inner })
  )
  const logoBody = stripOuterSvgTag(logoStr)
  const pad = Math.max(1, Math.round(size * 0.04))
  const logoS = size - pad * 2
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" fill="${bg}"/><svg x="${pad}" y="${pad}" width="${logoS}" height="${logoS}" viewBox="0 0 450 450" fill="none">${logoBody}</svg></svg>`
}

export default function DownloadLogosButton({ style }: { style?: React.CSSProperties }) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    try {
      const zip = new JSZip()
      const base = import.meta.env.BASE_URL
      const slug = brand.meta.client.toLowerCase().replace(/\s+/g, '-')
      const root = `${slug}-logos`

      // Fetch all static SVG files
      const svgTexts: Record<string, string> = {}
      await Promise.all(LOGO_FILES.map(async (file) => {
        const resp = await fetch(`${base}images/logos/${file}`)
        if (!resp.ok) throw new Error(`Failed to fetch ${file}`)
        svgTexts[file] = await resp.text()
        zip.file(`${root}/svg/${file}`, svgTexts[file])
      }))

      // Rasterize static SVGs to high-res PNG (2048px wide)
      await Promise.all(LOGO_FILES.map(async (file) => {
        const text = svgTexts[file]
        const vbMatch = text.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
        const vbW = vbMatch ? parseFloat(vbMatch[1]) : 1000
        const vbH = vbMatch ? parseFloat(vbMatch[2]) : 1000
        const W = 2048
        const H = Math.round(W * vbH / vbW)
        const png = await svgToPng(text, W, H)
        zip.file(`${root}/png/${file.replace('.svg', '@2x.png')}`, png)
      }))

      // Avatar PNGs — compact logo on brand-color circle, 400×400
      for (const a of avatarBgs) {
        const svgStr = await buildAvatarSvg(a.bg, a.mark, a.wm, a.inner)
        const png = await svgToPng(svgStr, 1000, 1000)
        const name = `avatar-${a.label.toLowerCase().replace(/\s+/g, '-')}.png`
        zip.file(`${root}/avatars/${name}`, png)
      }

      // Favicon PNGs — mark at 64/48/32/16px, on-light and on-dark
      for (const v of faviconVariants) {
        for (const size of faviconSizes) {
          const svgStr = await buildFaviconSvg(v.bg, v.mark, v.inner, size)
          const png = await svgToPng(svgStr, size, size)
          zip.file(`${root}/favicons/favicon-${v.key}-${size}px.png`, png)
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(zipBlob)
      a.download = `${root}.zip`
      a.click()
      URL.revokeObjectURL(a.href)
    } catch (err) {
      console.error('Logo download failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="dl-btn"
      style={style}
    >
      {loading ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          Preparing&hellip;
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download logos
        </>
      )}
    </button>
  )
}
