import brand from '../../brand.config'
import { FullLogoSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'

const t = brand.tokens

const combos = [
  { bg: t.salt,       label: 'Salt',       mark: t.jam,  wm: t.jam,  inner: t.cornflower, lbl: '#283F1A' },
  { bg: t.cornflower, label: 'Cornflower', mark: t.jam,  wm: t.jam,  inner: t.cornflower, lbl: '#283F1A' },
  { bg: t.silk,       label: 'Silk',       mark: t.jam,  wm: t.jam,  inner: t.silk,       lbl: '#283F1A' },
  { bg: t.honeydew,   label: 'Honeydew',   mark: t.fern, wm: t.fern, inner: t.honeydew,   lbl: '#283F1A' },
  { bg: t.fern,       label: 'Fern',       mark: t.salt, wm: t.salt, inner: t.fern,       lbl: '#FCFBF0' },
  { bg: t.jam,        label: 'Jam',        mark: t.salt, wm: t.salt, inner: t.jam,        lbl: '#FCFBF0' },
]

export default function FullLogo() {
  return (
    <div>
      {/* Hero header */}
      <div className="logo-hero" style={{ background: t.jam }}>
        <FullLogoSvg markFill={t.salt} wordmarkFill={t.salt} innerTextFill={t.jam} style={{ maxHeight: 56, width: 'auto' }} />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Full logo</h2>
        <p className="section-intro">
          The full logo is the primary expression of the {brand.meta.client} identity: the mark and
          wordmark locked together. Use it as the default in most applications where the horizontal
          lockup has room to breathe.
        </p>
        <DownloadLogosButton style={{ marginTop: 0, marginBottom: 48 }} />

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#283F1A' }}>Clearspace</h3>
          <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#555', lineHeight: 1.4, marginBottom: 24, maxWidth: 520 }}>
            Maintain a minimum clearspace of <strong>x</strong> on all sides, where x equals half the height of the {brand.meta.client} mark.
          </p>
          <ClearspaceDiagram
            logoSrc={`${import.meta.env.BASE_URL}images/logos/logo-full-primary.svg`}
            logoAlt={`${brand.meta.client} clearspace`}
            capRatio={0.156250} maxWidth={218} vwCap={55}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#283F1A' }}>Approved color combinations</h3>
          <div className="combo-grid-wide">
          {combos.map(c => (
            <div key={c.label} style={{ background: c.bg, boxShadow: c.bg === t.salt ? 'inset 0 0 0 1px #E5E2D6' : undefined, padding: '8%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6%', aspectRatio: '4/3', justifyContent: 'center' }}>
              <FullLogoSvg markFill={c.mark} wordmarkFill={c.wm} innerTextFill={c.inner} style={{ width: '78%', maxWidth: 300, height: 'auto' }} />
              <span style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
