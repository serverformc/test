import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/test/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['nova-logo.png', 'icons/icon-192.png', 'icons/icon-512.png'],
      // Mirrors the manifest already live at novaclient.bond/manifest.json so
      // installs stay continuous for anyone who already added Nova to their home
      // screen. Do not drift these values without checking the live site first.
      manifest: {
        id: '/',
        name: 'Nova Client - Minecraft Launcher',
        short_name: 'Nova',
        description:
          'The free Minecraft launcher with mods, hosting, skins and 24/7 Keep Playing. Java included, auto-updating.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        theme_color: '#0a0f16',
        background_color: '#0a0f16',
        categories: ['games', 'entertainment'],
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        // The installers live under /dl/ and run 130-152 MB. The service worker
        // must never precache them, never serve index.html in their place, and
        // never intercept the download navigation.
        globIgnores: ['**/dl/**'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/dl\//],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
    }),
  ],
  server: {
    port: 5173,
  },
})

