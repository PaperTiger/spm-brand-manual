import brand from '../../brand.config'

const logoSrc = brand.meta.sidebarLogoImage
const MARGIN = 25

function MarginGuides() {
  const line = { position: 'absolute' as const, background: '#ccc', zIndex: 1 }
  return (
    <>
      <div style={{ ...line, top: MARGIN,    left: 0,    right: 0,   height: 1 }} />
      <div style={{ ...line, bottom: MARGIN, left: 0,    right: 0,   height: 1 }} />
      <div style={{ ...line, left: MARGIN,   top: 0,     bottom: 0,  width: 1 }} />
      <div style={{ ...line, right: MARGIN,  top: 0,     bottom: 0,  width: 1 }} />
    </>
  )
}

// wrapper div takes the % width (resolved against the positioned PositioningBox),
// then the img fills 100% of that wrapper — avoids the circular % resolution bug
function Logo({ pct, pos }: { pct: number; pos: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', width: `${pct}%`, zIndex: 2, ...pos }}>
      <img
        src={logoSrc}
        alt={brand.meta.client}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
}

function PositioningBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'relative',
      aspectRatio: '4/3',
      background: '#F4F4F4',
      border: '1px solid #E5E5E5',
      borderRadius: 8,
      overflow: 'hidden',
      flex: 1,
      minWidth: 0,
      backgroundImage: [
        'linear-gradient(to right, #e5e5e5 1px, transparent 1px)',
        'linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
      ].join(', '),
      backgroundSize: '25% 33.333%',
    }}>
      <MarginGuides />
      {children}
    </div>
  )
}

export default function LogoPositioning() {
  const { client } = brand.meta

  return (
    <div className="page">
      <div className="section-label">Logo &amp; mark</div>
      <h2 className="section-title">Logo positioning</h2>
      <p className="section-intro">
        The {client} logo is most effective when anchored to a corner or centered on the page.
        Avoid placing it in unconstrained or arbitrary positions.
      </p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Corners */}
        <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 13, color: '#6B6B6B', margin: 0 }}>
            The logo can appear in the corners
          </p>
          <PositioningBox>
            <Logo pct={33} pos={{ top: MARGIN,    left: MARGIN  }} />
            <Logo pct={25} pos={{ top: MARGIN,    right: MARGIN }} />
            <Logo pct={25} pos={{ bottom: MARGIN, left: MARGIN  }} />
            <Logo pct={33} pos={{ bottom: MARGIN, right: MARGIN }} />
          </PositioningBox>
        </div>

        {/* Center */}
        <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 13, color: '#6B6B6B', margin: 0 }}>
            or central to the page
          </p>
          <PositioningBox>
            <Logo pct={25} pos={{ top: MARGIN,           left: '50%', transform: 'translateX(-50%)' }} />
            <Logo pct={33} pos={{ top: '50%',            left: '50%', transform: 'translate(-50%, -50%)' }} />
            <Logo pct={25} pos={{ bottom: MARGIN,        left: '50%', transform: 'translateX(-50%)' }} />
          </PositioningBox>
        </div>
      </div>
    </div>
  )
}
