import { motion } from 'framer-motion'
import { ArrowUpRight, LifeBuoy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FAQ } from '../../data/faq'
import { DISCORD_URL } from '../../data/site'
import { Accordion } from '../primitives/Accordion'
import type { AccordionEntry } from '../primitives/Accordion'
import styles from './Faq.module.css'

/* Asymmetric split: the heading and the escape hatches stay put on the left
   while the answers open on the right, at a narrow measure that's actually
   comfortable to read. */

export function Faq() {
  const items: AccordionEntry[] = FAQ.map((item, i) => ({
    id: `faq-${i}`,
    head: item.q,
    body: (
      <>
        <p className={styles.answer}>{item.a}</p>
        {item.detail && <p className={styles.detail}>{item.detail}</p>}
      </>
    ),
  }))

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className={['container', styles.inner].join(' ')}>
        <motion.div
          className={styles.side}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">FAQ</p>
          <h2 className={styles.title} id="faq-title">
            Questions?
          </h2>
          <p className={styles.sub}>The short answers. Anything broken has a step-by-step fix on the help page.</p>

          <div className={styles.links}>
            <Link to="/help" className={styles.help}>
              <LifeBuoy size={16} aria-hidden="true" />
              Fix it yourself in 60 seconds
            </Link>
            <a className={styles.help} href={DISCORD_URL} target="_blank" rel="noreferrer noopener">
              <span aria-hidden="true">💬</span>
              Ask in Discord
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.list}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Accordion items={items} defaultOpen="faq-0" />
        </motion.div>
      </div>
    </section>
  )
}
