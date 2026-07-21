import brand from '../../brand.config'
import { StackedLogoSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'

const t = brand.tokens

const combos = [
  { bg: '#FFFFFF',          mark: t['primary-blue'], wm: t['charcoal'], inner: '#fff', label: 'White',         lbl: '#111' },
  { bg: '#F3F3F3',          mark: t['primary-blue'], wm: t['charcoal'], inner: '#fff', label: 'Gray',          lbl: '#111' },
  { bg: t['pale-green'],    mark: '#111', wm: '#111', inner: '#fff',                   label: 'Lime',          lbl: '#111' },
  { bg: t['primary-blue'],  mark: '#fff', wm: '#fff', inner: t['primary-blue'],        label: 'Violet',        lbl: '#fff' },
  { bg: t['orange'],        mark: '#111', wm: '#111', inner: '#fff',                   label: 'Coral',         lbl: '#fff' },
  { bg: t['dark-blue'],     mark: '#fff', wm: '#fff', inner: t['primary-blue'],        label: 'Deep Violet',   lbl: '#fff' },
  { bg: '#111111',          mark: '#fff', wm: '#fff', inner: '#111',                   label: 'Black',         lbl: '#fff' },
]

export default function StackedLogo() {
  return (
    <div>
      {/* Hero header */}
      <div className="logo-hero" style={{ background: t['dark-blue'], minHeight: 280 }}>
        <StackedLogoSvg markFill="#fff" wordmarkFill="#fff" innerTextFill={t['primary-blue']} style={{ maxHeight: 160, width: 'auto' }} />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Stacked logo</h2>
        <p className="section-intro">
          The stacked logo sets the wordmark beneath the mark for narrow, square, or centred formats:
          vertical layouts, profile images, and compositions where the horizontal lockup would shrink too far.
          Always use the supplied stacked artwork; never recreate the stacking yourself.
        </p>
        <DownloadLogosButton style={{ marginTop: 0, marginBottom: 48 }} />

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#111' }}>Clearspace</h3>
          <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
            x equals ½ the height of the {brand.meta.client} mark. Maintain this distance on all four sides.
          </p>
          <ClearspaceDiagram
            logoSrc={`${import.meta.env.BASE_URL}images/logos/logo-stacked-primary.svg`}
            logoAlt="Stacked logo clearspace"
            csX={75} logoMaxHeight={150}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#111' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0 }}>
            {combos.map(c => (
              <div key={c.label} style={{ background: c.bg, padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
                <StackedLogoSvg markFill={c.mark} wordmarkFill={c.wm} innerTextFill={c.inner} style={{ maxHeight: 80, width: 'auto' }} />
                <span style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
