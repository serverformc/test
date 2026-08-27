import { useState } from 'react'
import { Smartphone, X } from 'lucide-react'
import { useInstallPrompt } from '../../hooks/useInstallPrompt'
import styles from './InstallAppFab.module.css'

const DISMISS_KEY = 'nova:fab-dismissed'

function wasDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    // Private mode / storage disabled — just show it.
    return false
  }
}

/* Only ever rendered when the browser has genuinely offered an install, so
   there's no dead button on desktop. Dismissal is per-session: closing it
   shouldn't hide the option forever. */
export function InstallAppFab() {
  const { canInstall, promptInstall } = useInstallPrompt()
  const [dismissed, setDismissed] = useState(wasDismissed)

  if (!canInstall || dismissed) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* nothing to do — the state update already hid it */
    }
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.fab}
        onClick={() => {
          void promptInstall()
        }}
      >
        <Smartphone size={17} aria-hidden="true" />
        Install Nova App
      </button>
      <button type="button" className={styles.close} onClick={dismiss} aria-label="Dismiss install prompt">
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  )
}
