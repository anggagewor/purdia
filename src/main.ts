import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'

import { initHttp } from '@purdia/http'
import configs from './lib/config'

// Initialize HTTP client before anything else
initHttp({
  services: configs,
  onUnauthorized: () => router.push({ name: 'login' }),
  onError: (err) => {
    // Lazy-import toast store to avoid circular dep during init
    import('@purdia/toast').then(({ useToastStore }) => {
      const toastStore = useToastStore()
      toastStore.error(err.message)
    })
  },
  locale: () => localStorage.getItem('app_locale') ?? 'id',
})

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Initialize auth & theme on app start
import { useAuthStore } from '@purdia/auth'
import { useThemeStore } from './stores/theme'

const auth = useAuthStore()
await auth.init()

const themeStore = useThemeStore()
themeStore.loadForUser()

app.mount('#app')
