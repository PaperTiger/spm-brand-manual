import ExampleGrid, { type ExampleItem } from '../../components/ui/ExampleGrid'

const SANS = `var(--display-font, 'Urbanist'), sans-serif`

// Captions taken from the stylesheet's pattern panel.
const items: ExampleItem[] = [
  { src: 'logo-shape-noise-gradient.webp',  caption: 'Use the logo shape with a noise gradient.' },
  { src: 'symbol-pattern-cornflower.webp',  caption: 'Use the symbols to create a pattern within the approved colour combinations.' },
  { src: 'gradient-salt-cornflower.webp',   caption: 'Use gradients on Salt and Cornflower to create variation.' },
  {
    src: 'headline-mixed-serif.webp',
    caption: 'Use line-work to divide two lines of headline text, the top being sans serif and the bottom serif.',
  },
  {
    src: 'testimonial-card-jam.webp',
    caption: 'Use the blue gradient to add textured layers to a flat background.',
  },
]

export default function Pattern() {
  return (
    <div className="page">
      <div className="section-label">Symbols</div>
      <h2 className="section-title">Pattern &amp; texture</h2>
      <p className="section-intro">
        Pattern is how the brand fills space without adding noise. It comes from three places:
        the symbols tiled into a repeat, the logo shape softened with a noise gradient, and
        gradients built on Salt and Cornflower. Each one sits inside the approved colour
        pairings, so a pattern never introduces a combination the palette does not already allow.
      </p>

      <ExampleGrid items={items} dir="pattern" minColumn={280} aspect="4 / 3" fit="contain" />

      <div className="content-block">
        <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: 'var(--charcoal)' }}>
          In short
        </h3>
        <ul style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.4, color: '#333', maxWidth: 620, paddingLeft: 20, margin: 0 }}>
          <li>Patterns use the approved colour pairings only: one symbol colour on one ground.</li>
          <li>Gradients are built on Salt and Cornflower, never on Fern, Jam, or Juniper.</li>
          <li>Pattern sits behind content. It never competes with the headline or the logo.</li>
        </ul>
      </div>
    </div>
  )
}
