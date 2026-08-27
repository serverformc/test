import { useState } from 'react'
import { Check, Play, Plus, Trash2, X } from 'lucide-react'
import { AVAILABLE_VERSIONS, LOADER_LABEL } from '../../../data/launcher/instances'
import type { Loader } from '../../../data/launcher/instances'
import { MC_VERSION } from '../../../data/site'
import { formatRam } from '../../../utils/format'
import { useLauncher } from '../LauncherContext'
import styles from './InstancesTab.module.css'

const LOADERS: Loader[] = ['fabric', 'forge', 'vanilla']

export function InstancesTab() {
  const { state, dispatch, isBusy, isPlaying } = useLauncher()
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [mcVersion, setMcVersion] = useState(MC_VERSION)
  const [loader, setLoader] = useState<Loader>('fabric')

  const onlyOne = state.instances.length <= 1

  const create = () => {
    dispatch({ type: 'CREATE_INSTANCE', name: name.trim() || 'New Instance', mcVersion, loader })
    setName('')
    setMcVersion(MC_VERSION)
    setLoader('fabric')
    setCreating(false)
  }

  return (
    <div className="lStack">
      <div className="lHead">
        <div>
          <h3 className="lTitle">Instances</h3>
          <p className="lSub">Separate worlds, versions and mod sets. Nothing bleeds between them.</p>
        </div>
        <button type="button" className={styles.new} onClick={() => setCreating((v) => !v)} aria-expanded={creating}>
          {creating ? <X size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
          {creating ? 'Cancel' : 'New'}
        </button>
      </div>

      {creating && (
        <form
          className={['lPanel', styles.form].join(' ')}
          onSubmit={(e) => {
            e.preventDefault()
            create()
          }}
        >
          <label className={styles.field}>
            <span className="lLabel">Name</span>
            <input
              className="lInput"
              value={name}
              autoFocus
              placeholder="Hardcore Run"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className="lLabel">Minecraft</span>
            <select className="lSelect" value={mcVersion} onChange={(e) => setMcVersion(e.target.value)}>
              {AVAILABLE_VERSIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span className="lLabel">Loader</span>
            <select className="lSelect" value={loader} onChange={(e) => setLoader(e.target.value as Loader)}>
              {LOADERS.map((l) => (
                <option key={l} value={l}>
                  {LOADER_LABEL[l]}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className={styles.create}>
            <Check size={14} aria-hidden="true" />
            Create instance
          </button>
        </form>
      )}

      <ul className={styles.list}>
        {state.instances.map((instance) => {
          const active = instance.id === state.activeInstanceId
          return (
            <li key={instance.id} className={['lRow', active ? 'lRowActive' : '', styles.row].filter(Boolean).join(' ')}>
              <button
                type="button"
                className={styles.pick}
                aria-current={active}
                onClick={() => dispatch({ type: 'SET_ACTIVE_INSTANCE', id: instance.id })}
              >
                <span className={styles.icon} aria-hidden="true">
                  {instance.icon}
                </span>
                <span className={styles.meta}>
                  <span className={styles.name}>
                    {instance.name}
                    {active && <span className="lChip lChipOk">Selected</span>}
                  </span>
                  <span className={['mono', styles.spec].join(' ')}>
                    {instance.mcVersion} · {LOADER_LABEL[instance.loader]}
                    {instance.loaderVersion ? ` ${instance.loaderVersion}` : ''} · {formatRam(instance.ramMb)} ·{' '}
                    {instance.lastPlayed}
                  </span>
                </span>
              </button>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.playBtn}
                  disabled={isBusy || isPlaying}
                  aria-label={`Play ${instance.name}`}
                  title="Select and play"
                  onClick={() => {
                    dispatch({ type: 'SET_ACTIVE_INSTANCE', id: instance.id })
                    dispatch({ type: 'SET_TAB', tab: 'home' })
                    dispatch({ type: 'LAUNCH_START' })
                  }}
                >
                  <Play size={13} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.delBtn}
                  disabled={onlyOne}
                  aria-label={`Delete ${instance.name}`}
                  title={onlyOne ? 'Keep at least one instance' : 'Delete instance'}
                  onClick={() => dispatch({ type: 'DELETE_INSTANCE', id: instance.id })}
                >
                  <Trash2 size={13} aria-hidden="true" />
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <p className={styles.note}>Deleting an instance here only removes it from this demo — your real worlds are safe.</p>
    </div>
  )
}
