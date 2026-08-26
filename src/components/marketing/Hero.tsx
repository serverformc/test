import { motion } from 'framer-motion'
import { Download, ShieldCheck, Smartphone } from 'lucide-react'
import { Badge } from '../primitives/Badge'
import { Button } from '../primitives/Button'
import { AndroidCta } from './AndroidCta'
import { DOWNLOADS, HERO_BADGES, PRIVACY_NOTE } from '../../data/site'
import styles from './Hero.module.css'
import launcherImage from '../../../image.png'

/* Asymmetric on purpose. The right-hand column isn't a screenshot — it's the
   real launcher component, the same one /launcher renders, just at embed
   density. That's the whole pitch of the page, so it gets to be the hero art. */

const EASE = [0.16, 1, 0.3, 1] as const

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: EASE },
  }
}

export function Hero() {
  function tiltToPointer(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--tilt-x', `${x * 10}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${y * -8}deg`)
  }

  function resetTilt(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className="gridField" aria-hidden="true" />
      <div className="glowField" aria-hidden="true" />

      <div className={['container', styles.inner].join(' ')}>
        <div className={styles.copy}>
          <motion.p className={['eyebrow', styles.kicker].join(' ')} {...rise(0)}>
            Minecraft launcher · free forever
          </motion.p>

          <motion.h1 className={styles.title} id="hero-title" {...rise(0.06)}>
            Minecraft,
            <br />
            <span className="gradText">supercharged.</span>
          </motion.h1>

          <motion.p className={styles.sub} {...rise(0.12)}>
            A fast, modern launcher with one-click mods, free server hosting, 3D skin previews and Discord Rich
            Presence.
          </motion.p>

          <motion.p className={styles.byline} {...rise(0.16)}>
            Built by <strong>frogg</strong> — free forever.
          </motion.p>

          <motion.div className={styles.ctas} {...rise(0.22)}>
            <Button href={DOWNLOADS.windows} size="lg" download>
              <Download size={18} aria-hidden="true" />
              Download for Windows
            </Button>
            <Button href={DOWNLOADS.linux} size="lg" variant="secondary" download>
              <span aria-hidden="true">🐧</span>
              Download for Linux
            </Button>
            <AndroidCta size="lg" variant="ghost" fallbackHref="#android">
              <Smartphone size={18} aria-hidden="true" />
              Install on Android
            </AndroidCta>
          </motion.div>

          <motion.ul className={styles.badges} {...rise(0.28)} aria-label="At a glance">
            {HERO_BADGES.map((badge) => (
              <li key={badge.label}>
                <Badge tone={badge.tone}>{badge.label}</Badge>
              </li>
            ))}
          </motion.ul>

          <motion.p className={styles.privacy} {...rise(0.32)}>
            <ShieldCheck size={15} aria-hidden="true" />
            {PRIVACY_NOTE}
          </motion.p>
        </div>

        <motion.div
          className={styles.stage}
          onPointerMove={tiltToPointer}
          onPointerLeave={resetTilt}
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
        >
          <div className={styles.stageGlow} aria-hidden="true" />
          <div className={styles.tilt}>
            <img className={styles.launcherImage} src={launcherImage} alt="Nova Client launcher with the Mods tab open" />
          </div>
          <p className={styles.stageNote}>
            <span className={styles.liveDot} aria-hidden="true" />
            Built for performance · ready when you are.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
