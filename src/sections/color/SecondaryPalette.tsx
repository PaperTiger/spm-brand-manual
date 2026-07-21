import brand from '../../brand.config'
import ColorSwatch from '../../components/ui/ColorSwatch'

export default function SecondaryPalette() {
  return (
    <>
      <div className="page" style={{ paddingBottom: 24 }}>
        <div className="section-label">Color</div>
        <h2 className="section-title">Secondary palette</h2>
        <p className="section-intro" style={{ marginBottom: 0 }}>
          Secondary colors extend the system into accent moments: highlights, callouts,
          and supporting graphics. Use them to complement the primary palette, not compete with it.
        </p>
      </div>
      <div className="palette-grid palette-grid--secondary">
        {brand.colors.secondary.map(color => (
          <ColorSwatch key={color.hex} color={color} />
        ))}
      </div>
    </>
  )
}
