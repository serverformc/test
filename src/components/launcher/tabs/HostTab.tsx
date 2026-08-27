import { useEffect, useRef } from 'react'
import { Copy, Play, Server, Square, Users } from 'lucide-react'
import { DEFAULT_PORT } from '../../../data/launcher/host'
import type { ServerEdition } from '../../../data/launcher/host'
import { clamp, formatRam } from '../../../utils/format'
import { Slider } from '../../primitives/Slider'
import { Toggle } from '../../primitives/Toggle'
import { useLauncher } from '../LauncherContext'
import styles from './HostTab.module.css'

const EDITIONS: { id: ServerEdition; label: string; note: string }[] = [
  { id: 'java', label: 'Java', note: 'PC / Mac / Linux' },
  { id: 'bedrock', label: 'Bedrock', note: 'Console / mobile / Win' },
]

export function HostTab() {
  const { state, dispatch } = useLauncher()
  const { host } = state
  const consoleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = consoleRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [host.console.length])

  const live = host.running || host.booting
  const address = `your-public-ip:${host.port}`

  return (
    <div className="lStack">
      <div className="lHead">
        <div>
          <h3 className="lTitle">Host a server</h3>
          <p className="lSub">Java and Bedrock, from the launcher. RAM is picked for you unless you'd rather not.</p>
        </div>
        <span className={['lChip', host.running ? 'lChipOk' : ''].filter(Boolean).join(' ')}>
          {host.booting ? 'Starting…' : host.running ? 'Online' : 'Offline'}
        </span>
      </div>

      <section className={['lPanel', styles.config].join(' ')}>
        <div className={styles.editions}>
          <p className="lLabel">Edition</p>
          <div className={styles.editionRow} role="group" aria-label="Server edition">
            {EDITIONS.map((ed) => (
              <button
                key={ed.id}
                type="button"
                disabled={live}
                aria-pressed={host.edition === ed.id}
                className={[styles.edition, host.edition === ed.id ? styles.editionOn : ''].filter(Boolean).join(' ')}
                onClick={() => dispatch({ type: 'HOST_SET', patch: { edition: ed.id } })}
              >
                <span className={styles.editionName}>{ed.label}</span>
                <span className={styles.editionNote}>{ed.note}</span>
              </button>
            ))}
          </div>
        </div>

        <Slider
          label="Server RAM"
          display={formatRam(host.ramMb)}
          value={host.ramMb}
          min={1024}
          max={12288}
          step={1024}
          onChange={(ramMb) => dispatch({ type: 'HOST_SET', patch: { ramMb } })}
          hint="2–4 GB comfortably holds a handful of friends."
        />

        <label className={styles.portField}>
          <span className="lLabel">Port</span>
          <input
            className={['lInput', 'mono', styles.port].join(' ')}
            type="number"
            inputMode="numeric"
            value={host.port}
            min={1024}
            max={65535}
            disabled={live}
            onChange={(e) => dispatch({ type: 'HOST_SET', patch: { port: clamp(Number(e.target.value) || 0, 1024, 65535) } })}
          />
          <span className={styles.portHint}>
            Default for {host.edition} is <span className="mono">{DEFAULT_PORT[host.edition]}</span>
          </span>
        </label>

        <Toggle
          label="UPnP port forwarding"
          hint="Off means forwarding the port on your router by hand."
          checked={host.upnp}
          onChange={(upnp) => dispatch({ type: 'HOST_SET', patch: { upnp } })}
          disabled={live}
        />
      </section>

      <div className="lBtnRow">
        {host.running || host.booting ? (
          <button type="button" className={[styles.action, styles.stop].join(' ')} onClick={() => dispatch({ type: 'HOST_STOP' })}>
            <Square size={15} aria-hidden="true" />
            Stop server
          </button>
        ) : (
          <button type="button" className={[styles.action, styles.start].join(' ')} onClick={() => dispatch({ type: 'HOST_START' })}>
            <Play size={15} aria-hidden="true" />
            Start server
          </button>
        )}
        {host.running && (
          <span className={['lChip', styles.address].join(' ')}>
            <Copy size={11} aria-hidden="true" />
            {address}
          </span>
        )}
      </div>

      <section className={styles.grid}>
        <div className={styles.players}>
          <p className="lLabel">
            <Users size={12} aria-hidden="true" /> Players {host.running ? `(${host.players.length})` : ''}
          </p>
          {host.players.length > 0 ? (
            <ul className={styles.playerList}>
              {host.players.map((player) => (
                <li key={player} className={styles.player}>
                  <span className={styles.pdot} aria-hidden="true" />
                  {player}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.none}>{host.running ? 'Waiting for players…' : 'Server is offline.'}</p>
          )}
        </div>

        <div className={styles.consoleWrap}>
          <p className="lLabel">
            <Server size={12} aria-hidden="true" /> Console
          </p>
          <div ref={consoleRef} className={['lConsole', styles.console].join(' ')} aria-live="polite">
            {host.console.length > 0 ? (
              host.console.map((line, i) => (
                <span key={`${i}-${line}`} className="lConsoleLine">
                  {line}
                </span>
              ))
            ) : (
              <span className={styles.none}>Start the server to see its output here.</span>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
