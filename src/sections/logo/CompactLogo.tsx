import brand from '../../brand.config'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'

const t = brand.tokens
const B = import.meta.env.BASE_URL

// Approved grounds for the compact lockup, taken from the stylesheet's
// pairings matrix: dark grounds carry a light mark, light grounds a dark one.
const combos = [
  { bg: t.salt,       logo: 'logo-compact-jam.svg',  label: 'Salt',       lbl: '#283F1A' },
  { bg: t.cornflower, logo: 'logo-compact-jam.svg',  label: 'Cornflower', lbl: '#283F1A' },
  { bg: t.silk,       logo: 'logo-compact-jam.svg',  label: 'Silk',       lbl: '#283F1A' },
  { bg: t.honeydew,   logo: 'logo-compact-fern.svg', label: 'Honeydew',   lbl: '#283F1A' },
  { bg: t.fern,       logo: 'logo-compact-salt.svg', label: 'Fern',       lbl: '#FCFBF0' },
  { bg: t.jam,        logo: 'logo-compact-salt.svg', label: 'Jam',        lbl: '#FCFBF0' },
]

export default function CompactLogo() {
  return (
    <div>
      {/* Hero header */}
      <div className="logo-hero" style={{ background: t.jam, minHeight: 280 }}>
        <img
          src={`${B}images/logos/logo-compact-primary-inverse.svg`}
          alt={`${brand.meta.client} compact logo`}
          style={{ maxHeight: 120, width: 'auto' }}
        />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Compact logo</h2>
        <p className="section-intro">
          The compact lockup drops "communications" and sets the mark beside the SPM wordmark alone.
          Use it where horizontal space is limited but vertical height still permits legibility:
          mobile headers, app interfaces, and social media profiles. Below roughly 64px, where the
          wordmark stops being readable, switch to the logo mark instead.
        </p>
        <DownloadLogosButton style={{ marginTop: 0, marginBottom: 48 }} />

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: `var(--display-font, 'Urbanist'), sans-serif`, fontWeight: 600, fontSize: 17, margin: '0 0 12px', color: '#283F1A' }}>Clearspace</h3>
          <p style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 14, color: '#555', lineHeight: 1.4, marginBottom: 24, maxWidth: 520 }}>
            x equals ½ the height of the {brand.meta.client} mark. Maintain this distance on all four sides.
          </p>
          <ClearspaceDiagram
            logoSrc={`${B}images/logos/logo-compact-primary.svg`}
            logoAlt="Compact logo clearspace"
            capRatio={0.194509} maxWidth={206} vwCap={52}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: `var(--display-font, 'Urbanist'), sans-serif`, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: '#283F1A' }}>Approved color combinations</h3>
          <div className="combo-grid-wide">
            {combos.map(c => (
              <div key={c.label} style={{ background: c.bg, boxShadow: c.bg === t.salt ? 'inset 0 0 0 1px #E5E2D6' : undefined, padding: '9%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7%', justifyContent: 'center', aspectRatio: '4/3' }}>
                <img src={`${B}images/logos/${c.logo}`} alt={`Compact logo on ${c.label}`} style={{ width: '76%', maxWidth: 260, height: 'auto' }} />
                <span style={{ fontFamily: `var(--body-font, 'Urbanist'), sans-serif`, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
