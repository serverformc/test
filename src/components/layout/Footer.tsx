import { Link } from 'react-router-dom'
import { MessageCircle, ArrowUpRight } from 'lucide-react'
import { DISCORD_URL, VERSION, MC_VERSION, NAV_LINKS } from '../../data/site'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={[styles.inner, 'container'].join(' ')}>
        <div className={styles.brandCol}>
          <div className={styles.brandRow}>
            <img
              className={['brandMark', styles.logo].join(' ')}
              src="/nova-logo.png"
              alt="Nova Client"
              width={64}
              height={64}
            />
            <div>
              <p className={styles.name}>NOVA CLIENT</p>
              <p className={['mono', styles.tag].join(' ')}>
                v{VERSION} · Minecraft {MC_VERSION}
              </p>
            </div>
          </div>
          <p className={styles.credit}>
            Made with <span className={styles.heart}>💚</span> by <strong>frogg</strong> and the Nova community
          </p>
        </div>

        <nav className={styles.linkCol} aria-label="Footer">
          <p className={styles.colHead}>Site</p>
          {NAV_LINKS.map((link) =>
            link.route ? (
              <Link key={link.label} to={link.href} className={styles.link}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={`/${link.href}`} className={styles.link}>
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className={styles.linkCol}>
          <p className={styles.colHead}>Community</p>
          <a className={styles.link} href={DISCORD_URL} target="_blank" rel="noreferrer noopener">
            <MessageCircle size={14} aria-hidden="true" />
            Join our Discord
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <Link className={styles.link} to="/help">
            Fix it yourself
          </Link>
        </div>
      </div>

      <div className={[styles.legal, 'container'].join(' ')}>
        <p>
          Nova Client is not affiliated with Mojang Studios or Microsoft. “Minecraft” is a trademark of Mojang
          Studios.
        </p>
        <p className="mono">© {new Date().getFullYear()} Nova Client</p>
      </div>
    </footer>
  )
}
