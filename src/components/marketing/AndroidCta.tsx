import type { ReactNode } from 'react'
import { useInstallPrompt } from '../../hooks/useInstallPrompt'
import { Button } from '../primitives/Button'

/* The site promises "install on your phone — 1 tap", and that promise is only
   real when Chrome has actually fired beforeinstallprompt. So: a genuine
   install button where the browser supports it, and an honest link everywhere
   else. The visual treatment is left to the caller — this only owns behaviour,
   because the same action appears as a hero CTA, a section CTA and a FAB. */

interface Props {
  children: ReactNode
  /** Where to send people whose browser can't install (desktop, iOS Safari…). */
  fallbackHref: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  className?: string
  ariaLabel?: string
}

export function AndroidCta({ children, fallbackHref, variant = 'primary', size = 'md', full, className, ariaLabel }: Props) {
  const { canInstall, promptInstall } = useInstallPrompt()

  if (canInstall) {
    return (
      <Button
        variant={variant}
        size={size}
        full={full}
        className={className}
        ariaLabel={ariaLabel}
        onClick={() => {
          void promptInstall()
        }}
      >
        {children}
      </Button>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      full={full}
      className={className}
      ariaLabel={ariaLabel}
      href={fallbackHref}
    >
      {children}
    </Button>
  )
}
