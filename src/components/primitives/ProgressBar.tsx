import styles from './ProgressBar.module.css'

interface Props {
  /** 0–100 */
  value: number
  /** Adds the animated stripe treatment while work is in flight. */
  active?: boolean
  label?: string
  className?: string
}

export function ProgressBar({ value, active, label, className }: Props) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      className={[styles.track, active ? styles.active : '', className ?? ''].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
    >
      <div className={styles.fill} style={{ width: `${clamped}%` }} />
    </div>
  )
}
