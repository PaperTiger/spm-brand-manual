import brand from '../../brand.config'

const t = brand.tokens

// The stylesheet does not specify a data visualisation palette. This sequence
// extends the brand palette, ordered so that adjacent series stay separable:
// it alternates dark and light rather than running the two darks together.
// Series colours come from the colour-pathway ramps rather than the raw
// palette: several brand colours are too light to carry a data series on a
// white ground. Each entry is contrast-checked against its chart ground, and
// adjacent entries are kept at least 1.9:1 apart from one another.
const sequence = [
  {
    n: '01', name: 'Cornflower 600', hex: '#748AB2', text: '#fff',
    note: 'Primary series. Cornflower 400 is far too light for a white ground (1.8:1), so the 600 step carries it.',
  },
  {
    n: '02', name: 'Fern 400', hex: '#324625', text: '#fff',
    note: 'Second series: the base brand green, 10.3:1 on white.',
  },
  {
    n: '03', name: 'Salt 700', hex: '#86857F', text: '#fff',
    note: 'Third series. Salt itself is a background colour, so the 700 step is used for data.',
  },
  {
    n: '04', name: 'Jam 400', hex: '#59173E', text: '#fff',
    note: 'Fourth series: the base brand plum, 13.0:1 on white.',
  },
  {
    n: '05', name: 'Silk 700', hex: '#77726E', text: '#fff',
    note: 'Fifth series. Limit charts to five colour-coded series; beyond that, use opacity steps of one hue.',
  },
  {
    n: '06', name: 'Mid Gray', hex: '#9CA3AF', text: '#283F1A',
    note: 'Axes, gridlines, and reference lines only. Never use as a data series.',
  },
]

const rules = [
  {
    heading: 'Start with Cornflower 600',
    body: 'Cornflower 600 always takes the first data series, anchoring the chart and drawing the eye to the most important metric.',
  },
  {
    heading: 'Maximum five series',
    body: 'Limit each chart to five color-coded data series. For six or more, use opacity steps of a single hue (see sequential palette below).',
  },
  {
    heading: 'Gray is for context, not data',
    body: 'Gray tones serve axes, gridlines, and benchmark reference lines only. Never represent a primary data series in gray.',
  },
  {
    heading: 'Test for color accessibility',
    body: 'Verify palettes against deuteranopia and protanopia simulations. Always pair color with shape, label, or pattern as a secondary signal.',
  },
]

export default function DataVizColors() {
  return (
    <div className="page">
      <div className="section-label">Data visualisation</div>
      <h2 className="section-title">Color sequence</h2>
      <p className="section-intro">
        Brand colors applied to data visualisation follow a fixed sequence. Using them in order
        ensures charts remain on-brand, legible, and accessible across every format and medium.
      </p>

      {/* Sequence grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)",
        gap: 0, border: "1px solid #E5E5E5", marginBottom: 56 }}>
        {sequence.map((s, i) => (
          <div key={s.n} style={{
            borderRight: (i + 1) % 3 !== 0 ? "1px solid #E5E5E5" : undefined,
            borderBottom: i < 3 ? "1px solid #E5E5E5" : undefined,
          }}>
            <div style={{ background: s.hex, height: 88, padding: "14px 18px",
              display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontSize: 28, fontWeight: 700,
                color: s.text, opacity: 0.3, lineHeight: 1 }}>{s.n}</span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontSize: 13, fontWeight: 600,
                color: "#283F1A", marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, fontWeight: 600,
                color: "#283F1A", letterSpacing: "0.06em", marginBottom: 8 }}>{s.hex.toUpperCase()}</div>
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 12, color: "#283F1A",
                lineHeight: 1.4 }}>{s.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage rules */}
      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 40, marginBottom: 56 }}>
        <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17,
          margin: '0 0 24px', color: '#283F1A' }}>Usage rules</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          border: "1px solid #E5E5E5" }}>
          {rules.map((r, i) => (
            <div key={r.heading} style={{
              borderRight: i % 2 === 0 ? "1px solid #E5E5E5" : undefined,
              borderBottom: i < 2 ? "1px solid #E5E5E5" : undefined,
              padding: "24px",
            }}>
              <div style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontSize: 13, fontWeight: 600,
                color: t['brand-accent'], marginBottom: 8 }}>{r.heading}</div>
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 13, color: "#283F1A",
                lineHeight: 1.4 }}>{r.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequential palette */}
      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 40 }}>
        <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17,
          margin: '0 0 8px', color: '#283F1A' }}>Sequential palette</h3>
        <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#283F1A',
          lineHeight: 1.4, marginBottom: 24, maxWidth: 520 }}>
          When a single data series needs value differentiation (heat maps, ranked lists, or
          choropleth maps), use opacity steps of the primary color.
        </p>
        <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
          {[100, 80, 60, 40, 20, 10].map(pct => (
            <div key={pct} style={{ flex: 1 }}>
              <div style={{ height: 64, background: t['brand-accent'], opacity: pct / 100,
                border: pct <= 20 ? "1px solid #E5E5E5" : undefined }} />
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 10, fontWeight: 600,
                color: "#283F1A", letterSpacing: "0.06em", paddingTop: 8, textAlign: "center" }}>
                {pct}%
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 12, color: "#283F1A",
          marginTop: 4 }}>
          100% → 80% → 60% → 40% → 20% → 10% opacity of Cornflower 600
        </div>
      </div>
    </div>
  )
}
