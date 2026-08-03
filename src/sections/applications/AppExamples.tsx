import type { CSSProperties } from 'react'
import brand from '../../brand.config'

const base = import.meta.env.BASE_URL
const SANS = `var(--body-font, 'Urbanist'), sans-serif`

interface Example {
  src: string
  /** Caption text, excluding the leading DO / DO NOT label. */
  caption: string
  /** false renders a DO NOT example. Defaults to true. */
  ok?: boolean
  /** 12-column span at wide and mid widths. Collapses to 12 on mobile. */
  lg: number
  md: number
  alt?: string
}

// Layout and captions follow the stylesheet's applied-branding page.
const EXAMPLES: Example[] = [
  {
    src: 'banner-symbol-masks.webp', lg: 12, md: 12,
    caption: 'use the symbols as masks for photography.',
    alt: 'Photography masked into the comma and ampersand symbols on a Fern ground',
  },
  {
    src: 'grid-swoosh-eye.webp', lg: 5, md: 12,
    caption: 'incorporate colour and symbols to create visuals.',
    alt: 'Four-tile grid alternating the comma symbol with masked photography',
  },
  {
    src: 'slide-our-culture.webp', lg: 7, md: 12,
    caption: 'use the symbols as masks for photography to add more personality to sections.',
    alt: 'An "Our culture" slide with team photography masked into rounded symbol tiles',
  },
  {
    src: 'social-philz-cornflower.webp', lg: 6, md: 6,
    caption: 'use the symbols to frame photography.',
    alt: 'Shipley Do-Nuts being shared, framed above and below by symbol tiles on Cornflower',
  },
  {
    src: 'social-dessert-honeydew.webp', lg: 6, md: 6,
    caption: 'use the symbols to frame photography.',
    alt: 'Three team members holding baked goods, framed above and below by symbol tiles on Honeydew',
  },
  {
    src: 'campaign-pair.webp', lg: 6, md: 12,
    caption: 'use the symbols paired with colour-toned photography and typography to create multi-layered compositions.',
    alt: 'Two panels pairing masked photography with a tonal spm wordmark pattern',
  },
  {
    src: 'campaign-pair-dont.webp', lg: 6, md: 12, ok: false,
    caption: 'use these colour combinations. Only use a lighter shade of the colour.',
    alt: 'The same two panels with the wordmark pattern set at full strength, competing with the photography',
  },
]

const DO_COLOR = '#2E7D32'
const DONT_COLOR = '#C62828'

export default function AppExamples() {
  const { client } = brand.meta
  const available = new Set(brand.images.applications)

  return (
    <div className="page">
      <div className="section-label">Applications</div>
      <h2 className="section-title">Examples</h2>
      <p className="section-intro">
        The {client} system applied across social, presentations, campaigns, and merchandise.
        The symbols do most of the work here: as masks for photography, as frames around it,
        and as a tonal pattern behind it.
      </p>

      <div className="app-grid">
        {EXAMPLES.filter(e => available.has(e.src)).map(e => {
          const isDo = e.ok !== false
          const style = { '--span-lg': e.lg, '--span-md': e.md } as CSSProperties
          return (
            <figure key={e.src} style={style}>
              <img src={`${base}images/applications/${e.src}`} alt={e.alt ?? e.caption} loading="lazy" />
              <figcaption style={{ fontFamily: SANS, fontWeight: 500, fontSize: 12.5, lineHeight: 1.4, color: '#4D4D4D', margin: '10px 0 0' }}>
                <strong style={{ color: isDo ? DO_COLOR : DONT_COLOR, fontWeight: 700 }}>
                  {isDo ? 'DO' : 'DO NOT'}
                </strong>{' '}
                {e.caption}
              </figcaption>
            </figure>
          )
        })}
      </div>

      <div className="content-block">
        <h3 style={{ fontFamily: `var(--display-font, 'Urbanist'), sans-serif`, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: 'var(--charcoal)' }}>
          In short
        </h3>
        <ul style={{ fontFamily: SANS, fontWeight: 500, fontSize: 15, lineHeight: 1.4, color: '#333', maxWidth: 620, paddingLeft: 20, margin: 0 }}>
          <li>Symbols mask, frame, or sit behind photography. They never sit on top of a subject.</li>
          <li>Where a wordmark pattern backs an image, set it in a lighter shade of the ground colour so it recedes.</li>
          <li>Colour-tone the photography to the panel it sits in, so the composition reads as one layer.</li>
        </ul>
      </div>
    </div>
  )
}
