import brand from '../../brand.config'
import { LogoMarkSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'

const t = brand.tokens

const combos = [
  { bg: '#FFFFFF',         mark: t['primary-blue'], inner: '#fff', label: 'White',       lbl: '#111' },
  { bg: '#F3F3F3',         mark: t['primary-blue'], inner: '#fff', label: 'Gray',        lbl: '#111' },
  { bg: t['pale-green'],   mark: '#111',             inner: '#fff', label: 'Lime',        lbl: '#111' },
  { bg: t['primary-blue'], mark: '#fff',             inner: t['primary-blue'], label: 'Violet',   lbl: '#fff' },
  { bg: t['orange'],       mark: '#111',             inner: '#fff', label: 'Coral',       lbl: '#fff' },
  { bg: t['dark-blue'],    mark: '#fff',             inner: t['primary-blue'], label: 'Deep Violet', lbl: '#fff' },
  { bg: '#111111',         mark: '#fff',             inner: '#111', label: 'Black',       lbl: '#fff' },
]

export default function LogoMark() {
  return (
    <div>
      {/* Hero header */}
      <div className="logo-hero" style={{ background: t['dark-blue'], minHeight: 280 }}>
        <LogoMarkSvg markFill="#fff" innerTextFill={t['primary-blue']} style={{ maxHeight: 120, width: 'auto' }} />
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
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#111' }}>Clearspace</h3>
          <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#111', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
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
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#111' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${combos.length}, 1fr)`, gap: 0 }}>
            {combos.map(c => (
              <div key={c.label} style={{ background: c.bg, padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, justifyContent: 'center', aspectRatio: '1' }}>
                <LogoMarkSvg markFill={c.mark} innerTextFill={c.inner} style={{ maxHeight: 80, width: 'auto' }} />
                <span style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
