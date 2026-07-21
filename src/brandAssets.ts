import brand from './brand.config'

const t = brand.tokens

// Shared by LogoAvatar.tsx (on-screen display) and logoDownload.ts (zip export)
// so the two can never drift apart.
export const avatarBgs = [
  { bg: t.jam,        mark: t.salt, inner: t.jam,        wm: t.salt, label: 'Jam' },
  { bg: t.fern,       mark: t.salt, inner: t.fern,       wm: t.salt, label: 'Fern' },
  { bg: t.cornflower, mark: t.jam,  inner: t.cornflower, wm: t.jam,  label: 'Cornflower' },
  { bg: t.salt,       mark: t.jam,  inner: t.salt,       wm: t.jam,  label: 'Salt' },
]

export const faviconVariants = [
  { key: 'on-light', label: 'On light', bg: t.salt, mark: t.jam,  inner: t.salt },
  { key: 'on-dark',  label: 'On dark',  bg: t.jam,  mark: t.salt, inner: t.jam  },
]

export const faviconSizes = [64, 48, 32, 16]
