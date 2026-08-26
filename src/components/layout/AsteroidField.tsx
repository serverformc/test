import type { CSSProperties } from 'react'
import styles from './AsteroidField.module.css'

const ASTEROIDS = [
  [8, 18, 4, 23, 0],
  [18, 72, 3, 31, 4],
  [29, 28, 3.5, 27, 9],
  [41, 86, 2.5, 36, 2],
  [52, 14, 3, 29, 13],
  [63, 64, 4, 34, 6],
  [74, 24, 2.5, 25, 16],
  [86, 79, 3.5, 32, 11],
  [94, 42, 3, 28, 18],
  [12, 48, 2.5, 30, 7],
  [36, 58, 3, 26, 20],
  [58, 92, 2.5, 38, 15],
  [81, 53, 3.5, 35, 3],
] as const

export function AsteroidField() {
  return (
    <div className={styles.field} aria-hidden="true">
      {ASTEROIDS.map(([left, top, size, duration, delay], index) => (
        <span
          key={index}
          className={styles.asteroid}
          style={
            {
              '--left': `${left}%`,
              '--top': `${top}%`,
              '--size': `${size}px`,
              '--duration': `${duration}s`,
              '--delay': `-${delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}