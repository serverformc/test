import { useRef } from 'react'
import { House, Layers, Puzzle, Server, Settings, Shirt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLauncher } from './LauncherContext'
import type { TabId } from './launcherTypes'
import styles from './Sidebar.module.css'

interface TabDef {
  id: TabId
  label: string
  Icon: LucideIcon
}

const TABS: TabDef[] = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'mods', label: 'Mods', Icon: Puzzle },
  { id: 'instances', label: 'Instances', Icon: Layers },
  { id: 'host', label: 'Host', Icon: Server },
  { id: 'skin', label: 'Skin', Icon: Shirt },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

export function Sidebar() {
  const { state, dispatch, variant, installedCount } = useLauncher()
  const btns = useRef<(HTMLButtonElement | null)[]>([])

  const select = (index: number) => {
    const tab = TABS[index]
    if (!tab) return
    dispatch({ type: 'SET_TAB', tab: tab.id })
    btns.current[index]?.focus()
  }

  /* A real tablist: arrows move both focus and selection, Home/End jump to the
     ends, and only the selected tab is in the page's tab order. */
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = TABS.length - 1
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        select(index === last ? 0 : index + 1)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        select(index === 0 ? last : index - 1)
        break
      case 'Home':
        event.preventDefault()
        select(0)
        break
      case 'End':
        event.preventDefault()
        select(last)
        break
      default:
        break
    }
  }

  return (
    <nav
      className={[styles.rail, variant === 'full' ? styles.wide : styles.narrow].join(' ')}
      role="tablist"
      aria-orientation="vertical"
      aria-label="Launcher sections"
    >
      {TABS.map((tab, i) => {
        const active = state.activeTab === tab.id
        const badge = tab.id === 'mods' ? installedCount : tab.id === 'host' && state.host.running ? '●' : null

        return (
          <button
            key={tab.id}
            ref={(el) => {
              btns.current[i] = el
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active ? 0 : -1}
            title={tab.label}
            className={[styles.tab, active ? styles.tabActive : ''].filter(Boolean).join(' ')}
            onClick={() => dispatch({ type: 'SET_TAB', tab: tab.id })}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className={styles.iconBox}>
              <tab.Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              {badge !== null && badge !== 0 && (
                <span
                  className={[styles.badge, tab.id === 'host' ? styles.badgeLive : ''].filter(Boolean).join(' ')}
                >
                  {badge}
                </span>
              )}
            </span>
            <span className={styles.label}>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
