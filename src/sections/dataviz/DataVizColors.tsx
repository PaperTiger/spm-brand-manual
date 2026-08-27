import brand from '../../brand.config'

const t = brand.tokens

// The stylesheet does not specify a data visualisation palette. This is the
// brand palette used straight, so a chart reads as SPM at a glance, ordered so
// that adjacent series stay separable: it alternates dark and light rather
// than running the two darks together. Neutrals are deliberately absent — the
// gridline and label greys live with the chart styles, not in the series.
const sequence = [
  {
    n: '01', name: 'Jam', hex: '#59173E', text: '#FCFBF0',
    note: 'Primary series. Anchors the chart and takes the most important metric.',
  },
  {
    n: '02', name: 'Cornflower', hex: '#A4C3FA', text: '#283F1A',
    note: 'Second series. The strongest contrast against Jam in the palette.',
  },
  {
    n: '03', name: 'Fern', hex: '#324625', text: '#FCFBF0',
    note: 'Third series: use for charts requiring three or more distinct series.',
  },
  {
    n: '04', name: 'Honeydew', hex: '#D9DB8C', text: '#283F1A',
    note: 'Fourth series. Limit charts to five colour-coded series.',
  },
  {
    n: '05', name: 'Silk', hex: '#E1D7D0', text: '#283F1A',
    note: 'Fifth series. Beyond five, use opacity steps of a single hue.',
  },
]

// Three columns, so the last row is rarely full: derive the dividers from the
// item count instead of hardcoding a two-row grid.
const lastRowStart = Math.floor((sequence.length - 1) / 3) * 3

const rules = [
  {
    heading: 'Start with Jam',
    body: 'Jam always takes the first data series, anchoring the chart and drawing the eye to the most important metric.',
  },
  {
    heading: 'Maximum five series',
    body: 'Limit each chart to five color-coded data series. For six or more, use opacity steps of a single hue (see sequential palette below).',
  },
  {
    heading: 'Neutrals are for context, not data',
    body: 'Axes, gridlines, and benchmark reference lines use the chart neutrals — #E5E5E5 for gridlines, #4D4D4D for labels, specified with the chart styles. Never represent a data series in a neutral.',
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
            borderRight: (i + 1) % 3 !== 0 && i !== sequence.length - 1
              ? "1px solid #E5E5E5" : undefined,
            borderBottom: i < lastRowStart ? "1px solid #E5E5E5" : undefined,
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
          100% → 80% → 60% → 40% → 20% → 10% opacity of Jam
        </div>
      </div>
    </div>
  )
}
