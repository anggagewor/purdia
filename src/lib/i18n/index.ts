import { ref, computed } from 'vue'

import en from './locales/en.json'
import id from './locales/id.json'
import ja from './locales/ja.json'

type Messages = Record<string, Record<string, string>>

const locales: Record<string, Messages> = { en, id, ja }

export const availableLocales = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
]

const currentLocale = ref(localStorage.getItem('app_locale') || 'en')

export function useI18n() {
  const locale = computed({
    get: () => currentLocale.value,
    set: (val: string) => {
      currentLocale.value = val
      localStorage.setItem('app_locale', val)
    },
  })

  function t(key: string, params?: Record<string, string | number>): string {
    const [namespace, ...rest] = key.split('.')
    const messageKey = rest.join('.')

    const messages = namespace ? locales[currentLocale.value]?.[namespace] : undefined
    let text = messages?.[messageKey] || key

    // Interpolation: replace {param} with value
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
      }
    }

    return text
  }

  function setLocale(code: string) {
    locale.value = code
  }

  return {
    t,
    locale,
    setLocale,
    availableLocales,
  }
}
