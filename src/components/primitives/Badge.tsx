import type { ReactNode } from 'react'
import styles from './Badge.module.css'

type Tone = 'version' | 'default' | 'new' | 'soon' | 'ok' | 'fps'

interface Props {
  children: ReactNode
  tone?: Tone
  className?: string
}

export function Badge({ children, tone = 'default', className }: Props) {
  return <span className={[styles.badge, styles[tone], className ?? ''].filter(Boolean).join(' ')}>{children}</span>
}
