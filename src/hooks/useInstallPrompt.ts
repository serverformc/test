import { useCallback, useEffect, useState } from 'react'

/* Wraps the real PWA install flow that the site's "Install on Android — 1 tap"
   promise depends on. Chrome fires beforeinstallprompt once the manifest and
   service worker check out; we stash the event and replay it on click. */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function detectStandalone(): boolean {
  if (typeof window === 'undefined') return false
  const iosStandalone = (window.navigator as { standalone?: boolean }).standalone
  return window.matchMedia?.('(display-mode: standalone)').matches || iosStandalone === true
}

export function useInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [isStandalone, setIsStandalone] = useState(detectStandalone)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      // Suppress Chrome's own mini-infobar so our button is the entry point.
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferred(null)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)

    const mq = window.matchMedia?.('(display-mode: standalone)')
    const onDisplayChange = (e: MediaQueryListEvent) => setIsStandalone(e.matches)
    mq?.addEventListener('change', onDisplayChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      mq?.removeEventListener('change', onDisplayChange)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferred) return 'unavailable' as const
    await deferred.prompt()
    const { outcome } = await deferred.userChoice
    if (outcome === 'accepted') setInstalled(true)
    setDeferred(null)
    return outcome
  }, [deferred])

  return {
    /** True only when the browser has actually offered an install. */
    canInstall: deferred !== null && !isStandalone && !installed,
    isStandalone,
    installed,
    promptInstall,
  }
}
