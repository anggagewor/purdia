import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { secureGet, secureSet, secureRemove } from '@/lib/crypto'
import { authApi, type User } from '@/lib/api'

export type { User }

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const ready = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  async function init() {
    if (ready.value) return
    const savedToken = await secureGet('auth_token')
    const savedUser = await secureGet('auth_user')
    if (savedToken && savedUser) {
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch {
        await clearStorage()
      }
    }
    ready.value = true
  }

  /** Fetch current user profile from /auth/me */
  async function fetchUser() {
    const response = await authApi.me()
    user.value = response.data
    await secureSet('auth_user', JSON.stringify(response.data))
  }

  async function login(email: string, password: string) {
    const response = await authApi.login({ email, password })
    const { access_token } = response.data

    token.value = access_token
    await secureSet('auth_token', access_token)

    await fetchUser()
  }

  async function register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) {
    const response = await authApi.register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
    const { access_token } = response.data

    token.value = access_token
    await secureSet('auth_token', access_token)

    await fetchUser()
  }

  async function changePassword(
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string,
  ) {
    await authApi.changePassword({
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    })
  }

  async function forgotPassword(email: string) {
    await authApi.forgotPassword({ email })
    return { message: 'Link reset password telah dikirim ke email Anda.' }
  }

  async function resetPassword(
    email: string,
    resetToken: string,
    password: string,
    passwordConfirmation: string,
  ) {
    await authApi.resetPassword({
      email,
      token: resetToken,
      password,
      password_confirmation: passwordConfirmation,
    })
  }

  async function clearStorage() {
    secureRemove('auth_token')
    secureRemove('refresh_token')
    secureRemove('auth_user')
  }

  async function logout() {
    try {
      await authApi.logout()
    } catch {
      // Ignore errors — token might already be invalid
    }
    user.value = null
    token.value = null
    await clearStorage()
  }

  return {
    user,
    token,
    isAuthenticated,
    ready,
    init,
    fetchUser,
    login,
    register,
    changePassword,
    forgotPassword,
    resetPassword,
    logout,
  }
})
