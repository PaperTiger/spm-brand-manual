import brand from '../../brand.config'

const t = brand.tokens
const SANS = `var(--display-font, 'Urbanist'), sans-serif`
const SERIF = `'Old Standard TT', Georgia, serif`

const HL = t.highlight              // #576784 — clears AA
const HL_DRAWN = t['highlight-as-drawn']  // #6CA0F0 — as comped, fails AA

/** Small Old Standard caption with its rule, as the homepage sets it. */
function Eyebrow({ children, color = t.fern }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 14 }}>
      <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(13px, 1.5vw, 17px)', color, whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <span style={{ height: 1, width: 'clamp(40px, 6vw, 78px)', background: color, opacity: 0.55 }} />
    </div>
  )
}

/** The headline, with the emphasis colour applied to key phrases only. */
function Statement({ hl, size = 'clamp(22px, 3.4vw, 40px)' }: { hl: string; size?: string }) {
  return (
    <div style={{
      fontFamily: SANS, fontWeight: 600, fontSize: size, letterSpacing: '-0.02em',
      lineHeight: 1.15, color: t.juniper, textAlign: 'center', maxWidth: 900, margin: '0 auto',
    }}>
      SPM is a strategy-led <span style={{ color: hl }}>PR agency</span> for{' '}
      <span style={{ color: hl }}>consumer brands</span> &ndash; where cultural intelligence and{' '}
      <span style={{ color: hl }}>AI visibility</span> drive business results.
    </div>
  )
}

function Ratio({ label, hex, ratio, verdict }: { label: string; hex: string; ratio: string; verdict: 'pass' | 'large' | 'fail' }) {
  const color = verdict === 'pass' ? '#2E7D32' : verdict === 'large' ? '#8F5600' : '#C62828'
  const text = verdict === 'pass' ? 'Passes AA' : verdict === 'large' ? 'Large text only' : 'Fails AA'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #E5E2D6' }}>
      <span style={{ width: 26, height: 26, background: hex, borderRadius: 3, flexShrink: 0, border: '1px solid rgba(40,63,26,0.15)' }} />
      <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 13, color: 'var(--charcoal)', minWidth: 150 }}>{label}</span>
      <code style={{ fontFamily: 'monospace', fontSize: 12, color: '#4D4D4D', minWidth: 78 }}>{hex}</code>
      <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 13, color: '#4D4D4D', minWidth: 62 }}>{ratio}</span>
      <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11, letterSpacing: '0.05em', color, textTransform: 'uppercase' }}>{text}</span>
    </div>
  )
}

