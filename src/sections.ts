import { lazy } from 'react'

// Importers are kept separate from the lazy() wrappers so callers that need every
// section mounted at once (the print view, the client-side full-book export) can
// warm the chunks up front instead of hitting a Suspense fallback per page.
type SectionImporter = () => Promise<{ default: () => React.ReactElement }>

export const SECTION_IMPORTERS: Record<string, SectionImporter> = {
  home:                  () => import('./sections/home/Cover'),
  'vi-intro':            () => import('./sections/home/ViIntro'),
  'logo-horizontal':     () => import('./sections/logo/FullLogo'),
  'logo-compact':        () => import('./sections/logo/CompactLogo'),
  'h-logo-mark':         () => import('./sections/logo/LogoMark'),
  'logo-avatar':         () => import('./sections/logo/LogoAvatar'),
  'logo-positioning':    () => import('./sections/logo/LogoPositioning'),
  'logo-avoid':          () => import('./sections/logo/LogoAvoid'),
  'color-intro':         () => import('./sections/color/ColorIntro'),
  'primary-palette':     () => import('./sections/color/PrimaryPalette'),
  'secondary-palette':   () => import('./sections/color/SecondaryPalette'),
  'color-combinations':  () => import('./sections/color/ColorCombinations'),
  'color-pathways':      () => import('./sections/color/ColorPathways'),
  'type-intro':          () => import('./sections/typography/TypeIntro'),
  'fg-overview':         () => import('./sections/typography/TypeOverview'),
  'fg-usage':            () => import('./sections/typography/TypeUsage'),
  'fg-specimen':         () => import('./sections/typography/TypeSpecimen'),
  'fg-scale':            () => import('./sections/typography/TypeScale'),
  'google-fallback':     () => import('./sections/typography/GoogleFallback'),
  'type-fallback':       () => import('./sections/typography/SystemFallback'),
  'type-oldstandard':    () => import('./sections/typography/OldStandard'),
  'type-pairing':        () => import('./sections/typography/TypePairing'),
  'type-emphasis':       () => import('./sections/typography/TypeEmphasis'),
  'type-avoid':          () => import('./sections/typography/TypeAvoid'),
  'photo-dos':           () => import('./sections/photography/PhotoDos'),
  'symbols':             () => import('./sections/symbols/Symbols'),
  'pattern':             () => import('./sections/symbols/Pattern'),
  'motion':              () => import('./sections/motion/Motion'),
  'logo-cobranding':     () => import('./sections/logo/Cobranding'),
  'dataviz-colors':      () => import('./sections/dataviz/DataVizColors'),
  'dataviz-charts':      () => import('./sections/dataviz/DataVizCharts'),
  'app-intro':           () => import('./sections/applications/AppIntro'),
  'app-examples':        () => import('./sections/applications/AppExamples'),
  'print-specs':         () => import('./sections/print/PrintSpecs'),
}

export const SECTIONS: Record<string, React.LazyExoticComponent<() => React.ReactElement>> =
  Object.fromEntries(
    Object.entries(SECTION_IMPORTERS).map(([id, importer]) => [id, lazy(importer)]),
  )
