import brand from '../../brand.config'

export default function IconIntro() {
  const client = brand.meta.client
  const paths = [
    "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    "M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z",
    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    "M3 12h18M3 6h18M3 18h18",
    "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11h2v6h-2zm0-4h2v2h-2z",
    "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z",
    "M4 4h16v16H4z M9 9h6v6H9z",
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    "M5 12h14M12 5l7 7-7 7",
    "M12 5v14M5 12l7 7 7-7",
  ]

  return (
    <div className="intro-layout">
      <div className="section-label">Iconography</div>
      <p className="intro-statement">
        Inspired by the logo mark, our iconography uses simple geometric forms to communicate quickly and consistently.
      </p>
      <div style={{ flex: 1 }} className="intro-spacer" />
      <div className="intro-body">
        <p>
          The {client} icon system is built from the same geometric language as the mark. Icons sit on a
          consistent 24px grid with a 1.5px stroke weight, so they feel native to the brand rather than borrowed
          from a generic library.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 1, background: "#E5E5E5", marginTop: 32, marginBottom: 20 }}>
          {paths.map((p, i) => (
            <div key={i} style={{ background: "#F8F8F8", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={p} />
              </svg>
            </div>
          ))}
        </div>
        <a href="/downloads/brand-icons.zip" download className="dl-btn" style={{ marginBottom: 20 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download icon set
        </a>
        <div className="placeholder-badge">
          <strong>Placeholder icon set.</strong> Replace with the real {client} icon library before publishing.
        </div>
      </div>
    </div>
  )
}
