import brand from '../../brand.config'
import ExampleGrid, { type ExampleItem } from '../../components/ui/ExampleGrid'

const t = brand.tokens
const B = import.meta.env.BASE_URL
const SANS = `var(--display-font, 'Urbanist'), sans-serif`

const items: ExampleItem[] = [
  {
    src: 'symbols-core-fern.webp',
    ok: false,
    // The exported artwork already has a cross drawn over it.
    cross: false,
    caption: 'Use symbols that are not in the approved icon set, or redraw them in another style.',
  },
  {
    src: 'symbol-tiles-grid.webp',
    ok: false,
    cross: false,
    caption: 'Use colour combinations that are not approved.',
  },
  {
    src: 'symbol-composition.webp',
    caption: 'Use the symbols to build patterns as complementary graphics.',
  },
]

export default function Symbols() {
  return (
    <div className="page">
      <div className="section-label">Symbols</div>
      <h2 className="section-title">Brand symbols</h2>
      <p className="section-intro">
        Five symbols drawn from the brand's own typography: the comma from the logo mark,
        an asterisk, a semicolon, an ampersand, and an equals sign. They are punctuation, not
        icons: they add rhythm and texture rather than carrying literal meaning. Use them as
        accents, tile them into patterns, or set them in rounded tiles using the approved
        colour pairings.
      </p>

      {/* The approved set */}
      <div style={{ background: t.salt, border: '1px solid #E5E2D6', padding: '48px 32px', marginBottom: 48 }}>
        <img
          src={`${B}images/symbols/symbol-set-overview.webp`}
          alt="The five approved SPM symbols in Fern, and the same five set in approved colour tiles"
          style={{ display: 'block', width: '100%', maxWidth: 760, margin: '0 auto', height: 'auto' }}
        />
      </div>

      <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 20px', color: 'var(--charcoal)' }}>
        Do's and don'ts
      </h3>
      <ExampleGrid items={items} dir="symbols" minColumn={260} aspect="4 / 3" fit="contain" />

      {/* Rules */}
      <div className="content-block">
        <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: 'var(--charcoal)' }}>
          In short
        </h3>
        <ul style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.4, color: '#333', maxWidth: 620, paddingLeft: 20, margin: 0 }}>
          <li>Only the five approved symbols, drawn as supplied. Never redraw or restyle them.</li>
          <li>Symbol tiles use the approved colour pairings, never an unapproved combination.</li>
          <li>Symbols are decorative. They never replace a word or carry meaning on their own.</li>
        </ul>
      </div>
    </div>
  )
}
