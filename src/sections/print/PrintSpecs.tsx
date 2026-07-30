import brand from '../../brand.config'

const t = brand.tokens

const printSpecs = [
  { spec: 'Color mode',   value: 'CMYK: convert all files from RGB before sending to press' },
  { spec: 'Resolution',   value: '300 DPI minimum for raster graphics and photography' },
  { spec: 'Bleed',        value: '3mm on all sides beyond the finished trim edge' },
  { spec: 'Safe area',    value: '6mm inset from the trim edge for all live text and logos' },
  { spec: 'File format',  value: 'PDF/X-1a or PDF/X-4 for commercial press; standard PDF for office print' },
  { spec: 'Paper stock',  value: 'Silk coated 150gsm for brochures; uncoated 120gsm for documents' },
]

const digitalSpecs = [
  { spec: 'Color mode',   value: 'sRGB: all web and screen assets must use the sRGB color space' },
  { spec: 'Resolution',   value: '72–144 DPI; supply @2x assets for retina and HiDPI displays' },
  { spec: 'Logo format',  value: 'SVG always. Never screenshot or re-export logos as PNG from screen.' },
  { spec: 'Photos',       value: 'WebP (preferred) or JPEG at 85% quality; PNG for transparency' },
  { spec: 'Video',        value: 'MP4/H.264 at 1920×1080; provide captions and audio description' },
  { spec: 'Presentations', value: '16:9 widescreen at 1920×1080 (Keynote or PowerPoint)' },
]

function SpecTable({ rows }: { rows: { spec: string; value: string }[] }) {
  return (
    <div>
      {rows.map((row, i) => (
        <div key={row.spec} style={{
          display: "grid", gridTemplateColumns: "140px 1fr",
          padding: "13px 24px",
          borderBottom: i < rows.length - 1 ? "1px solid #E5E5E5" : undefined,
        }}>
          <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 11, fontWeight: 700,
            color: "#283F1A", textTransform: "uppercase", letterSpacing: "0.05em", paddingTop: 1 }}>
            {row.spec}
          </div>
          <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 13, color: "#283F1A",
            lineHeight: 1.4 }}>{row.value}</div>
        </div>
      ))}
    </div>
  )
}

export default function PrintSpecs() {
  return (
    <div className="page">
      <div className="section-label">Print &amp; export</div>
      <h2 className="section-title">Specifications</h2>
      <p className="section-intro">
        The brand identity is engineered for consistent reproduction across print and digital formats.
        Follow these specifications to ensure color accuracy, sharpness, and correct file preparation.
      </p>

      {/* Spec tables */}
      <div className="print-specs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 56 }}>
        {[
          { label: 'Print', rows: printSpecs },
          { label: 'Digital', rows: digitalSpecs },
        ].map(section => (
          <div key={section.label} style={{ border: "1px solid #E5E5E5" }}>
            <div style={{ background: t['dark-blue'], padding: "13px 24px" }}>
              <div style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 600, fontSize: 12,
                letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>
                {section.label}
              </div>
            </div>
            <SpecTable rows={section.rows} />
          </div>
        ))}
      </div>

      {/* Safe area diagram */}
      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 40, marginBottom: 56 }}>
        <h3 style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 500, fontSize: 17,
          margin: '0 0 8px', color: '#283F1A' }}>Print safe area</h3>
        <p style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 14, color: '#283F1A',
          lineHeight: 1.4, marginBottom: 28, maxWidth: 520 }}>
          For any printed document using the brand identity, always set up bleed and safe area
          zones in your layout application before placing artwork.
        </p>
        <div className="print-safe-area-box" style={{ border: "1px solid #E5E5E5", padding: 40, display: "inline-flex",
          alignItems: "center", gap: 40 }}>
          <svg viewBox="0 0 280 210" width="280" height="210"
            style={{ display: "block", flexShrink: 0, fontFamily: `var(--body-font, 'Inter'), sans-serif` }}>
            {/* Bleed */}
            <rect x="8" y="8" width="264" height="194"
              fill={`color-mix(in srgb, ${t['brand-accent']} 7%, white)`}
              stroke={t['brand-accent']} strokeWidth="1" strokeDasharray="5,3" />
            {/* Trim */}
            <rect x="20" y="20" width="240" height="170"
              fill="white" stroke="#AAAAAA" strokeWidth="1" />
            {/* Safe */}
            <rect x="34" y="34" width="212" height="142"
              fill={`color-mix(in srgb, ${t['brand-accent']} 4%, white)`}
              stroke="#22C55E" strokeWidth="1" strokeDasharray="4,2" />

            {/* Labels */}
            <text x="140" y="17" textAnchor="middle" fontSize="8.5"
              fill={t['brand-accent']} fontWeight="600">Bleed +3mm</text>
            <text x="140" y="30" textAnchor="middle" fontSize="8"
              fill="#283F1A">Trim edge</text>
            <text x="140" y="112" textAnchor="middle" fontSize="9"
              fill="#22C55E" fontWeight="600">Safe area</text>
            <text x="140" y="125" textAnchor="middle" fontSize="7.5"
              fill="#283F1A">Live text and logos stay inside</text>

            {/* Dim: bleed arrow */}
            <line x1="8" y1="205" x2="20" y2="205" stroke={t['brand-accent']} strokeWidth="0.75" />
            <text x="14" y="212" textAnchor="middle" fontSize="7"
              fill={t['brand-accent']}>3mm</text>
            {/* Dim: safe arrow */}
            <line x1="20" y1="205" x2="34" y2="205" stroke="#22C55E" strokeWidth="0.75" />
            <text x="27" y="212" textAnchor="middle" fontSize="7"
              fill="#22C55E">6mm</text>
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { color: t['brand-accent'], dash: true,  label: 'Bleed edge: extend background to here (+3mm)' },
              { color: '#AAAAAA',         dash: false, label: 'Trim edge: the final cut line' },
              { color: '#22C55E',         dash: true,  label: 'Safe area: keep all live content inside' },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="10" viewBox="0 0 24 10">
                  <line x1="0" y1="5" x2="24" y2="5" stroke={item.color} strokeWidth="1.5"
                    strokeDasharray={item.dash ? "4,3" : undefined} />
                </svg>
                <div style={{ fontFamily: `var(--body-font, 'Inter'), sans-serif`, fontSize: 12, color: "#283F1A",
                  lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
