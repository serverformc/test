import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from './SectionHeading.module.css'

interface Props {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  align?: 'left' | 'center'
  /** Anchor id, so the nav can deep-link to the section. */
  id?: string
  as?: 'h2' | 'h1'
}

export function SectionHeading({ eyebrow, title, sub, align = 'left', id, as = 'h2' }: Props) {
  const Tag = as

  return (
    <motion.div
      className={[styles.wrap, align === 'center' ? styles.center : ''].filter(Boolean).join(' ')}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
      {sub && <p className={styles.sub}>{sub}</p>}
    </motion.div>
  )
}
