import type { ReactNode } from 'react'
import { Cpu, Gauge, HardDrive, Wifi } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MC_VERSION } from '../../data/site'
import { formatRam } from '../../utils/format'
import { useLauncher } from './LauncherContext'
import styles from './StatusBar.module.css'

/* The bottom strip is the launcher's honest little dashboard: whatever the app
   is doing right now, in mono, at a glance. */
export function StatusBar() {
  const { state, isPlaying, isBusy, enabledCount } = useLauncher()
  const { settings, host } = state

  const status = isPlaying
    ? { label: 'Playing', tone: styles.ok }
    : isBusy
      ? { label: 'Working', tone: styles.busy }
      : { label: 'Ready', tone: styles.idle }

  return (
    <footer className={styles.bar}>
      <span className={[styles.state, status.tone].join(' ')}>
        <span className={styles.dot} />
        {status.label}
      </span>

      <span className={styles.sep} aria-hidden="true" />

      <Stat Icon={HardDrive} title="Allocated memory">
        {formatRam(settings.ramMb)}
      </Stat>

      <Stat Icon={Cpu} title="Enabled mods">
        {enabledCount} mods
      </Stat>

      <Stat Icon={Gauge} title="FPS mode">
        {settings.aggressiveFps ? 'FPS: aggressive' : 'FPS: balanced'}
      </Stat>

      {host.running && (
        <Stat Icon={Wifi} title="Server port" live>
          :{host.port}
        </Stat>
      )}

      <span className={['mono', styles.right].join(' ')}>Minecraft {MC_VERSION}</span>
    </footer>
  )
}

interface StatProps {
  Icon: LucideIcon
  title: string
  live?: boolean
  children: ReactNode
}

function Stat({ Icon, title, live, children }: StatProps) {
  return (
    <span className={[styles.stat, live ? styles.statLive : ''].filter(Boolean).join(' ')} title={title}>
      <Icon size={12} strokeWidth={1.75} aria-hidden="true" />
      {children}
    </span>
  )
}
