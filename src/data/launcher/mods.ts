import { FABRIC_API_VERSION } from '../site'

export type ModLoader = 'fabric' | 'forge'
export type ModCategory = 'performance' | 'utility' | 'visual' | 'library'

export interface Mod {
  id: string
  name: string
  author: string
  blurb: string
  version: string
  category: ModCategory
  loader: ModLoader
  /** Ships pre-installed in the seeded state. */
  installed: boolean
  /** Enabled only matters when installed. */
  enabled: boolean
  /** Gets the "FPS+" tag in the list. */
  fps: boolean
  downloads: number
}

/* The first five mirror the mod list shown in the live site's mockup. The rest
   are real Modrinth projects, added so search and filtering have something to
   actually chew on. */
export const SEED_MODS: Mod[] = [
  {
    id: 'fabric-api',
    name: 'Fabric API',
    author: 'modmuss50',
    blurb: 'Core hooks nearly every Fabric mod depends on.',
    version: FABRIC_API_VERSION,
    category: 'library',
    loader: 'fabric',
    installed: true,
    enabled: true,
    fps: false,
    downloads: 41_900_000,
  },
  {
    id: 'sodium',
    name: 'Sodium',
    author: 'jellysquid3',
    blurb: 'Rewrites the chunk renderer. The single biggest FPS win available.',
    version: '0.6.13',
    category: 'performance',
    loader: 'fabric',
    installed: true,
    enabled: true,
    fps: true,
    downloads: 28_400_000,
  },
  {
    id: 'lithium',
    name: 'Lithium',
    author: 'jellysquid3',
    blurb: 'Optimises game logic and physics without changing behaviour.',
    version: '0.14.7',
    category: 'performance',
    loader: 'fabric',
    installed: true,
    enabled: true,
    fps: true,
    downloads: 19_100_000,
  },
  {
    id: 'distant-horizons',
    name: 'Distant Horizons',
    author: 'jeseibel',
    blurb: 'Level-of-detail terrain so you can see for thousands of blocks.',
    version: '2.3.2',
    category: 'visual',
    loader: 'fabric',
    installed: false,
    enabled: false,
    fps: false,
    downloads: 4_800_000,
  },
  {
    id: 'entity-culling',
    name: 'Entity Culling',
    author: 'tr7zw',
    blurb: 'Skips rendering entities you cannot actually see.',
    version: '1.7.4',
    category: 'performance',
    loader: 'fabric',
    installed: false,
    enabled: false,
    fps: true,
    downloads: 12_600_000,
  },
  {
    id: 'iris',
    name: 'Iris Shaders',
    author: 'coderbot',
    blurb: 'Shader pack support that stays compatible with Sodium.',
    version: '1.8.8',
    category: 'visual',
    loader: 'fabric',
    installed: false,
    enabled: false,
    fps: false,
    downloads: 15_300_000,
  },
  {
    id: 'modmenu',
    name: 'Mod Menu',
    author: 'Prospector',
    blurb: 'Adds a real mod list and config screen to the main menu.',
    version: '11.0.3',
    category: 'utility',
    loader: 'fabric',
    installed: false,
    enabled: false,
    fps: false,
    downloads: 22_700_000,
  },
  {
    id: 'ferritecore',
    name: 'FerriteCore',
    author: 'malte0811',
    blurb: 'Cuts memory use substantially with no gameplay change.',
    version: '7.0.2',
    category: 'performance',
    loader: 'fabric',
    installed: false,
    enabled: false,
    fps: true,
    downloads: 18_200_000,
  },
  {
    id: 'indium',
    name: 'Indium',
    author: 'comp500',
    blurb: 'Sodium addon that restores rendering APIs some mods need.',
    version: '1.0.36',
    category: 'library',
    loader: 'fabric',
    installed: false,
    enabled: false,
    fps: false,
    downloads: 9_400_000,
  },
  {
    id: 'zoomify',
    name: 'Zoomify',
    author: 'isXander',
    blurb: 'A configurable zoom key with smooth easing.',
    version: '2.14.1',
    category: 'utility',
    loader: 'fabric',
    installed: false,
    enabled: false,
    fps: false,
    downloads: 6_100_000,
  },
]

export const MOD_CATEGORIES: { id: ModCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'performance', label: 'Performance' },
  { id: 'visual', label: 'Visual' },
  { id: 'utility', label: 'Utility' },
  { id: 'library', label: 'Library' },
]
