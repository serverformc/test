import { motion } from 'framer-motion'
import { FEATURES } from '../../data/features'
import type { Feature } from '../../data/features'
import { SectionHeading } from '../primitives/SectionHeading'
import styles from './Features.module.css'

function ModCard({ feature }: { feature: Feature }) {
  return (
    <article className={styles.modCard} tabIndex={0}>
      <div className={styles.modIcon} aria-hidden="true">
        {feature.icon}
      </div>
      <div className={styles.modInfo}>
        <h3 className={styles.modName}>{feature.title}</h3>
        <p className={['mono', styles.modMeta].join(' ')}>
          {feature.visual === 'uptime' ? 'LIVE · 24/7' : feature.accent === 'em' ? 'PERFORMANCE' : 'INCLUDED'}
        </p>
      </div>
      <span className={styles.modStatus} aria-hidden="true" />
    </article>
  )
}

function ModRail({ reverse = false }: { reverse?: boolean }) {
  const cards = reverse ? [...FEATURES].reverse() : FEATURES
  return (
    <div className={[styles.modRail, reverse ? styles.modRailReverse : ''].filter(Boolean).join(' ')}>
      <div className={styles.modTrack}>
        {[...cards, ...cards].map((feature, index) => (
          <motion.div
            key={`${feature.id}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: (index % cards.length) * 0.04 }}
          >
            <ModCard feature={feature} />
          </motion.div>
        ))}
      </div>
    </div>
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

        <div className={styles.modScene}>
          <ModRail />
          <ModRail reverse />
        </div>
      </div>
    </section>
  )
}
