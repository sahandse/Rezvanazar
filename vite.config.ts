import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// نشان زمان build از سمت GitHub Actions: به معلم و دانش‌آموز نشان می‌دهد
// نسخه‌ای که می‌بیند واقعاً newest است یا از کش آفلاین می‌آید.
const buildStamp = new Intl.DateTimeFormat('fa-IR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Tehran',
}).format(new Date())

export default defineConfig({
  base: '/Rezvanazar/',
  define: {
    __APP_BUILD__: JSON.stringify(buildStamp),
  },
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
        background_color: '#fdf3dd',
        theme_color: '#2f6b4f',
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
