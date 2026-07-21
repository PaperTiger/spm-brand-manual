import brand from '../../brand.config'

const df = brand.typography.displayFont

// ── Color math ────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return '#' + [r, g, b]
    .map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0'))
    .join('').toUpperCase()
}

function mixRgb(
  base: [number, number, number],
  target: [number, number, number],
  t: number,
): [number, number, number] {
  return [base[0] + (target[0] - base[0]) * t, base[1] + (target[1] - base[1]) * t, base[2] + (target[2] - base[2]) * t]
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255)
  const lin = (v: number) => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function stepTextColor(hex: string): string {
  return luminance(hex) > 0.179 ? '#000000' : '#ffffff'
}

// ── Scale generation ──────────────────────────────────────────────

const BLACK: [number, number, number] = [0, 0, 0]
const WHITE: [number, number, number] = [255, 255, 255]

// Each step: shade mixes base → black (t = how far toward black),
//            tint  mixes base → white (t = how far toward white).
// 400 is the base color itself.
const STEPS: { label: string; shade?: number; tint?: number }[] = [
  { label: '900', shade: 0.80 },
  { label: '800', shade: 0.64 },
  { label: '700', shade: 0.47 },
  { label: '600', shade: 0.29 },
  { label: '500', shade: 0.14 },
  { label: '400' },
  { label: '300', tint: 0.34 },
  { label: '200', tint: 0.58 },
  { label: '100', tint: 0.78 },
  { label: '050', tint: 0.90 },
]

function generateScale(hex: string) {
  const base = hexToRgb(hex)
  return STEPS.map(({ label, shade, tint }) => {
    const rgb =
      shade !== undefined ? mixRgb(base, BLACK, shade) :
      tint  !== undefined ? mixRgb(base, WHITE, tint)  : base
    const h = rgbToHex(rgb)
    return { label, hex: h, textColor: stepTextColor(h), isBase: label === '400' }
  })
}

function isNeutral(hex: string, name: string): boolean {
  const h = hex.replace('#', '').toLowerCase()
  return h === '000000' || h === 'ffffff' ||
    ['black', 'white'].includes(name.toLowerCase())
}

const colors = [...brand.colors.primary, ...brand.colors.secondary]
  .filter(c => !isNeutral(c.hex, c.name))

// ── Component ─────────────────────────────────────────────────────

export default function ColorPathways() {
  return (
    <div className="page">
      <div className="section-label">Color</div>
      <h2 className="section-title">Color pathways</h2>
      <p className="section-intro">
        Each brand color mapped across ten tonal steps: darker shades at 900, the base color at 400,
        and lighter tints at 050. Use these for backgrounds, hover states, surface depth, and
        accessible contrast in data visualisation.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {colors.map(color => {
          const scale = generateScale(color.hex)
          const slug = color.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          return (
            <div key={color.name}>
              <div style={{
                fontFamily: `'${df}', sans-serif`, fontWeight: 600, fontSize: 12,
                color: 'var(--charcoal)', marginBottom: 10,
                letterSpacing: '0.06em', textTransform: 'uppercase' as const,
              }}>
                {color.name}
              </div>
              <div style={{ display: 'flex', gap: 0 }}>
                {scale.map(({ label, hex, textColor, isBase }) => (
                  <div
                    key={label}
                    style={{
                      background: hex, flex: 1, minHeight: 100,
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      padding: '8px 6px 10px',
                      ...(isBase ? { outline: '2px solid rgba(0,0,0,0.18)', outlineOffset: '-2px' } : {}),
                    }}
                  >
                    <div style={{
                      fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 9,
                      color: textColor, lineHeight: 1.2, opacity: 0.7,
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontFamily: `var(--body-font, 'Inter'), sans-serif`, color: textColor,
                      fontSize: isBase ? 11 : 9, fontWeight: isBase ? 700 : 400,
                    }}>
                      {hex}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 0 }}>
                {scale.map(({ label }) => (
                  <div key={label} style={{
                    flex: 1, padding: '5px 6px',
                    fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 8.5,
                    color: 'rgba(0,0,0,0.32)', letterSpacing: '0.01em',
                    borderTop: '1px solid rgba(0,0,0,0.07)',
                    whiteSpace: 'nowrap' as const, overflow: 'hidden',
                  }}>
                    {slug}-{label}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
