import { useEffect, useRef } from 'react'
import styles from './VantaBackground.module.css'

interface VantaEffect {
  destroy: () => void
}

interface VantaApi {
  NET: (options: {
    el: HTMLElement
    mouseControls: boolean
    touchControls: boolean
    gyroControls: boolean
    minHeight: number
    minWidth: number
    scale: number
    scaleMobile: number
    color: number
    backgroundColor: number
  }) => VantaEffect
}

declare global {
  interface Window {
    VANTA?: VantaApi
  }
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve()
      else existing.addEventListener('load', () => resolve(), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true'
      resolve()
    }, { once: true })
    script.addEventListener('error', () => reject(new Error(`Could not load ${src}`)), { once: true })
    document.head.appendChild(script)
  })
}

export function VantaBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let effect: VantaEffect | undefined
    let cancelled = false

    void loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
      .then(() => loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js'))
      .then(() => {
        if (!cancelled && backgroundRef.current && window.VANTA) {
          effect = window.VANTA.NET({
            el: backgroundRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1,
            scaleMobile: 1,
            color: 0xc3118,
            backgroundColor: 0x0,
          })
        }
      })
      .catch(() => undefined)

    return () => {
      cancelled = true
      effect?.destroy()
    }
  }, [])

  return <div ref={backgroundRef} className={styles.background} aria-hidden="true" />
}