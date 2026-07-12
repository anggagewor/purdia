/**
 * API Configuration
 *
 * Central config untuk semua backend service.
 * Tinggal tambahin service baru di sini tanpa ubah logic http helper.
 */

export interface ServiceConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://api.purdia.test'

const configs = {
  /**
   * Main backend API (default)
   */
  main: {
    baseURL: `${API_BASE}/api`,
    timeout: 30_000,
  },

  /**
   * Auth service
   */
  auth: {
    baseURL: `${API_BASE}/api/auth`,
    timeout: 15_000,
  },

  /**
   * Contoh: Payment gateway service
   */
  // payment: {
  //   baseURL: 'https://payment.example.com/v1',
  //   timeout: 60_000,
  //   headers: { 'X-Payment-Key': 'pk_xxx' },
  // },

  /**
   * Contoh: File / media service
   */
  // media: {
  //   baseURL: 'https://cdn.example.com/api',
  //   timeout: 120_000,
  // },
} as const satisfies Record<string, ServiceConfig>

export type ServiceName = keyof typeof configs

export function getServiceConfig(name: ServiceName): ServiceConfig {
  return configs[name]
}

export function getAllServices(): Record<ServiceName, ServiceConfig> {
  return configs
}

export default configs
