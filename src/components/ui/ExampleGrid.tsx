import type { CSSProperties } from 'react'

const SANS = `var(--body-font, 'Urbanist'), sans-serif`
const DO_COLOR = '#2E7D32'
const DONT_COLOR = '#C62828'

export interface ExampleItem {
  /** Filename within `dir`, or a full path when `dir` is omitted. */
  src: string
  /** Caption text, excluding the leading DO / DO NOT label. */
  caption: string
  /** false renders a DO NOT example with a cross overlay. Defaults to true. */
  ok?: boolean
  /** Columns to span on wide viewports. Defaults to 1. */
  span?: number
  alt?: string
}

interface Props {
  items: ExampleItem[]
  /** Folder under public/images/, e.g. "photography". */
  dir?: string
  /** Minimum column width before the grid reflows. */
  minColumn?: number
  /** Fixed frame ratio so rows line up despite mixed source ratios. */
  aspect?: string
  /**
   * "cover" crops to fill the frame: right for photography, where the subject
   * survives a crop. "contain" letterboxes against the Salt ground: right for
   * graphics and pattern tiles, where cropping would cut the artwork.
   */
  fit?: 'cover' | 'contain'
  style?: CSSProperties
}

/* Decorative cross over DO NOT examples, matching the stylesheet's treatment.
   The DO NOT label carries the meaning for screen readers. */
function Cross() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <line x1="0" y1="0" x2="100" y2="100" stroke="#283F1A" strokeOpacity="0.28" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="0" x2="0" y2="100" stroke="#283F1A" strokeOpacity="0.28" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default function ExampleGrid({ items, dir, minColumn = 260, aspect = '4 / 3', fit = 'cover', style }: Props) {
  const base = import.meta.env.BASE_URL
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minColumn}px, 1fr))`,
        gap: '32px 24px',
        ...style,
      }}
    >
      {items.map((item, i) => {
        const isDo = item.ok !== false
        const src = dir ? `${base}images/${dir}/${item.src}` : item.src
        return (
          <figure
            key={`${item.src}-${i}`}
            style={{ margin: 0, gridColumn: item.span && item.span > 1 ? `span ${item.span}` : undefined }}
          >
            <div style={{ position: 'relative', background: 'var(--salt, #FCFBF0)', border: '1px solid #E5E2D6', aspectRatio: aspect, overflow: 'hidden' }}>
              <img
                src={src}
                alt={item.alt ?? item.caption}
                loading="lazy"
                style={{ display: 'block', width: '100%', height: '100%', objectFit: fit }}
              />
              {!isDo && <Cross />}
            </div>
            <figcaption
              style={{
                fontFamily: SANS, fontSize: 12.5, lineHeight: 1.4,
                color: '#4D4D4D', margin: '10px 0 0',
              }}
            >
              <strong style={{ color: isDo ? DO_COLOR : DONT_COLOR, fontWeight: 700 }}>
                {isDo ? 'DO' : 'DO NOT'}
              </strong>{' '}
              {item.caption}
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}
