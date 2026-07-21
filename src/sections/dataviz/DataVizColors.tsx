import brand from '../../brand.config'

const t = brand.tokens

const sequence = [
  {
    n: '01', name: 'Electric Violet', hex: t['primary-blue'], text: '#fff',
    note: 'Primary series: anchors every chart to the brand identity. Always use first.',
  },
  {
    n: '02', name: 'Coral', hex: t['orange'], text: '#fff',
    note: 'Second series: contrast-safe alongside Electric Violet on both light and dark.',
  },
  {
    n: '03', name: 'Deep Violet', hex: t['dark-blue'], text: '#fff',
    note: 'Third series: use for charts requiring three or more distinct data series.',
  },
  {
    n: '04', name: 'Bright Purple', hex: t['purple'], text: '#fff',
    note: 'Fourth series: limit charts to four color-coded series maximum.',
  },
  {
    n: '05', name: 'Lime', hex: t['pale-green'], text: '#000',
    note: 'Use only on dark backgrounds. Insufficient contrast on white chart areas.',
  },
  {
    n: '06', name: 'Mid Gray', hex: '#9CA3AF', text: '#fff',
    note: 'Axes, gridlines, and reference lines only. Never use as a primary data series.',
  },
]

const rules = [
  {
    heading: 'Start with Electric Violet',
    body: 'The primary brand color always takes the first data series, anchoring the chart and drawing the eye to the most important metric.',
  },
  {
    heading: 'Maximum four series',
    body: 'Limit each chart to four color-coded data series. For five or more, use opacity steps of a single hue (see sequential palette below).',
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
                color: "#111", marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, fontWeight: 600,
                color: "#111", letterSpacing: "0.06em", marginBottom: 8 }}>{s.hex.toUpperCase()}</div>
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 12, color: "#111",
                lineHeight: 1.55 }}>{s.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage rules */}
      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 40, marginBottom: 56 }}>
        <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17,
          margin: '0 0 24px', color: '#111' }}>Usage rules</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          border: "1px solid #E5E5E5" }}>
          {rules.map((r, i) => (
            <div key={r.heading} style={{
              borderRight: i % 2 === 0 ? "1px solid #E5E5E5" : undefined,
              borderBottom: i < 2 ? "1px solid #E5E5E5" : undefined,
              padding: "24px",
            }}>
              <div style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontSize: 13, fontWeight: 600,
                color: t['primary-blue'], marginBottom: 8 }}>{r.heading}</div>
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 13, color: "#111",
                lineHeight: 1.6 }}>{r.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequential palette */}
      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 40 }}>
        <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17,
          margin: '0 0 8px', color: '#111' }}>Sequential palette</h3>
        <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#111',
          lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
          When a single data series needs value differentiation (heat maps, ranked lists, or
          choropleth maps), use opacity steps of the primary color.
        </p>
        <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
          {[100, 80, 60, 40, 20, 10].map(pct => (
            <div key={pct} style={{ flex: 1 }}>
              <div style={{ height: 64, background: t['primary-blue'], opacity: pct / 100,
                border: pct <= 20 ? "1px solid #E5E5E5" : undefined }} />
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 10, fontWeight: 600,
                color: "#111", letterSpacing: "0.06em", paddingTop: 8, textAlign: "center" }}>
                {pct}%
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 12, color: "#111",
          marginTop: 4 }}>
          100% → 80% → 60% → 40% → 20% → 10% opacity of Electric Violet
        </div>
      </div>
    </div>
  )
}
