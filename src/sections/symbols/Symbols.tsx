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
      <div className="section-label">Symbols &amp; patterns</div>
      <h2 className="section-title">Brand symbols</h2>
      <p className="section-intro">
        Five symbols drawn from the brand's own typography: the comma from the logo mark,
        an asterisk, a semicolon, an ampersand, and an equals sign. They are punctuation, not
        icons: they add rhythm and texture rather than carrying literal meaning. Use them as
        accents, tile them into patterns, or set them in rounded tiles using the approved
        colour pairings.
      </p>

      {/* The approved set */}
      <div style={{ background: t.salt, border: '1px solid #E5E2D6', padding: '48px 32px', marginBottom: 24 }}>
        <img
          src={`${B}images/symbols/symbols-1.webp`}
          alt="The five approved SPM symbols in Fern, and the same five set in approved colour tiles"
          style={{ display: 'block', width: '100%', maxWidth: 760, margin: '0 auto', height: 'auto' }}
        />
      </div>

      <div style={{ marginBottom: 48, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <a href={`${B}images/symbols/symbols.zip`} download="spm-symbols.zip" className="dl-btn" style={{ marginRight: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download symbols
        </a>
        <a href={`${B}images/symbols/gradient-symbol.zip`} download="spm-gradient-symbols.zip" className="dl-btn-outline" style={{ marginRight: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download gradient symbols
        </a>
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
