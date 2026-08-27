import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { PLATFORMS, UPDATE_FOOTNOTE } from '../../data/site'
import type { Platform } from '../../data/site'
import { Badge } from '../primitives/Badge'
import { Button } from '../primitives/Button'
import { SectionHeading } from '../primitives/SectionHeading'
import { AndroidCta } from './AndroidCta'
import styles from './Install.module.css'

function Actions({ platform }: { platform: Platform }) {
  if (platform.status === 'soon') {
    return (
      <Button variant="secondary" disabled full>
        Coming soon
      </Button>
    )
  }

  return (
    <div className={styles.actions}>
      {platform.buttons.map((btn, i) => {
        /* Android's first button is the live PWA prompt, not a file link — the
           .apk below it stays a plain download. */
        if (platform.id === 'android' && i === 0) {
          return (
            <AndroidCta key={btn.label} fallbackHref={btn.href} variant={btn.variant} full>
              {btn.label}
            </AndroidCta>
          )
        }

        return (
          <Button key={btn.label} href={btn.href} variant={btn.variant} download full>
            <Download size={16} aria-hidden="true" />
            {btn.label}
          </Button>
        )
      })}
    </div>
  )
}

export function Install() {
  return (
    <section className="section" id="install" aria-labelledby="install-title">
      <div className="container">
        <SectionHeading
          eyebrow="Download"
          id="install-title"
          title="Get Nova Client"
          sub="Direct downloads · Java included · auto-updating"
          align="center"
        />

        <div className={styles.grid}>
          {PLATFORMS.map((platform, i) => (
            <motion.article
              key={platform.id}
              className={[styles.card, platform.status === 'soon' ? styles.soon : ''].filter(Boolean).join(' ')}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <header className={styles.head}>
                <span className={styles.icon} aria-hidden="true">
                  {platform.icon}
                </span>
                {platform.flag && (
                  <Badge tone={platform.status === 'soon' ? 'soon' : 'new'} className={styles.flag}>
                    {platform.flag}
                  </Badge>
                )}
              </header>

              <h3 className={styles.name}>{platform.name}</h3>
              <p className={styles.meta}>{platform.meta}</p>
              {platform.size && <p className={['mono', styles.size].join(' ')}>{platform.size}</p>}

              <div className={styles.foot}>
                <Actions platform={platform} />
              </div>
            </motion.article>
          ))}
        </div>

        <p className={styles.footnote}>{UPDATE_FOOTNOTE}</p>
      </div>
    </section>
  )
}
