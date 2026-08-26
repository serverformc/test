import { useId } from 'react'
import styles from './Toggle.module.css'

interface Props {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
  hint?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange, label, hint, disabled }: Props) {
  const id = useId()
  return (
    <div className={styles.row}>
      <label className={styles.text} htmlFor={id}>
        <span className={styles.label}>{label}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[styles.switch, checked ? styles.on : ''].filter(Boolean).join(' ')}
      >
        <span className={styles.knob} />
      </button>
    </div>
  )
}
