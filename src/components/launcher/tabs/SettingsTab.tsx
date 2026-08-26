import { useState } from 'react'
import { Check, Gauge, RefreshCw, RotateCcw, ShieldCheck } from 'lucide-react'
import { MC_VERSION, VERSION } from '../../../data/site'
import { formatRam } from '../../../utils/format'
import { Slider } from '../../primitives/Slider'
import { Toggle } from '../../primitives/Toggle'
import { useLauncher } from '../LauncherContext'
import type { LauncherSettings } from '../launcherTypes'
import styles from './SettingsTab.module.css'

const JAVA_PATHS = ['Bundled (recommended)', 'System JDK 21', 'System JDK 17', 'Custom path…']
const RESOLUTIONS = ['1280 × 720', '1600 × 900', '1920 × 1080', '2560 × 1440', 'Fullscreen']

export function SettingsTab() {
  const { state, dispatch } = useLauncher()
  const { settings } = state
  const [checked, setChecked] = useState(false)

  const set = (patch: Partial<LauncherSettings>) => dispatch({ type: 'SET_SETTING', patch })

  return (
    <div className="lStack">
      <div className="lHead">
        <div>
          <h3 className="lTitle">Settings</h3>
          <p className="lSub">Sensible defaults are already applied. These are here if you want them.</p>
        </div>
      </div>

      {/* ---- Performance -------------------------------------------------- */}
      <section className={['lPanel', styles.panel].join(' ')}>
        <p className="lLabel">
          <Gauge size={12} aria-hidden="true" /> Performance
        </p>

        <Slider
          label="Allocated memory"
          display={formatRam(settings.ramMb)}
          value={settings.ramMb}
          min={2048}
          max={16384}
          step={1024}
          onChange={(ramMb) => set({ ramMb })}
          hint="4–8 GB suits most modded setups. More is not automatically better."
        />

        <Toggle
          label="Aggressive FPS mode"
          hint="Pushes the JVM flags harder. Great on strong machines, occasionally unstable on old ones."
          checked={settings.aggressiveFps}
          onChange={(aggressiveFps) => set({ aggressiveFps })}
        />

        <label className={styles.field}>
          <span className="lLabel">Java runtime</span>
          <select className="lSelect" value={settings.javaPath} onChange={(e) => set({ javaPath: e.target.value })}>
            {JAVA_PATHS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <span className={styles.hint}>Java ships inside Nova — you never have to install it yourself.</span>
        </label>

        <label className={styles.field}>
          <span className="lLabel">Game resolution</span>
          <select className="lSelect" value={settings.resolution} onChange={(e) => set({ resolution: e.target.value })}>
            {RESOLUTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </section>

      {/* ---- Integrations ------------------------------------------------- */}
      <section className={['lPanel', styles.panel].join(' ')}>
        <p className="lLabel">
          <ShieldCheck size={12} aria-hidden="true" /> Integrations &amp; reliability
        </p>

        <Toggle
          label="Discord Rich Presence"
          hint="Shows “Playing Minecraft — Nova Client” with your instance or server name."
          checked={settings.discordRpc}
          onChange={(discordRpc) => set({ discordRpc })}
        />

        <Toggle
          label="24/7 Keep Playing"
          hint="Recovers the session instead of dropping you to the desktop when something goes wrong mid-game."
          checked={settings.keepPlaying}
          onChange={(keepPlaying) => set({ keepPlaying })}
        />

        <Toggle
          label="Automatic updates"
          hint="Nova updates itself in one click. Turn this off and you'll be asked first."
          checked={settings.autoUpdate}
          onChange={(autoUpdate) => set({ autoUpdate })}
        />
      </section>

      {/* ---- Updates ------------------------------------------------------ */}
      <section className={['lPanel', styles.panel].join(' ')}>
        <p className="lLabel">
          <RefreshCw size={12} aria-hidden="true" /> Updates
        </p>

        <div className="lKv">
          <span>Launcher</span>
          <span className="lKvValue">v{VERSION}</span>
        </div>
        <div className="lKv">
          <span>Minecraft</span>
          <span className="lKvValue">{MC_VERSION}</span>
        </div>

        <div className="lBtnRow">
          <button
            type="button"
            className={styles.action}
            onClick={() => setChecked(true)}
            aria-live="polite"
          >
            {checked ? <Check size={14} aria-hidden="true" /> : <RefreshCw size={14} aria-hidden="true" />}
            {checked ? `Up to date — v${VERSION}` : 'Check for updates'}
          </button>
        </div>
      </section>

      {/* ---- Demo reset --------------------------------------------------- */}
      <section className={styles.reset}>
        <div>
          <p className={styles.resetTitle}>Reset this demo</p>
          <p className={styles.hint}>
            Clears the mods, instances and settings saved in your browser. Nothing on your machine is touched.
          </p>
        </div>
        <button type="button" className={styles.resetBtn} onClick={() => dispatch({ type: 'RESET' })}>
          <RotateCcw size={14} aria-hidden="true" />
          Reset
        </button>
      </section>
    </div>
  )
}
