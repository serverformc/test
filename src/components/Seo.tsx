import { useEffect } from 'react'

const SITE_URL = 'https://novaclient.bond'

interface SeoProps {
  title: string
  description: string
  path: string
}

export function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    document.title = title

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = name
        document.head.appendChild(tag)
      }
      tag.content = content
    }

    setMeta('description', description)

    const canonicalUrl = `${SITE_URL}${path}`
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [description, path, title])

  return null
}
