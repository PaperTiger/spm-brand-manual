import brand from '../../brand.config'

const allColors = [...brand.colors.primary, ...brand.colors.secondary]

export default function ColorIntro() {
  return (
    <div className="portrait-intro">
      <div style={{ display: 'flex', flexDirection: 'column', padding: 32, boxSizing: 'border-box' }}>
        <div className="section-label">Color</div>
        <p style={{
          fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500,
          fontSize: 'clamp(24px,3.2vw,48px)', lineHeight: 1.0, letterSpacing: '-0.02em',
          color: 'var(--charcoal)', maxWidth: 720, margin: '16px 0 0',
        }}>
          Color with purpose.
        </p>
        <div style={{ flex: 1 }} />
        <div style={{ maxWidth: 480 }}>
          <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 16, lineHeight: 1.4,
            color: 'var(--charcoal)', margin: 0 }}>
            The {brand.meta.client} color system leads with a confident primary palette,
            expressive and forward-thinking. Secondary colors provide range for accent
            moments without diluting the core brand presence.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {allColors.map(c => (
          <div key={c.hex} style={{
            flex: 1,
            background: c.hex,
            display: 'flex', alignItems: 'flex-end',
            padding: '14px 24px',
            boxSizing: 'border-box',
            ...(c.outline ? { boxShadow: 'inset 0 0 0 1px #DADADA' } : {}),
          }}>
            <span style={{
              fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: c.textColor,
            }}>
              {c.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
