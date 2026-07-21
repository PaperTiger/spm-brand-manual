interface Props {
  logoSrc: string
  logoAlt: string
  csX: number
  logoMaxHeight?: number
  defLabel: string
}

export default function ClearspaceDiagram({ logoSrc, logoAlt, csX, logoMaxHeight = 68, defLabel }: Props) {
  return (
    <div className="cs-outer">
      <div className="cs-zone" style={{ '--cs-x': `${csX}px` } as React.CSSProperties}>
        <div className="cs-logo-box">
          <img src={logoSrc} alt={logoAlt} style={{ maxHeight: logoMaxHeight, width: 'auto', display: 'block' }} />
        </div>
        <div className="cs-dim-v top"><span className="cs-lbl">x</span></div>
        <div className="cs-dim-v bottom"><span className="cs-lbl">x</span></div>
        <div className="cs-dim-h left"><span className="cs-lbl">x</span></div>
        <div className="cs-dim-h right"><span className="cs-lbl">x</span></div>
      </div>
      <div className="cs-def">
        <span className="cs-def-x">x</span>
        <span>= {defLabel}</span>
      </div>
    </div>
  )
}
