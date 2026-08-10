<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@purdia/auth'
import { useThemeStore } from '@/stores/theme'
import { BaseInput, BaseButton, BaseAlert } from '@purdia/ui'

const router = useRouter()
const auth = useAuthStore()
const themeStore = useThemeStore()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  error.value = ''
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
    await auth.register(name.value, email.value, password.value)
    themeStore.loadForUser()
    router.push({ name: 'dashboard' })
  } catch (e: any) {
    error.value = e.message || 'Registrasi gagal.'
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
          <BaseAlert v-if="error" variant="danger">
            {{ error }}
          </BaseAlert>

          <BaseInput v-model="name" type="text" label="Nama Lengkap" placeholder="Nama lengkap" />

          <BaseInput v-model="email" type="email" label="Email" placeholder="nama@email.com" />

          <BaseInput
            v-model="password"
            type="password"
            label="Password"
            placeholder="Minimal 8 karakter"
          />

          <BaseInput
            v-model="passwordConfirmation"
            type="password"
            label="Konfirmasi Password"
            placeholder="Ulangi password"
          />

          <BaseButton type="submit" variant="primary" :disabled="loading" class="w-full">
            {{ loading ? 'Memproses...' : 'Daftar' }}
          </BaseButton>
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
