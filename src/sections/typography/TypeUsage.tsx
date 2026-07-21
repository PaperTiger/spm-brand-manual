import brand from '../../brand.config'

const sc = brand.typeScale

// Each usage role references the type scale entry that defines its weight + letter-spacing
const displayEntry  = sc.find(s => s.name === 'Display L')!
const headlineEntry = sc.find(s => s.name === 'Headline XL')!
const bodyXLEntry   = sc.find(s => s.name === 'Body XL')!
const bodyLEntry    = sc.find(s => s.name === 'Body L')!

const rows = [
  {
    role: 'Display headline',
    face: displayEntry.family, weight: 'Bold',
    specs: `48 – 96 px · ${displayEntry.ls} tracking · 90% leading · Sentence case`,
    ex: (
      <div style={{ fontFamily: `${displayEntry.family}, sans-serif`, fontWeight: displayEntry.weight, fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.9, letterSpacing: displayEntry.ls, color: 'var(--charcoal)' }}>
        Prominent headline<br/>to describe a message.
      </div>
    ),
  },
  {
    role: 'Small headline',
    face: headlineEntry.family, weight: 'SemiBold',
    specs: `21 – 42 px · ${headlineEntry.ls} tracking · 100% leading · Sentence case`,
    ex: (
      <div style={{ fontFamily: `${headlineEntry.family}, sans-serif`, fontWeight: headlineEntry.weight, fontSize: 'clamp(20px, 3.5vw, 40px)', lineHeight: 1, letterSpacing: headlineEntry.ls, color: 'var(--charcoal)' }}>
        Concise subtitle to offer<br/>additional insight.
      </div>
    ),
  },
  {
    role: 'Eyebrow / label',
    face: 'DM Sans', weight: 'SemiBold',
    specs: '10 – 12 px · +8% tracking · 100% leading · UPPERCASE',
    ex: (
      <div style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 600, fontSize: 13, lineHeight: 1, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--charcoal)' }}>
        Section label / eyebrow text
      </div>
    ),
  },
  {
    role: 'Body copy large',
    face: bodyXLEntry.family, weight: 'Regular',
    specs: `18 px · ${bodyXLEntry.ls} tracking · 120% leading · Sentence case`,
    ex: (
      <div style={{ fontFamily: `${bodyXLEntry.family}, sans-serif`, fontWeight: bodyXLEntry.weight, fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.4, letterSpacing: bodyXLEntry.ls, color: 'var(--charcoal)', maxWidth: 560 }}>
        {brand.specimens.body18}
      </div>
    ),
  },
  {
    role: 'Body copy',
    face: bodyLEntry.family, weight: 'Regular',
    specs: `16 px · ${bodyLEntry.ls} tracking · 140% leading · Sentence case`,
    ex: (
      <div style={{ fontFamily: `${bodyLEntry.family}, sans-serif`, fontWeight: bodyLEntry.weight, fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.4, letterSpacing: bodyLEntry.ls, color: 'var(--charcoal)', maxWidth: 560 }}>
        {brand.specimens.body16}
      </div>
    ),
  },
]

export default function TypeUsage() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Typographic usage</h2>
      <p className="section-intro" style={{ maxWidth: 640 }}>
        <strong>Four levels, no exceptions.</strong> Display headlines, section headlines, eyebrow labels,
        and body copy, each mapped to a specific typeface, weight, size range, tracking, and leading.
        Mixing roles or sizes outside this system undermines hierarchy.
      </p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
        <a href="https://fonts.google.com/specimen/DM+Sans" target="_blank" rel="noopener" className="dl-btn" style={{ marginTop: 0, marginBottom: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Download DM Sans
        </a>
        <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener" className="dl-btn-outline" style={{ marginTop: 0, marginBottom: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Download Inter
        </a>
      </div>

      {rows.map((row) => (
        <div key={row.role} style={{ borderTop: '1px solid #E5E5E5', paddingTop: 28, paddingBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--charcoal)' }}>
              {row.role}
            </div>
            <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 12, color: '#283F1A', letterSpacing: '0.01em' }}>
              {row.face} · {row.weight} · {row.specs}
            </div>
          </div>
          {row.ex}
        </div>
      ))}
    </div>
  )
}
