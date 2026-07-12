import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { secureGet, secureSet, secureRemove } from '@/lib/crypto'
import { post } from '@/lib/http'

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

interface AuthTokenResponse {
  access_token: string
  token_type: string
  expires_at: string | null
}

interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
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

  async function login(email: string, password: string) {
    const response = await post<AuthTokenResponse>('/auth/login', { email, password })
    const { access_token } = response.data

    // Persist token
    token.value = access_token
    await secureSet('auth_token', access_token)

    // Set basic user info (backend login belum return user object)
    const loggedInUser: User = { id: 0, name: email.split('@')[0] ?? '', email, avatar: undefined }
    user.value = loggedInUser
    await secureSet('auth_user', JSON.stringify(loggedInUser))
  }

  async function register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) {
    const payload: RegisterPayload = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }

    const response = await post<AuthTokenResponse>('/auth/register', payload)
    const { access_token } = response.data

    // Persist token
    token.value = access_token
    await secureSet('auth_token', access_token)

    // Set basic user info from register input (backend belum return user object)
    const newUser: User = { id: 0, name, email, avatar: undefined }
    user.value = newUser
    await secureSet('auth_user', JSON.stringify(newUser))
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
