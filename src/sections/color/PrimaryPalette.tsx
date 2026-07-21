import brand from '../../brand.config'
import ColorSwatch from '../../components/ui/ColorSwatch'

export default function PrimaryPalette() {
  return (
    <>
      <div className="page" style={{ paddingBottom: 24 }}>
        <div className="section-label">Color</div>
        <h2 className="section-title">Primary palette</h2>
        <p className="section-intro" style={{ marginBottom: 0 }}>
          The primary palette is the anchor of the brand system. These colors appear across
          all {brand.meta.client} communications and establish the visual baseline every
          touchpoint builds from.
        </p>
      </div>
      <div className="palette-grid palette-grid--primary">
        {brand.colors.primary.map(color => (
          <ColorSwatch key={color.hex} color={color} />
        ))}
      </div>
    </>
  )
}
