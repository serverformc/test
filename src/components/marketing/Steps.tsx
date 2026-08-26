import { motion } from 'framer-motion'
import { STEPS } from '../../data/steps'
import { SectionHeading } from '../primitives/SectionHeading'
import styles from './Steps.module.css'

/* A connected timeline rather than three more cards. Each step draws its own
   connector to the next one as it scrolls into view, so the section reads as a
   sequence — which is the actual claim being made. */

const EASE = [0.16, 1, 0.3, 1] as const

export function Steps() {
  const last = STEPS.length - 1

  return (
    <section className="section" id="how" aria-labelledby="how-title">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          id="how-title"
          title="Ready in under a minute"
          sub="Three steps. No configuration wizard marathons."
        />

        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              className={styles.step}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
            >
              {i < last && (
                <motion.span
                  className={styles.connector}
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.22, ease: EASE }}
                />
              )}

              <span className={styles.node}>
                <span className={['mono', styles.num].join(' ')}>{step.n}</span>
              </span>

              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
              {step.detail && <p className={styles.detail}>{step.detail}</p>}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
