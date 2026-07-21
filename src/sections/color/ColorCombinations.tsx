import brand from '../../brand.config'

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function linearize(c: number) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

function contrast(hex1: string, hex2: string) {
  const l1 = luminance(hex1)
  const l2 = luminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker  = Math.min(l1, l2)
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 10) / 10
}

const allColors = [...brand.colors.primary, ...brand.colors.secondary]

function colorByName(name: string) {
  return allColors.find(c => c.name.toLowerCase() === name.toLowerCase())
}

const base = import.meta.env.BASE_URL

export default function ColorCombinations() {
  return (
    <>
      <div className="page" style={{ paddingBottom: 24 }}>
        <div className="section-label">Color</div>
        <h2 className="section-title">Combinations & accessibility</h2>
        <p className="section-intro" style={{ marginBottom: 0 }}>
          Approved color pairings with live WCAG contrast ratios.
          AA requires 4.5:1 for body text, AAA requires 7:1.
        </p>
      </div>

      <div className="combos-grid">
        {brand.colorPairings.map(p => {
          const bgToken = colorByName(p.bg)
          if (!bgToken) return null
          const bgHex = bgToken.hex
          const fgHex = luminance(bgHex) > 0.179 ? '#000000' : '#FFFFFF'
          const ratio = contrast(bgHex, fgHex)
          const aa  = ratio >= 4.5
          const aaa = ratio >= 7
          const level = aaa ? 'AAA' : aa ? 'AA' : 'FAIL'
          const outline = luminance(bgHex) > 0.7

          return (
            <div key={p.bg} style={{
              background: bgHex,
              padding: 'clamp(20px, 2.5vw, 40px)',
              display: 'flex', flexDirection: 'column',
              minHeight: 'clamp(180px, 20vw, 280px)',
              ...(outline ? { boxShadow: 'inset 0 0 0 1px #C8C8C8' } : {}),
            }}>
              <div style={{ flex: 1, paddingBottom: 'clamp(16px, 2vw, 28px)' }}>
                <img
                  src={`${base}images/logos/${p.logo}`}
                  alt={brand.meta.client}
                  style={{ width: '100%', maxWidth: 'clamp(140px, 16vw, 220px)', height: 'auto', display: 'block' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{
                  fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 10, fontWeight: 500,
                  color: fgHex, letterSpacing: '0.02em',
                }}>
                  {p.bg}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <span style={{
                    fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: bgHex, background: fgHex,
                    padding: '3px 7px', borderRadius: 2,
                    display: 'flex', alignItems: 'center', gap: 3,
                  }}>
                    {level !== 'FAIL' && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M1.5 4L3.2 5.8L6.5 2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {level}
                  </span>
                  <span style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 10, fontWeight: 500, color: fgHex }}>
                    {ratio}:1
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
