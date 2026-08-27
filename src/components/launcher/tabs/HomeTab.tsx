import { useEffect, useRef } from 'react'
import { Layers, Play, Puzzle, Square, Zap } from 'lucide-react'
import { MC_VERSION } from '../../../data/site'
import { LOADER_LABEL } from '../../../data/launcher/instances'
import { formatRam } from '../../../utils/format'
import { defaultNovaSkin } from '../../../utils/novaSkin'
import { ProgressBar } from '../../primitives/ProgressBar'
import { useLauncher } from '../LauncherContext'
import type { LaunchPhase } from '../launcherTypes'
import styles from './HomeTab.module.css'

const PHASE_LABEL: Record<LaunchPhase, string> = {
  idle: 'Ready to play',
  checking: 'Checking files',
  downloading: 'Downloading assets',
  extracting: 'Extracting libraries',
  launching: 'Launching Minecraft',
  running: 'Playing',
}

export function HomeTab() {
  const { state, dispatch, activeInstance, enabledCount, isBusy, isPlaying } = useLauncher()
  const { launch, account, settings } = state
  const logRef = useRef<HTMLDivElement>(null)

  /* Follow the tail of the log, the way a real console does. */
  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [launch.log.length])

  const skin = account.skinUrl ?? defaultNovaSkin()
  const showLog = launch.log.length > 0

  return (
    <div className="lStack">
      {/* ---- Who + what ---------------------------------------------------- */}
      <section className={['lPanel', styles.card].join(' ')}>
        <span
          className={['lAvatar', styles.face].join(' ')}
          style={{ backgroundImage: `url(${skin})` }}
          role="img"
          aria-label={`${account.username}'s skin`}
        />
        <div className={styles.who}>
          <p className="lLabel">Signed in as</p>
          <p className={styles.username}>{account.username}</p>
        </div>
        <div className={styles.chips}>
          <span className="lChip">{formatRam(settings.ramMb)} RAM</span>
          <span className="lChip">
            {enabledCount} mod{enabledCount === 1 ? '' : 's'}
          </span>
          {settings.aggressiveFps && (
            <span className="lChip lChipCy">
              <Zap size={11} aria-hidden="true" /> FPS+
            </span>
          )}
        </div>
      </section>

      {/* ---- The instance about to launch ---------------------------------- */}
      <section className={['lPanel', styles.instance].join(' ')}>
        <span className={styles.icon} aria-hidden="true">
          {activeInstance?.icon ?? '🌍'}
        </span>
        <div className={styles.meta}>
          <p className="lLabel">Selected instance</p>
          <h3 className={styles.name}>{activeInstance?.name ?? 'No instance'}</h3>
          <p className={['mono', styles.spec].join(' ')}>
            {activeInstance?.mcVersion ?? MC_VERSION}
            {activeInstance ? ` · ${LOADER_LABEL[activeInstance.loader]}` : ''}
            {activeInstance?.loaderVersion ? ` ${activeInstance.loaderVersion}` : ''}
            {activeInstance ? ` · ${activeInstance.lastPlayed}` : ''}
          </p>
        </div>
        <div className={styles.jump}>
          <button type="button" className={styles.jumpBtn} onClick={() => dispatch({ type: 'SET_TAB', tab: 'instances' })}>
            <Layers size={14} aria-hidden="true" /> Switch
          </button>
          <button type="button" className={styles.jumpBtn} onClick={() => dispatch({ type: 'SET_TAB', tab: 'mods' })}>
            <Puzzle size={14} aria-hidden="true" /> Mods
          </button>
        </div>
      </section>

      {/* ---- The button everything else exists to serve -------------------- */}
      {isPlaying ? (
        <button type="button" className={[styles.play, styles.playStop].join(' ')} onClick={() => dispatch({ type: 'LAUNCH_STOP' })}>
          <Square size={18} aria-hidden="true" />
          Stop Minecraft
        </button>
      ) : (
        <button
          type="button"
          className={[styles.play, isBusy ? styles.playBusy : ''].filter(Boolean).join(' ')}
          onClick={() => dispatch({ type: 'LAUNCH_START' })}
          disabled={isBusy}
        >
          <Play size={18} aria-hidden="true" />
          {isBusy ? `${Math.round(launch.progress)}%` : 'PLAY'}
        </button>
      )}

      {/* ---- Progress + console ------------------------------------------- */}
      <section className={styles.status}>
        <div className={styles.statusHead}>
          <span className={[styles.phase, isPlaying ? styles.phasePlaying : ''].filter(Boolean).join(' ')}>
            {PHASE_LABEL[launch.phase]}
          </span>
          <span className={['mono', styles.pct].join(' ')}>{Math.round(launch.progress)}%</span>
        </div>
        <ProgressBar value={launch.progress} active={isBusy} label={PHASE_LABEL[launch.phase]} />

        {showLog ? (
          <div ref={logRef} className={['lConsole', styles.log].join(' ')} aria-live="polite" aria-atomic="false">
            {launch.log.map((line, i) => (
              <span key={`${i}-${line}`} className="lConsoleLine">
                {line}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles.hint}>
            Press PLAY to watch the launch sequence — file check, asset download, library extract, then Minecraft.
          </p>
        )}
      </section>
    </div>
  )
}
