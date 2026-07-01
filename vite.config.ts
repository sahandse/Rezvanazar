import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/Rezvanazar/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'دبستان پسرانه تشیع ۲',
        short_name: 'دبستان تشیع ۲',
        description: 'تکلیف تعاملی پایه سوم ابتدایی — دبستان پسرانه تشیع ۲',
        lang: 'fa',
        dir: 'rtl',
        start_url: '/Rezvanazar/',
        scope: '/Rezvanazar/',
        display: 'standalone',
        background_color: '#f3e3c3',
        theme_color: '#a9744a',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'],
      },
    }),
  ],
})
