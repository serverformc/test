import type { ReactNode } from 'react'

/* A deliberately tiny markdown subset: **bold** and `code`.
   Used by the Help page, the Android steps and a few feature details so the
   content files can stay plain strings instead of JSX. */

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`)/g

export function richText(input: string): ReactNode[] {
  return input.split(TOKEN).map((chunk, i) => {
    if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length > 4) {
      return <strong key={i}>{chunk.slice(2, -2)}</strong>
    }
    if (chunk.startsWith('`') && chunk.endsWith('`') && chunk.length > 2) {
      return (
        <code className="mono" key={i}>
          {chunk.slice(1, -1)}
        </code>
      )
    }
    return chunk
  })
}
