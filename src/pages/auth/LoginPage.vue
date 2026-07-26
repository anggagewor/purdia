<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { BaseInput, BaseButton, BaseCheckbox, BaseAlert } from '@purdia/ui'

const router = useRouter()
const auth = useAuthStore()
const themeStore = useThemeStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Email dan password wajib diisi.'
    return
  }
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    themeStore.loadForUser()
    router.push({ name: 'dashboard' })
  } catch (e: any) {
    error.value = e.message || 'Login gagal.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-lg p-8 dark:bg-gray-800">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Masuk ke Purdia</h1>
          <p class="text-gray-500 mt-2 dark:text-gray-400">
            Masukkan kredensial Anda untuk melanjutkan
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <BaseAlert v-if="error" variant="danger">
            {{ error }}
          </BaseAlert>

          <BaseInput
            v-model="email"
            type="email"
            label="Email"
            placeholder="nama@email.com"
          />

          <BaseInput
            v-model="password"
            type="password"
            label="Password"
            placeholder="••••••••"
          />

          <div class="flex items-center justify-between">
            <BaseCheckbox v-model="rememberMe" label="Ingat saya" />
            <RouterLink
              :to="{ name: 'forgot-password' }"
              class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Lupa password?
            </RouterLink>
          </div>

          <BaseButton
            type="submit"
            variant="primary"
            :disabled="loading"
            class="w-full"
          >
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </BaseButton>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6 dark:text-gray-400">
          Belum punya akun?
          <RouterLink
            :to="{ name: 'register' }"
            class="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300"
          >
            Daftar sekarang
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
