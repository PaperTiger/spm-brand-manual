import { useState, useEffect } from 'react'
import brand from '../brand.config'

interface Props {
  currentPage: string
  onNavigate: (id: string) => void
  isOpen: boolean
  onClose: () => void
  onPrint?: () => void
  pdfGenerating?: boolean
  onDownloadBook?: () => void
  bookGenerating?: boolean
}

function findActiveGroup(page: string): string | null {
  for (const group of brand.nav) {
    for (const item of group.items) {
      if (item.id === page) return group.group
      if (item.children?.some(c => c.id === page)) return group.group
    }
  }
  return null
}

// The first nav group stays open by default; everything else starts collapsed
// so the sidebar opens on the introduction rather than the full outline.
const PINNED_OPEN = brand.nav[0]?.group

function initialCollapsed(page: string): Set<string> {
  const active = findActiveGroup(page)
  return new Set(
    brand.nav.map(g => g.group).filter(g => g !== PINNED_OPEN && g !== active),
  )
}

function findParentItem(page: string) {
  for (const group of brand.nav) {
    for (const item of group.items) {
      if (item.children?.some(c => c.id === page)) return item.label
    }
  }
  return null
}

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose, onPrint, pdfGenerating, onDownloadBook, bookGenerating }: Props) {
  // One export at a time: either running disables both buttons.
  const busy = !!pdfGenerating || !!bookGenerating
  const [collapsed, setCollapsed] = useState<Set<string>>(() => initialCollapsed(currentPage))
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const parent = findParentItem(currentPage)
    return parent ? new Set([parent]) : new Set()
  })
  const [logoError, setLogoError] = useState(false)
  const hasLogo = !!brand.meta.sidebarLogoImage

  useEffect(() => {
    const active = findActiveGroup(currentPage)
    if (window.innerWidth <= 768) {
      // Mobile keeps it tight: only the active group open.
      setCollapsed(new Set(brand.nav.map(g => g.group).filter(g => g !== active)))
    } else if (active) {
      // Desktop: reveal the group you navigated into, leave any you opened alone.
      setCollapsed(prev => { const n = new Set(prev); n.delete(active); return n })
    }
    const parent = findParentItem(currentPage)
    if (parent) setExpandedItems(prev => { const n = new Set(prev); n.add(parent); return n })
  }, [currentPage])

  const toggle = (g: string) => setCollapsed(prev => {
    const n = new Set(prev)
    n.has(g) ? n.delete(g) : n.add(g)
    return n
  })

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo-wrap" onClick={() => { onNavigate('home'); onClose() }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          {hasLogo && (
            <img
              src={brand.meta.sidebarLogoImage}
              alt={brand.meta.client}
              style={{ height: 40, width: 'auto', display: 'block' }}
              onError={() => { setLogoError(true) }}
            />
          )}
          {(!hasLogo || logoError) && (
            <div style={{ fontFamily: `var(--display-font, 'DM Sans'), sans-serif`, fontWeight: 600, fontSize: 15,
              letterSpacing: '-0.02em', color: 'var(--charcoal, #283F1A)', lineHeight: 1 }}>
              {brand.meta.nameLine1}{brand.meta.nameLine2 ? ' ' + brand.meta.nameLine2 : ''}
            </div>
          )}
        </div>
        <button className="sidebar-close" onClick={e => { e.stopPropagation(); onClose() }} aria-label="Close menu">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <nav className="nav-groups" style={{ flex: 1 }}>
        {brand.nav.map(group => {
          const isCollapsed = collapsed.has(group.group)
          return (
            <div key={group.group}>
              <div className="nav-group-label nav-group-toggle" onClick={() => toggle(group.group)}>
                <span>{group.group}</span>
                <svg className={`nav-group-chevron ${isCollapsed ? 'collapsed' : ''}`}
                  width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {!isCollapsed && group.items.map(item => {
                if (item.children) {
                  const isExpanded = expandedItems.has(item.label)
                  const hasActiveChild = item.children.some(c => c.id === currentPage)
                  const expandItem = () => {
                    setExpandedItems(prev => { const n = new Set(prev); n.add(item.label); return n })
                    onNavigate(item.id)
                    onClose()
                  }
                  return (
                    <div key={item.id}>
                      <span
                        className={`nav-link nav-parent-item ${hasActiveChild ? 'active' : ''}`}
                        onClick={expandItem}
                      >
                        <span>{item.label}</span>
                        <svg className={`nav-item-chevron ${isExpanded ? 'open' : ''}`}
                          width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {isExpanded && item.children.map(child => (
                        <span
                          key={child.id}
                          className={`nav-link nav-child ${currentPage === child.id ? 'active' : ''}`}
                          onClick={() => { onNavigate(child.id); onClose() }}
                        >{child.label}</span>
                      ))}
                    </div>
                  )
                }
                return (
                  <span
                    key={item.id}
                    className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                    onClick={() => { onNavigate(item.id); onClose() }}
                  >{item.label}</span>
                )
              })}
            </div>
          )
        })}
      </nav>

      <div className="sidebar-print-footer">
        <button
          className="sidebar-print-btn"
          onClick={() => onPrint?.()}
          disabled={busy}
          style={{ opacity: busy ? 0.5 : undefined, cursor: busy ? 'default' : undefined }}
        >
          {pdfGenerating ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ animation: 'spin 1s linear infinite' }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10"/>
              </svg>
              Generating…
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download this page
            </>
          )}
        </button>

        <button
          className="sidebar-print-btn sidebar-book-btn"
          onClick={() => onDownloadBook?.()}
          disabled={busy}
          style={{ opacity: busy ? 0.5 : undefined, cursor: busy ? 'default' : undefined }}
        >
          {bookGenerating ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ animation: 'spin 1s linear infinite' }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10"/>
              </svg>
              Building…
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Download full book
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
