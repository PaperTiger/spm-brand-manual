import brand from '../../brand.config'

const base = import.meta.env.BASE_URL

const PLACEHOLDERS = [
  '600/400','600/600','600/400','600/600',
  '600/400','600/600','600/400','600/600',
].map((size, i) => `https://picsum.photos/seed/${201 + i}/${size}`)

export default function AppExamples() {
  const { client } = brand.meta
  const apps = brand.images.applications
  const hasReal = apps.length > 0

  return (
    <div className="page">
      <div className="section-label">Applications</div>
      <h2 className="section-title">Examples</h2>
      <p className="section-intro">
        The {client} system applied across pitch decks, social media, merchandise,
        and digital media. Examples will be updated as real assets are produced.
      </p>
      <div className="masonry-grid" style={{ margin: '0 0 80px' }}>
        {hasReal
          ? apps.map(f => (
              <img key={f} src={`${base}images/applications/${f}`} alt="Application example" />
            ))
          : PLACEHOLDERS.map((src, i) => (
              <img key={i} src={src} alt="Application example" />
            ))
        }
      </div>
      {!hasReal && (
        <div className="placeholder-badge">
          <strong>Placeholder mockups.</strong> Replace with real {client} application examples before publishing.
        </div>
      )}
    </div>
  )
}
