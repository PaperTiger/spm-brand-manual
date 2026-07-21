import brand from '../../brand.config'

export default function ViIntro() {
  return (
    <div className="intro-layout">
      <div className="section-label">Visual identity</div>

      <p className="intro-statement">
        The {brand.meta.client} visual identity is a complete, interconnected system.
        Every element (the wordmark, the mark, the color palette, the typography)
        is built to work individually and together across every surface, channel, and application.
      </p>

      <div className="intro-spacer" style={{ flex: 1 }} />

      <div className="intro-body">
        <p>
          The system follows a clear architecture: one confident master brand that every team
          and channel can work within, without fragmenting. The mark anchors the system;
          the palette gives it range; the typefaces give it clarity.
        </p>
        <p>
          This document is the authoritative reference for how the {brand.meta.client} brand
          looks, feels, and behaves across every touchpoint. When in doubt, come back here.
        </p>
      </div>
    </div>
  )
}
