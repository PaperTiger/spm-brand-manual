import brand from '../../brand.config'

const { displayFont, systemFallbackFont } = brand.typography
const sf = systemFallbackFont

const rows = [
  {
    role: 'Display headline',
    weight: 'Bold',
    specs: '24–72 px · −4% tracking · 100% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${sf}', sans-serif`, fontWeight: 700, fontSize: 'clamp(28px,4vw,56px)', lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--charcoal)' }}>
        Design that works<br />as hard as the brand.
      </div>
    ),
  },
  {
    role: 'Body copy large',
    weight: 'Regular',
    specs: '18 px · 0% tracking · 140% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${sf}', sans-serif`, fontWeight: 400, fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.4, color: 'var(--charcoal)', maxWidth: 560 }}>
        {brand.specimens.body18}
      </div>
    ),
  },
  {
    role: 'Body copy',
    weight: 'Regular',
    specs: '16 px · 0% tracking · 140% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: `'${sf}', sans-serif`, fontWeight: 400, fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.4, color: 'var(--charcoal)', maxWidth: 560 }}>
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
        When {displayFont} is unavailable (system-generated documents, plain-text email environments,
        or contexts where font licensing cannot be guaranteed), <strong>{sf}</strong> is the
        designated system fallback. It is not a replacement for {displayFont} in branded communications.
      </p>
      <div style={{ background: '#F5F5F5', padding: '14px 18px', fontFamily: 'monospace', fontSize: 12, color: 'var(--charcoal)', marginBottom: 32 }}>
        font-family: '{displayFont}', {sf}, sans-serif;
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
