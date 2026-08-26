import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { buildInitialState, launcherReducer, savePersisted } from './launcherReducer'
import type { LauncherAction, LauncherState } from './launcherTypes'

export type LauncherVariant = 'embed' | 'full'

interface LauncherContextValue {
  state: LauncherState
  dispatch: Dispatch<LauncherAction>
  variant: LauncherVariant
  /** Convenience derivations so tabs don't each re-scan the arrays. */
  activeInstance: LauncherState['instances'][number] | undefined
  installedCount: number
  enabledCount: number
  isBusy: boolean
  isPlaying: boolean
}

const LauncherContext = createContext<LauncherContextValue | null>(null)

interface Props {
  variant: LauncherVariant
  children: ReactNode
}

export function LauncherProvider({ variant, children }: Props) {
  const [state, dispatch] = useReducer(launcherReducer, undefined, buildInitialState)
  const reduced = useReducedMotion()

  const { phase } = state.launch
  const { booting, running } = state.host

  /* Launch simulation driver. One interval per working phase; the reducer owns
     all staging so this only has to decide how fast to tick. */
  useEffect(() => {
    if (phase === 'idle' || phase === 'running') return
    const id = window.setInterval(() => dispatch({ type: 'LAUNCH_TICK' }), reduced ? 40 : 110)
    return () => window.clearInterval(id)
  }, [phase, reduced])

  /* Server boot sequence. */
  useEffect(() => {
    if (!booting) return
    const id = window.setInterval(() => dispatch({ type: 'HOST_BOOT_TICK' }), reduced ? 60 : 360)
    return () => window.clearInterval(id)
  }, [booting, reduced])

  /* Ambient join/leave chatter once the server is up. */
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => dispatch({ type: 'HOST_IDLE_TICK' }), 4200)
    return () => window.clearInterval(id)
  }, [running])

  /* Persist on changes to durable slices only. Deliberately not keyed on the
     whole state object, so launch ticks and console spam don't hammer
     localStorage several times a second. */
  useEffect(() => {
    savePersisted(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.instances,
    state.activeInstanceId,
    state.mods,
    state.settings,
    state.account.username,
    state.account.skinUrl,
    state.host.edition,
    state.host.ramMb,
    state.host.port,
    state.host.upnp,
  ])

  const value = useMemo<LauncherContextValue>(() => {
    const installed = state.mods.filter((m) => m.installed)
    return {
      state,
      dispatch,
      variant,
      activeInstance: state.instances.find((i) => i.id === state.activeInstanceId),
      installedCount: installed.length,
      enabledCount: installed.filter((m) => m.enabled).length,
      isBusy: phase !== 'idle' && phase !== 'running',
      isPlaying: phase === 'running',
    }
  }, [state, variant, phase])

  return <LauncherContext.Provider value={value}>{children}</LauncherContext.Provider>
}

export function useLauncher(): LauncherContextValue {
  const ctx = useContext(LauncherContext)
  if (!ctx) throw new Error('useLauncher must be used inside a <LauncherProvider>')
  return ctx
}
