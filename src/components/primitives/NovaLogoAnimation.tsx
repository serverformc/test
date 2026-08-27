import { useEffect, useRef } from 'react'
import { assetUrl } from '../../data/site'
import styles from './NovaLogoAnimation.module.css'

interface Props {
  src?: string
  className?: string
  autoPlay?: boolean
}

export function NovaLogoAnimation({
  src = assetUrl('nova-logo.png'),
  className = '',
  autoPlay = true,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autoPlay || !rootRef.current) return

    const element = rootRef.current
    element.classList.remove(styles.start)
    const frame = requestAnimationFrame(() => element.classList.add(styles.start))

    return () => cancelAnimationFrame(frame)
  }, [autoPlay])

  return (
    <div ref={rootRef} className={[styles.logo, className].filter(Boolean).join(' ')} aria-label="NOVA Client">
      <img src={src} alt="NOVA Client" className={[styles.layer, styles.base].join(' ')} draggable="false" />

      <div className={[styles.mask, styles.orbitMask].join(' ')}>
        <img src={src} alt="" className={[styles.layer, styles.orbit].join(' ')} draggable="false" />
      </div>
      <div className={[styles.mask, styles.symbolMask].join(' ')}>
        <img src={src} alt="" className={[styles.layer, styles.symbol].join(' ')} draggable="false" />
      </div>
      <div className={[styles.mask, styles.starMask].join(' ')}>
        <img src={src} alt="" className={[styles.layer, styles.star].join(' ')} draggable="false" />
      </div>
      <div className={[styles.mask, styles.novaTextMask].join(' ')}>
        <img src={src} alt="" className={[styles.layer, styles.novaText].join(' ')} draggable="false" />
      </div>
      <div className={[styles.mask, styles.clientTextMask].join(' ')}>
        <img src={src} alt="" className={[styles.layer, styles.clientText].join(' ')} draggable="false" />
      </div>

      <span className={styles.energyPulse} aria-hidden="true" />
      <span className={styles.lightSweep} aria-hidden="true" />
      <span className={styles.ambientGlow} aria-hidden="true" />
    </div>
  )
}
