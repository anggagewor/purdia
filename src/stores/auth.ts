import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { secureGet, secureSet, secureRemove } from '@purdia/crypto'

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

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
        // corrupted user data — clear everything
        await clearStorage()
      }
    }
    ready.value = true
  }

  async function login(email: string, _password: string) {
    // Mock login — accept any email/password
    const mockUser: User = {
      id: 1,
      name: 'Admin User',
      email,
      avatar: undefined,
    }
    const mockToken = 'mock-jwt-token-' + Date.now()
    const mockRefreshToken = 'mock-refresh-token-' + Date.now()

    user.value = mockUser
    token.value = mockToken
    await secureSet('auth_token', mockToken)
    await secureSet('refresh_token', mockRefreshToken)
    await secureSet('auth_user', JSON.stringify(mockUser))
  }

  async function register(name: string, email: string, _password: string) {
    // Mock register
    const mockUser: User = {
      id: 1,
      name,
      email,
      avatar: undefined,
    }
    const mockToken = 'mock-jwt-token-' + Date.now()
    const mockRefreshToken = 'mock-refresh-token-' + Date.now()

    user.value = mockUser
    token.value = mockToken
    await secureSet('auth_token', mockToken)
    await secureSet('refresh_token', mockRefreshToken)
    await secureSet('auth_user', JSON.stringify(mockUser))
  }

  async function forgotPassword(_email: string) {
    // Mock — just resolve successfully
    return { message: 'Link reset password telah dikirim ke email Anda.' }
  }

  async function clearStorage() {
    secureRemove('auth_token')
    secureRemove('refresh_token')
    secureRemove('auth_user')
  }

  async function logout() {
    user.value = null
    token.value = null
    await clearStorage()
  }

  return { user, token, isAuthenticated, ready, init, login, register, forgotPassword, logout }
})
