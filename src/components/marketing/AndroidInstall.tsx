import { motion } from 'framer-motion'
import { FileDown, Info, Smartphone } from 'lucide-react'
import { ANDROID_CAVEAT, ANDROID_STEPS, DOWNLOADS } from '../../data/site'
import { richText } from '../../utils/richText'
import { Badge } from '../primitives/Badge'
import { Button } from '../primitives/Button'
import { AndroidCta } from './AndroidCta'
import { PhoneFrame } from './PhoneFrame'
import styles from './AndroidInstall.module.css'

/* The install button here is the real PWA prompt when the browser offers one
   (see AndroidCta) — on desktop it falls through to the APK, which is the
   honest answer rather than a button that does nothing. */

export function AndroidInstall() {
  return (
    <section className={styles.wrap} id="android" aria-labelledby="android-title">
      <div className={['container', styles.inner].join(' ')}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.eyebrowRow}>
            <span className="eyebrow">Android</span>
            <Badge tone="new">FREE APP</Badge>
          </p>

          <h2 className={styles.title} id="android-title">
            <span aria-hidden="true">📱 </span>Get Nova on <span className="gradText">Android.</span>
          </h2>

          <ol className={styles.steps}>
            {ANDROID_STEPS.map((step, i) => (
              <li key={i} className={styles.step}>
                <span className={['mono', styles.num].join(' ')}>{i + 1}</span>
                <span>{richText(step)}</span>
              </li>
            ))}
          </ol>

          <div className={styles.actions}>
            <AndroidCta size="lg" fallbackHref={DOWNLOADS.android}>
              <Smartphone size={18} aria-hidden="true" />
              Install Nova App
            </AndroidCta>
          </div>

          <div className={styles.apk}>
            <p className={styles.apkTitle}>Prefer an app file?</p>
            <Button href={DOWNLOADS.android} variant="secondary" size="sm" download>
              <FileDown size={15} aria-hidden="true" />
              Download the .apk
            </Button>
            <p className={styles.apkNote}>Android will ask you to allow installs — tap Install.</p>
          </div>

          <p className={styles.caveat}>
            <Info size={15} aria-hidden="true" />
            {ANDROID_CAVEAT}
          </p>
        </motion.div>

        <motion.div
          className={styles.art}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <PhoneFrame />
        </motion.div>
      </div>
    </section>
  )
}
