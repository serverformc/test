import type { Account } from '../../data/launcher/account'
import type { Instance, Loader } from '../../data/launcher/instances'
import type { Mod } from '../../data/launcher/mods'
import type { ServerEdition } from '../../data/launcher/host'

export type TabId = 'home' | 'mods' | 'instances' | 'host' | 'skin' | 'settings'

export type LaunchPhase = 'idle' | 'checking' | 'downloading' | 'extracting' | 'launching' | 'running'

/** The phases that actively advance on a tick. */
export type WorkingPhase = Exclude<LaunchPhase, 'idle' | 'running'>

export interface LauncherSettings {
  ramMb: number
  aggressiveFps: boolean
  javaPath: string
  resolution: string
  discordRpc: boolean
  autoUpdate: boolean
  keepPlaying: boolean
}

export interface LaunchState {
  phase: LaunchPhase
  progress: number
  log: string[]
}

export interface HostState {
  booting: boolean
  running: boolean
  bootStep: number
  edition: ServerEdition
  ramMb: number
  port: number
  upnp: boolean
  players: string[]
  console: string[]
}

export interface LauncherState {
  activeTab: TabId
  account: Account
  instances: Instance[]
  activeInstanceId: string
  mods: Mod[]
  launch: LaunchState
  host: HostState
  settings: LauncherSettings
}

export type LauncherAction =
  | { type: 'SET_TAB'; tab: TabId }
  | { type: 'SET_ACTIVE_INSTANCE'; id: string }
  | { type: 'CREATE_INSTANCE'; name: string; mcVersion: string; loader: Loader }
  | { type: 'DELETE_INSTANCE'; id: string }
  | { type: 'INSTALL_MOD'; id: string }
  | { type: 'UNINSTALL_MOD'; id: string }
  | { type: 'TOGGLE_MOD'; id: string }
  | { type: 'LAUNCH_START' }
  | { type: 'LAUNCH_TICK' }
  | { type: 'LAUNCH_STOP' }
  | { type: 'HOST_START' }
  | { type: 'HOST_BOOT_TICK' }
  | { type: 'HOST_IDLE_TICK' }
  | { type: 'HOST_STOP' }
  | { type: 'HOST_SET'; patch: Partial<Pick<HostState, 'edition' | 'ramMb' | 'port' | 'upnp'>> }
  | { type: 'SET_SETTING'; patch: Partial<LauncherSettings> }
  | { type: 'SET_SKIN'; skinUrl: string | null }
  | { type: 'SET_USERNAME'; username: string }
  | { type: 'RESET' }
