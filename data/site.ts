/* ==========================================================================
   Site-wide facts.

   Everything version-bearing derives from VERSION so the badge, the launcher
   title bar and the download filenames can never drift apart again. The live
   site currently disagrees with itself in three places (badge 1.15.5, mockup
   1.15.4, files 1.15.6) — 1.15.6 is authoritative because it's what the real
   installers are actually named.
   ========================================================================== */

export const VERSION = '1.15.6'
export const MC_VERSION = '1.21.11'
export const FABRIC_API_VERSION = '0.141.6'

export const DISCORD_URL = 'https://discord.gg/EDnuhvvbKq'
export const SITE_DOMAIN = 'novaclient.bond'

/* ---- Downloads ----------------------------------------------------------
   Relative paths on purpose: this build is a drop-in replacement for the
   current site, and /dl/ is served alongside it.
   ------------------------------------------------------------------------ */
export const DOWNLOADS = {
  windows: `/dl/nova-client-setup-${VERSION}.exe`,
  linux: `/dl/nova-client-${VERSION}-linux.tar.gz`,
  android: '/dl/Nova-Client-Android.apk',
} as const

export interface NavLink {
  label: string
  href: string
  /** Router route rather than an in-page anchor. */
  route?: boolean
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Launcher', href: '/launcher', route: true },
  { label: 'Install', href: '#install' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Help', href: '/help', route: true },
]

export const TICKER_ITEMS: string[] = [
  'ANDROID APP IS HERE',
  '📱 install Nova on your phone — 1 tap',
  '24/7 KEEP PLAYING',
  '🔄 one-click updates',
  '🐧 Linux launcher is HERE',
  '🍎 macOS coming soon',
  '⚡ faster launches',
]

export type BadgeTone = 'version' | 'default' | 'new' | 'soon'

export interface HeroBadge {
  label: string
  tone: BadgeTone
}

export const HERO_BADGES: HeroBadge[] = [
  { label: `v${VERSION}`, tone: 'version' },
  { label: '100% FREE', tone: 'default' },
  { label: 'WINDOWS 10 / 11', tone: 'default' },
  { label: 'LINUX ✓', tone: 'default' },
  { label: 'ANDROID APP ✓', tone: 'new' },
  { label: 'MACOS · SOON', tone: 'soon' },
  { label: 'JAVA INCLUDED', tone: 'default' },
]

/* ---- Install cards ------------------------------------------------------ */
export interface PlatformButton {
  label: string
  href: string
  variant: 'primary' | 'secondary'
}

export interface Platform {
  id: string
  icon: string
  name: string
  /** Requirements / how-to line. */
  meta: string
  size?: string
  buttons: PlatformButton[]
  status: 'available' | 'soon'
  flag?: string
}

export const PLATFORMS: Platform[] = [
  {
    id: 'windows',
    icon: '🪟',
    name: 'Windows',
    meta: 'Windows 10 / 11 · 64-bit installer',
    size: '~130 MB',
    status: 'available',
    buttons: [{ label: 'Download .exe', href: DOWNLOADS.windows, variant: 'primary' }],
  },
  {
    id: 'linux',
    icon: '🐧',
    name: 'Linux',
    meta: 'Ubuntu / Debian / Arch etc. · extract & run',
    size: '~152 MB',
    status: 'available',
    buttons: [{ label: 'Download .tar.gz', href: DOWNLOADS.linux, variant: 'primary' }],
  },
  {
    id: 'android',
    icon: '🤖',
    name: 'Android',
    meta: 'Open this site in Chrome and tap the green install button — or grab the app file below.',
    status: 'available',
    flag: 'APP!',
    buttons: [
      { label: 'Install app (1 tap)', href: DOWNLOADS.android, variant: 'primary' },
      { label: 'Download .apk', href: DOWNLOADS.android, variant: 'secondary' },
    ],
  },
  {
    id: 'macos',
    icon: '🍎',
    name: 'macOS',
    meta: 'In the works — arriving in a future update.',
    status: 'soon',
    flag: 'Coming soon',
    buttons: [],
  },
]

export const ANDROID_STEPS: string[] = [
  `Open **${SITE_DOMAIN}** in Chrome on your phone`,
  'Tap the green **📱 Install Nova App** button (or ⋮ menu → Add to Home screen)',
  'Nova opens fullscreen like a real app',
]

export const ANDROID_CAVEAT =
  'Playing with touch controls on your phone needs the full Android launcher — it’s in development and planned for the Play Store.'

export const UPDATE_FOOTNOTE =
  'Every launcher includes a “Check for updates” button at Settings → Updates, and updates itself with one click.'

export const PRIVACY_NOTE =
  'No account data stored on our servers — you log in directly with your own Microsoft account.'
