import { MC_VERSION } from '../../data/site'
import { SEED_ACCOUNT } from '../../data/launcher/account'
import { LOADER_LABEL, SEED_INSTANCES } from '../../data/launcher/instances'
import { SEED_MODS } from '../../data/launcher/mods'
import { DEFAULT_PORT, HOST_BOOT_LINES, HOST_IDLE_LINES, MOCK_PLAYERS } from '../../data/launcher/host'
import type { ServerEdition } from '../../data/launcher/host'
import type { Instance } from '../../data/launcher/instances'
import type {
  LauncherAction,
  LauncherSettings,
  LauncherState,
  LaunchPhase,
  WorkingPhase,
} from './launcherTypes'

const STORAGE_KEY = 'nova:launcher:v1'
const MAX_LOG = 40
const MAX_CONSOLE = 60

/* ---- Launch staging -----------------------------------------------------
   Each working phase advances `inc` per tick until it reaches `to`, then hands
   off to the next. Keeping this in the reducer (rather than in timers) means
   the whole sequence is deterministic and driven by one action.
   ------------------------------------------------------------------------ */
const PHASE_PLAN: Record<WorkingPhase, { to: number; inc: number; enter: string }> = {
  checking: { to: 15, inc: 3, enter: 'Checking files…' },
  downloading: { to: 70, inc: 1.6, enter: 'Downloading assets…' },
  extracting: { to: 90, inc: 2.5, enter: 'Extracting libraries…' },
  launching: { to: 100, inc: 2, enter: `Launching Minecraft ${MC_VERSION}…` },
}

const PHASE_ORDER: WorkingPhase[] = ['checking', 'downloading', 'extracting', 'launching']

const ASSET_SAMPLES = [
  'assets/minecraft/textures/block/deepslate.png',
  'assets/minecraft/textures/entity/creeper/creeper.png',
  'libraries/net/fabricmc/fabric-loader/0.16.14.jar',
  'assets/minecraft/sounds/ambient/cave/cave1.ogg',
  'libraries/com/mojang/blocklist/1.0.10.jar',
  'assets/minecraft/lang/en_us.json',
  'assets/minecraft/textures/gui/widgets.png',
  'libraries/org/lwjgl/lwjgl-opengl/3.3.3.jar',
]

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

function trim(lines: string[], max: number): string[] {
  return lines.length > max ? lines.slice(lines.length - max) : lines
}

const DEFAULT_SETTINGS: LauncherSettings = {
  ramMb: 6144,
  aggressiveFps: false,
  javaPath: 'Bundled (recommended)',
  resolution: '1920 × 1080',
  discordRpc: true,
  autoUpdate: true,
  keepPlaying: true,
}

const IDLE_LAUNCH = { phase: 'idle' as LaunchPhase, progress: 0, log: [] as string[] }

/* ---- Persistence --------------------------------------------------------
   Only durable configuration is stored. Transient runtime state (launch
   progress, host console, live player list) is deliberately excluded so a
   reload mid-launch can never restore a frozen progress bar.
   ------------------------------------------------------------------------ */
interface Persisted {
  v: 1
  activeInstanceId: string
  instances: Instance[]
  modState: Record<string, { installed: boolean; enabled: boolean }>
  settings: LauncherSettings
  username: string
  skinUrl: string | null
  host: { edition: ServerEdition; ramMb: number; port: number; upnp: boolean }
}

function loadPersisted(): Persisted | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Persisted
    if (!parsed || parsed.v !== 1 || !Array.isArray(parsed.instances)) return null
    return parsed
  } catch {
    return null
  }
}

