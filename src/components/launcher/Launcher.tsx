import { LauncherProvider, useLauncher } from './LauncherContext'
import type { LauncherVariant } from './LauncherContext'
import { TitleBar } from './TitleBar'
import { Sidebar } from './Sidebar'
import { StatusBar } from './StatusBar'
import { HomeTab } from './tabs/HomeTab'
import { ModsTab } from './tabs/ModsTab'
import { InstancesTab } from './tabs/InstancesTab'
import { HostTab } from './tabs/HostTab'
import { SkinTab } from './tabs/SkinTab'
import { SettingsTab } from './tabs/SettingsTab'
import styles from './Launcher.module.css'

/* One component set, two densities. `embed` is the copy floating in the hero;
   `full` is the /launcher route. Everything below reads the variant off the
   context, so there is no second implementation to keep in sync. */
export function Launcher({ variant }: { variant: LauncherVariant }) {
  return (
    <LauncherProvider variant={variant}>
      <Frame />
    </LauncherProvider>
  )
}

function Frame() {
  const { variant, state } = useLauncher()

  return (
    <div className={[styles.frame, variant === 'embed' ? styles.embed : styles.full].join(' ')}>
      <TitleBar />
      <div className={styles.body}>
        <Sidebar />
        <div
          className={[styles.content, 'lScroll'].join(' ')}
          role="tabpanel"
          id={`panel-${state.activeTab}`}
          aria-labelledby={`tab-${state.activeTab}`}
          tabIndex={0}
        >
          <ActiveTab />
        </div>
      </div>
      <StatusBar />
    </div>
  )
}

function ActiveTab() {
  const { state } = useLauncher()

  switch (state.activeTab) {
    case 'home':
      return <HomeTab />
    case 'mods':
      return <ModsTab />
    case 'instances':
      return <InstancesTab />
    case 'host':
      return <HostTab />
    case 'skin':
      return <SkinTab />
    case 'settings':
      return <SettingsTab />
    default:
      return null
  }
}
