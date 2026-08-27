import { motion } from 'framer-motion'
import { ArrowRight, House, Layers, MousePointerClick, Puzzle, Server, Settings, Shirt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../primitives/Button'
import styles from './LauncherBand.module.css'

/* The bridge into /launcher. Same six tabs as the real sidebar, in the same
   order, so the band doubles as a table of contents for the demo. */

interface TabCard {
  Icon: LucideIcon
  label: string
  blurb: string
}

const TABS: TabCard[] = [
  { Icon: House, label: 'Home', blurb: 'Pick an instance and watch a launch run' },
  { Icon: Puzzle, label: 'Mods', blurb: 'Search, install and toggle mods' },
  { Icon: Layers, label: 'Instances', blurb: 'Create a Fabric, Forge or vanilla profile' },
  { Icon: Server, label: 'Host', blurb: 'Boot a server and read its console' },
  { Icon: Shirt, label: 'Skin', blurb: 'Upload a skin, spin it in 3D' },
  { Icon: Settings, label: 'Settings', blurb: 'RAM, FPS flags, Discord, updates' },
]

export function LauncherBand() {
  return (
    <section className={styles.band} aria-labelledby="try-title">
      <div className="glowField" aria-hidden="true" />

      <div className={['container', styles.inner].join(' ')}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Try it first</p>
          <h2 className={styles.title} id="try-title">
            Poke around <span className="gradText">before you download.</span>
          </h2>
          <p className={styles.sub}>
            The full interface runs right here in your browser — every tab, every switch. Nothing to install, nothing
            to sign in to.
          </p>
          <div className={styles.actions}>
            <Button to="/launcher" size="lg">
              <MousePointerClick size={18} aria-hidden="true" />
              Open the launcher
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </div>
        </motion.div>

        <ul className={styles.tabs}>
          {TABS.map((tab, i) => (
            <motion.li
              key={tab.label}
              className={styles.tab}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.tabIcon} aria-hidden="true">
                <tab.Icon size={17} />
              </span>
              <span className={styles.tabLabel}>{tab.label}</span>
              <span className={styles.tabBlurb}>{tab.blurb}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
