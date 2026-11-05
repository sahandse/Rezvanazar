import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/vazirmatn/400.css'
import '@fontsource/vazirmatn/500.css'
import '@fontsource/vazirmatn/700.css'
import '@fontsource/lalezar/400.css'
import './index.css'
import App from './App.tsx'

const RELOAD_FLAG = 'app-updated-reload'

// service worker نسخهٔ قبل را آفلاین نگه می‌دارد، پس بعد از انتشار، کاربر با یک بار
// باز کردن هنوز ظاهر قدیمی را می‌بیند. اینجا آپدیت را زودتر چک می‌کنیم و به‌محض
// فعال شدن نسخهٔ جدید، صفحه یک بار خودش تازه می‌شود.
function watchForNewVersion() {
  if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (sessionStorage.getItem(RELOAD_FLAG)) return
    sessionStorage.setItem(RELOAD_FLAG, '1')
    window.location.reload()
  })

  window.setTimeout(() => {
    navigator.serviceWorker.getRegistration().then((registration) => void registration?.update())
  }, 3000)
}

window.addEventListener('load', () => {
  sessionStorage.removeItem(RELOAD_FLAG)
  watchForNewVersion()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
