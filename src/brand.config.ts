export interface ColorToken {
  name: string
  hex: string
  textColor: string
  outline?: string
  /** Usage note rendered on the swatch. */
  note?: string
}

export interface FontFace {
  family: string
  weight: string | number
  file: string
}

export interface NavItem {
  label: string
  id: string
  children?: Omit<NavItem, 'children'>[]
  groupId?: string
  subId?: string
}

export interface NavGroup {
  group: string
  items: NavItem[]
}

export interface TypeScaleEntry {
  size: string
  name: string
  family: string
  weight: number
  ls: string
  lh: number
}

export interface BrandConfig {
  typeScale: TypeScaleEntry[]
  /** Optional second track (e.g. a serif italic) paired with the headline
   *  levels of `typeScale`. Entries match by `name`. */
  serifScale?: TypeScaleEntry[]
  meta: {
    client: string
    nameLine1: string
    nameLine2: string
    title: string
    version: string
    date: string
    preparedBy: string
    sidebarLogoImage: string
    coverSealImage: string
  }
  specimens: {
    display96: string
    display73: string
    display64: string
    display48: string
    headline42: string
    headline32: string
    headline24: string
    headline21: string
    body18: string
    body16: string
    body14: string
    body12: string
    sentence: string
    avoidText: string
    avoidTextPart1: string
    avoidTextPart2: string
    fallbackGoogle16: string
    fallbackSystem16: string
  }
  tokens: Record<string, string>
  typography: {
    displayFont: string
    bodyFont: string
    bodyFontUrl?: string
    googleFallbackFont: string
    googleFallbackUrl: string
    systemFallbackFont: string
    /** Serif stand-ins for Old Standard TT at each fallback tier. */
    officeSerifFallback?: string
    systemSerifFallback?: string
    fonts: FontFace[]
  }
  colors: { primary: ColorToken[]; secondary: ColorToken[] }
  colorPairings: Array<{ bg: string; logo: string }>
  images: {
    photography: string[]   // filenames in public/images/photography/
    applications: string[]  // filenames in public/images/applications/
    pattern?: string[]      // filenames in public/images/pattern/
    symbols?: string[]      // filenames in public/images/symbols/
  }
  nav: NavGroup[]
}

const _client = 'SPM Communications'

