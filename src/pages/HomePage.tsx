import { AndroidInstall } from '../components/marketing/AndroidInstall'
import { ClosingCta } from '../components/marketing/ClosingCta'
import { Faq } from '../components/marketing/Faq'
import { Features } from '../components/marketing/Features'
import { Hero } from '../components/marketing/Hero'
import { Install } from '../components/marketing/Install'
import { InstallAppFab } from '../components/marketing/InstallAppFab'
import { LauncherBand } from '../components/marketing/LauncherBand'
import { Steps } from '../components/marketing/Steps'
import { Seo } from '../components/Seo'
import { Button } from '../components/primitives/Button'
import styles from './HomePage.module.css'

/* Section order is the argument the page makes: here's what it does (hero) →
   here's everything in it (features) → it's a one-minute setup (steps) → try it
   without downloading (band) → it's on your phone too (android) → get it
   (install) → doubts (faq) → go (closing). */

export function HomePage() {
  return (
    <>
      <Seo
        title="Nova Client - Free Minecraft Launcher, Mods and FPS Boost"
        description="Nova Client is a free Minecraft launcher created by Froggy, with a website by Vivo. Get Java performance tools, mods, server hosting, 3D skins and Bedrock mobile features."
        path="/"
      />
      <Hero />
      <section className={styles.intro} aria-labelledby="intro-title">
        <div className={['container', styles.introGrid].join(' ')}>
          <p className="eyebrow">The Nova way</p>
          <div className={styles.introCopy}>
            <h2 id="intro-title">Everything you need to play, in one place.</h2>
            <p>
              Nova keeps the busywork out of Minecraft. Choose a world, tune the experience, and get back into the
              game with tools that feel considered from the first click.
            </p>
            <Button to="#features" variant="secondary">
              Explore the features
            </Button>
          </div>
          <div className={styles.introMeta}>
            <span>ways to make your next session better</span>
          </div>
        </div>
      </section>
      <Features />
      <Steps />
      <LauncherBand />
      <AndroidInstall />
      <Install />
      <Faq />
      <ClosingCta />
      <InstallAppFab />
    </>
  )
}
