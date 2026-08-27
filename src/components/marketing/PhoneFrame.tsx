import { Play, Wifi } from 'lucide-react'
import { assetUrl, VERSION } from '../../data/site'
import styles from './PhoneFrame.module.css'

/* Decorative illustration of Nova running in standalone display mode — this is
   what "opens fullscreen like a real app" actually looks like. Entirely
   presentational, so the whole thing is hidden from assistive tech and the
   surrounding copy carries the meaning. */

export function PhoneFrame() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />

      <div className={styles.phone}>
        <span className={styles.btnPower} />
        <span className={styles.btnVolUp} />
        <span className={styles.btnVolDown} />

        <div className={styles.screen}>
          <div className={styles.pill} />

          <div className={['mono', styles.statusRow].join(' ')}>
            <span>9:41</span>
            <span className={styles.statusIcons}>
              <Wifi size={11} />
              <span className={styles.battery} />
            </span>
          </div>

          <header className={styles.appBar}>
            <img className={['brandMark', styles.appIcon].join(' ')} src={assetUrl('icons/icon-192.png')} alt="" width={26} height={26} />
            <span className={styles.appName}>NOVA CLIENT</span>
            <span className={['mono', styles.appVer].join(' ')}>v{VERSION}</span>
          </header>

          <div className={styles.card}>
            <span className={styles.cardDot} />
            <div>
              <p className={styles.cardTitle}>Froggy_Live</p>
              <p className={styles.cardSub}>Signed in · Minecraft Bedrock</p>
            </div>
          </div>

          <ul className={styles.rows}>
            <li className={styles.row}>
              <span className={styles.rowDot} />
              Featured servers
              <span className={['mono', styles.rowMeta].join(' ')}>JOIN</span>
            </li>
            <li className={styles.row}>
              <span className={styles.rowDot} />
              Marketplace worlds
              <span className={['mono', styles.rowMeta].join(' ')}>OPEN</span>
            </li>
            <li className={styles.row}>
              <span className={styles.rowDotIdle} />
              Resource packs
              <span className={['mono', styles.rowMeta].join(' ')}>+ Add</span>
            </li>
          </ul>

          <div className={styles.play}>
            <Play size={14} />
            PLAY
          </div>

          <div className={styles.homeBar} />
        </div>
      </div>
    </div>
  )
}
