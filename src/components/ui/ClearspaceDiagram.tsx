import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

interface Props {
  logoSrc: string
  logoAlt: string
  /**
   * x expressed against the artwork's own geometry:
   *   capRatio = x (in viewBox units) / viewBox width
   *
   * SPM defines x as half the height of the mark, so for the full lockup
   * (viewBox 1440x450, mark 450 tall) that is (450 / 2) / 1440 = 0.15625.
   *
   * Storing a ratio rather than a pixel value is the whole point: clearspace
   * is defined proportionally but CSS padding is absolute, so a hardcoded
   * `--cs-x` is only correct at one rendered size. It looks right on the
   * desktop screenshot everyone reviews and drifts everywhere else.
   */
  capRatio: number
  /** Desktop width cap. Narrow viewports fall back to `vwCap`. */
  maxWidth: number
  /** Viewport-relative cap, so wide lockups can shrink on small screens. */
  vwCap?: number
  defLabel: string
}

export default function ClearspaceDiagram({
  logoSrc, logoAlt, capRatio, maxWidth, vwCap = 60, defLabel,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null)
  const zoneRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const zone = zoneRef.current
    const img = imgRef.current
    if (!outer || !zone || !img) return

    const sync = () => {
      // The zone's padding is part of the image's width budget, so setting
      // --cs-x changes the width that --cs-x was derived from. It converges
      // fast; a single pass lands measurably short.
      for (let i = 0; i < 4; i++) {
        const w = img.getBoundingClientRect().width
        if (!w) return                       // hidden panel: recompute when shown
        zone.style.setProperty('--cs-x', `${(capRatio * w).toFixed(2)}px`)
      }
    }

    sync()
    // Observing the outer container rather than the image avoids feeding the
    // padding change back into the observer, and still fires on viewport
    // resize and when a hidden section becomes visible.
    const ro = new ResizeObserver(sync)
    ro.observe(outer)
    img.addEventListener('load', sync)
    return () => {
      ro.disconnect()
      img.removeEventListener('load', sync)
    }
  }, [capRatio, logoSrc])

  // Pre-paint fallback, correct at the desktop cap until the effect runs.
  const fallback = { '--cs-x': `${(capRatio * maxWidth).toFixed(2)}px` } as CSSProperties

  return (
    <div className="cs-outer" ref={outerRef}>
      <div className="cs-zone" ref={zoneRef} style={fallback}>
        <div className="cs-logo-box">
          <img
            ref={imgRef}
            src={logoSrc}
            alt={logoAlt}
            style={{
              width: '100%',
              maxWidth: `min(${maxWidth}px, ${vwCap}vw)`,
              height: 'auto',
              display: 'block',
            }}
          />
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
