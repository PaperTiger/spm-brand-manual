import brand from '../../brand.config'

const base = import.meta.env.BASE_URL

export default function AppIntro() {
  const client = brand.meta.client
  return (
    <div className="portrait-intro">
      <div style={{ display: 'flex', flexDirection: 'column', padding: 32, boxSizing: 'border-box' }}>
        <div className="section-label">Applications</div>
        <p style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 700,
          fontSize: 'clamp(24px,3.2vw,48px)', lineHeight: 0.9, letterSpacing: '-0.02em',
          color: 'var(--charcoal)', maxWidth: 720, margin: '16px 0 0' }}>
          Every surface. Every scale.
        </p>
        <div style={{ flex: 1 }} />
        <div style={{ maxWidth: 480 }}>
          <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 16, lineHeight: 1.4,
            color: 'var(--charcoal)', margin: 0 }}>
            The {client} brand is judged in its most everyday moments: a pitch deck slide,
            a reporting dashboard, a social ad, a conference booth. This section shows how the
            system holds up across collateral, digital media, and merchandise.
          </p>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={`${base}images/applications/social-philz-cornflower.webp`}
          alt={`${client} application example`}
          style={{ position: 'absolute', bottom: 0, right: 0, width: '88%', height: '90%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
