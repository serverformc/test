import type { CSSProperties, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { FEATURES } from '../../data/features'
import type { Feature } from '../../data/features'
import { SectionHeading } from '../primitives/SectionHeading'
import styles from './Features.module.css'

/* A bento grid over 6 tracks, spans coming from the data file. The uneven
   spans (4+2 / 2+2+2 / 3+3) are what keep this from reading as a stock card
   wall — every row has a different rhythm. */

/* Feeds the cursor spotlight. Writing CSS variables straight onto the node
   keeps this off React's render path — a state update per mousemove across
   seven cards would be silly. */
function trackCursor(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function UptimeVisual() {
  return (
    <div className={styles.uptime} aria-hidden="true">
      <div className={styles.uptimeBar}>
        <span className={styles.uptimeSweep} />
      </div>
      <p className={['mono', styles.uptimeMeta].join(' ')}>
        <span className={styles.uptimeDot} />
        session alive · 0 crashes
      </p>
    </div>
  )
}

function Card({ feature, index }: { feature: Feature; index: number }) {
  const angle = (360 / FEATURES.length) * index

  return (
    <motion.article
      className={[styles.card, styles[feature.accent]].join(' ')}
      style={{ '--angle': `${angle}deg` } as CSSProperties}
      onMouseMove={trackCursor}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.spot} aria-hidden="true" />
      <span className={styles.hairline} aria-hidden="true" />

      <span className={styles.icon} aria-hidden="true">
        {feature.icon}
      </span>
      <h3 className={styles.title}>{feature.title}</h3>
      <p className={styles.body}>{feature.body}</p>
      {feature.detail && <p className={styles.detail}>{feature.detail}</p>}

      {feature.visual === 'uptime' && <UptimeVisual />}
    </motion.article>
  )
}

export function Features() {
  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <div className="container">
        <SectionHeading
          eyebrow="Features"
          id="features-title"
          title="Everything in one launcher"
          sub="Stop juggling five tools. Nova does mods, servers, skins and more — beautifully."
        />

        <div className={styles.ringScene}>
          <div className={styles.ring}>
            {FEATURES.map((feature, i) => (
              <Card key={feature.id} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
