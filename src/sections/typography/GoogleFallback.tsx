import brand from '../../brand.config'

const { displayFont, googleFallbackFont } = brand.typography
const gf = googleFallbackFont
const serifFallback = brand.typography.officeSerifFallback ?? 'Baskerville'
const SERIF_FB = `'${serifFallback}', Georgia, serif`

const rows = [
  {
    role: 'Display headline',
    weight: 'Bold',
    specs: '24–72 px · −1% tracking · 100% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${gf}', sans-serif`, fontWeight: 700, fontSize: 'clamp(28px,4vw,56px)', lineHeight: 0.95, letterSpacing: '-0.01em', color: 'var(--charcoal)' }}>
        Design that works<br />as hard as the brand.
      </div>
    ),
  },
  {
    role: 'Small headline',
    weight: 'SemiBold',
    specs: '18–28 px · −1% tracking · 100% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${gf}', sans-serif`, fontWeight: 600, fontSize: 'clamp(18px,2.5vw,28px)', lineHeight: 1, letterSpacing: '-0.01em', color: 'var(--charcoal)' }}>
        Concise subtitle for additional context
      </div>
    ),
  },
  {
    role: 'Eyebrow / label',
    weight: 'Medium',
    specs: '10–12 px · +8% tracking · 100% leading · UPPERCASE',
    ex: (
      <div style={{ fontFamily: `'${gf}', sans-serif`, fontWeight: 500, fontSize: 12, lineHeight: 1, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--charcoal)' }}>
        Section label / eyebrow text
      </div>
    ),
  },
  {
    role: 'Body copy large',
    weight: 'Regular',
    specs: '18 px · 0% tracking · 140% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${gf}', sans-serif`, fontWeight: 500, fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.4, color: 'var(--charcoal)', maxWidth: 560 }}>
        {brand.specimens.body18}
      </div>
    ),
  },
  {
    role: 'Body copy',
    weight: 'Regular',
    specs: '16 px · 0% tracking · 140% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${gf}', sans-serif`, fontWeight: 500, fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.4, color: 'var(--charcoal)', maxWidth: 560 }}>
        {brand.specimens.fallbackGoogle16}
      </div>
    ),
  },
]

export default function GoogleFallback() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Microsoft Office fallback</h2>
      <p className="section-intro">
        Use this pair when the brand fonts are not available: in Word, PowerPoint, Excel, and Outlook.
        <strong> {gf}</strong> stands in for {displayFont}, and <strong>{serifFallback} Italic</strong> stands
        in for Old Standard TT. Both ship with Microsoft Office. This is a substitution, not a replacement:
        branded communications should still use {displayFont} and Old Standard TT wherever they can load.
      </p>

      {/* The two substitutions, side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2, marginBottom: 40 }}>
        <div style={{ background: 'var(--salt, #FCFBF0)', border: '1px solid #E5E2D6', padding: '28px 24px' }}>
          <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--brand-accent)', marginBottom: 14 }}>
            Sans &middot; replaces {displayFont}
          </div>
          <div style={{ fontFamily: `'${gf}', 'Century Gothic', 'Avenir Next', sans-serif`, fontWeight: 500, fontSize: 'clamp(28px,3.6vw,44px)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--charcoal)' }}>
            Senior-led.
          </div>
          <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 12, color: '#4D4D4D', marginTop: 14 }}>
            {gf} Medium
          </div>
        </div>
        <div style={{ background: 'var(--salt, #FCFBF0)', border: '1px solid #E5E2D6', padding: '28px 24px' }}>
          <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--brand-accent)', marginBottom: 14 }}>
            Serif &middot; replaces Old Standard TT
          </div>
          <div style={{ fontFamily: SERIF_FB, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(30px,3.9vw,48px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'var(--charcoal)' }}>
            Boutique fast.
          </div>
          <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 12, color: '#4D4D4D', marginTop: 14 }}>
            {serifFallback} Italic
          </div>
        </div>
      </div>

      {/* Embedding note, straight from the stylesheet */}
      <div style={{ background: 'var(--salt, #FCFBF0)', borderLeft: `3px solid var(--brand-accent)`, padding: '16px 20px', marginBottom: 48, maxWidth: 620 }}>
        <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--brand-accent)', marginBottom: 6 }}>
          Distributing Office files
        </div>
        <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 14, lineHeight: 1.4, color: 'var(--charcoal)' }}>
          To keep the real brand fonts in Office documents, download and install {displayFont} and
          Old Standard TT from Google Fonts, then embed the fonts into the document before
          distributing it. Fall back to {gf} and {serifFallback} only when embedding is not possible.
        </div>
      </div>

      {rows.map(row => (
        <div key={row.role} style={{ borderTop: '1px solid #E5E5E5', paddingTop: 28, paddingBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ fontFamily: `'${gf}', sans-serif`, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--charcoal)' }}>
              {row.role}
            </div>
            <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 12, color: '#4D4D4D', letterSpacing: '0.01em' }}>
              {gf} · {row.weight} · {row.specs}
            </div>
          </div>
          {row.ex}
        </div>
      ))}
    </div>
  )
}
