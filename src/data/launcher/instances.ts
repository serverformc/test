import { MC_VERSION } from '../site'

export type Loader = 'fabric' | 'forge' | 'vanilla'

export interface Instance {
  id: string
  name: string
  mcVersion: string
  loader: Loader
  loaderVersion?: string
  ramMb: number
  /** Human-readable, deliberately not a live timestamp. */
  lastPlayed: string
  icon: string
}

export const SEED_INSTANCES: Instance[] = [
  {
    id: 'main',
    name: 'Main World',
    mcVersion: MC_VERSION,
    loader: 'fabric',
    loaderVersion: '0.16.14',
    ramMb: 6144,
    lastPlayed: 'Today',
    icon: '🌍',
  },
  {
    id: 'smp',
    name: 'Friends SMP',
    mcVersion: MC_VERSION,
    loader: 'fabric',
    loaderVersion: '0.16.14',
    ramMb: 8192,
    lastPlayed: 'Yesterday',
    icon: '⛏️',
  },
  {
    id: 'vanilla',
    name: 'Pure Vanilla',
    mcVersion: '1.21.4',
    loader: 'vanilla',
    ramMb: 4096,
    lastPlayed: '3 days ago',
    icon: '🟩',
  },
  {
    id: 'creative',
    name: 'Creative Builds',
    mcVersion: '1.20.6',
    loader: 'forge',
    loaderVersion: '50.1.0',
    ramMb: 8192,
    lastPlayed: '2 weeks ago',
    icon: '🏗️',
  },
]

export const LOADER_LABEL: Record<Loader, string> = {
  fabric: 'Fabric',
  forge: 'Forge',
  vanilla: 'Vanilla',
}

export const AVAILABLE_VERSIONS = [MC_VERSION, '1.21.4', '1.20.6', '1.20.1', '1.19.2', '1.16.5']
