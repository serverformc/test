import { useEffect, useRef, useState } from 'react'
import { RotateCcw, Shirt, Upload } from 'lucide-react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { defaultNovaSkin } from '../../../utils/novaSkin'
import { useLauncher } from '../LauncherContext'
import styles from './SkinTab.module.css'

/* Type-only, so three.js stays out of every bundle except the chunk created by
   the dynamic import below. */
type Skinview3d = typeof import('skinview3d')
type Viewer = InstanceType<Skinview3d['SkinViewer']>

type Pose = 'idle' | 'walk' | 'wave'

const POSES: { id: Pose; label: string }[] = [
  { id: 'idle', label: 'Idle' },
  { id: 'walk', label: 'Walk' },
  { id: 'wave', label: 'Wave' },
]

const MAX_BYTES = 5 * 1024 * 1024

export function SkinTab() {
  const { state, dispatch, variant } = useLauncher()
  const reduced = useReducedMotion()
  const { account } = state

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<Viewer | null>(null)
  const libRef = useRef<Skinview3d | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [ready, setReady] = useState(false)
  /* Any failure — no WebGL, blocked chunk, old GPU — falls back to the flat
     texture view rather than showing an empty box. */
  const [fell, setFell] = useState(false)
  const [pose, setPose] = useState<Pose>('idle')
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState(account.username)

  const skin = account.skinUrl ?? defaultNovaSkin()
  const size = variant === 'full' ? 300 : 220

  /* Build the viewer once. */
  useEffect(() => {
    let cancelled = false

    void (async () => {
      try {
        const lib = await import('skinview3d')
        if (cancelled) return
        const canvas = canvasRef.current
        if (!canvas) return

        const viewer = new lib.SkinViewer({ canvas, width: size, height: size, skin, fov: 45, zoom: 0.82 })
        viewer.controls.enablePan = false
        viewer.autoRotate = true
        viewer.autoRotateSpeed = 0.7

        libRef.current = lib
        viewerRef.current = viewer
        setReady(true)
      } catch {
        if (!cancelled) setFell(true)
      }
    })()

    return () => {
      cancelled = true
      viewerRef.current?.dispose()
      viewerRef.current = null
      setReady(false)
    }
    // Rebuilding on skin change would throw away the camera; skin is handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  /* Push skin changes into the existing viewer. */
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer || !ready) return
    try {
      // A data URL resolves through skinview3d's async image loader, so the
      // failure path is a rejected promise rather than a throw.
      void Promise.resolve(viewer.loadSkin(skin)).catch(() => setFell(true))
    } catch {
      setFell(true)
    }
  }, [skin, ready])

  /* Pose + rotation, both off under reduced motion. */
  useEffect(() => {
    const viewer = viewerRef.current
    const lib = libRef.current
    if (!viewer || !lib || !ready) return

    viewer.autoRotate = !reduced
    if (reduced) {
      viewer.animation = null
      return
    }
    viewer.animation =
      pose === 'walk' ? new lib.WalkingAnimation() : pose === 'wave' ? new lib.WaveAnimation() : new lib.IdleAnimation()
  }, [pose, reduced, ready])

  const onFile = (file: File | undefined) => {
    setError(null)
    if (!file) return
    if (!/^image\/(png|jpeg)$/.test(file.type)) {
      setError('Skins need to be a PNG (64×64 or 64×32).')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('That file is over 5 MB — Minecraft skins are only a few kilobytes.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') dispatch({ type: 'SET_SKIN', skinUrl: reader.result })
    }
    reader.onerror = () => setError('Could not read that file. Try another one.')
    reader.readAsDataURL(file)
  }

  return (
    <div className="lStack">
      <div className="lHead">
        <div>
          <h3 className="lTitle">Skin</h3>
          <p className="lSub">Drag to spin, scroll to zoom. Upload a PNG and it applies instantly.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* ---- Preview ---------------------------------------------------- */}
        <div className={['lInset', styles.stage].join(' ')} style={{ minHeight: size }}>
          {fell ? (
            <div className={styles.flat}>
              <span
                className={styles.flatHead}
                style={{ backgroundImage: `url(${skin})` }}
                role="img"
                aria-label={`${account.username}'s skin, head`}
              />
              <img className={styles.flatSheet} src={skin} alt="Skin texture" width={128} height={128} />
              <p className={styles.flatNote}>3D preview unavailable here — showing the flat texture.</p>
            </div>
          ) : (
            <canvas ref={canvasRef} className={styles.canvas} width={size} height={size} aria-label="3D skin preview" />
          )}
          {!ready && !fell && <p className={styles.loading}>Loading 3D preview…</p>}
        </div>

        {/* ---- Controls --------------------------------------------------- */}
        <div className={styles.controls}>
          <div className={styles.block}>
            <p className="lLabel">Pose</p>
            <div className={styles.poses} role="group" aria-label="Pose">
              {POSES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  disabled={fell || reduced}
                  aria-pressed={pose === p.id}
                  className={[styles.pose, pose === p.id ? styles.poseOn : ''].filter(Boolean).join(' ')}
                  onClick={() => setPose(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {reduced && <p className={styles.hint}>Animation is off because your system asks for reduced motion.</p>}
          </div>

          <div className={styles.block}>
            <p className="lLabel">Texture</p>
            <div className="lBtnRow">
              <button type="button" className={styles.primary} onClick={() => fileRef.current?.click()}>
                <Upload size={14} aria-hidden="true" />
                Upload skin
              </button>
              <button
                type="button"
                className={styles.ghost}
                disabled={account.skinUrl === null}
                onClick={() => {
                  setError(null)
                  dispatch({ type: 'SET_SKIN', skinUrl: null })
                }}
              >
                <RotateCcw size={14} aria-hidden="true" />
                Reset
              </button>
            </div>
            <input
              ref={fileRef}
              className="srOnly"
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => {
                onFile(e.target.files?.[0])
                e.target.value = ''
              }}
            />
            {error ? <p className={styles.error}>{error}</p> : <p className={styles.hint}>PNG, under 5 MB.</p>}
          </div>

          <div className={styles.block}>
            <label className={styles.nameField}>
              <span className="lLabel">Display name</span>
              <input
                className="lInput"
                value={name}
                maxLength={16}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => {
                  const next = name.trim()
                  if (next) dispatch({ type: 'SET_USERNAME', username: next })
                  else setName(account.username)
                }}
              />
            </label>
            <p className={styles.hint}>
              <Shirt size={11} aria-hidden="true" /> Demo only — real skins are managed by your Microsoft account.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
