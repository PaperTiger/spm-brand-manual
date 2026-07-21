import { useEffect, useRef, useState } from 'react'
import brand from '../../brand.config'

const base = import.meta.env.BASE_URL
const SANS = `var(--body-font, 'Urbanist'), sans-serif`

interface Clip {
  src: string
  label: string
  /** Intrinsic ratio, so the box holds its space before metadata loads. */
  ar: number
}

// Display order, not filename order: motion-4 sits second.
const TOP: Clip[] = [
  { src: 'motion-top-1.mp4', label: 'Symbols masking photography, landscape', ar: 1646 / 718 },
  { src: 'motion-4.mp4',     label: 'Motion 4, landscape', ar: 2030 / 1080 },
  { src: 'motion-top-2.mp4', label: 'Symbol tiles scrolling, wide banner', ar: 2770 / 498 },
]

const COLS: Clip[] = [
  { src: 'motion-col-1.mp4', label: 'Vertical cut, 1', ar: 780 / 1080 },
  { src: 'motion-col-2.mp4', label: 'Vertical cut, 2', ar: 780 / 1080 },
  { src: 'motion-col-3.mp4', label: 'Vertical cut, 3', ar: 780 / 1080 },
]

/**
 * Autoplay comes with three constraints, all handled here:
 *  - Browsers only autoplay muted video, so `muted` is not optional.
 *  - iOS needs `playsInline` or it takes the video fullscreen.
 *  - Anyone who has asked their OS to reduce motion should not be handed
 *    looping video, so those users get a paused clip with controls instead.
 * Playback is also tied to visibility: with 14MB of video on one page, clips
 * off screen stay paused rather than decoding in the background.
 */
function Clip({ clip, reduced }: { clip: Clip; reduced: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <div style={{ minWidth: 0 }}>
      <video
        ref={ref}
        src={`${base}motion/${clip.src}`}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        controls={reduced}
        preload="metadata"
        aria-label={clip.label}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          aspectRatio: String(clip.ar),
          background: 'var(--salt, #FCFBF0)',
          border: '1px solid #E5E2D6',
        }}
      />
    </div>
  )
}

export default function Motion() {
  const available = new Set(brand.images.motion ?? [])
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const top = TOP.filter(c => available.has(c.src))
  const cols = COLS.filter(c => available.has(c.src))

  return (
    <div className="page">
      <div className="section-label">Motion</div>
      <h2 className="section-title">Motion</h2>
      <p className="section-intro">
        Motion gives the symbols somewhere to go. The clips below are the approved set, in
        landscape, wide banner, and vertical formats. All of them loop silently.
      </p>

      {top.map(c => (
        <div key={c.src} style={{ marginBottom: 40 }}>
          <Clip clip={c} reduced={reduced} />
        </div>
      ))}

      {cols.length > 0 && (
        <div className="motion-cols">
          {cols.map(c => <Clip key={c.src} clip={c} reduced={reduced} />)}
        </div>
      )}

      <div className="content-block">
        <h3 style={{ fontFamily: `var(--display-font, 'Urbanist'), sans-serif`, fontWeight: 600, fontSize: 17, margin: '0 0 16px', color: 'var(--charcoal)' }}>
          In short
        </h3>
        <ul style={{ fontFamily: SANS, fontWeight: 500, fontSize: 15, lineHeight: 1.4, color: '#333', maxWidth: 620, paddingLeft: 20, margin: 0 }}>
          <li>Clips loop silently. Nothing in the system relies on sound to make sense.</li>
          <li>Hold the approved colour pairings through the whole sequence, including transitions.</li>
          <li>Use the vertical cuts for social, the landscape and banner formats for web headers.</li>
        </ul>
      </div>
    </div>
  )
}
