import { useState } from 'react'
import type { ColorToken } from '../../brand.config'

function hexToRgb(hex: string): [number,number,number] {
  const h = hex.replace('#','')
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]
}

function hexToCmyk(hex: string) {
  const [r,g,b] = hexToRgb(hex).map(v => v/255)
  const k = 1 - Math.max(r,g,b)
  if (k === 1) return [0,0,0,100]
  return [
    Math.round(((1-r-k)/(1-k))*100),
    Math.round(((1-g-k)/(1-k))*100),
    Math.round(((1-b-k)/(1-k))*100),
    Math.round(k*100),
  ]
}

function relLuminance(hex: string): number {
  const [r,g,b] = hexToRgb(hex)
  const lin = (c: number) => { const s=c/255; return s<=0.03928 ? s/12.92 : ((s+0.055)/1.055)**2.4 }
  return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b)
}

function ratio(a: string, b: string): number {
  const [x,y] = [relLuminance(a), relLuminance(b)]
  return (Math.max(x,y) + 0.05) / (Math.min(x,y) + 0.05)
}

// Juniper and Salt are the brand's two text values; the brand has no black or
// pure white. Choose by measured contrast rather than a luminance threshold,
// which would misjudge mid-tone swatches now that the dark value is Juniper.
function getBestTextColor(hex: string): string {
  return ratio(hex, '#283F1A') >= ratio(hex, '#FCFBF0') ? '#283F1A' : '#FCFBF0'
}

interface Props {
  color: ColorToken
}

export default function ColorSwatch({ color }: Props) {
  const [copied, setCopied] = useState(false)
  const [r,g,b] = hexToRgb(color.hex)
  const [c,m,y,k] = hexToCmyk(color.hex)
  const textColor = getBestTextColor(color.hex)
  const hexVal = color.hex.replace('#','').toUpperCase()
  const isLight = textColor === '#283F1A'
  const pillBg = isLight ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.15)'

  const copyHex = () => {
    navigator.clipboard.writeText(color.hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div style={{
      background: color.hex,
      padding: 'clamp(20px, 2.5vw, 40px) clamp(20px, 2.5vw, 40px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      minHeight: 'clamp(200px, 25vw, 380px)',
      ...(color.hex.toLowerCase() === '#ffffff' ? { boxShadow: 'inset 0 0 0 1px #C8C8C8' } : {}),
    }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: textColor, flexShrink: 0 }} />
          <span style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontSize: 16, fontWeight: 600, color: textColor, letterSpacing: '0.02em', lineHeight: 1 }}>{color.name}</span>
        </div>
        {color.note && (
          <div style={{
            fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 12, fontWeight: 500,
            lineHeight: 1.4, color: textColor, opacity: 0.85, marginTop: 10, paddingLeft: 18, maxWidth: 260,
          }}>
            {color.note}
          </div>
        )}
      </div>
      <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, color: textColor, display: 'grid', gridTemplateColumns: '14px 1fr', gap: '0 10px', lineHeight: 1.1, opacity: 0.92, fontWeight: 500 }}>
        <span>R</span><span>{r}</span>
        <span>G</span><span>{g}</span>
        <span>B</span><span>{b}</span>
        <div style={{ gridColumn: '1/-1', height: 7 }} />
        <span>C</span><span>{c}</span>
        <span>M</span><span>{m}</span>
        <span>Y</span><span>{y}</span>
        <span>K</span><span>{k}</span>
        <div style={{ gridColumn: '1/-1', height: 7 }} />
        <span style={{ opacity: 0.6 }}>#</span>
        <div>
          <button
            onClick={copyHex}
            style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, color: textColor, background: pillBg, border: 'none', cursor: 'pointer', padding: '2px 8px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 5, letterSpacing: '0.03em', fontWeight: 600 }}
            title="Copy hex"
          >
            {hexVal}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? '✓' : ''}
          </button>
        </div>
      </div>
    </div>
  )
}
