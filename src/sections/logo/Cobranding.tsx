import brand from '../../brand.config'
import { FullLogoSvg } from '../../components/ui/LogoSvg'

const t = brand.tokens

function PartnerLogo({ height = 40, muted = false }: { height?: number; muted?: boolean }) {
  const blockColor = muted ? 'rgba(255,255,255,0.35)' : '#C4C4C4'
  const textColor  = muted ? 'rgba(255,255,255,0.6)'  : '#6B7280'
  const monoColor  = muted ? 'rgba(255,255,255,0.9)'  : '#fff'
  const w = Math.round(height * 3.5)
  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`}>
      <rect x="0" y="0" width={height} height={height} rx={Math.round(height * 0.18)} fill={blockColor} />
      <text x={height / 2} y={height * 0.66} textAnchor="middle"
        fontFamily={`var(--body-font, 'Inter'), sans-serif`} fontSize={Math.round(height * 0.3)} fontWeight="700"
        fill={monoColor}>PT</text>
      <text x={height + height * 0.38} y={height * 0.69}
        fontFamily={`var(--body-font, 'Inter'), sans-serif`} fontSize={Math.round(height * 0.42)} fontWeight="600"
        fill={textColor} letterSpacing="-0.02em">Partner</text>
    </svg>
  )
}

const avoidItems = [
  {
    heading: "Don't crowd the logos",
    body: "Always maintain the minimum clearspace between both logos. They must never touch or overlap.",
  },
  {
    heading: "Don't recolor partner logos",
    body: "Reproduce partner logos in their approved colors. Never apply brand tints to a partner's identity.",
  },
  {
    heading: "Don't subordinate the brand",
    body: "The brand logo must be at least equal in visual size to any co-branded partner logo.",
  },
  {
    heading: "Don't merge or combine",
    body: "The two logos must remain visually separate. Never merge elements to form a new composite shape.",
  },
  {
    heading: "Don't use unapproved backgrounds",
    body: "Only use backgrounds where both logos remain legible. Test contrast for both identities separately.",
  },
  {
    heading: "Don't misalign on stacked layouts",
    body: "When stacking logos, align them to a shared center axis or a consistent left edge.",
  },
]

export default function Cobranding() {
  const csXpx = 44

  return (
    <div className="page">
      <div className="section-label">Logo &amp; mark</div>
      <h2 className="section-title">Co-branding</h2>
      <p className="section-intro">
        When the brand appears alongside a partner, client, or sponsor logo, both identities must
        remain distinct and legible. These rules govern how to construct approved co-branded lockups.
      </p>

      {/* Approved lockups */}
      <div className="cobranding-pair-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 2 }}>
        <div style={{ background: "#F8F8F8", padding: "52px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 20 }}>
            <FullLogoSvg
              markFill={t.jam} wordmarkFill={t.jam} innerTextFill={t.cornflower}
              style={{ height: 40, width: "auto" }}
            />
            <div style={{ width: 1, height: 52, background: "#C4C4C4" }} />
            <PartnerLogo height={40} />
          </div>
          <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "#283F1A" }}>
            Horizontal, on light
          </div>
        </div>
        <div style={{ background: t['dark-blue'], padding: "52px 40px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start",
            gap: 22, marginBottom: 20 }}>
            <FullLogoSvg
              markFill={t.salt} wordmarkFill={t.salt} innerTextFill={t.jam}
              style={{ height: 40, width: "auto" }}
            />
            <div style={{ width: 64, height: 1, background: "rgba(255,255,255,0.2)" }} />
            <PartnerLogo height={40} muted />
          </div>
          <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            Stacked, on dark
          </div>
        </div>
      </div>

      {/* Clearspace between logos */}
      <div className="content-block">
        <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17,
          margin: '0 0 8px', color: '#283F1A' }}>Clearspace between logos</h3>
        <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#283F1A',
          lineHeight: 1.4, marginBottom: 32, maxWidth: 520 }}>
          Maintain a minimum clearspace of <strong>one brand mark height</strong> on each side of
          the divider between the two logos. A vertical rule may sit at the midpoint.
        </p>
        <div className="cobranding-clearspace-box" style={{ border: "1px solid #E5E5E5", padding: "48px 40px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div className="cb-cs-row" style={{ display: "flex", alignItems: "center" }}>
            <FullLogoSvg
              markFill={t.jam} wordmarkFill={t.jam} innerTextFill={t.cornflower}
              style={{ height: 44, width: "auto" }}
            />
            <div className="cb-cs-x" style={{ width: csXpx, height: 44,
              background: `color-mix(in srgb, ${t['brand-accent']} 12%, transparent)`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontSize: 10, fontWeight: 700,
                color: t['brand-accent'], background: "rgba(255,255,255,0.85)",
                padding: "1px 5px", borderRadius: 2 }}>x</span>
            </div>
            <div className="cb-cs-rule" style={{ width: 1, height: 52, background: "#C4C4C4", flexShrink: 0 }} />
            <div className="cb-cs-x" style={{ width: csXpx, height: 44,
              background: `color-mix(in srgb, ${t['brand-accent']} 12%, transparent)`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontSize: 10, fontWeight: 700,
                color: t['brand-accent'], background: "rgba(255,255,255,0.85)",
                padding: "1px 5px", borderRadius: 2 }}>x</span>
            </div>
            <PartnerLogo height={44} />
          </div>
          <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 12, color: "#283F1A",
            display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 700, fontSize: 11,
              background: `color-mix(in srgb, ${t['brand-accent']} 40%, transparent)`,
              padding: "2px 7px", borderRadius: 2, flexShrink: 0 }}>x</span>
            <span>= the height of the brand mark</span>
          </div>
        </div>
      </div>

      {/* Size hierarchy */}
      <div className="content-block">
        <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17,
          margin: '0 0 8px', color: '#283F1A' }}>Size hierarchy</h3>
        <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#283F1A',
          lineHeight: 1.4, marginBottom: 24, maxWidth: 520 }}>
          The brand logo must be visually equal to or larger than the partner logo at all times.
          Never allow a partner logo to appear more prominent than the brand.
        </p>
        <div className="cobranding-pair-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <div style={{ background: "#F8F8F8", padding: "28px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20,
              marginBottom: 16, minHeight: 64 }}>
              <FullLogoSvg markFill={t.jam} wordmarkFill={t.jam} innerTextFill={t.cornflower}
                style={{ height: 40, width: "auto" }} />
              <div style={{ width: 1, height: 52, background: "#C4C4C4" }} />
              <PartnerLogo height={40} />
            </div>
            <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.06em", color: "#15803D", textTransform: "uppercase" }}>
              Equal height: correct
            </div>
          </div>
          <div style={{ background: "#F8F8F8", padding: "28px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20,
              marginBottom: 16, minHeight: 64 }}>
              <FullLogoSvg markFill={t.jam} wordmarkFill={t.jam} innerTextFill={t.cornflower}
                style={{ height: 22, width: "auto", opacity: 0.7 }} />
              <div style={{ width: 1, height: 64, background: "#C4C4C4" }} />
              <PartnerLogo height={64} />
            </div>
            <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.06em", color: "#CC1188", textTransform: "uppercase" }}>
              Brand too small: incorrect
            </div>
          </div>
        </div>
      </div>

      {/* What to avoid */}
      <div className="content-block">
        <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17,
          margin: '0 0 24px', color: '#283F1A' }}>What to avoid</h3>
        {/* Dividers come from the 1px grid gap, so they stay correct however
            many columns the breakpoint gives us. */}
        <div className="cobranding-avoid-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 1, background: "#E5E5E5", border: "1px solid #E5E5E5" }}>
          {avoidItems.map(item => (
            <div key={item.heading} style={{
              background: "var(--page-bg, #FCFBF0)",
              minWidth: 0,
              padding: "20px 22px",
            }}>
              <div style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.06em", color: "#CC1188", textTransform: "uppercase",
                marginBottom: 8 }}>
                {item.heading}
              </div>
              <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 13, color: "#283F1A",
                lineHeight: 1.4 }}>
                {item.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
