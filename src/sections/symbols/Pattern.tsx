import brand from '../../brand.config'

const base = import.meta.env.BASE_URL
const SANS = `var(--body-font, 'Urbanist'), sans-serif`
const DO_COLOR = '#2E7D32'

interface Example {
  src: string
  caption: string
  /** Intrinsic aspect ratio. Drives flex-grow so a row shares one height
   *  and each item takes width in proportion, as the stylesheet sets it. */
  ar: number
  alt?: string
}

// Layout and captions follow the stylesheet's pattern page: two justified
// rows, each item sized by its own aspect ratio.
const ROW_ONE: Example[] = [
  {
    src: 'logo-shape-noise-gradient.webp', ar: 1.283,
    caption: 'use the logo shape with a noise gradient.',
    alt: 'The comma mark rendered as a soft noise gradient on Salt',
  },
  {
    src: 'symbol-pattern-cornflower.webp', ar: 0.717,
    caption: 'use the symbols to create a pattern within the approved colour combinations.',
    alt: 'Fern symbols tiled across a Cornflower ground',
  },
  {
    src: 'gradient-salt-cornflower.webp', ar: 0.995,
    caption: 'use gradients on Salt and Cornflower to create variation.',
    alt: 'A soft gradient blending Salt into Cornflower',
  },
]

const ROW_TWO: Example[] = [
  {
    src: 'headline-mixed-serif.webp', ar: 1.0,
    caption: 'use line-work to divide two lines of headline text, top being sans serif, bottom being serif.',
    alt: '"What our clients have to say." with a rule dividing the sans and serif lines',
  },
  {
    src: 'testimonial-card-jam.webp', ar: 2.043,
    caption: 'use the blue gradient to add textured layers to a flat background.',
    alt: 'A Jam testimonial card lifted off the page by a soft blue gradient',
  },
]

// The repeat works in any approved pairing. Order matches the stylesheet.
const COLOURWAYS = [
  { src: 'pattern-fern-on-honeydew.webp',    label: 'Fern on Honeydew' },
  { src: 'pattern-fern-on-cornflower.webp',  label: 'Fern on Cornflower' },
  { src: 'pattern-honeydew-on-fern.webp',    label: 'Honeydew on Fern' },
  { src: 'pattern-cornflower-on-jam.webp',   label: 'Cornflower on Jam' },
  { src: 'pattern-fern-on-silk.webp',        label: 'Fern on Silk' },
  { src: 'pattern-salt-on-cornflower.webp',  label: 'Salt on Cornflower' },
]

function Row({ items }: { items: Example[] }) {
  return (
    <div className="just-row">
      {items.map(e => (
        <figure key={e.src} style={{ flexGrow: e.ar, flexBasis: 0 }}>
          <div className="frame">
            <img src={`${base}images/pattern/${e.src}`} alt={e.alt ?? e.caption} loading="lazy" />
          </div>
          <figcaption style={{ fontFamily: SANS, fontWeight: 500, fontSize: 12.5, lineHeight: 1.4, color: '#4D4D4D', margin: '10px 0 0' }}>
            <strong style={{ color: DO_COLOR, fontWeight: 700 }}>DO</strong> {e.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function Pattern() {
  const available = new Set(brand.images.pattern ?? [])
  const ways = COLOURWAYS.filter(c => available.has(c.src))
  const has = (items: Example[]) => items.filter(e => available.has(e.src))

  return (
    <div className="page">
      <div className="section-label">Symbols &amp; patterns</div>
      <h2 className="section-title">Pattern &amp; gradients</h2>
      <p className="section-intro">
        Pattern is how the brand fills space without adding noise. It comes from three places:
        the symbols tiled into a repeat, the logo shape softened with a noise gradient, and
        gradients built on Salt and Cornflower. Each one sits inside the approved colour
        pairings, so a pattern never introduces a combination the palette does not already allow.
      </p>

      <div style={{ marginBottom: 40, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <a href={`${base}images/pattern/gradients.zip`} download="spm-gradients.zip" className="dl-btn" style={{ marginRight: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download gradients
        </a>
        <a href={`${base}images/symbols/gradient-symbol.zip`} download="spm-gradient-symbols.zip" className="dl-btn-outline" style={{ marginRight: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download gradient symbols
        </a>
      </div>

      <Row items={has(ROW_ONE)} />
      <Row items={has(ROW_TWO)} />

      {/* Colourways: one caption over the whole set, as the stylesheet has it */}
      {ways.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
            {ways.map(c => (
              <figure key={c.src} style={{ margin: 0, minWidth: 0 }}>
                <img
                  src={`${base}images/pattern/${c.src}`}
                  alt={`Symbol repeat, ${c.label}`}
                  loading="lazy"
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
                <figcaption style={{ fontFamily: SANS, fontWeight: 500, fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#4D4D4D', margin: '8px 0 22px' }}>
                  {c.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <p style={{ fontFamily: SANS, fontWeight: 500, fontSize: 12.5, lineHeight: 1.4, color: '#4D4D4D', margin: '16px 0 0' }}>
            <strong style={{ color: DO_COLOR, fontWeight: 700 }}>DO</strong> use the symbols to create
            fun patterns using the approved colour combinations.
          </p>
        </div>
      )}

      <div className="content-block">
        <h3 style={{ fontFamily: `var(--display-font, 'Urbanist'), sans-serif`, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: 'var(--charcoal)' }}>
          In short
        </h3>
        <ul style={{ fontFamily: SANS, fontWeight: 500, fontSize: 15, lineHeight: 1.4, color: '#333', maxWidth: 620, paddingLeft: 20, margin: 0 }}>
          <li>Patterns use the approved colour pairings only: one symbol colour on one ground.</li>
          <li>Gradients are built on Salt and Cornflower, never on Fern, Jam, or Juniper.</li>
          <li>Pattern sits behind content. It never competes with the headline or the logo.</li>
        </ul>
      </div>
    </div>
  )
}
