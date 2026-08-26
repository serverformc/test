import { ArrowLeft, Download, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Launcher } from '../components/launcher/Launcher'
import { Button } from '../components/primitives/Button'
import { DOWNLOADS, VERSION } from '../data/site'
import styles from './LauncherPage.module.css'

export function LauncherPage() {
  return (
    <div className={styles.page}>
      <div className="glowField" aria-hidden="true" />

      <div className={['container', styles.inner].join(' ')}>
        <header className={styles.head}>
          <Link to="/" className={styles.back}>
            <ArrowLeft size={14} aria-hidden="true" />
            Back to site
          </Link>

          <h1 className={styles.title}>
            The launcher, <span className="gradText">running right here.</span>
          </h1>
          <p className={styles.sub}>
            This is Nova's interface, rebuilt to run in the browser. Every tab works — install mods, spin up a server,
            swap your skin, watch a launch play out. Your changes are remembered locally.
          </p>

          <p className={styles.disclaimer}>
            <Info size={14} aria-hidden="true" />
            <span>
              A web page can't actually start Minecraft, so downloads and servers here are simulated. The real launcher
              does all of this for real — that's the <span className="mono">v{VERSION}</span> install below.
            </span>
          </p>
        </header>

        <Launcher variant="full" />

        <footer className={styles.foot}>
          <Button href={DOWNLOADS.windows} download>
            <Download size={17} aria-hidden="true" />
            Download for Windows
          </Button>
          <Button href={DOWNLOADS.linux} variant="secondary" download>
            <Download size={17} aria-hidden="true" />
            Download for Linux
          </Button>
        </footer>
      </div>
    </div>
  )
}
