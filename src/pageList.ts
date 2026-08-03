import brand from './brand.config'

export interface PageRef { id: string; label: string }

// Flattens the nav into reading order. Shared by PageNav (prev/next) and the
// full-book PDF export so the two can never disagree about page order.
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

/** Interior pages, in reading order. Excludes the cover. */
export const PAGE_LIST = buildPageList()

/** Every page of the book, cover first — the sequence the full-book PDF follows. */
export const BOOK_PAGES: PageRef[] = [{ id: 'home', label: 'Cover' }, ...PAGE_LIST]
