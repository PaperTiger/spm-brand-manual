import brand from '../../brand.config'

const base = import.meta.env.BASE_URL

const PLACEHOLDERS = [
  '600/800','600/400','600/400','600/800','600/400','600/400',
  '600/800','600/400','600/400','600/800','600/400','600/400',
  '600/800','600/400','600/400','600/800','600/400',
].map((size, i) => `https://picsum.photos/seed/${101 + i}/${size}`)

export default function PhotoExamples() {
  const { client } = brand.meta
  const photos = brand.images.photography
  const hasReal = photos.length > 0

  return (
    <div className="page">
      <div className="section-label">Photography</div>
      <h2 className="section-title">Examples</h2>
      <p className="section-intro">
        Environmental and candid photography: real teams at work, natural light,
        and clean product shots. Use across print collateral, digital backgrounds,
        and report covers.
      </p>
      <div className="masonry-grid" style={{ margin: '0 0 80px' }}>
        {hasReal
          ? photos.map(f => (
              <img key={f} src={`${base}images/photography/${f}`} alt="Photography example" />
            ))
          : PLACEHOLDERS.map((src, i) => (
              <img key={i} src={src} alt="Photography example" />
            ))
        }
      </div>
      {!hasReal && (
        <div className="placeholder-badge">
          <strong>Placeholder imagery.</strong> Replace with real {client} photography before publishing.
        </div>
      )}
    </div>
  )
}
