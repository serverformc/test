import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Nav } from './Nav'
import { Ticker } from './Ticker'
import { Footer } from './Footer'
import { VantaBackground } from './VantaBackground'
import styles from './Shell.module.css'

export function Shell({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()

  /* The ticker is homepage furniture — it would just steal height from the
     launcher and the help page. */
  const showTicker = pathname === '/'

  /* React Router doesn't act on hashes, so anchor links arriving from another
     route (e.g. /help → /#features) need scrolling by hand. */
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        // Wait a frame so the target section has actually mounted.
        const raf = requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }))
        return () => cancelAnimationFrame(raf)
      }
    }
    window.scrollTo({ top: 0 })
    return undefined
  }, [pathname, hash])

  return (
    <div className={styles.shell}>
      <VantaBackground />
      <a className={styles.skip} href="#main">
        Skip to content
      </a>

      <div className={styles.top}>
        <Nav />
        {showTicker && <Ticker />}
      </div>

      <main id="main" className={showTicker ? styles.mainWithTicker : styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  )
}
