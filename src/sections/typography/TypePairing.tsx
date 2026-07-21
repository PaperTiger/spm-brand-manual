import type { ReactNode } from 'react'
import brand from '../../brand.config'

const t = brand.tokens
const SERIF = `'Old Standard TT', Georgia, serif`
const SANS = `var(--display-font, 'Urbanist'), sans-serif`

/* A cross drawn over the don't examples, matching the stylesheet's own
   treatment. Decorative only: the DO / DO NOT label carries the meaning. */
function Cross() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <line x1="0" y1="0" x2="100" y2="100" stroke={t.fern} strokeOpacity="0.25" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="0" x2="0" y2="100" stroke={t.fern} strokeOpacity="0.25" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function Example({ ok, caption, children }: { ok: boolean; caption: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div style={{ position: 'relative', background: t.salt, border: '1px solid #E5E2D6', padding: '36px 28px', minHeight: 210, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
        {!ok && <Cross />}
      </div>
      <p style={{ fontFamily: SANS, fontSize: 12.5, lineHeight: 1.4, color: '#555', margin: '10px 0 0' }}>
        <strong style={{ color: ok ? '#2E7D32' : '#C62828', fontWeight: 700 }}>{ok ? 'DO' : 'DO NOT'}</strong>{' '}
        {caption}
      </p>
    </div>
  )
}

const H = { fontFamily: SANS, fontWeight: 550, letterSpacing: '-0.03em', lineHeight: 1.1, color: t.fern }
const S = { fontFamily: SERIF, fontStyle: 'italic' as const, fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 1.1, color: t.fern }
const BODY = { fontFamily: SANS, fontWeight: 500, fontSize: 14, lineHeight: 1.4, color: t.fern, marginTop: 14 }

export default function TypePairing() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Pairing do's and don'ts</h2>
      <p className="section-intro">
        Urbanist carries the weight of the system. Old Standard TT is an accent that earns its
        place on short headlines, section captions, and quotes. These six rules govern how the
        two faces meet.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px 24px' }}>
        <Example ok caption="use Urbanist for long headlines and long body paragraphs.">
          <div style={{ ...H, fontSize: 'clamp(20px, 2.6vw, 26px)' }}>
            Life's too short to work with jerks. At SPM, we live by that.
          </div>
          <div style={BODY}>
            No jerks means you work with clients and brands you trust in an atmosphere of mutual
            respect among agency leadership, team members and clients.
          </div>
        </Example>

        <Example ok caption={<>mix Old Standard and Urbanist for short headlines. Where the text runs to more than one line, the bottom line should be in Old Standard.</>}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...H, fontSize: 'clamp(26px, 3.6vw, 38px)' }}>Senior-led.</div>
            <div style={{ ...S, fontSize: 'clamp(28px, 3.9vw, 42px)' }}>Boutique fast.</div>
          </div>
        </Example>

        <Example ok caption="use a small Old Standard caption to introduce a section.">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ ...S, fontSize: 15, letterSpacing: 0, whiteSpace: 'nowrap' }}>Who we are</span>
            <span style={{ flex: 1, height: 1, background: t.fern, opacity: 0.5, maxWidth: 70 }} />
          </div>
          <div style={{ ...H, fontWeight: 600, fontSize: 'clamp(19px, 2.5vw, 26px)', letterSpacing: '-0.02em' }}>
            SPM is a strategy-led PR agency for consumer brands.
          </div>
        </Example>

        <Example ok={false} caption="use Old Standard for long headlines and long body paragraphs.">
          <div style={{ ...S, fontSize: 'clamp(20px, 2.6vw, 26px)' }}>
            Life's too short to work with jerks. At SPM, we live by that.
          </div>
          <div style={{ ...BODY, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400 }}>
            No jerks means you work with clients and brands you trust in an atmosphere of mutual
            respect among agency leadership, team members and clients.
          </div>
        </Example>

        <Example ok={false} caption="use title case.">
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...H, fontWeight: 600, fontSize: 'clamp(24px, 3.3vw, 36px)' }}>Kind Words</div>
            <div style={{ ...H, fontWeight: 600, fontSize: 'clamp(24px, 3.3vw, 36px)' }}>From Our Team.</div>
          </div>
        </Example>

        <Example ok={false} caption="overly use Old Standard in a headline. Where the text runs to more than one line, only the bottom line should be in Old Standard.">
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...S, fontSize: 'clamp(26px, 3.6vw, 38px)' }}>Kind Words</div>
            <div style={{ ...H, fontWeight: 600, fontSize: 'clamp(24px, 3.3vw, 36px)' }}>
              From Our <span style={{ ...S, fontSize: '1.08em' }}>Team.</span>
            </div>
          </div>
        </Example>
      </div>

      {/* Rule summary */}
      <div className="content-block">
        <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: 'var(--charcoal)' }}>
          In short
        </h3>
        <ul style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.4, color: '#333', maxWidth: 620, paddingLeft: 20, margin: 0 }}>
          <li>Urbanist sets everything long: full headlines and all running body copy.</li>
          <li>Old Standard TT appears in italic only, and only ever on one line of a headline.</li>
          <li>When two lines mix the faces, the serif always sits on the bottom line.</li>
          <li>Sentence case everywhere. Never title case.</li>
        </ul>
      </div>
    </div>
  )
}