const brand: BrandConfig = {
  // Headline levels map to the stylesheet's Urbanist track (H1-H6), and the
  // body levels to its Paragraph XL/LG/M/SM. The stylesheet also specifies a
  // parallel Old Standard TT Italic track at every headline level, at its own
  // larger sizes and tighter tracking: see `serifScale` below.
  typeScale: [
    { size: '148px', name: 'Display XL',  family: 'Urbanist', weight: 550, ls: '-0.03em', lh: 1.0 },
    { size: '116px', name: 'Display L',   family: 'Urbanist', weight: 550, ls: '-0.03em', lh: 1.0 },
    { size: '72px',  name: 'Display M',   family: 'Urbanist', weight: 550, ls: '-0.03em', lh: 1.0 },
    { size: '56px',  name: 'Display S',   family: 'Urbanist', weight: 600, ls: '-0.03em', lh: 1.1 },
    { size: '48px',  name: 'Headline XL', family: 'Urbanist', weight: 600, ls: '-0.02em', lh: 1.1 },
    { size: '32px',  name: 'Headline L',  family: 'Urbanist', weight: 600, ls: '-0.02em', lh: 1.1 },
    { size: '28px',  name: 'Headline M',  family: 'Urbanist', weight: 600, ls: '-0.02em', lh: 1.1 },
    { size: '24px',  name: 'Headline S',  family: 'Urbanist', weight: 600, ls: '-0.01em', lh: 1.2 },
    { size: '18px',  name: 'Body XL',     family: 'Urbanist', weight: 500, ls: '0.01em',  lh: 1.4 },
    { size: '16px',  name: 'Body L',      family: 'Urbanist', weight: 500, ls: '0.01em',  lh: 1.4 },
    // 14px and 12px are not specified in the stylesheet. Extrapolated from the
    // 16px Paragraph SM rule so captions and table copy have a defined style.
    { size: '14px',  name: 'Body M',      family: 'Urbanist', weight: 500, ls: '0.01em',  lh: 1.4 },
    { size: '12px',  name: 'Caption',     family: 'Urbanist', weight: 500, ls: '0.01em',  lh: 1.4 },
  ],

  // Old Standard TT Italic track, paired one-to-one with the headline levels
  // above. Sizes run larger than their sans counterparts at every level.
  serifScale: [
    { size: '166px', name: 'Display XL',  family: 'Old Standard TT', weight: 400, ls: '-0.07em', lh: 1.0 },
    { size: '125px', name: 'Display L',   family: 'Old Standard TT', weight: 400, ls: '-0.06em', lh: 1.0 },
    { size: '80px',  name: 'Display M',   family: 'Old Standard TT', weight: 400, ls: '-0.06em', lh: 1.0 },
    { size: '64px',  name: 'Display S',   family: 'Old Standard TT', weight: 400, ls: '-0.06em', lh: 1.0 },
    { size: '56px',  name: 'Headline XL', family: 'Old Standard TT', weight: 400, ls: '-0.06em', lh: 1.0 },
    { size: '36px',  name: 'Headline L',  family: 'Old Standard TT', weight: 400, ls: '-0.06em', lh: 1.0 },
  ],

  meta: {
    client:           _client,
    // Cover heading, set on two lines.
    nameLine1:        'Brand',
    nameLine2:        'manual',
    title:            'Brand manual',
    version:          'Version 1.0',
    date:             'July 2026',
    preparedBy:       'Paper Tiger',
    sidebarLogoImage: `${import.meta.env.BASE_URL}images/logos/logo-full-primary.svg`,
    coverSealImage: `${import.meta.env.BASE_URL}images/logos/logo-mark-primary.svg`,
  },

  // Specimen copy is taken from the stylesheet's own sample text.
  specimens: {
    display96:        'Senior-led.',
    display73:        'Boutique fast.',
    display64:        'Senior-led.',
    display48:        'Boutique fast.',
    headline42:       'Life’s too short to work with jerks. At SPM, we live by that.',
    headline32:       'Kind words from our team.',
    headline24:       `${_client} is a strategy-led PR agency for consumer brands.`,
    headline21:       'Built for what PR is becoming.',
    body18:           'SPM is a strategy-led PR agency for consumer brands, where cultural intelligence and AI visibility drive business results.',
    body16:           'When members share their challenges and strategies with the community, everyone benefits from a richer pool of collective knowledge.',
    body14:           'No jerks means you work with clients and brands you trust in an atmosphere of mutual respect among agency leadership, team members and clients.',
    body12:           'Caption. SPM is a strategy-led PR agency for consumer brands.',
    sentence:         'SPM is a strategy-led PR agency for consumer brands, where cultural intelligence and AI visibility drive business results.',
    avoidText:        'SPM is a strategy-led PR agency for consumer brands.',
    avoidTextPart1:   'Kind words',
    avoidTextPart2:   'from our team.',
    fallbackGoogle16: 'When members share their challenges and strategies with the community, everyone benefits from a richer pool of collective knowledge. When Urbanist is unavailable, Futura carries the same geometric character.',
    fallbackSystem16: 'When members share their challenges and strategies with the community, everyone benefits from a richer pool of collective knowledge. When neither the brand fonts nor the Microsoft Office fonts load, Arial keeps the page legible.',
  },

  // The template's component layer references a fixed set of CSS custom
  // properties (--charcoal for body ink, --primary-blue, --dark-blue). Those
  // names are kept so nothing breaks, with SPM values mapped onto them, and
  // the palette is also exposed under its own token names.
  tokens: {
    'lh-body':          '1.4',
    // The brand uses no black. Juniper is the darkest value: body ink and deep
    // grounds both. `charcoal` keeps its name only because the template's
    // component layer references --charcoal in ~33 places.
    charcoal:           '#283F1A',
    juniper:            '#283F1A',
    white:              '#FFFFFF',
    // Page ground. The homepage design sits on Salt, not white.
    'page-bg':          '#FCFBF0',
    // UI accent for text, rules and active states. Must clear WCAG AA on the
    // light page ground, so it is Jam (13.0:1 on white), never Cornflower
    // (1.8:1 on white). Cornflower is a background colour only.
    'brand-accent':     '#59173E',
    'brand-accent-rgb': '89, 23, 62',
    'dark-blue':        '#59173E',
    fern:               '#324625',
    'fern-rgb':         '50, 70, 37',
    cornflower:         '#A4C3FA',
    salt:               '#FCFBF0',
    jam:                '#59173E',
    'jam-rgb':          '89, 23, 62',
    // Headline emphasis. A distinct blue, deeper and more saturated than
    // Cornflower, used only for highlighted phrases in display type.
    highlight:          '#6CA1F0',
    silk:               '#E1D7D0',
    honeydew:           '#D9DB8C',
    gray:               '#F3F3F3',
  },

  typography: {
    displayFont:        'Urbanist',
    bodyFont:           'Urbanist',
    bodyFontUrl:        'https://fonts.google.com/specimen/Urbanist',
    // SPM's own fonts are Google Fonts, so the fallback tiers step down to the
    // Microsoft Office family first, then to pre-installed system faces.
    googleFallbackFont: 'Futura',
    googleFallbackUrl:  'https://fonts.google.com/specimen/Urbanist',
    // Arial rather than Century Gothic: Century Gothic ships with Microsoft
    // Office, not with the operating system, so it belongs to the Office tier.
    // Arial is present on Windows and macOS, and aliased on Linux.
    systemFallbackFont: 'Arial',
    // Old Standard TT is the accent face, so each fallback tier needs a serif
    // partner as well as a sans one.
    officeSerifFallback: 'Baskerville',
    systemSerifFallback: 'Times New Roman',
    fonts: [
      { family: 'Urbanist',        weight: '100 900', file: 'Google Fonts (variable)' },
      { family: 'Old Standard TT', weight: '400',     file: 'Google Fonts (italic)' },
    ],
  },

  // The stylesheet splits these three / three: Fern, Cornflower and Salt are
  // the core colors, Jam, Silk and Honeydew the accents. Jam is an accent
  // despite carrying the logo.
  colors: {
    primary: [
      { name: 'Fern',       hex: '#324625', textColor: '#FCFBF0' },
      { name: 'Cornflower', hex: '#A4C3FA', textColor: '#283F1A' },
      { name: 'Salt',       hex: '#FCFBF0', textColor: '#283F1A', outline: '1px solid #E5E2D6' },
    ],
    secondary: [
      { name: 'Juniper',  hex: '#283F1A', textColor: '#FCFBF0',
        note: 'Type colour. Use for body copy and headlines, not as a fill.' },
      { name: 'Jam',      hex: '#59173E', textColor: '#FCFBF0' },
      { name: 'Silk',     hex: '#E1D7D0', textColor: '#283F1A' },
      { name: 'Honeydew', hex: '#D9DB8C', textColor: '#283F1A' },
    ],
  },

  images: {
    // grading-do-dont.webp is deliberately excluded: it is a do/don't
    // comparison pair, not a photography example.
    photography: [
      'portrait-headshot.webp',
      'team-candid.webp',
      'client-philz-coffee.webp',
      'food-dessert-honeydew.webp',
    ],
    applications: [
      'social-philz-cornflower.webp',
      'social-dessert-honeydew.webp',
      'banner-symbol-masks.webp',
      'slide-our-culture.webp',
      'campaign-pair.webp',
      'campaign-triptych.webp',
      'grid-swoosh-eye.webp',
    ],
    pattern: [
      'symbol-pattern-cornflower.webp',
      'gradient-salt-cornflower.webp',
      'logo-shape-noise-gradient.webp',
      'testimonial-card-jam.webp',
      'headline-mixed-serif.webp',
    ],
    symbols: [
      'symbol-set-overview.webp',
      'symbols-core-fern.webp',
      'symbol-tiles-grid.webp',
      'symbol-composition.webp',
    ],
  },

  // From the stylesheet's approved pairings matrix. The rule it encodes: dark
  // grounds (Fern, Jam) take a light mark, light grounds take a dark mark, and
  // Fern and Jam are never paired with each other.
  colorPairings: [
    { bg: 'Juniper',    logo: 'logo-full-salt.svg' },
    { bg: 'Fern',       logo: 'logo-full-salt.svg' },
    { bg: 'Cornflower', logo: 'logo-full-jam.svg' },
    { bg: 'Salt',       logo: 'logo-full-jam.svg' },
    { bg: 'Jam',        logo: 'logo-full-salt.svg' },
    { bg: 'Silk',       logo: 'logo-full-jam.svg' },
    { bg: 'Honeydew',   logo: 'logo-full-fern.svg' },
  ],

  nav: [
    {
      group: 'Visual identity',
      items: [{ label: 'Introduction', id: 'vi-intro' }],
    },
    {
      group: 'Logo & mark',
      items: [
        { label: 'Full logo',        id: 'logo-horizontal' },
        { label: 'Compact logo',     id: 'logo-compact' },
        { label: 'Logo mark',        id: 'h-logo-mark' },
        { label: 'Avatar & favicon', id: 'logo-avatar' },
        { label: 'Co-branding',      id: 'logo-cobranding' },
        { label: 'Logo positioning', id: 'logo-positioning' },
        { label: 'What to avoid',    id: 'logo-avoid' },
      ],
    },
    {
      group: 'Color',
      items: [
        { label: 'Introduction',              id: 'color-intro' },
        { label: 'Primary palette',           id: 'primary-palette' },
        { label: 'Secondary palette',         id: 'secondary-palette' },
        { label: 'Combinations & accessibility', id: 'color-combinations' },
        { label: 'Color pathways',            id: 'color-pathways' },
      ],
    },
    {
      group: 'Typography',
      items: [
        { label: 'Introduction', id: 'type-intro' },
        {
          label: 'Urbanist', id: 'fg-overview',
          groupId: 'nav-fg-group', subId: 'nav-fg-sub',
          children: [
            { label: 'Overview',      id: 'fg-overview' },
            { label: 'Usage',         id: 'fg-usage' },
            { label: 'Type specimen', id: 'fg-specimen' },
            { label: 'Size & scale',  id: 'fg-scale' },
          ],
        },
        { label: 'Old Standard TT',        id: 'type-oldstandard' },
        { label: "Pairing do's and don'ts", id: 'type-pairing' },
        { label: 'Emphasis & highlight',    id: 'type-emphasis' },
        { label: 'Microsoft Office fallback', id: 'google-fallback' },
        { label: 'System fallback', id: 'type-fallback' },
        { label: 'What to avoid',   id: 'type-avoid' },
      ],
    },
    {
      group: 'Photography',
      items: [
        { label: "Do's and don'ts", id: 'photo-dos' },
      ],
    },
    {
      group: 'Symbols',
      items: [
        { label: 'Brand symbols',   id: 'symbols' },
        { label: 'Pattern & texture', id: 'pattern' },
      ],
    },
    {
      group: 'Data visualisation',
      items: [
        { label: 'Color sequence',   id: 'dataviz-colors' },
        { label: 'Chart guidelines', id: 'dataviz-charts' },
      ],
    },
    {
      group: 'Applications',
      items: [
        { label: 'Introduction', id: 'app-intro' },
        { label: 'Examples',     id: 'app-examples' },
      ],
    },
    {
      group: 'Iconography',
      items: [{ label: 'Introduction', id: 'icon-intro' }],
    },
    {
      group: 'Print & export',
      items: [{ label: 'Specifications', id: 'print-specs' }],
    },
  ],
}

// Derived palette extremes — used for auto-theming fullbleed sections (e.g. TypeOverview)
function _lum(hex: string): number {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  const lin = (x: number) => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const _sorted = [...brand.colors.primary].sort((a, b) => _lum(a.hex) - _lum(b.hex))
export const darkestPrimary  = _sorted[0]
export const lightestPrimary = _sorted[_sorted.length - 1]

export default brand
