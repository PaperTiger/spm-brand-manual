import type { CSSProperties } from 'react'

const SANS = `var(--display-font, 'Urbanist'), sans-serif`
const SERIF = `'Old Standard TT', Georgia, serif`

const LONG = 'SPM is a strategy-led PR agency for consumer brands, where cultural intelligence and AI visibility drive business results.'
const SHORT = 'SPM is a strategy-led PR agency for consumer brands.'

interface AvoidItem {
  /** What is wrong, and what to do instead. */
  label: string
  /** The text shown, chosen so the fault is actually visible. */
  text: string
  style: CSSProperties
}

// Every example has to demonstrate its own fault, so the specimen and the
// measure are picked per item: the leading example needs text that wraps,
// the tracking examples need enough words to see the rhythm break.
const avoidItems: AvoidItem[] = [
  {
    label: 'Don\'t set long headlines in Old Standard TT. It is an accent face: use Urbanist for anything that runs past a few words.',
    text: LONG,
    style: { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 26, lineHeight: 1.1, maxWidth: 560 },
  },
  {
    label: 'Don\'t use title case. SPM sets headlines and labels in sentence case.',
    text: 'SPM Is A Strategy-Led PR Agency For Consumer Brands.',
    style: { fontFamily: SANS, fontWeight: 600, fontSize: 26, letterSpacing: '-0.02em', maxWidth: 560 },
  },
  {
    label: 'Don\'t run Urbanist below weight 500. Medium is the lightest weight in the brand.',
    text: SHORT,
    style: { fontFamily: SANS, fontWeight: 200, fontSize: 26, letterSpacing: '-0.02em', maxWidth: 560 },
  },
  {
    label: 'Don\'t use ultra-tight letter-spacing on body copy. Body sets at +1%, not negative.',
    text: LONG,
    style: { fontFamily: SANS, fontWeight: 500, fontSize: 16, letterSpacing: '-0.08em', lineHeight: 1.4, maxWidth: 560 },
  },
  {
    label: 'Don\'t use very loose tracking on display text. Display sets at -3%.',
    text: SHORT,
    style: { fontFamily: SANS, fontWeight: 550, fontSize: 26, letterSpacing: '0.18em', maxWidth: 560 },
  },
  {
    label: 'Don\'t set body copy in all caps. Reserve uppercase for short eyebrow labels.',
    text: LONG,
    style: { fontFamily: SANS, fontWeight: 500, fontSize: 16, textTransform: 'uppercase', lineHeight: 1.4, maxWidth: 560 },
  },
  {
    label: 'Don\'t set leading below 100% on text that wraps. Body copy sets at 140%.',
    text: LONG,
    style: { fontFamily: SANS, fontWeight: 500, fontSize: 18, lineHeight: 0.8, maxWidth: 420 },
  },
]

export default function TypeAvoid() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">What to avoid</h2>
      <p className="section-intro">
        Each example below breaks one rule from the type scale. They undermine legibility and
        brand consistency, and most of them are the kind of thing that creeps in when copy is
        pasted between tools.
      </p>
      <div style={{ borderTop: '1px solid #E5E2D6' }}>
        {avoidItems.map(item => (
          <div key={item.label} style={{ padding: '28px 0', borderBottom: '1px solid #E5E2D6' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FBEFEF', padding: '2px 8px', borderRadius: 3, marginBottom: 14 }}>
              <span style={{ color: '#C62828', fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>DON'T</span>
            </div>
            <div style={{ ...item.style, color: 'var(--charcoal)', marginBottom: 12 }}>{item.text}</div>
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 12.5, lineHeight: 1.4, color: '#4D4D4D', maxWidth: 560 }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
