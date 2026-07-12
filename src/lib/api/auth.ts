/**
 * Auth API Service
 */
import { get, post, put } from '@/lib/http'
import type {
  AuthTokenResponse,
  User,
  RegisterPayload,
  LoginPayload,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from './types'

export const authApi = {
  register(payload: RegisterPayload) {
    return post<AuthTokenResponse>('/auth/register', payload)
  },

  login(payload: LoginPayload) {
    return post<AuthTokenResponse>('/auth/login', payload)
  },

  logout() {
    return post('/auth/logout')
  },

  refresh() {
    return post<AuthTokenResponse>('/auth/refresh')
  },

  me() {
    return get<User>('/auth/me')
  },

  changePassword(payload: ChangePasswordPayload) {
    return put('/auth/change-password', payload)
  },

  forgotPassword(payload: ForgotPasswordPayload) {
    return post('/auth/forgot-password', payload)
  },

  resetPassword(payload: ResetPasswordPayload) {
    return post('/auth/reset-password', payload)
  },
}
