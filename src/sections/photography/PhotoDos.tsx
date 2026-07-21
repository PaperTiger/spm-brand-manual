export default function PhotoDos() {
  const items = [
    { seed: "pd1", caption: "Shoot organic compositions where the subject does not feel staged." },
    { seed: "pd2", caption: "Play with light and shadow to create visual interest and depth." },
    { seed: "pd3", caption: "Rich and warm color tones make photography feel human and approachable." },
    { seed: "pd4", caption: "Capture real moments of collaboration and problem-solving at work." },
    { seed: "pd5", caption: "Clean product and technology shots against simple, uncluttered backgrounds." },
    { seed: "pd6", caption: "Real environments: offices, workshops, studios, and creative spaces." },
  ]
  return (
    <div className="photo-layout">
      <div>
        <div className="section-label" style={{ marginBottom: 20 }}>Photography</div>
        <h2 className="section-title" style={{ marginBottom: 24 }}>Dos</h2>
        <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: "#111", lineHeight: 1.65 }}>
          These are guiding principles when creating photography assets, a starting point for
          shooting imagery used in print or digital collateral.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        {items.map(item => (
          <div key={item.seed} style={{ paddingBottom: 40 }}>
            <img src={`https://picsum.photos/seed/${item.seed}/600/400`} alt="" style={{ width: "100%", height: 240, objectFit: "cover", display: "block", marginBottom: 14 }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 20, height: 20, background: "var(--dark-blue)", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 13, color: "var(--charcoal)", lineHeight: 1.5 }}>{item.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
