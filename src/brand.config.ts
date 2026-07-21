export interface ColorToken {
  name: string
  hex: string
  textColor: string
  outline?: string
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
    fonts: FontFace[]
  }
  colors: { primary: ColorToken[]; secondary: ColorToken[] }
  colorPairings: Array<{ bg: string; logo: string }>
  images: {
    photography: string[]   // filenames in public/images/photography/
    applications: string[]  // filenames in public/images/applications/
  }
  nav: NavGroup[]
}

const _client = 'Brand Template'

const brand: BrandConfig = {
  typeScale: [
    { size: '96px', name: 'Display XL',  family: 'DM Sans', weight: 700, ls: '-0.04em',  lh: 0.9 },
    { size: '73px', name: 'Display L',   family: 'DM Sans', weight: 700, ls: '-0.03em',  lh: 0.9 },
    { size: '64px', name: 'Display M',   family: 'DM Sans', weight: 700, ls: '-0.03em',  lh: 0.9 },
    { size: '48px', name: 'Display S',   family: 'DM Sans', weight: 700, ls: '-0.025em', lh: 0.95 },
    { size: '42px', name: 'Headline XL', family: 'DM Sans', weight: 600, ls: '-0.02em',  lh: 1.0 },
    { size: '32px', name: 'Headline L',  family: 'DM Sans', weight: 600, ls: '-0.015em', lh: 1.1 },
    { size: '24px', name: 'Headline M',  family: 'DM Sans', weight: 600, ls: '-0.01em',  lh: 1.2 },
    { size: '21px', name: 'Headline S',  family: 'DM Sans', weight: 600, ls: '-0.01em',  lh: 1.2 },
    { size: '18px', name: 'Body XL',     family: 'Inter',   weight: 400, ls: '-0.01em',  lh: 1.55 },
    { size: '16px', name: 'Body L',      family: 'Inter',   weight: 400, ls: '-0.01em',  lh: 1.6 },
    { size: '14px', name: 'Body M',      family: 'Inter',   weight: 400, ls: '0',         lh: 1.6 },
    { size: '12px', name: 'Caption',     family: 'Inter',   weight: 400, ls: '0',         lh: 1.5 },
  ],
  meta: {
    client:           _client,
    nameLine1:        _client,
    nameLine2:        '',
    title:            'Brand guidelines',
    version:          'Version 1.0',
    date:             'June 2026',
    preparedBy:       'Paper Tiger',
    sidebarLogoImage: `${import.meta.env.BASE_URL}images/logos/logo-full-primary.svg`,
    coverSealImage: `${import.meta.env.BASE_URL}images/logos/logo-mark-white.svg`,
  },

  specimens: {
    display96:        'Brand',
    display73:        'Beyond the brief',
    display64:        'Make it matter',
    display48:        'Identity systems',
    headline42:       'Design that works as hard as you do',
    headline32:       'Built for scale. Made to last.',
    headline24:       `${_client} creates visual identity systems that grow with your business.`,
    headline21:       '12 industries. One trusted partner.',
    body18:           `${_client} creates visual identity systems built to last.`,
    body16:           `${_client} creates visual identity systems that grow with your business and stand out across every touchpoint.`,
    body14:           `${_client} creates visual identity systems that grow with your business and stand out across every touchpoint. From brand strategy to final artwork, we make every element count.`,
    body12:           `Caption. ${_client} creates visual identity systems that last.`,
    sentence:         `${_client} creates visual identity systems built for scale and designed to last.`,
    avoidText:        `${_client} creates identity systems that grow with your business.`,
    avoidTextPart1:   _client,
    avoidTextPart2:   'creates identity systems that grow with your business.',
    fallbackGoogle16: `${_client} creates visual identity systems built to last. When brand fonts are unavailable, DM Sans provides a clean, modern alternative.`,
    fallbackSystem16: `${_client} creates visual identity systems built to last. When brand fonts are unavailable, Arial maintains clarity and legibility.`,
  },

  tokens: {
    'lh-body':      '1.65',
    'primary-blue':     '#8B3DFF',
    'primary-blue-rgb': '139, 61, 255',
    'dark-blue':    '#1A0066',
    charcoal:       '#111111',
    white:          '#FFFFFF',
    orange:         '#FF5E14',
    purple:         '#C44DFF',
    'pale-green':   '#CCFFCC',
    'lime-dark':    '#5C705C',
    green:          '#22C55E',
    fuscia:         '#FF1493',
    gray:           '#F3F3F3',
  },

  typography: {
    displayFont:        'DM Sans',
    bodyFont:           'Inter',
    bodyFontUrl:        'https://fonts.google.com/specimen/Inter',
    googleFallbackFont: 'DM Sans',
    googleFallbackUrl:  'https://fonts.google.com/specimen/DM+Sans',
    systemFallbackFont: 'Arial',
    fonts: [
      { family: 'DM Sans', weight: '300 700', file: '/fonts/DMSans-VariableFont.ttf' },
      { family: 'Inter',   weight: '300 700', file: '/fonts/Inter-VariableFont_opsz,wght.ttf' },
    ],
  },

  colors: {
    primary: [
      { name: 'Electric Violet', hex: '#8B3DFF', textColor: '#FFFFFF' },
      { name: 'Deep Violet',     hex: '#1A0066', textColor: '#FFFFFF' },
      { name: 'Black',           hex: '#111111', textColor: '#FFFFFF' },
      { name: 'White',           hex: '#FFFFFF', textColor: '#000000', outline: '1px solid #DADADA' },
    ],
    secondary: [
      { name: 'Coral',          hex: '#FF5E14', textColor: '#FFFFFF' },
      { name: 'Bright Purple',  hex: '#C44DFF', textColor: '#FFFFFF' },
      { name: 'Lime',           hex: '#CCFFCC', textColor: '#000000' },
      { name: 'Gray',           hex: '#F3F3F3', textColor: '#000000', outline: '1px solid #DADADA' },
    ],
  },

  images: {
    photography: [],
    applications: [],
  },

  colorPairings: [
    { bg: 'Electric Violet', logo: 'logo-full-white.svg' },
    { bg: 'Deep Violet',     logo: 'logo-full-white.svg' },
    { bg: 'Black',           logo: 'logo-full-white.svg' },
    { bg: 'White',           logo: 'logo-full-dark.svg' },
    { bg: 'Coral',           logo: 'logo-full-white.svg' },
    { bg: 'Bright Purple',   logo: 'logo-full-white.svg' },
    { bg: 'Lime',            logo: 'logo-full-dark.svg' },
    { bg: 'Gray',            logo: 'logo-full-dark.svg' },
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
        { label: 'Stacked logo',     id: 'logo-stacked' },
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
          label: 'Display & body', id: 'fg-overview',
          groupId: 'nav-fg-group', subId: 'nav-fg-sub',
          children: [
            { label: 'Overview',      id: 'fg-overview' },
            { label: 'Usage',         id: 'fg-usage' },
            { label: 'Type specimen', id: 'fg-specimen' },
            { label: 'Size & scale',  id: 'fg-scale' },
          ],
        },
        { label: 'Google fallback', id: 'google-fallback' },
        { label: 'System fallback', id: 'type-fallback' },
        { label: 'What to avoid',   id: 'type-avoid' },
      ],
    },
    {
      group: 'Photography',
      items: [
        { label: 'Introduction', id: 'photo-intro' },
        { label: 'Examples',     id: 'photo-examples' },
        { label: 'Dos',          id: 'photo-dos' },
        { label: "Don'ts",       id: 'photo-donts' },
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
