import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Accordion.module.css'

export interface AccordionEntry {
  id: string
  head: ReactNode
  body: ReactNode
}

interface Props {
  items: AccordionEntry[]
  /** Allow several panels open at once (Help page) vs one (FAQ). */
  multi?: boolean
  /** id of the panel open on first render. */
  defaultOpen?: string
}

export function Accordion({ items, multi = false, defaultOpen }: Props) {
  const [open, setOpen] = useState<string[]>(defaultOpen ? [defaultOpen] : [])

  const toggle = (id: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(id)
      if (multi) return isOpen ? prev.filter((x) => x !== id) : [...prev, id]
      return isOpen ? [] : [id]
    })
  }

  return (
    <div className={styles.list}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        return (
          <div key={item.id} className={[styles.item, isOpen ? styles.itemOpen : ''].filter(Boolean).join(' ')}>
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
            >
              <span className={styles.head}>{item.head}</span>
              <ChevronDown className={styles.chev} size={18} aria-hidden="true" />
            </button>
            <div className={styles.panel} hidden={!isOpen}>
              <div className={styles.body}>{item.body}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