export default function TypeEmphasis() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Emphasis &amp; highlight</h2>
      <p className="section-intro">
        A statement headline can lift two or three key phrases into a second colour. It is the
        brand's way of making a long sentence scannable: the highlighted phrases should read as
        a summary on their own. Use it on hero statements and section openers, never in body copy.
      </p>

      {/* The pattern */}
      <div style={{ background: t.salt, border: '1px solid #E5E2D6', padding: 'clamp(32px, 5vw, 56px) 28px', marginBottom: 12 }}>
        <Eyebrow>Who we are</Eyebrow>
        <Statement hl={HL} />
      </div>
      <p style={{ fontFamily: SANS, fontWeight: 500, fontSize: 12.5, lineHeight: 1.4, color: '#4D4D4D', margin: '0 0 48px' }}>
        The full treatment: an Old Standard italic caption with a rule, then an Urbanist headline
        in Juniper with the key phrases in the highlight blue.
      </p>

      {/* Anatomy */}
      <div className="content-block">
        <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: 'var(--charcoal)' }}>
          Anatomy
        </h3>
        <ol style={{ fontFamily: SANS, fontWeight: 500, fontSize: 15, lineHeight: 1.4, color: '#333', maxWidth: 620, paddingLeft: 20, margin: 0 }}>
          <li><strong>Caption.</strong> Two or three words in Old Standard TT italic, followed by a hairline rule.</li>
          <li><strong>Headline.</strong> Urbanist 600 in Juniper, sentence case, centred.</li>
          <li><strong>Highlight.</strong> Two or three short phrases in the emphasis blue. Never a whole clause.</li>
        </ol>
      </div>

      {/* Contrast */}
      <div className="content-block">
        <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 8px', color: 'var(--charcoal)' }}>
          Which blue to use
        </h3>
        <p style={{ fontFamily: SANS, fontWeight: 500, fontSize: 14, lineHeight: 1.4, color: '#4D4D4D', marginBottom: 20, maxWidth: 620 }}>
          Measured against the Salt ground this treatment sits on. Cornflower itself is a
          background colour: as text it reads at 1.72:1, far below any threshold.
        </p>
        <div style={{ maxWidth: 620, borderTop: '1px solid #E5E2D6' }}>
          <Ratio label="Highlight (specified)" hex="#576784" ratio="5.49:1" verdict="pass" />
          <Ratio label="Cornflower 600" hex="#748AB2" ratio="3.35:1" verdict="large" />
          <Ratio label="As comped" hex="#6CA0F0" ratio="2.55:1" verdict="fail" />
          <Ratio label="Cornflower 400" hex="#A4C3FA" ratio="1.72:1" verdict="fail" />
        </div>

        <div style={{ background: t.salt, borderLeft: `3px solid #C62828`, padding: '16px 20px', marginTop: 24, maxWidth: 620 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C62828', marginBottom: 6 }}>
            Note on the comp
          </div>
          <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 14, lineHeight: 1.4, color: 'var(--charcoal)' }}>
            The homepage comp draws this highlight in <code style={{ fontFamily: 'monospace' }}>#6CA0F0</code>, which
            measures 2.55:1 on Salt and does not reach the 3:1 minimum even at display sizes. The
            specified <code style={{ fontFamily: 'monospace' }}>#576784</code> keeps the same role a step
            further down the Cornflower pathway and clears AA for body copy as well as headlines.
          </div>
        </div>
      </div>

      {/* Side by side */}
      <div className="content-block">
        <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 20px', color: 'var(--charcoal)' }}>
          Specified against comped
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <figure style={{ margin: 0 }}>
            <div style={{ background: t.salt, border: '1px solid #E5E2D6', padding: '32px 24px' }}>
              <Statement hl={HL} size="clamp(18px, 2.2vw, 26px)" />
            </div>
            <figcaption style={{ fontFamily: SANS, fontWeight: 500, fontSize: 12.5, lineHeight: 1.4, color: '#4D4D4D', marginTop: 10 }}>
              <strong style={{ color: '#2E7D32', fontWeight: 700 }}>USE</strong> #576784. Holds up at every size.
            </figcaption>
          </figure>
          <figure style={{ margin: 0 }}>
            <div style={{ background: t.salt, border: '1px solid #E5E2D6', padding: '32px 24px' }}>
              <Statement hl={HL_DRAWN} size="clamp(18px, 2.2vw, 26px)" />
            </div>
            <figcaption style={{ fontFamily: SANS, fontWeight: 500, fontSize: 12.5, lineHeight: 1.4, color: '#4D4D4D', marginTop: 10 }}>
              <strong style={{ color: '#C62828', fontWeight: 700 }}>AVOID</strong> #6CA0F0 as comped. The highlighted
              phrases drop away from the sentence at 2.55:1.
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Rules */}
      <div className="content-block">
        <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: 'var(--charcoal)' }}>
          In short
        </h3>
        <ul style={{ fontFamily: SANS, fontWeight: 500, fontSize: 15, lineHeight: 1.4, color: '#333', maxWidth: 620, paddingLeft: 20, margin: 0 }}>
          <li>Two or three highlighted phrases per headline. More and the emphasis stops meaning anything.</li>
          <li>Highlight noun phrases, not verbs or connectives. The highlights should read as a summary.</li>
          <li>Headlines and statements only. Never highlight inside body copy.</li>
          <li>On a dark ground (Fern, Jam, Juniper), reverse it: Salt headline with Cornflower highlights.</li>
        </ul>
      </div>
    </div>
  )
}
