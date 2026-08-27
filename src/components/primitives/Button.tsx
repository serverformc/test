import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  children: ReactNode
  variant?: Variant
  size?: Size
  /** External/absolute or /dl/ links render as <a>. */
  href?: string
  /** Router links render as <Link>. */
  to?: string
  onClick?: () => void
  disabled?: boolean
  full?: boolean
  className?: string
  download?: boolean
  ariaLabel?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  disabled,
  full,
  className,
  download,
  ariaLabel,
}: Props) {
  const cls = [styles.btn, styles[variant], styles[size], full ? styles.full : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  if (to && !disabled) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  if (href && !disabled) {
    return (
      <a className={cls} href={href} aria-label={ariaLabel} {...(download ? { download: '' } : {})}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
