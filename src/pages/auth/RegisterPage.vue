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

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const loading = ref(false)
const error = ref('')
const fieldErrors = ref<Record<string, string[]>>({})

async function handleRegister() {
  error.value = ''
  fieldErrors.value = {}
  if (!name.value || !email.value || !password.value || !passwordConfirmation.value) {
    error.value = 'Semua field wajib diisi.'
    return
  }
  if (password.value !== passwordConfirmation.value) {
    error.value = 'Konfirmasi password tidak cocok.'
    return
  }
  if (password.value.length < 8) {
    error.value = 'Password minimal 8 karakter.'
    return
  }
  loading.value = true
  try {
    await auth.register(name.value, email.value, password.value, passwordConfirmation.value)
    themeStore.loadForUser()
    menuStore.refresh()
    router.push({ name: 'dashboard' })
  } catch (e: any) {
    if (e.errors) {
      fieldErrors.value = e.errors
      const firstField = Object.keys(e.errors)[0]
      error.value = firstField ? e.errors[firstField][0] : e.message
    } else {
      error.value = e.message || 'Registrasi gagal.'
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
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Daftar Akun Baru</h1>
          <p class="text-gray-500 mt-2 dark:text-gray-400">
            Buat akun untuk mulai menggunakan Purdia
          </p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <div
            v-if="error"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
          >
            {{ error }}
          </div>

          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >Nama Lengkap</label
            >
            <input
              id="name"
              v-model="name"
              type="text"
              autocomplete="name"
              placeholder="Nama lengkap"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
            />
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
              autocomplete="new-password"
              placeholder="Minimal 8 karakter"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
            />
          </div>

          <div>
            <label
              for="password-confirmation"
              class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >Konfirmasi Password</label
            >
            <input
              id="password-confirmation"
              v-model="passwordConfirmation"
              type="password"
              autocomplete="new-password"
              placeholder="Ulangi password"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Memproses...' : 'Daftar' }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6 dark:text-gray-400">
          Sudah punya akun?
          <RouterLink
            :to="{ name: 'login' }"
            class="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300"
          >
            Masuk
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