export function savePersisted(state: LauncherState): void {
  if (typeof window === 'undefined') return
  try {
    const modState: Persisted['modState'] = {}
    for (const mod of state.mods) {
      modState[mod.id] = { installed: mod.installed, enabled: mod.enabled }
    }
    const payload: Persisted = {
      v: 1,
      activeInstanceId: state.activeInstanceId,
      instances: state.instances,
      modState,
      settings: state.settings,
      username: state.account.username,
      skinUrl: state.account.skinUrl,
      host: {
        edition: state.host.edition,
        ramMb: state.host.ramMb,
        port: state.host.port,
        upnp: state.host.upnp,
      },
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* Quota or private-mode failures are not worth surfacing in a demo. */
  }
}

export function buildInitialState(): LauncherState {
  const saved = loadPersisted()

  const instances = saved?.instances?.length ? saved.instances : SEED_INSTANCES
  const activeInstanceId =
    saved?.activeInstanceId && instances.some((i) => i.id === saved.activeInstanceId)
      ? saved.activeInstanceId
      : instances[0].id

  // Merge saved flags onto the seed list rather than replacing it, so newly
  // added mods still appear for people with existing saved state.
  const mods = SEED_MODS.map((mod) => {
    const flags = saved?.modState?.[mod.id]
    return flags ? { ...mod, installed: flags.installed, enabled: flags.enabled } : mod
  })

  const edition = saved?.host?.edition ?? 'java'

  return {
    activeTab: 'home',
    account: {
      ...SEED_ACCOUNT,
      username: saved?.username ?? SEED_ACCOUNT.username,
      skinUrl: saved?.skinUrl ?? null,
    },
    instances,
    activeInstanceId,
    mods,
    launch: { ...IDLE_LAUNCH },
    host: {
      booting: false,
      running: false,
      bootStep: 0,
      edition,
      ramMb: saved?.host?.ramMb ?? 4096,
      port: saved?.host?.port ?? DEFAULT_PORT[edition],
      upnp: saved?.host?.upnp ?? true,
      players: [],
      console: [],
    },
    settings: { ...DEFAULT_SETTINGS, ...saved?.settings },
  }
}

function slugId(name: string): string {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${base || 'instance'}-${Math.random().toString(36).slice(2, 6)}`
}

export function launcherReducer(state: LauncherState, action: LauncherAction): LauncherState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.tab }

    case 'SET_ACTIVE_INSTANCE':
      return { ...state, activeInstanceId: action.id }

    case 'CREATE_INSTANCE': {
      const instance: Instance = {
        id: slugId(action.name),
        name: action.name.trim() || 'New Instance',
        mcVersion: action.mcVersion,
        loader: action.loader,
        loaderVersion: action.loader === 'fabric' ? '0.16.14' : undefined,
        ramMb: state.settings.ramMb,
        lastPlayed: 'Never',
        icon: '✨',
      }
      return {
        ...state,
        instances: [instance, ...state.instances],
        activeInstanceId: instance.id,
      }
    }

    case 'DELETE_INSTANCE': {
      // Never let the list empty out — there must always be something to launch.
      if (state.instances.length <= 1) return state
      const instances = state.instances.filter((i) => i.id !== action.id)
      const activeInstanceId =
        action.id === state.activeInstanceId ? instances[0].id : state.activeInstanceId
      return { ...state, instances, activeInstanceId }
    }

    case 'INSTALL_MOD':
      return {
        ...state,
        mods: state.mods.map((m) =>
          m.id === action.id ? { ...m, installed: true, enabled: true } : m,
        ),
      }

    case 'UNINSTALL_MOD':
      return {
        ...state,
        mods: state.mods.map((m) =>
          m.id === action.id ? { ...m, installed: false, enabled: false } : m,
        ),
      }

    case 'TOGGLE_MOD':
      return {
        ...state,
        mods: state.mods.map((m) =>
          m.id === action.id && m.installed ? { ...m, enabled: !m.enabled } : m,
        ),
      }

    case 'LAUNCH_START': {
      if (state.launch.phase !== 'idle') return state
      const instance = state.instances.find((i) => i.id === state.activeInstanceId)
      return {
        ...state,
        launch: {
          phase: 'checking',
          progress: 0,
          log: [
            `Launching “${instance?.name ?? 'instance'}” · ${instance?.mcVersion ?? MC_VERSION} ${
              instance ? LOADER_LABEL[instance.loader] : ''
            }`.trim(),
            PHASE_PLAN.checking.enter,
          ],
        },
      }
    }

    case 'LAUNCH_TICK': {
      const current = state.launch.phase
      if (current === 'idle' || current === 'running') return state

      const plan = PHASE_PLAN[current]
      const progress = Math.min(plan.to, state.launch.progress + plan.inc)
      let phase: LaunchPhase = current
      let log = state.launch.log

      if (current === 'downloading' && Math.random() < 0.4) {
        log = [...log, `  ↓ ${pick(ASSET_SAMPLES)}`]
      }

      if (progress >= plan.to) {
        const next = PHASE_ORDER[PHASE_ORDER.indexOf(current) + 1]
        if (next) {
          phase = next
          log = [...log, PHASE_PLAN[next].enter]
        } else {
          phase = 'running'
          log = [...log, 'Minecraft started. Have fun!']
        }
      }

      return { ...state, launch: { phase, progress, log: trim(log, MAX_LOG) } }
    }

    case 'LAUNCH_STOP':
      return { ...state, launch: { ...IDLE_LAUNCH } }

    case 'HOST_START': {
      if (state.host.booting || state.host.running) return state
      return {
        ...state,
        host: { ...state.host, booting: true, bootStep: 0, console: [], players: [] },
      }
    }

    case 'HOST_BOOT_TICK': {
      const { host } = state
      if (!host.booting) return state

      const template = HOST_BOOT_LINES[host.bootStep]
      if (template === undefined) {
        return { ...state, host: { ...host, booting: false, running: true } }
      }

      const line = template
        .replace('{ram}', String(host.ramMb))
        .replace('{edition}', host.edition)
        .replace(/\{port\}/g, String(host.port))

      const bootStep = host.bootStep + 1
      const done = bootStep >= HOST_BOOT_LINES.length

      return {
        ...state,
        host: {
          ...host,
          bootStep,
          booting: !done,
          running: done,
          console: trim([...host.console, line], MAX_CONSOLE),
          players: done ? [state.account.username] : host.players,
        },
      }
    }

    case 'HOST_IDLE_TICK': {
      const { host } = state
      if (!host.running) return state

      const template = pick(HOST_IDLE_LINES)
      const candidates = MOCK_PLAYERS.filter((p) => p !== state.account.username)
      const player = pick(candidates)
      const line = template.replace('{player}', player)

      let players = host.players
      if (line.endsWith('joined the game') && !players.includes(player)) {
        players = [...players, player]
      } else if (line.endsWith('left the game')) {
        players = players.filter((p) => p !== player)
      }

      return {
        ...state,
        host: { ...host, console: trim([...host.console, line], MAX_CONSOLE), players },
      }
    }

    case 'HOST_STOP':
      return {
        ...state,
        host: {
          ...state.host,
          booting: false,
          running: false,
          bootStep: 0,
          players: [],
          console: trim([...state.host.console, 'Stopping the server', 'Server stopped.'], MAX_CONSOLE),
        },
      }

    case 'HOST_SET': {
      const next = { ...state.host, ...action.patch }
      // Switching edition should follow that edition's default port unless the
      // user has deliberately moved off it.
      if (action.patch.edition && action.patch.edition !== state.host.edition) {
        if (state.host.port === DEFAULT_PORT[state.host.edition]) {
          next.port = DEFAULT_PORT[action.patch.edition]
        }
      }
      return { ...state, host: next }
    }

    case 'SET_SETTING':
      return { ...state, settings: { ...state.settings, ...action.patch } }

    case 'SET_SKIN':
      return { ...state, account: { ...state.account, skinUrl: action.skinUrl } }

    case 'SET_USERNAME':
      return { ...state, account: { ...state.account, username: action.username } }

    case 'RESET': {
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.removeItem(STORAGE_KEY)
        } catch {
          /* ignore */
        }
      }
      return buildInitialState()
    }

    default:
      return state
  }
}
