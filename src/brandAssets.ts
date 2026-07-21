import brand from './brand.config'

const t = brand.tokens

// Shared by LogoAvatar.tsx (on-screen display) and logoDownload.ts (zip export)
// so the two can never drift apart.
export const avatarBgs = [
  { bg: t['primary-blue'], mark: '#fff', inner: t['primary-blue'], wm: '#fff', label: 'Electric Violet' },
  { bg: t['orange'],       mark: '#111', inner: '#fff',            wm: '#111', label: 'Coral' },
  { bg: t['dark-blue'],    mark: '#fff', inner: t['primary-blue'], wm: '#fff', label: 'Deep Violet' },
  { bg: '#111111',         mark: '#fff', inner: '#111',            wm: '#fff', label: 'Black' },
]

export const faviconVariants = [
  { key: 'on-light', label: 'On light', bg: '#FFFFFF', mark: t['primary-blue'], inner: '#fff' },
  { key: 'on-dark',  label: 'On dark',  bg: '#000000', mark: '#fff',            inner: '#000' },
]

export const faviconSizes = [64, 48, 32, 16]
