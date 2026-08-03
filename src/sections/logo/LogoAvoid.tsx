import brand from '../../brand.config'
import { FullLogoSvg } from '../../components/ui/LogoSvg'

const t = brand.tokens

const items = [
  {
    heading: "Don't stretch or distort",
    body: "Always scale proportionally. Never stretch, squash, or skew the logo.",
    bg: "#F8F8F8",
    svgStyle: { transform: "scaleX(1.6)" },
    mark: t.jam, wm: t.jam, inner: t.cornflower,
  },
  {
    heading: "Don't recolor",
    body: "Use only approved logo colors. Don't apply gradients, secondary palette colors, or off-brand tints.",
    bg: "#F8F8F8",
    svgStyle: { filter: "hue-rotate(80deg) saturate(200%) brightness(0.7)" },
    mark: t.jam, wm: t.jam, inner: t.cornflower,
  },
  {
    heading: "Don't add effects",
    body: "No shadows, glows, outlines, or bevels. The logo stays flat.",
    bg: "#F8F8F8",
    svgStyle: { filter: "drop-shadow(3px 4px 10px rgba(0,0,0,0.55))" },
    mark: t.jam, wm: t.jam, inner: t.cornflower,
  },
  {
    heading: "Don't rotate",
    body: "Keep the logo level. Never set it on an angle or rotate the mark.",
    bg: "#F8F8F8",
    svgStyle: { transform: "rotate(-18deg)" },
    mark: t.jam, wm: t.jam, inner: t.cornflower,
  },
  {
    heading: "Don't use low contrast",
    body: "Don't place the dark logo on dark or busy backgrounds. Use the white version instead.",
    bg: t['dark-blue'],
    svgStyle: { opacity: 0.25 },
    mark: t.jam, wm: t.jam, inner: t.cornflower,
  },
  {
    heading: "Don't rebuild the wordmark",
    body: "Never retype the brand name in another font. Always use the supplied logo artwork.",
    bg: "#F8F8F8",
    isRetype: true,
  },
]

export default function LogoAvoid() {
  return (
    <div className="page">
      <div className="section-label">Logo &amp; mark</div>
      <h2 className="section-title">What to avoid</h2>
      <p className="section-intro">
        The logo is supplied as final artwork. Don't redraw, re-space, or restyle it.
        These are the most common ways the identity gets weakened.
      </p>
      {/* Cell dividers come from the 1px grid gap showing the container colour
          through, not from per-cell borders: that stays correct at 3, 2, or 1
          columns without the column count being hardcoded in two places. */}
      <div className="avoid-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 1, background: "#E5E5E5", border: "1px solid #E5E5E5" }}>
        {items.map(item => (
          <div key={item.heading} style={{ background: "var(--page-bg, #FCFBF0)", minWidth: 0 }}>
            <div className="avoid-demo" style={{ background: item.bg, height: 160, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderBottom: "1px solid #E5E5E5" }}>
              {item.isRetype
                ? <span className="avoid-retype" style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: "#283F1A", letterSpacing: "-0.01em" }}>{brand.meta.client}</span>
                : <FullLogoSvg
                    markFill={item.mark!} wordmarkFill={item.wm!} innerTextFill={item.inner!}
                    style={{ height: 44, width: "auto", ...item.svgStyle }}
                  />
              }
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#CC1188", textTransform: "uppercase", marginBottom: 8 }}>{item.heading}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#283F1A", lineHeight: 1.4 }}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
