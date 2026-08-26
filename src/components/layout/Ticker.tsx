import { TICKER_ITEMS } from '../../data/site'
import styles from './Ticker.module.css'

/* The strip is duplicated so the marquee can loop seamlessly at -50%.
   The clone is aria-hidden so screen readers hear the list exactly once. */
export function Ticker() {
  return (
    <div className={styles.ticker} role="complementary" aria-label="Nova Client news">
      <div className={styles.track}>
        <Strip />
        <Strip clone />
      </div>
    </div>
  )
}

function Strip({ clone }: { clone?: boolean }) {
  return (
    <ul className={styles.strip} {...(clone ? { 'aria-hidden': true } : {})}>
      {TICKER_ITEMS.map((item, i) => (
        <li key={`${item}-${i}`} className={styles.item}>
          <span className={styles.dot} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}
