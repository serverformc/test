import { VERSION } from '../../data/site'
import { defaultNovaSkin } from '../../utils/novaSkin'
import { useLauncher } from './LauncherContext'
import styles from './TitleBar.module.css'

export function TitleBar() {
  const { state, isPlaying, isBusy } = useLauncher()
  const { account } = state
  const skin = account.skinUrl ?? defaultNovaSkin()

  const presence = isPlaying ? 'Playing Minecraft' : isBusy ? 'Preparing…' : 'Signed in'

  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <img className={styles.tile} src="/icons/icon-192.png" alt="" width={20} height={20} />
        <span className={styles.name}>NOVA CLIENT</span>
        <span className={['mono', styles.ver].join(' ')}>v{VERSION}</span>
      </div>

      <div className={styles.account}>
        <span
          className={['lAvatar', styles.avatar].join(' ')}
          style={{ backgroundImage: `url(${skin})` }}
          role="img"
          aria-label={`${account.username}'s skin`}
        />
        <span className={styles.who}>
          <span className={styles.user}>{account.username}</span>
          <span className={styles.presence}>
            <span className={[styles.dot, isPlaying ? styles.dotLive : ''].filter(Boolean).join(' ')} />
            {presence}
          </span>
        </span>
      </div>

      {/* Decorative window chrome — this is a browser demo, the buttons are a
          visual cue that you're looking at a desktop app, not real controls. */}
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.min} />
        <span className={styles.max} />
        <span className={styles.close} />
      </div>
    </header>
  )
}
