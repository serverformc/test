import { copyFileSync, createReadStream, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const base = process.env.NODE_ENV === 'production' ? '/test/' : '/'

function copyRootBrandAssets() {
  const assets: Record<string, { file: string; type: string }> = {
    '/nova-logo.png': { file: 'nova-logo.png', type: 'image/png' },
    '/icons/icon-192.png': { file: 'icon-192.png', type: 'image/png' },
    '/icons/icon-512.png': { file: 'icon-512.png', type: 'image/png' },
  }

  return {
    name: 'copy-root-brand-assets',
    configureServer(server: { middlewares: { use: (handler: (req: { url?: string }, res: { setHeader: (name: string, value: string) => void; end: () => void }, next: () => void) => void) => void } }) {
      server.middlewares.use((req, res, next) => {
        const asset = assets[req.url?.split('?')[0] ?? '']
        if (!asset) {
          next()
          return
        }
        res.setHeader('Content-Type', asset.type)
        createReadStream(resolve(asset.file)).pipe(res as never)
      })
    },
    closeBundle() {
      const output = resolve('dist')
      mkdirSync(resolve(output, 'icons'), { recursive: true })
      copyFileSync(resolve('nova-logo.png'), resolve(output, 'nova-logo.png'))
      copyFileSync(resolve('icon-192.png'), resolve(output, 'icons/icon-192.png'))
      copyFileSync(resolve('icon-512.png'), resolve(output, 'icons/icon-512.png'))
    },
  }
}

export default defineConfig({
  base,
  plugins: [
    react(),
    copyRootBrandAssets(),
    VitePWA({
      registerType: 'autoUpdate',
      // Mirrors the manifest already live at novaclient.bond/manifest.json so
      // installs stay continuous for anyone who already added Nova to their home
      // screen. Do not drift these values without checking the live site first.
      manifest: {
        id: base,
        name: 'Nova Client - Minecraft Launcher',
        short_name: 'Nova',
        description:
          'The free Minecraft launcher with mods, hosting, skins and 24/7 Keep Playing. Java included, auto-updating.',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait-primary',
        theme_color: '#0a0f16',
        background_color: '#0a0f16',
        categories: ['games', 'entertainment'],
        icons: [
          { src: `${base}icons/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: `${base}icons/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: `${base}icons/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        // The installers live under /dl/ and run 130-152 MB. The service worker
        // must never precache them, never serve index.html in their place, and
        // never intercept the download navigation.
        globIgnores: ['**/dl/**'],
        navigateFallback: `${base}index.html`,
        navigateFallbackDenylist: [/^\/test\/dl\//],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
    }),
  ],
  server: {
    port: 5173,
  },
})
