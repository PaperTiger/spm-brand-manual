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

function svgToEps(svgText: string, filename: string): string {
  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml')
  const root = doc.documentElement
  const vb = (root.getAttribute('viewBox') ?? '0 0 100 100').split(/[\s,]+/).map(Number)
  const [, , vbW, vbH] = vb

  const n = (v: number) => v.toFixed(4)

  const PALETTE = [...brand.colors.primary, ...brand.colors.secondary]

  function fillToCmyk(fill: string | null): string | null {
    if (!fill || fill === 'none') return null
    const f = fill.trim().toLowerCase()
    let r: number, g: number, b: number
    if (f === 'white' || f === '#fff' || f === '#ffffff') { r = 1; g = 1; b = 1 }
    else if (f === 'black' || f === '#000' || f === '#000000') { r = 0; g = 0; b = 0 }
    else if (f.startsWith('#')) {
      const h = f.slice(1).length === 3 ? f.slice(1).split('').map(c => c + c).join('') : f.slice(1)
      r = parseInt(h.slice(0, 2), 16) / 255
      g = parseInt(h.slice(2, 4), 16) / 255
      b = parseInt(h.slice(4, 6), 16) / 255
    } else return null

    // Prefer the measured build. These EPS files go to a printer, so a colour
    // in the palette must use the same numbers the guidelines print rather than
    // a second, different approximation. Falls back to the naive formula only
    // for fills that are not palette colours (or before convert-cmyk has run).
    const hex = `#${[r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('')}`
    const measured = PALETTE.find(col => col.hex.toLowerCase() === hex.toLowerCase())?.cmyk
    if (measured) {
      const [mc, mm, my, mk] = measured.map(v => v / 100)
      return `${n(mc)} ${n(mm)} ${n(my)} ${n(mk)} setcmykcolor`
    }

    const k = 1 - Math.max(r, g, b)
    if (k >= 1 - 1e-8) return '0 0 0 1 setcmykcolor'
    const c = (1 - r - k) / (1 - k)
    const m = (1 - g - k) / (1 - k)
    const y2 = (1 - b - k) / (1 - k)
    return `${n(c)} ${n(m)} ${n(y2)} ${n(k)} setcmykcolor`
  }

  function pathToPs(d: string): string {
    const tokenRe = /([MmLlHhVvCcZz])|(-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)/g
    const tokens: string[] = []
    let match: RegExpExecArray | null
    while ((match = tokenRe.exec(d)) !== null) tokens.push(match[0])

    let ps = ''
    let i = 0
    let cx = 0, cy = 0

    while (i < tokens.length) {
      const cmd = tokens[i++]
      if (!/[A-Za-z]/.test(cmd)) continue
      const rel = cmd === cmd.toLowerCase() && cmd.toUpperCase() !== 'Z'
      const upper = cmd.toUpperCase()

      if (upper === 'M') {
        let first = true
        while (i < tokens.length && !/[A-Za-z]/.test(tokens[i])) {
          const dx = parseFloat(tokens[i++]), dy = parseFloat(tokens[i++])
          if (rel) { cx += dx; cy += dy } else { cx = dx; cy = dy }
          ps += `${n(cx)} ${n(cy)} ${first ? 'moveto' : 'lineto'}\n`
          first = false
        }
      } else if (upper === 'L') {
        while (i < tokens.length && !/[A-Za-z]/.test(tokens[i])) {
          const dx = parseFloat(tokens[i++]), dy = parseFloat(tokens[i++])
          if (rel) { cx += dx; cy += dy } else { cx = dx; cy = dy }
          ps += `${n(cx)} ${n(cy)} lineto\n`
        }
      } else if (upper === 'H') {
        while (i < tokens.length && !/[A-Za-z]/.test(tokens[i])) {
          const dx = parseFloat(tokens[i++])
          if (rel) cx += dx; else cx = dx
          ps += `${n(cx)} ${n(cy)} lineto\n`
        }
      } else if (upper === 'V') {
        while (i < tokens.length && !/[A-Za-z]/.test(tokens[i])) {
          const dy = parseFloat(tokens[i++])
          if (rel) cy += dy; else cy = dy
          ps += `${n(cx)} ${n(cy)} lineto\n`
        }
      } else if (upper === 'C') {
        while (i < tokens.length && !/[A-Za-z]/.test(tokens[i])) {
          const ox = cx, oy = cy
          let x1 = parseFloat(tokens[i++]), y1 = parseFloat(tokens[i++])
          let x2 = parseFloat(tokens[i++]), y2 = parseFloat(tokens[i++])
          let x = parseFloat(tokens[i++]), y = parseFloat(tokens[i++])
          if (rel) { x1 += ox; y1 += oy; x2 += ox; y2 += oy; x += ox; y += oy }
          cx = x; cy = y
          ps += `${n(x1)} ${n(y1)} ${n(x2)} ${n(y2)} ${n(x)} ${n(y)} curveto\n`
        }
      } else if (upper === 'Z') {
        ps += 'closepath\n'
      }
    }
    return ps
  }

  let body = ''
  for (const el of doc.querySelectorAll('circle, path, rect')) {
    const cmyk = fillToCmyk(el.getAttribute('fill'))
    if (!cmyk) continue
    if (el.tagName === 'circle') {
      const ecx = parseFloat(el.getAttribute('cx') ?? '0')
      const ecy = parseFloat(el.getAttribute('cy') ?? '0')
      const er = parseFloat(el.getAttribute('r') ?? '0')
      body += `${cmyk}\nnewpath\n${n(ecx)} ${n(ecy)} ${n(er)} 0 360 arc\nfill\n`
    } else if (el.tagName === 'path') {
      const d = el.getAttribute('d') ?? ''
      if (d) body += `${cmyk}\nnewpath\n${pathToPs(d)}fill\n`
    } else if (el.tagName === 'rect') {
      const rx = parseFloat(el.getAttribute('x') ?? '0')
      const ry = parseFloat(el.getAttribute('y') ?? '0')
      const rw = parseFloat(el.getAttribute('width') ?? '0')
      const rh = parseFloat(el.getAttribute('height') ?? '0')
      body += `${cmyk}\nnewpath\n${n(rx)} ${n(ry)} moveto ${n(rx + rw)} ${n(ry)} lineto ${n(rx + rw)} ${n(ry + rh)} lineto ${n(rx)} ${n(ry + rh)} lineto closepath\nfill\n`
    }
  }

  return `%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 0 0 ${Math.ceil(vbW)} ${Math.ceil(vbH)}
%%HiResBoundingBox: 0 0 ${vbW.toFixed(3)} ${vbH.toFixed(3)}
%%Creator: Brand guidelines export
%%Title: (${filename})
%%EndComments
%%BeginProlog
%%EndProlog
%%Page: 1 1
gsave
0 ${n(vbH)} translate
1 -1 scale
${body}grestore
%%EOF
`
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

      // CMYK EPS for each SVG
      LOGO_FILES.forEach(file => {
        zip.file(`${root}/eps/${file.replace('.svg', '.eps')}`, svgToEps(svgTexts[file], file))
      })

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
