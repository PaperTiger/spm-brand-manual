import { CompactLogoSvg, LogoMarkSvg } from '../../components/ui/LogoSvg'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'
import { avatarBgs, faviconVariants, faviconSizes } from '../../brandAssets'

export default function LogoAvatar() {
  return (
    <div className="page">
      <div className="section-label">Logo &amp; mark</div>
      <h2 className="section-title">Avatar &amp; favicon</h2>
      <p className="section-intro">
        Use the stacked logo for social avatars and profile images where a square or circular crop
        suits a vertical lockup. Use the mark on its own for favicons and app icons where space is
        too small for any wordmark.
      </p>

      <DownloadLogosButton style={{ marginTop: 0, marginBottom: 48 }} />

      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 48, marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginBottom: 24 }}>
          <div className="section-label" style={{ marginBottom: 0 }}>Avatars: stacked logo</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, maxWidth: 680 }}>
          {avatarBgs.map(a => (
            <div key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: "100%", aspectRatio: "1", borderRadius: "50%", background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <CompactLogoSvg markFill={a.mark} wordmarkFill={a.wm} innerTextFill={a.inner} style={{ width: "76%", height: "auto" }} />
              </div>
              <div style={{ fontSize: 11, color: "#283F1A", letterSpacing: "0.04em", fontFamily: `var(--body-font, 'Inter'), sans-serif` }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 48, marginBottom: 80 }}>
        <div style={{ marginBottom: 24 }}>
          <div className="section-label" style={{ marginBottom: 0 }}>Favicons: mark</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 760 }}>
          {faviconVariants.map(v => (
            <div key={v.key}>
              <div style={{ fontSize: 11, color: "#283F1A", letterSpacing: "0.04em", marginBottom: 16, fontFamily: `var(--body-font, 'Inter'), sans-serif` }}>{v.label}</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
                {faviconSizes.map(size => (
                  <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <div style={{ width: size, height: size, background: v.bg, border: v.bg === '#FFFFFF' ? "1px solid #E5E5E5" : undefined, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <LogoMarkSvg markFill={v.mark} innerTextFill={v.inner} style={{ width: "80%", height: "80%" }} />
                    </div>
                    <div style={{ fontSize: 10, color: "#283F1A", fontFamily: `var(--body-font, 'Inter'), sans-serif` }}>{size}px</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
