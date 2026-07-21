import brand from '../../brand.config'

const { displayFont, systemFallbackFont } = brand.typography
const sf = systemFallbackFont
const serifFallback = brand.typography.systemSerifFallback ?? 'Times New Roman'
const SERIF_FB = `'${serifFallback}', Times, serif`

const rows = [
  {
    role: 'Display headline',
    weight: 'Bold',
    specs: '24–72 px · −3% tracking · 100% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${sf}', sans-serif`, fontWeight: 700, fontSize: 'clamp(28px,4vw,56px)', lineHeight: 0.95, letterSpacing: '-0.03em', color: 'var(--charcoal)' }}>
        Design that works<br />as hard as the brand.
      </div>
    ),
  },
  {
    role: 'Body copy large',
    weight: 'Regular',
    specs: '18 px · 0% tracking · 140% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${sf}', sans-serif`, fontWeight: 500, fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.4, color: 'var(--charcoal)', maxWidth: 560 }}>
        {brand.specimens.body18}
      </div>
    ),
  },
  {
    role: 'Body copy',
    weight: 'Regular',
    specs: '16 px · 0% tracking · 140% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${sf}', sans-serif`, fontWeight: 500, fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.4, color: 'var(--charcoal)', maxWidth: 560 }}>
        {brand.specimens.fallbackSystem16}
      </div>
    ),
  },
]

export default function SystemFallback() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">System fallback font</h2>
      <p className="section-intro">
        The last tier: use these when neither the brand fonts nor the Microsoft Office fonts are
        available. <strong>{sf}</strong> stands in for {displayFont}, and{' '}
        <strong>{serifFallback} Italic</strong> stands in for Old Standard TT. Both are
        pre-installed on effectively every machine.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2, marginBottom: 40 }}>
        <div style={{ background: 'var(--salt, #FCFBF0)', border: '1px solid #E5E2D6', padding: '28px 24px' }}>
          <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--brand-accent)', marginBottom: 14 }}>
            Sans &middot; replaces {displayFont}
          </div>
          <div style={{ fontFamily: `'${sf}', sans-serif`, fontWeight: 700, fontSize: 'clamp(28px,3.6vw,44px)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--charcoal)' }}>
            Senior-led.
          </div>
          <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 12, color: '#4D4D4D', marginTop: 14 }}>
            {sf} Bold
          </div>
        </div>
        <div style={{ background: 'var(--salt, #FCFBF0)', border: '1px solid #E5E2D6', padding: '28px 24px' }}>
          <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--brand-accent)', marginBottom: 14 }}>
            Serif &middot; replaces Old Standard TT
          </div>
          <div style={{ fontFamily: SERIF_FB, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(30px,3.9vw,48px)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--charcoal)' }}>
            Boutique fast.
          </div>
          <div style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 12, color: '#4D4D4D', marginTop: 14 }}>
            {serifFallback} Italic
          </div>
        </div>
      </div>

      <div style={{ background: '#F5F5F5', padding: '14px 18px', fontFamily: 'monospace', fontSize: 12, color: 'var(--charcoal)', marginBottom: 12 }}>
        font-family: '{displayFont}', '{sf}', sans-serif;
      </div>
      <div style={{ background: '#F5F5F5', padding: '14px 18px', fontFamily: 'monospace', fontSize: 12, color: 'var(--charcoal)', marginBottom: 32 }}>
        font-family: 'Old Standard TT', '{serifFallback}', serif;
      </div>

      {rows.map(row => (
        <div key={row.role} style={{ borderTop: '1px solid #E5E5E5', paddingTop: 28, paddingBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ fontFamily: `'${sf}', sans-serif`, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--charcoal)' }}>
              {row.role}
            </div>
            <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 12, color: '#4D4D4D', letterSpacing: '0.01em' }}>
              {sf} · {row.weight} · {row.specs}
            </div>
          </div>
          {row.ex}
        </div>
      ))}
    </div>
  )
}
