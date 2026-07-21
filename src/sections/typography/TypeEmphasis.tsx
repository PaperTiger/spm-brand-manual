import brand from '../../brand.config'

const t = brand.tokens
const SANS = `var(--display-font, 'Urbanist'), sans-serif`
const SERIF = `'Old Standard TT', Georgia, serif`

// #6CA1F0 on a light ground. On a dark ground it flips to Cornflower, which
// is far brighter against Juniper, Fern or Jam than the deeper blue is.
const HL = t.highlight
const HL_DARK = t.cornflower

/** Small Old Standard caption with its rule, as the homepage sets it. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 14 }}>
      <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(13px, 1.5vw, 17px)', color: t.fern, whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <span style={{ height: 1, width: 'clamp(40px, 6vw, 78px)', background: t.fern, opacity: 0.55 }} />
    </div>
  )
}

/** The headline, with the highlight applied to key phrases only. */
function Statement({ size = 'clamp(22px, 3.4vw, 40px)', ground = t.salt }: { size?: string; ground?: string }) {
  const onDark = ground !== t.salt
  const ink = onDark ? t.salt : t.juniper
  const hl = onDark ? HL_DARK : HL
  return (
    <div style={{
      fontFamily: SANS, fontWeight: 600, fontSize: size, letterSpacing: '-0.02em',
      lineHeight: 1.15, color: ink, textAlign: 'center', maxWidth: 900, margin: '0 auto',
    }}>
      SPM is a strategy-led <span style={{ color: hl }}>PR agency</span> for{' '}
      <span style={{ color: hl }}>consumer brands</span> &ndash; where cultural intelligence and{' '}
      <span style={{ color: hl }}>AI visibility</span> drive business results.
    </div>
  )
}

export default function TypeEmphasis() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Emphasis &amp; highlight</h2>
      <p className="section-intro">
        A statement headline can lift two or three key phrases into the highlight blue. It is the brand's
        way of making a long sentence scannable: the highlighted phrases should read as a summary
        on their own. Use it on hero statements and section openers, never in body copy.
      </p>

      {/* The pattern */}
      <div style={{ background: t.salt, border: '1px solid #E5E2D6', padding: 'clamp(32px, 5vw, 56px) 28px', marginBottom: 12 }}>
        <Eyebrow>Who we are</Eyebrow>
        <Statement />
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
          <li><strong>Highlight.</strong> Two or three short phrases in <code style={{ fontFamily: 'monospace' }}>#6CA1F0</code> on a light ground, Cornflower on a dark one. Never a whole clause.</li>
        </ol>
      </div>

      {/* On a dark ground */}
      <div className="content-block">
        <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 20px', color: 'var(--charcoal)' }}>
          On a dark ground
        </h3>
        <div style={{ background: t.juniper, padding: 'clamp(32px, 5vw, 52px) 28px' }}>
          <Statement ground={t.juniper} size="clamp(20px, 2.8vw, 32px)" />
        </div>
        <p style={{ fontFamily: SANS, fontWeight: 500, fontSize: 12.5, lineHeight: 1.4, color: '#4D4D4D', margin: '10px 0 0' }}>
          On a dark ground the highlight switches to <strong>Cornflower</strong>: a Salt headline
          on Juniper, Fern, or Jam, with Cornflower carrying the key phrases. Cornflower is far
          brighter here than the deeper blue used on light grounds.
        </p>
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
          <li>Keep the highlight at display sizes. It is an accent, not a way to mark up a paragraph.</li>
        </ul>
      </div>

      {/* Caution */}
      <div className="content-block">
        <div style={{ background: t.salt, borderLeft: `3px solid var(--brand-accent)`, padding: '16px 20px', maxWidth: 620 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-accent)', marginBottom: 6 }}>
            Take care
          </div>
          <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 14, lineHeight: 1.4, color: 'var(--charcoal)' }}>
            The highlight blue is lighter than the Juniper it sits beside, so it carries less
            contrast against a Salt ground. Keep it to large display type where the shape of the
            word does the work, and check it in context before publishing. On a dark ground it is
            far stronger, and that is where this treatment reads best.
          </div>
        </div>
      </div>
    </div>
  )
}
