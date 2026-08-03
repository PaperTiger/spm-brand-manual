import brand from '../../brand.config'

export default function TypeScale() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Size & scale</h2>
      <p className="section-intro">
        The complete type scale: sizes, weights, letter-spacing, and line-height for every level.
      </p>
      <div style={{ borderTop: '1px solid #E5E5E5' }}>
        {brand.typeScale.map(s => (
          <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '80px 200px 1fr', gap: 16, padding: '16px 0', borderBottom: '1px solid #E5E5E5', alignItems: 'center' }}>
            <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, color: '#4D4D4D' }}>{s.size}</div>
            <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, color: '#4D4D4D' }}>{s.name} · {s.family} {s.weight}</div>
            {/* The specimen is capped against its own column rather than clipped.
                The old clamp(14px, 148px, 148px) was a no-op, so a 148px sample
                (~4.5x its font size wide) overflowed a 372px column and got cut
                off — visible on screen and baked into PDF captures. cqi keeps the
                true size wherever it fits and scales it down only when it can't. */}
            <div style={{ containerType: 'inline-size', minWidth: 0 }}>
              <div style={{ fontFamily: s.family + ', sans-serif', fontWeight: s.weight, fontSize: `min(${s.size}, 21cqi)`, letterSpacing: s.ls, color: 'var(--charcoal)', lineHeight: 1, whiteSpace: 'nowrap' }}>
                {brand.specimens.display96}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
