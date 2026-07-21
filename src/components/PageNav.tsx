import brand from '../brand.config'

interface PageRef { id: string; label: string }

function buildPageList(): PageRef[] {
  const pages: PageRef[] = []
  for (const group of brand.nav) {
    for (const item of group.items) {
      if (item.children) {
        // Parent shares its id with the first child — skip parent, push children only
        for (const child of item.children) {
          pages.push({ id: child.id, label: child.label })
        }
      } else {
        pages.push({ id: item.id, label: item.label })
      }
    }
  }
  return pages
}

const PAGE_LIST = buildPageList()

interface Props {
  currentPage: string
  onNavigate: (id: string) => void
}

export default function PageNav({ currentPage, onNavigate }: Props) {
  const idx = PAGE_LIST.findIndex(p => p.id === currentPage)
  if (idx === -1) return null  // cover page — no pagination

  const prev = idx > 0 ? PAGE_LIST[idx - 1] : null
  const next = idx < PAGE_LIST.length - 1 ? PAGE_LIST[idx + 1] : null
  if (!prev && !next) return null

  return (
    <nav className="page-nav no-print" aria-label="Page navigation">
      {prev ? (
        <button className="page-nav-link page-nav-prev" onClick={() => onNavigate(prev.id)}>
          <span className="page-nav-dir">← Previous</span>
          <span className="page-nav-label">{prev.label}</span>
        </button>
      ) : <span />}
      {next && (
        <button className="page-nav-link page-nav-next" onClick={() => onNavigate(next.id)}>
          <span className="page-nav-dir">Next →</span>
          <span className="page-nav-label">{next.label}</span>
        </button>
      )}
    </nav>
  )
}
