import brand from '../../brand.config'

const base = import.meta.env.BASE_URL

// The wide symbol-mask banner leads the section full width; the rest fall
// into the masonry grid beneath it.
const BANNER = 'banner-symbol-masks.webp'

export default function AppExamples() {
  const { client } = brand.meta
  const apps = brand.images.applications
  const rest = apps.filter(f => f !== BANNER)
  const hasBanner = apps.includes(BANNER)

  return (
    <div>
      {hasBanner && (
        <img
          src={`${base}images/applications/${BANNER}`}
          alt={`${client} symbol masks over photography`}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      )}

      <div className="page">
        <div className="section-label">Applications</div>
        <h2 className="section-title">Examples</h2>
        <p className="section-intro">
          The {client} system applied across pitch decks, social media, merchandise,
          and digital media.
        </p>

        <div className="masonry-grid" style={{ margin: '0 0 80px' }}>
          {rest.map(f => (
            <img key={f} src={`${base}images/applications/${f}`} alt="Application example" />
          ))}
        </div>
      </div>
    </div>
  )
}
