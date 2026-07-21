import brand from '../../brand.config'

export default function PhotoDonts() {
  const client = brand.meta.client
  const items = [
    { seed: "pdn1", filter: "saturate(0.2) brightness(1.15)", caption: "Don't shoot desaturated, stylised imagery that strips the brand's warmth and character." },
    { seed: "pdn2", filter: "brightness(1.6) contrast(1.1)", caption: "Avoid blown-out, over-exposed images that feel generic and lack a sense of place." },
    { seed: "pdn3", filter: "hue-rotate(180deg) saturate(0.5)", caption: "Don't apply heavy color grading or filters that make images feel processed and inauthentic." },
    { seed: "pdn4", filter: "saturate(0.1) brightness(1.2) contrast(1.1)", caption: `Avoid generic stock imagery that could belong to any brand. Use photography specific to ${client}.` },
    { seed: "pdn5", filter: "brightness(1.8) contrast(0.85) saturate(0.4)", caption: "Don't shoot from perspectives that make the brand feel abstract rather than lived-in." },
    { seed: "pdn6", filter: "saturate(2.2) contrast(1.3) brightness(1.1)", caption: "Avoid overly polished promotional imagery that projects aspiration over authenticity." },
  ]
  return (
    <div className="photo-layout">
      <div>
        <div className="section-label" style={{ marginBottom: 20 }}>Photography</div>
        <h2 className="section-title" style={{ marginBottom: 24 }}>Don'ts</h2>
        <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: "#111", lineHeight: 1.65 }}>
          Avoid photography choices that undermine authenticity, flatten the brand character,
          or project an image that does not reflect the real {client}.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        {items.map(item => (
          <div key={item.seed} style={{ paddingBottom: 40 }}>
            <img src={`https://picsum.photos/seed/${item.seed}/600/400`} alt="" style={{ width: "100%", height: 240, objectFit: "cover", display: "block", marginBottom: 14, filter: item.filter }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 20, height: 20, background: "#CC1188", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M18 6L6 18M6 6l12 12"/></svg>
              </div>
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 13, color: "var(--charcoal)", lineHeight: 1.5 }}>{item.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
