import brand from '../../brand.config'

const t = brand.tokens
const SERIF = `'Old Standard TT', Georgia, serif`
const SANS = `var(--display-font, 'Urbanist'), sans-serif`
const serifScale = brand.serifScale ?? []

export default function OldStandard() {
  return (
    <div>
      {/* Hero: the face shown in its own italic, on Salt as the stylesheet does */}
      <div
        className="logo-hero"
        style={{ background: t.salt, border: '1px solid #E5E2D6', minHeight: 260, flexDirection: 'column', gap: 8 }}
      >
        <div style={{ fontFamily: SANS, fontWeight: 550, fontSize: 'clamp(32px, 7vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1, color: t.fern }}>
          Senior-led.
        </div>
        <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(36px, 7.8vw, 80px)', letterSpacing: '-0.06em', lineHeight: 1, color: t.fern }}>
          Boutique fast.
        </div>
      </div>

      <div className="page">
        <div className="section-label">Typography</div>
        <h2 className="section-title">Old Standard TT</h2>
        <p className="section-intro">
          Old Standard TT is the brand's accent face, used in <strong>italic only</strong>. It carries
          the editorial, considered half of the SPM voice against Urbanist's geometric clarity.
          It is an accent, not a workhorse: it never sets long headlines or body copy.
        </p>

        <a
          href="https://fonts.google.com/specimen/Old+Standard+TT"
          target="_blank"
          rel="noopener"
          className="dl-btn"
          style={{ marginTop: 0, marginBottom: 48 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Download Old Standard TT
        </a>

        {/* How it is used */}
        <div className="content-block">
          <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 20px', color: 'var(--charcoal)' }}>
            The three approved uses
          </h3>

          {/* 1. Second line of a short headline */}
          <div style={{ background: t.salt, border: '1px solid #E5E2D6', padding: '40px 32px', marginBottom: 12 }}>
            <div style={{ fontFamily: SANS, fontWeight: 550, fontSize: 'clamp(26px, 4.4vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.05, color: t.fern }}>
              Senior-led.
            </div>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px, 4.8vw, 48px)', letterSpacing: '-0.06em', lineHeight: 1.05, color: t.fern }}>
              Boutique fast.
            </div>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 13, color: '#555', lineHeight: 1.4, margin: '0 0 36px' }}>
            <strong style={{ color: t.fern }}>1.</strong> Mix Old Standard and Urbanist on short headlines.
            Where the headline runs to more than one line, only the <strong>bottom</strong> line is set in Old Standard.
          </p>

          {/* 2. Small caption introducing a section */}
          <div style={{ background: t.salt, border: '1px solid #E5E2D6', padding: '40px 32px', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(14px, 1.8vw, 19px)', color: t.fern, whiteSpace: 'nowrap' }}>
                Who we are
              </span>
              <span style={{ flex: 1, height: 1, background: t.fern, opacity: 0.5, maxWidth: 90 }} />
            </div>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(20px, 3.4vw, 34px)', letterSpacing: '-0.02em', lineHeight: 1.15, color: t.fern, maxWidth: 460 }}>
              SPM is a strategy-led PR agency for consumer brands.
            </div>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 13, color: '#555', lineHeight: 1.4, margin: '0 0 36px' }}>
            <strong style={{ color: t.fern }}>2.</strong> Use a small Old Standard caption, with a rule, to introduce a section.
          </p>

          {/* 3. Pull quote.
              Tracking and leading here are measured off the approved testimonial
              artwork: -3.5% and 123%, not the -6% of the headline serif track.
              The quote sets looser than a headline because it runs at a smaller
              optical size. */}
          <div style={{ background: t.jam, padding: '40px 32px', marginBottom: 12 }}>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(18px, 2.6vw, 26px)', letterSpacing: '-0.035em', lineHeight: 1.23, color: t.cornflower, maxWidth: 460 }}>
              “Sixteen years and still counting! After all this time, it's still exhilarating to get a great media hit!”
            </div>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 13, color: '#555', lineHeight: 1.4, margin: 0 }}>
            <strong style={{ color: t.fern }}>3.</strong> Set client testimonials and pull quotes in Old Standard italic,
            at <strong>-3.5% letter-spacing</strong> and <strong>123% line-height</strong>. Quotes track looser than
            headlines: the headline serif track's -6% is too tight at quote sizes.
          </p>
        </div>

        {/* Scale */}
        {serifScale.length > 0 && (
          <div className="content-block">
            <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 6px', color: 'var(--charcoal)' }}>
              Size &amp; scale
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 14, color: '#555', lineHeight: 1.4, marginBottom: 24, maxWidth: 560 }}>
              Old Standard runs larger than its Urbanist counterpart at every level, so the two
              optically match when stacked. Tracking is tighter to compensate.
            </p>
            <div style={{ borderTop: '1px solid #E5E5E5' }}>
              {serifScale.map(s => {
                const sans = brand.typeScale.find(x => x.name === s.name)
                return (
                  <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '90px 210px 1fr', gap: 16, padding: '16px 0', borderBottom: '1px solid #E5E5E5', alignItems: 'center' }}>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: '#4D4D4D' }}>
                      {s.size}
                      {sans && <span style={{ display: 'block', color: '#6B6B6B' }}>sans {sans.size}</span>}
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: '#4D4D4D' }}>
                      {s.name} · Old Standard TT Italic · {s.ls}
                    </div>
                    <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: `clamp(14px, ${s.size}, ${s.size})`, letterSpacing: s.ls, lineHeight: 1, color: 'var(--charcoal)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Boutique fast.
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Character set */}
        <div className="content-block">
          <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: 'var(--charcoal)' }}>
            Character set
          </h3>
          <div style={{ background: t.salt, border: '1px solid #E5E2D6', padding: '32px 28px', containerType: 'inline-size' }}>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(16px, 5.4cqi, 38px)', lineHeight: 1.4, color: t.fern }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(16px, 5.4cqi, 38px)', lineHeight: 1.4, color: t.fern }}>abcdefghijklmnopqrstuvwxyz</div>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(13px, 4.4cqi, 30px)', lineHeight: 1.4, color: t.fern }}>1234567890 !@#$%&amp;*.,;:/?</div>
          </div>
        </div>
      </div>
    </div>
  )
}
