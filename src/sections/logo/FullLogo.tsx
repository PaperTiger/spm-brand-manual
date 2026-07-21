import brand from '../../brand.config'
import { FullLogoSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'

const t = brand.tokens

const combos = [
  { bg: '#FFFFFF',   label: 'White',           mark: t['primary-blue'], wm: t['charcoal'], inner: '#fff', lbl: '#111111' },
  { bg: '#F3F3F3',   label: 'Gray',            mark: t['primary-blue'], wm: t['charcoal'], inner: '#fff', lbl: '#111111' },
  { bg: t['pale-green'], label: 'Lime',       mark: t['charcoal'],      wm: t['charcoal'], inner: '#fff', lbl: '#111111' },
  { bg: t['primary-blue'], label: 'Violet',   mark: '#fff',             wm: '#fff',        inner: t['primary-blue'], lbl: '#fff' },
  { bg: t['orange'], label: 'Coral',           mark: '#111',            wm: '#111',        inner: '#fff', lbl: '#fff' },
  { bg: t['dark-blue'], label: 'Deep Violet', mark: '#fff',             wm: '#fff',        inner: t['primary-blue'], lbl: '#fff' },
  { bg: '#111111',   label: 'Black',           mark: '#fff',            wm: '#fff',        inner: '#111', lbl: '#fff' },
]

export default function FullLogo() {
  return (
    <div>
      {/* Hero header */}
      <div className="logo-hero" style={{ background: t['dark-blue'] }}>
        <FullLogoSvg markFill="#fff" wordmarkFill="#fff" innerTextFill={t['primary-blue']} style={{ maxHeight: 56, width: 'auto' }} />
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
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#111' }}>Clearspace</h3>
          <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
            Maintain a minimum clearspace of <strong>x</strong> on all sides, where x equals half the height of the {brand.meta.client} mark.
          </p>
          <ClearspaceDiagram
            logoSrc={`${import.meta.env.BASE_URL}images/logos/logo-full-primary.svg`}
            logoAlt={`${brand.meta.client} clearspace`}
            csX={34} logoMaxHeight={68}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#111' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0 }}>
          {combos.map(c => (
            <div key={c.label} style={{ background: c.bg, padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, aspectRatio: '4/3', justifyContent: 'center' }}>
              <FullLogoSvg markFill={c.mark} wordmarkFill={c.wm} innerTextFill={c.inner} style={{ maxHeight: 40, width: 'auto' }} />
              <span style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
