import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Download, Moon, Sun } from 'lucide-react'
import { NAV_LINKS, VERSION, DOWNLOADS } from '../../data/site'
import type { NavLink } from '../../data/site'
import { Button } from '../primitives/Button'
import styles from './Nav.module.css'

/** In-page anchors have to be absolutised when we're not on the home route. */
function hrefFor(link: NavLink, onHome: boolean) {
  if (link.route) return link.href
  return onHome ? link.href : `/${link.href}`
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close the drawer whenever the route changes. */
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('nova-theme')
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const isLight = savedTheme ? savedTheme === 'light' : prefersLight
    setLightMode(isLight)
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark'
  }, [])

  function toggleTheme() {
    const nextLightMode = !lightMode
    setLightMode(nextLightMode)
    document.documentElement.dataset.theme = nextLightMode ? 'light' : 'dark'
    window.localStorage.setItem('nova-theme', nextLightMode ? 'light' : 'dark')
  }

  const links = NAV_LINKS.map((link) => {
    const href = hrefFor(link, onHome)
    const active = link.route && pathname === link.href
    const cls = [styles.link, active ? styles.linkActive : ''].filter(Boolean).join(' ')

    return link.route ? (
      <Link key={link.label} to={href} className={cls} onClick={() => setOpen(false)}>
        {link.label}
      </Link>
    ) : onHome ? (
      <a key={link.label} href={href} className={cls} onClick={() => setOpen(false)}>
        {link.label}
      </a>
    ) : (
      <Link key={link.label} to={href} className={cls} onClick={() => setOpen(false)}>
        {link.label}
      </Link>
    )
  })

  return (
    <nav className={[styles.nav, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
      <div className={[styles.inner, 'container'].join(' ')}>
        <Link to="/" className={styles.brand} aria-label="Nova Client — home">
          <img className={styles.mark} src="/icons/icon-192.png" alt="" width={34} height={34} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>NOVA</span>
            <span className={styles.brandSecond}>CLIENT</span>
          </span>
        </Link>

        <div className={styles.links}>{links}</div>

        <div className={styles.right}>
          <span className={['mono', styles.ver].join(' ')}>v{VERSION}</span>
          <button
            type="button"
            className={styles.themeToggle}
            aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            title={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            onClick={toggleTheme}
          >
            {lightMode ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
          </button>
          <Button href={DOWNLOADS.windows} size="sm" download className={styles.cta}>
            <Download size={15} aria-hidden="true" />
            Download
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={[styles.drawer, open ? styles.drawerOpen : ''].filter(Boolean).join(' ')} hidden={!open}>
        <div className={styles.drawerLinks}>{links}</div>
        <div className={styles.drawerCtas}>
          <Button href={DOWNLOADS.windows} download full>
            ⬆️ Download for Windows
          </Button>
          <Button href={DOWNLOADS.linux} variant="secondary" download full>
            🐧 Download for Linux
          </Button>
        </div>
      </div>
    </nav>
  )
}
