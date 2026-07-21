import brand from '../../brand.config'

const df = brand.typography.displayFont
const bf = brand.typography.bodyFont

export default function TypeIntro() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Introduction</h2>
      <p className="section-intro">
        {brand.meta.client} uses two typefaces: {df} for display and headlines,
        {bf} for body copy and UI text. Together they cover every scale from large
        campaign headlines to small data labels.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 48 }}>
        <div style={{ background: 'var(--charcoal)', padding: '40px 36px' }}>
          <div style={{ fontFamily: `${df}, sans-serif`, fontWeight: 300, fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '-0.04em', color: '#fff', lineHeight: 0.9, marginBottom: 24 }}>Aa</div>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 11, color: '#4D4D4D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Display & Headlines</div>
          <div style={{ fontFamily: `${df}, sans-serif`, fontSize: 20, fontWeight: 600, color: '#fff' }}>{df}</div>
        </div>
        <div style={{ background: '#F8F8F8', padding: '40px 36px' }}>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontWeight: 400, fontSize: 'clamp(40px,6vw,72px)', color: 'var(--charcoal)', lineHeight: 0.9, marginBottom: 24 }}>Aa</div>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 11, color: '#4D4D4D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Body & UI</div>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 20, fontWeight: 600, color: 'var(--charcoal)' }}>{bf}</div>
        </div>
      </div>
      <p style={{ fontFamily: `${bf}, sans-serif`, fontSize: 15, lineHeight: 1.7, color: '#333', maxWidth: 560 }}>
        Never substitute another typeface without approval. The pairing is carefully
        chosen for on-screen legibility, brand consistency, and technical availability
        across all platforms.
      </p>
    </div>
  )
}
