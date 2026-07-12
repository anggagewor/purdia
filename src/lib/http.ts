import axios, { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import router from '@/router'
import { secureGet, secureRemove, secureSet } from '@/lib/crypto'
import { getServiceConfig, type ServiceName } from '@/lib/config'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  meta?: PaginationMeta
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
}

// ---------------------------------------------------------------------------
// Silent Refresh logic
// ---------------------------------------------------------------------------

let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb)
}

function onTokenRefreshed(newToken: string) {
  refreshSubscribers.forEach((cb) => cb(newToken))
  refreshSubscribers = []
}

function onRefreshFailed() {
  refreshSubscribers = []
}

/**
 * Attempt silent refresh by calling POST /auth/refresh with current Bearer token.
 * Returns new access token on success, null on failure.
 */
async function attemptSilentRefresh(): Promise<string | null> {
  const currentToken = await secureGet('auth_token')
  if (!currentToken) return null

  try {
    const config = getServiceConfig('auth')
    const response = await axios.post<{
      data: { access_token: string; token_type: string; expires_at: string | null }
    }>(`${config.baseURL}/refresh`, null, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
      timeout: config.timeout ?? 15_000,
    })

    const { access_token } = response.data.data

    // Persist new token
    await secureSet('auth_token', access_token)

    return access_token
  } catch {
    return null
  }
}

function forceLogout() {
  secureRemove('auth_token')
  secureRemove('refresh_token')
  secureRemove('auth_user')
  router.push({ name: 'login' })
}

/**
 * Show error toast notification via the toast store.
 * Uses a registered callback to avoid circular dependency / Pinia init issues.
 */
let toastCallback: ((message: string) => void) | null = null

export function registerToastHandler(handler: (message: string) => void) {
  toastCallback = handler
}

function showErrorToast(apiError: ApiError) {
  toastCallback?.(apiError.message)
}

// ---------------------------------------------------------------------------
// Instance factory — bisa bikin instance per service
// ---------------------------------------------------------------------------

const instances = new Map<ServiceName, AxiosInstance>()

function createInstance(service: ServiceName): AxiosInstance {
  const config = getServiceConfig(service)

  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 30_000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...config.headers,
    },
  })

  // --- Request Interceptor ---
  instance.interceptors.request.use(
    async (reqConfig: InternalAxiosRequestConfig) => {
      const token = await secureGet('auth_token')
      if (token) {
        reqConfig.headers.Authorization = `Bearer ${token}`
      }

      const locale = localStorage.getItem('app_locale') ?? 'id'
      reqConfig.headers['Accept-Language'] = locale

      return reqConfig
    },
    (error) => Promise.reject(error),
  )

  // --- Response Interceptor ---
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      // Network error / timeout
      if (!error.response) {
        const apiError: ApiError = {
          message: 'Koneksi gagal. Periksa jaringan internet kamu.',
          status: 0,
        }
        showErrorToast(apiError)
        return Promise.reject(apiError)
      }

      const { status, data } = error.response

      const apiError: ApiError = {
        message: data?.message ?? getDefaultMessage(status),
        errors: data?.errors,
        status,
      }

      // 401 Unauthorized — try silent refresh first, logout only if refresh fails
      if (status === 401) {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

        // Don't retry refresh requests themselves or already-retried requests
        if (originalRequest._retry || originalRequest.url?.includes('/refresh')) {
          forceLogout()
          return Promise.reject(apiError)
        }

        if (!isRefreshing) {
          isRefreshing = true
          originalRequest._retry = true

          const newToken = await attemptSilentRefresh()

          if (newToken) {
            isRefreshing = false
            onTokenRefreshed(newToken)

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return instance(originalRequest)
          } else {
            isRefreshing = false
            onRefreshFailed()
            forceLogout()
            return Promise.reject(apiError)
          }
        }

        // Another refresh is already in progress — queue this request
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            resolve(instance(originalRequest))
          })
          // If refresh fails while we're waiting, the forceLogout above handles navigation
          // but we still need to reject this queued promise
          const checkInterval = setInterval(() => {
            if (!isRefreshing && refreshSubscribers.length === 0) {
              clearInterval(checkInterval)
              reject(apiError)
            }
          }, 50)
        })
      }

      // 403 Forbidden
      if (status === 403) {
        apiError.message = data?.message ?? 'Kamu tidak punya akses untuk melakukan ini.'
      }

      // 419 CSRF token mismatch (Laravel)
      if (status === 419) {
        apiError.message = 'Sesi telah kadaluarsa. Silakan refresh halaman.'
      }

      // 429 Too many requests
      if (status === 429) {
        apiError.message = 'Terlalu banyak permintaan. Coba lagi nanti.'
      }

      // 500+ Server error
      if (status >= 500) {
        apiError.message = 'Terjadi kesalahan di server. Coba lagi nanti.'
      }

      // Show toast for all non-silent errors (skip 401 which is handled above, skip 422 validation)
      if (status !== 401 && status !== 422) {
        showErrorToast(apiError)
      }

      return Promise.reject(apiError)
    },
  )

  return instance
}

function getDefaultMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Permintaan tidak valid.',
    401: 'Sesi telah berakhir. Silakan login kembali.',
    403: 'Akses ditolak.',
    404: 'Data tidak ditemukan.',
    422: 'Data yang dikirim tidak valid.',
    429: 'Terlalu banyak permintaan.',
    500: 'Terjadi kesalahan di server.',
  }
  return messages[status] ?? `Terjadi kesalahan (${status}).`
}

/**
 * Get (or create) an axios instance for a given service.
 */
export function useHttp(service: ServiceName = 'main'): AxiosInstance {
  if (!instances.has(service)) {
    instances.set(service, createInstance(service))
  }
  return instances.get(service)!
}

// ---------------------------------------------------------------------------
// Default instance (main service)
// ---------------------------------------------------------------------------

const http = useHttp('main')

// ---------------------------------------------------------------------------
// Convenience helpers — all use the main service by default
// ---------------------------------------------------------------------------

export function get<T = unknown>(url: string, config?: AxiosRequestConfig) {
  return http.get<ApiResponse<T>>(url, config).then((r) => r.data)
}

export function post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return http.post<ApiResponse<T>>(url, data, config).then((r) => r.data)
}

export function put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return http.put<ApiResponse<T>>(url, data, config).then((r) => r.data)
}

export function patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return http.patch<ApiResponse<T>>(url, data, config).then((r) => r.data)
}

export function del<T = unknown>(url: string, config?: AxiosRequestConfig) {
  return http.delete<ApiResponse<T>>(url, config).then((r) => r.data)
}

/**
 * Upload file(s) with multipart/form-data.
 */
export function upload<T = unknown>(
  url: string,
  formData: FormData,
  onProgress?: (percent: number) => void,
) {
  return http
    .post<ApiResponse<T>>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded / e.total) * 100))
        }
      },
    })
    .then((r) => r.data)
}

/**
 * Download file as Blob.
 *
 * Handles error responses properly — if server returns 4xx/5xx,
 * the blob is actually JSON error. We detect this and parse it
 * so the error interceptor gets a proper error message.
 */
export function download(url: string, config?: AxiosRequestConfig) {
  return http
    .get<Blob>(url, { ...config, responseType: 'blob' })
    .then((response) => response)
    .catch(async (error) => {
      // Kalau error dari interceptor (sudah ApiError), langsung reject
      if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
        return Promise.reject(error)
      }

      // Kalau AxiosError dan response-nya blob, coba parse ke JSON
      if (error instanceof AxiosError && error.response?.data instanceof Blob) {
        const blob = error.response.data
        const status = error.response.status

        // Cek apakah blob isinya JSON (error response dari server)
        if (blob.type === 'application/json' || blob.type.includes('json')) {
          try {
            const text = await blob.text()
            const parsed = JSON.parse(text) as {
              message?: string
              errors?: Record<string, string[]>
            }
            const apiError: ApiError = {
              message: parsed.message ?? getDefaultMessage(status),
              errors: parsed.errors,
              status,
            }
            return Promise.reject(apiError)
          } catch {
            // JSON parse gagal, fallback ke default message
          }
        }

        // Blob bukan JSON — pakai default error message
        const apiError: ApiError = {
          message: getDefaultMessage(status),
          status,
        }
        return Promise.reject(apiError)
      }

      return Promise.reject(error)
    })
}

export { http }
export default http
