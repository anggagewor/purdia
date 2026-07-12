<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useMenuStore } from '@/stores/menu'

const router = useRouter()
const auth = useAuthStore()
const themeStore = useThemeStore()
const menuStore = useMenuStore()

const email = ref('')
const password = ref('')
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
    menuStore.refresh()
    router.push({ name: 'dashboard' })
  } catch (e: any) {
    if (e.errors) {
      const firstField = Object.keys(e.errors)[0]
      error.value = firstField ? e.errors[firstField][0] : e.message
    } else {
      error.value = e.message || 'Login gagal.'
    }
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
          <div
            v-if="error"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
          >
            {{ error }}
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >Email</label
            >
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="nama@email.com"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <input type="checkbox" class="rounded border-gray-300 dark:border-gray-600" />
              Ingat saya
            </label>
            <RouterLink
              :to="{ name: 'forgot-password' }"
              class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Lupa password?
            </RouterLink>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </button>
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
