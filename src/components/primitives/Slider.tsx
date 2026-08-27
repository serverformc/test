import { useId } from 'react'
import styles from './Slider.module.css'

interface Props {
  value: number
  min: number
  max: number
  step?: number
  onChange: (next: number) => void
  label: string
  /** Rendered to the right of the label, e.g. "6 GB". */
  display?: string
  hint?: string
}

export function Slider({ value, min, max, step = 1, onChange, label, display, hint }: Props) {
  const id = useId()
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <span className={['mono', styles.value].join(' ')}>{display ?? value}</span>
      </div>
      <input
        id={id}
        className={styles.input}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--pct': `${pct}%` } as React.CSSProperties}
      />
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  )
}
