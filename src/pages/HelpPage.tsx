import { ArrowLeft, ArrowUpRight, MessageCircle, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Accordion } from '../components/primitives/Accordion'
import type { AccordionEntry } from '../components/primitives/Accordion'
import { GOLDEN_RULES, HELP_SECTIONS, HELP_SUB, HELP_TITLE } from '../data/help'
import { DISCORD_URL } from '../data/site'
import { richText } from '../utils/richText'
import styles from './HelpPage.module.css'

export function HelpPage() {
  return (
    <div className={styles.page}>
      <div className="glowField" aria-hidden="true" />

      <div className={['container', styles.inner].join(' ')}>
        <header className={styles.head}>
          <Link to="/" className={styles.back}>
            <ArrowLeft size={14} aria-hidden="true" />
            Back to site
          </Link>
          <h1 className={styles.title}>{HELP_TITLE}</h1>
          <p className={styles.sub}>{HELP_SUB}</p>
        </header>

        {/* ---- Read these first --------------------------------------------- */}
        <section className={styles.rules} aria-labelledby="golden-rules">
          <h2 className={styles.rulesTitle} id="golden-rules">
            <Trophy size={18} aria-hidden="true" />
            Try these five first
          </h2>
          <ol className={styles.ruleList}>
            {GOLDEN_RULES.map((rule, i) => (
              <li key={i} className={styles.rule}>
                <span className={['mono', styles.ruleNum].join(' ')}>{i + 1}</span>
                <span>{richText(rule)}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ---- Jump links --------------------------------------------------- */}
        <nav className={styles.jump} aria-label="Jump to a section">
          {HELP_SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`} className={styles.jumpLink}>
              <span aria-hidden="true">{section.icon}</span>
              {section.title}
            </a>
          ))}
        </nav>

        {/* ---- Every fix ---------------------------------------------------- */}
        <div className={styles.sections}>
          {HELP_SECTIONS.map((section) => {
            const items: AccordionEntry[] = section.fixes.map((fix, i) => ({
              id: `${section.id}-${i}`,
              head: fix.q,
              body: (
                <>
                  <ol className={styles.steps}>
                    {fix.steps.map((step, s) => (
                      <li key={s}>{richText(step)}</li>
                    ))}
                  </ol>
                  {fix.note && <p className={styles.note}>{richText(fix.note)}</p>}
                </>
              ),
            }))

            return (
              <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
                <h2 className={styles.sectionTitle} id={`${section.id}-title`}>
                  <span className={styles.sectionIcon} aria-hidden="true">
                    {section.icon}
                  </span>
                  {section.title}
                  <span className={['mono', styles.count].join(' ')}>
                    {section.fixes.length} fix{section.fixes.length === 1 ? '' : 'es'}
                  </span>
                </h2>
                <Accordion items={items} multi />
              </section>
            )
          })}
        </div>

        {/* ---- Still stuck -------------------------------------------------- */}
        <section className={styles.cta}>
          <div>
            <h2 className={styles.ctaTitle}>Still stuck?</h2>
            <p className={styles.ctaSub}>
              Post a screenshot of your newest log file in Discord. The community and frogg are there daily.
            </p>
          </div>
          <a className={styles.ctaBtn} href={DISCORD_URL} target="_blank" rel="noreferrer noopener">
            <MessageCircle size={17} aria-hidden="true" />
            Join our Discord
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </section>
      </div>
    </div>
  )
}
