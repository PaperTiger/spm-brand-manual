import brand from '../../brand.config'
import { LogoMarkSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'

const t = brand.tokens

const combos = [
  { bg: t.salt,       mark: t.jam,  inner: t.salt,       label: 'Salt',       lbl: '#283F1A' },
  { bg: t.cornflower, mark: t.jam,  inner: t.cornflower, label: 'Cornflower', lbl: '#283F1A' },
  { bg: t.silk,       mark: t.jam,  inner: t.silk,       label: 'Silk',       lbl: '#283F1A' },
  { bg: t.honeydew,   mark: t.fern, inner: t.honeydew,   label: 'Honeydew',   lbl: '#283F1A' },
  { bg: t.fern,       mark: t.salt, inner: t.fern,       label: 'Fern',       lbl: '#FCFBF0' },
  { bg: t.jam,        mark: t.salt, inner: t.jam,        label: 'Jam',        lbl: '#FCFBF0' },
]

export default function LogoMark() {
  return (
    <div>
      {/* Hero header */}
      <div className="logo-hero" style={{ background: t['dark-blue'], minHeight: 280 }}>
        <LogoMarkSvg markFill="#fff" innerTextFill={t['brand-accent']} style={{ maxHeight: 120, width: 'auto' }} />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Logo mark</h2>
        <p className="section-intro">
          The mark is the {brand.meta.client} symbol on its own. Use it where the brand is already
          established or space is too tight for the full logo: favicons, app icons, social avatars,
          loading states, and graphic accents on covers and dividers.
        </p>
        <DownloadLogosButton style={{ marginTop: 0, marginBottom: 48 }} />

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#283F1A' }}>Clearspace</h3>
          <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#283F1A', lineHeight: 1.4, marginBottom: 24, maxWidth: 520 }}>
            x equals ½ the height of the {brand.meta.client} mark. Maintain this distance on all four sides.
          </p>
          <ClearspaceDiagram
            logoSrc={`${import.meta.env.BASE_URL}images/logos/logo-mark-primary.svg`}
            logoAlt="Logo mark clearspace"
            csX={75} logoMaxHeight={150}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#283F1A' }}>Approved color combinations</h3>
          <div className="combo-grid-square">
            {combos.map(c => (
              <div key={c.label} style={{ background: c.bg, boxShadow: c.bg === t.salt ? 'inset 0 0 0 1px #E5E2D6' : undefined, padding: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8%', justifyContent: 'center', aspectRatio: '1' }}>
                <LogoMarkSvg markFill={c.mark} innerTextFill={c.inner} style={{ width: '52%', maxWidth: 130, height: 'auto' }} />
                <span style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
