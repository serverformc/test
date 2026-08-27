import { motion } from 'framer-motion'
import { Download, ShieldCheck, Smartphone } from 'lucide-react'
import { Button } from '../primitives/Button'
import { AndroidCta } from './AndroidCta'
import { DOWNLOADS, PRIVACY_NOTE } from '../../data/site'
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
      <svg className={styles.signalField} viewBox="0 0 1200 760" aria-hidden="true" focusable="false">
        <ellipse className={styles.signalOrbit} cx="840" cy="360" rx="330" ry="210" />
        <ellipse className={[styles.signalOrbit, styles.signalOrbitWide].join(' ')} cx="840" cy="360" rx="430" ry="290" />
        <path className={styles.signalArc} d="M 445 360 C 610 65, 1070 80, 1170 360" />
        <path className={[styles.signalArc, styles.signalArcSecond].join(' ')} d="M 470 475 C 720 650, 1020 610, 1170 385" />
        <circle className={[styles.signalNode, styles.signalNodeOne].join(' ')} cx="510" cy="260" r="5" />
        <circle className={[styles.signalNode, styles.signalNodeTwo].join(' ')} cx="1070" cy="220" r="4" />
        <circle className={[styles.signalNode, styles.signalNodeThree].join(' ')} cx="1010" cy="560" r="6" />
      </svg>

      <div className={['container', styles.inner].join(' ')}>
        <div className={styles.copy}>
          <motion.p className={['eyebrow', styles.kicker].join(' ')} {...rise(0)}>
            Minecraft launcher · free forever
          </motion.p>

          <motion.h1 className={styles.title} id="hero-title" {...rise(0.06)}>
            Minecraft,
            <br />
            supercharged.
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
