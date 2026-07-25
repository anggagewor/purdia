<script setup lang="ts">
import { computed } from 'vue'
import { Globe, Languages, ArrowRight } from '@lucide/vue'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import { useI18n, availableLocales } from '@/lib/i18n'

const { t, locale, setLocale } = useI18n()

// Demo keys to show
const commonKeys = ['common.save', 'common.cancel', 'common.delete', 'common.edit', 'common.create', 'common.search', 'common.loading', 'common.submit']
const navKeys = ['nav.dashboard', 'nav.profile', 'nav.settings', 'nav.logout', 'nav.chat', 'nav.email', 'nav.calendar']
const authKeys = ['auth.login', 'auth.register', 'auth.forgotPassword', 'auth.email', 'auth.password', 'auth.rememberMe']

const currentLocaleInfo = computed(() => availableLocales.find((l) => l.code === locale.value))
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ t('i18nDemo.title') }}</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">{{ t('i18nDemo.description') }}</p>
    </div>

    <!-- Language switcher -->
    <BaseCard>
      <template #header>
        <div class="flex items-center gap-2">
          <Globe class="w-4 h-4 text-primary-600" />
          <h3 class="font-semibold text-gray-900 dark:text-white">{{ t('i18nDemo.switchLanguage') }}</h3>
        </div>
      </template>

      <div class="flex items-center gap-3 mb-4">
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all"
          :class="
            locale === loc.code
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          "
          @click="setLocale(loc.code)"
        >
          <span class="text-lg">{{ loc.flag }}</span>
          <span
            class="text-sm font-medium"
            :class="locale === loc.code ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'"
          >
            {{ loc.label }}
          </span>
          <BaseBadge v-if="locale === loc.code" variant="primary" size="sm">Active</BaseBadge>
        </button>
      </div>

      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ t('i18nDemo.currentLocale') }}:
          <span class="font-semibold text-gray-900 dark:text-white">
            {{ currentLocaleInfo?.flag }} {{ currentLocaleInfo?.label }} ({{ locale }})
          </span>
        </p>
      </div>
    </BaseCard>

    <!-- Interpolation demo -->
    <BaseCard>
      <template #header>
        <div class="flex items-center gap-2">
          <Languages class="w-4 h-4 text-primary-600" />
          <h3 class="font-semibold text-gray-900 dark:text-white">String Interpolation</h3>
        </div>
      </template>

      <div class="space-y-3">
        <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
            {{ t('i18nDemo.greeting', { name: 'Angga', count: 5 }) }}
          </p>
        </div>

        <div class="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <p class="text-sm font-medium text-green-800 dark:text-green-200">
            {{ t('dashboard.welcome', { name: 'Angga' }) }}
          </p>
        </div>

        <div class="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 font-mono text-xs text-gray-600 dark:text-gray-300">
          <p>t('i18nDemo.greeting', { name: 'Angga', count: 5 })</p>
          <p>t('dashboard.welcome', { name: 'Angga' })</p>
        </div>
      </div>
    </BaseCard>

    <!-- Translation keys table -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Common -->
      <BaseCard>
        <template #header>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white">common.*</h3>
        </template>
        <div class="space-y-2">
          <div
            v-for="key in commonKeys"
            :key="key"
            class="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0"
          >
            <code class="text-xs text-gray-500 dark:text-gray-400 font-mono">{{ key.split('.')[1] }}</code>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t(key) }}</span>
          </div>
        </div>
      </BaseCard>

      <!-- Nav -->
      <BaseCard>
        <template #header>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white">nav.*</h3>
        </template>
        <div class="space-y-2">
          <div
            v-for="key in navKeys"
            :key="key"
            class="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0"
          >
            <code class="text-xs text-gray-500 dark:text-gray-400 font-mono">{{ key.split('.')[1] }}</code>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t(key) }}</span>
          </div>
        </div>
      </BaseCard>

      <!-- Auth -->
      <BaseCard>
        <template #header>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white">auth.*</h3>
        </template>
        <div class="space-y-2">
          <div
            v-for="key in authKeys"
            :key="key"
            class="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0"
          >
            <code class="text-xs text-gray-500 dark:text-gray-400 font-mono">{{ key.split('.')[1] }}</code>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t(key) }}</span>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Usage code -->
    <BaseCard>
      <template #header>
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Usage</h3>
      </template>
      <pre class="p-4 rounded-lg bg-gray-900 text-gray-100 text-sm overflow-x-auto font-mono leading-relaxed"><code>&lt;script setup&gt;
import { useI18n } from '@/lib/i18n'

const { t, locale, setLocale } = useI18n()
&lt;/script&gt;

&lt;template&gt;
  &lt;h1&gt;{{ t('dashboard.welcome', { name: 'Angga' }) }}&lt;/h1&gt;
  &lt;button @click="setLocale('id')"&gt;Bahasa Indonesia&lt;/button&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>
  </div>
</template>
