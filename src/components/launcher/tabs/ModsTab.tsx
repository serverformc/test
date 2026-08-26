import { useMemo, useState } from 'react'
import { Download, Search, Trash2, Zap } from 'lucide-react'
import { MOD_CATEGORIES } from '../../../data/launcher/mods'
import type { ModCategory } from '../../../data/launcher/mods'
import { formatDownloads } from '../../../utils/format'
import { useLauncher } from '../LauncherContext'
import styles from './ModsTab.module.css'

type Filter = ModCategory | 'all'

export function ModsTab() {
  const { state, dispatch, variant, installedCount, enabledCount } = useLauncher()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.mods.filter((mod) => {
      if (filter !== 'all' && mod.category !== filter) return false
      if (!q) return true
      return (
        mod.name.toLowerCase().includes(q) ||
        mod.author.toLowerCase().includes(q) ||
        mod.blurb.toLowerCase().includes(q)
      )
    })
  }, [state.mods, query, filter])

  return (
    <div className="lStack">
      <div className="lHead">
        <div>
          <h3 className="lTitle">Mods</h3>
          <p className="lSub">
            {installedCount} installed · {enabledCount} enabled · Fabric &amp; Forge, straight from Modrinth
          </p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <Search className={styles.searchIcon} size={15} aria-hidden="true" />
          <input
            className={['lInput', styles.search].join(' ')}
            type="search"
            value={query}
            placeholder="Search mods…"
            aria-label="Search mods"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.filters} role="group" aria-label="Filter by category">
          {MOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={filter === cat.id}
              className={[styles.filter, filter === cat.id ? styles.filterOn : ''].filter(Boolean).join(' ')}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <ul className={styles.list}>
        {visible.map((mod) => (
          <li key={mod.id} className={['lRow', mod.installed ? 'lRowActive' : '', styles.row].filter(Boolean).join(' ')}>
            <div className={styles.info}>
              <p className={styles.name}>
                {mod.name}
                {mod.fps && (
                  <span className="lChip lChipCy">
                    <Zap size={10} aria-hidden="true" /> FPS+
                  </span>
                )}
                {mod.installed && <span className="lChip lChipOk">{mod.enabled ? 'Enabled' : 'Disabled'}</span>}
              </p>
              {variant === 'full' && <p className={styles.blurb}>{mod.blurb}</p>}
              <p className={['mono', styles.byline].join(' ')}>
                {mod.author} · v{mod.version} · {formatDownloads(mod.downloads)} downloads
              </p>
            </div>

            <div className={styles.actions}>
              {mod.installed ? (
                <>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={mod.enabled}
                    aria-label={`${mod.enabled ? 'Disable' : 'Enable'} ${mod.name}`}
                    className={[styles.sw, mod.enabled ? styles.swOn : ''].filter(Boolean).join(' ')}
                    onClick={() => dispatch({ type: 'TOGGLE_MOD', id: mod.id })}
                  >
                    <span className={styles.knob} />
                  </button>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    aria-label={`Uninstall ${mod.name}`}
                    title="Uninstall"
                    onClick={() => dispatch({ type: 'UNINSTALL_MOD', id: mod.id })}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                </>
              ) : (
                <button type="button" className={styles.install} onClick={() => dispatch({ type: 'INSTALL_MOD', id: mod.id })}>
                  <Download size={13} aria-hidden="true" />
                  Install
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p className="lEmpty">Nothing matches “{query}”.</p>}

      <p className={styles.note}>
        Corrupt or half-finished downloads are repaired automatically — Nova verifies every jar before it loads.
      </p>
    </div>
  )
}
