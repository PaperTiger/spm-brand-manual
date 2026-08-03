// PDF export for the brand book.
//
// Two entry points: exportCurrentPage (one page, native size) and exportFullBook
// (every page, concatenated onto a uniform page size). Both capture the live DOM
// with html-to-image, so what you see is what you get.

import type { PageRef } from './pageList'

const PX_TO_PT = 72 / 96
const PIXEL_RATIO = 2

const nextFrame = () => new Promise<void>(r => requestAnimationFrame(() => r()))
const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

/**
 * Hides sidebar / mobile header / page-nav so they stay out of the capture.
 * Returns a restore function; always call it in a finally block.
 *
 * Toggles a class on <body> rather than setting inline styles on the elements.
 * During a full-book export React unmounts and remounts PageNav as pages change
 * (it renders null on the cover), which discards any inline style set here —
 * leaking the prev/next nav into every capture after the cover.
 */
export function hideChrome(): () => void {
  const origScrollY = window.scrollY
  document.body.classList.add('pdf-exporting')
  window.scrollTo(0, 0)

  return () => {
    document.body.classList.remove('pdf-exporting')
    window.scrollTo(0, origScrollY)
  }
}

/**
 * Waits until the freshly-navigated section is actually painted: Suspense
 * fallback gone, images decoded. Without this, pages capture half-rendered.
 */
async function settle(main: HTMLElement, timeoutMs = 10000): Promise<void> {
  const deadline = Date.now() + timeoutMs

  // Let React commit the state change and lay out.
  await nextFrame()
  await nextFrame()

  // Suspense fallback still up? The lazy chunk hasn't resolved.
  while (main.querySelector('.section-loading') && Date.now() < deadline) {
    await delay(50)
  }

  // Images: <img> tags resolve async even from cache.
  while (Date.now() < deadline) {
    const pending = Array.from(main.querySelectorAll('img'))
      .filter(img => !img.complete || img.naturalWidth === 0)
    if (pending.length === 0) break
    await Promise.race([
      Promise.all(pending.map(img => new Promise<void>(resolve => {
        img.addEventListener('load', () => resolve(), { once: true })
        img.addEventListener('error', () => resolve(), { once: true })
      }))),
      delay(2000),
    ])
  }

  // One more frame so any layout shift from late images settles.
  await nextFrame()
}

async function capture(main: HTMLElement): Promise<HTMLCanvasElement> {
  const { toCanvas } = await import('html-to-image')
  return toCanvas(main, {
    pixelRatio: PIXEL_RATIO,
    width: main.offsetWidth,
    height: main.scrollHeight,
    backgroundColor: '#ffffff',
  })
}

/** Point dimensions of a captured page, at its true designed height. */
function ptSize(canvas: HTMLCanvasElement) {
  return {
    w: (canvas.width / PIXEL_RATIO) * PX_TO_PT,
    h: (canvas.height / PIXEL_RATIO) * PX_TO_PT,
  }
}

/**
 * Appends one captured page at its native size.
 *
 * Deliberately NOT normalised to a uniform page height. These pages are
 * continuous web layouts of wildly different lengths; forcing them onto a fixed
 * page either slices through swatches and headings mid-element, or scales a
 * 4000px specimen page down until it is unreadable. Native height per page
 * keeps every page exactly as designed.
 *
 * The image extent is read back from jsPDF rather than assumed: passing
 * `format` together with `orientation` can make jsPDF swap the dimensions, and
 * drawing at the requested size onto a swapped page silently crops it.
 */
function addNativePage(
  pdf: import('jspdf').jsPDF,
  canvas: HTMLCanvasElement,
  isFirst: boolean,
): void {
  const { w, h } = ptSize(canvas)
  if (!isFirst) pdf.addPage([w, h], w > h ? 'l' : 'p')
  const pw = pdf.internal.pageSize.getWidth()
  const ph = pdf.internal.pageSize.getHeight()
  pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pw, ph)
}

/** Existing behaviour: current page only, PDF sized to that page's content. */
export async function exportCurrentPage(fileName: string): Promise<void> {
  const main = document.querySelector<HTMLElement>('.main')
  if (!main) return
  const restore = hideChrome()
  await nextFrame()
  await nextFrame()

  try {
    const { default: jsPDF } = await import('jspdf')
    const canvas = await capture(main)
    const { w, h } = ptSize(canvas)
    const pdf = new jsPDF({
      orientation: w > h ? 'l' : 'p',
      unit: 'pt',
      format: [w, h],
      compress: true,
    })
    const pw = pdf.internal.pageSize.getWidth()
    const ph = pdf.internal.pageSize.getHeight()
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pw, ph)
    pdf.save(fileName)
  } finally {
    restore()
  }
}

export interface FullBookOptions {
  pages: PageRef[]
  /** Switches the app to a page. Must be synchronous state, not a promise. */
  goToPage: (id: string) => void
  /** Warms every lazy chunk so Suspense never appears mid-capture. */
  preload: () => Promise<unknown>
  onProgress: (done: number, total: number, label: string) => void
  fileName: string
}

/**
 * Walks every page in reading order and concatenates them into one PDF.
 *
 * Each PDF page keeps its own native height, so the book has variable page
 * sizes — that is intentional. See addNativePage for why uniform pages are
 * wrong for this content.
 *
 * Capture width comes from the live layout, so exporting from a narrow window
 * produces a narrow (mobile-styled) book. Export at desktop width for
 * client-ready output.
 */
export async function exportFullBook(opts: FullBookOptions): Promise<void> {
  const { pages, goToPage, preload, onProgress, fileName } = opts
  const main = document.querySelector<HTMLElement>('.main')
  if (!main) return

  onProgress(0, pages.length, 'Preparing…')
  await preload()
  if (document.fonts?.ready) await document.fonts.ready

  const restore = hideChrome()

  try {
    const { default: jsPDF } = await import('jspdf')
    let pdf: import('jspdf').jsPDF | null = null

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      onProgress(i, pages.length, page.label)

      goToPage(page.id)
      await settle(main)

      const canvas = await capture(main)
      if (!pdf) {
        // Page 1 defines the document; every later page brings its own size.
        const { w, h } = ptSize(canvas)
        pdf = new jsPDF({
          orientation: w > h ? 'l' : 'p',
          unit: 'pt',
          format: [w, h],
          compress: true,
        })
      }
      addNativePage(pdf, canvas, i === 0)
      // Free the backing store before the next capture; 31 full-page canvases
      // at 2x will exhaust memory on lower-end machines otherwise.
      canvas.width = 0
      canvas.height = 0
    }

    onProgress(pages.length, pages.length, 'Saving…')
    pdf?.save(fileName)
  } finally {
    restore()
  }
}
