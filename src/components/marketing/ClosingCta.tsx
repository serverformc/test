import { motion } from 'framer-motion'
import { Download, Smartphone } from 'lucide-react'
import { DISCORD_URL, DOWNLOADS } from '../../data/site'
import { Button } from '../primitives/Button'
import styles from './ClosingCta.module.css'

export function ClosingCta() {
  return (
    <section className={styles.wrap} aria-labelledby="closing-title">
      <div className="glowField" aria-hidden="true" />
      <div className={styles.beam} aria-hidden="true" />

      <div className={['container', styles.inner].join(' ')}>
        <motion.h2
          className={styles.title}
          id="closing-title"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Your world. Your client. <span className="gradText">Your Nova.</span>
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          Join the community and start playing in under a minute.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.downloads}>
            <Button href={DOWNLOADS.windows} size="lg" download>
              <Download size={18} aria-hidden="true" />
              Download for Windows
            </Button>
            <Button href={DOWNLOADS.linux} size="lg" variant="secondary" download>
              <span aria-hidden="true">🐧</span>
              Download for Linux
            </Button>
            <Button href={DOWNLOADS.android} size="lg" variant="secondary" download>
              <Smartphone size={18} aria-hidden="true" />
              Download for Android
            </Button>
          </div>
          <div className={styles.community}>
            <Button href={DISCORD_URL} size="lg" variant="ghost">
              <span aria-hidden="true">💬</span>
              Join our Discord
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
