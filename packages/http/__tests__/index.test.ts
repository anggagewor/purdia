import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import { initHttp, get, post, put, del, useHttp } from '../src/index'
import * as crypto from '@purdia/crypto'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('@purdia/crypto', () => ({
  secureGet: vi.fn(),
  secureSet: vi.fn(),
  secureRemove: vi.fn(),
}))

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks()
  localStorageMock.clear()

  initHttp({
    services: {
      main: { baseURL: 'http://localhost/api', timeout: 5000 },
      auth: { baseURL: 'http://localhost/api/auth', timeout: 5000 },
    },
    onUnauthorized: vi.fn(),
    onError: vi.fn(),
    locale: 'en',
  })
})

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('@purdia/http', () => {
  describe('initHttp', () => {
    it('should clear existing instances on re-init', () => {
      // Get an instance before re-init
      const instance1 = useHttp('main')
      initHttp({
        services: { main: { baseURL: 'http://new-api/api' } },
      })
      const instance2 = useHttp('main')
      // After re-init, should get a fresh instance
      expect(instance2).not.toBe(instance1)
    })
  })

  describe('useHttp', () => {
    it('should return an axios instance for configured service', () => {
      const instance = useHttp('main')
      expect(instance).toBeDefined()
      expect(instance.defaults.baseURL).toBe('http://localhost/api')
    })

    it('should reuse the same instance on subsequent calls', () => {
      const a = useHttp('main')
      const b = useHttp('main')
      expect(a).toBe(b)
    })

    it('should throw for unconfigured service', () => {
      expect(() => useHttp('nonexistent')).toThrow('[http] Service "nonexistent" is not configured.')
    })
  })

  describe('request interceptor — token injection', () => {
    it('should attach Bearer token if token exists in secure storage', async () => {
      vi.mocked(crypto.secureGet).mockResolvedValue('my-token')

      const instance = useHttp('main')
      const mockAdapter = vi.fn().mockResolvedValue({ data: { data: 'ok' }, status: 200, headers: {} })
      instance.defaults.adapter = mockAdapter

      await instance.get('/test')

      const requestConfig = mockAdapter.mock.calls[0][0]
      expect(requestConfig.headers.Authorization).toBe('Bearer my-token')
    })

    it('should not attach Authorization header if no token', async () => {
      vi.mocked(crypto.secureGet).mockResolvedValue(null)

      const instance = useHttp('main')
      const mockAdapter = vi.fn().mockResolvedValue({ data: { data: 'ok' }, status: 200, headers: {} })
      instance.defaults.adapter = mockAdapter

      await instance.get('/test')

      const requestConfig = mockAdapter.mock.calls[0][0]
      expect(requestConfig.headers.Authorization).toBeUndefined()
    })

    it('should attach Accept-Language header from locale config', async () => {
      vi.mocked(crypto.secureGet).mockResolvedValue(null)

      const instance = useHttp('main')
      const mockAdapter = vi.fn().mockResolvedValue({ data: { data: 'ok' }, status: 200, headers: {} })
      instance.defaults.adapter = mockAdapter

      await instance.get('/test')

      const requestConfig = mockAdapter.mock.calls[0][0]
      expect(requestConfig.headers['Accept-Language']).toBe('en')
    })
  })

  describe('response interceptor — error handling', () => {
    it('should handle network errors (no response)', async () => {
      vi.mocked(crypto.secureGet).mockResolvedValue(null)

      const onError = vi.fn()
      initHttp({
        services: { main: { baseURL: 'http://localhost/api' } },
        onError,
        locale: 'en',
      })

      const instance = useHttp('main')
      const networkError = new axios.AxiosError('Network Error', 'ERR_NETWORK')
      const mockAdapter = vi.fn().mockRejectedValue(networkError)
      instance.defaults.adapter = mockAdapter

      await expect(instance.get('/test')).rejects.toMatchObject({
        message: 'Koneksi gagal. Periksa jaringan internet kamu.',
        status: 0,
      })

      expect(onError).toHaveBeenCalledWith(expect.objectContaining({ status: 0 }))
    })

    it('should map 404 to proper ApiError', async () => {
      vi.mocked(crypto.secureGet).mockResolvedValue(null)

      const onError = vi.fn()
      initHttp({
        services: { main: { baseURL: 'http://localhost/api' } },
        onError,
        locale: 'en',
      })

      const instance = useHttp('main')
      const mockAdapter = vi.fn().mockRejectedValue(
        new axios.AxiosError('Not Found', '404', undefined, undefined, {
          status: 404,
          data: { message: 'Resource not found' },
          headers: {},
          statusText: 'Not Found',
          config: {} as any,
        } as any),
      )
      instance.defaults.adapter = mockAdapter

      await expect(instance.get('/missing')).rejects.toMatchObject({
        message: 'Resource not found',
        status: 404,
      })
    })

    it('should not call onError for 422 validation errors', async () => {
      vi.mocked(crypto.secureGet).mockResolvedValue(null)

      const onError = vi.fn()
      initHttp({
        services: { main: { baseURL: 'http://localhost/api' } },
        onError,
        locale: 'en',
      })

      const instance = useHttp('main')
      const mockAdapter = vi.fn().mockRejectedValue(
        new axios.AxiosError('Unprocessable', '422', undefined, undefined, {
          status: 422,
          data: { message: 'Validation failed', errors: { email: ['Required'] } },
          headers: {},
          statusText: 'Unprocessable',
          config: {} as any,
        } as any),
      )
      instance.defaults.adapter = mockAdapter

      await expect(instance.post('/submit')).rejects.toMatchObject({
        status: 422,
        errors: { email: ['Required'] },
      })

      expect(onError).not.toHaveBeenCalled()
    })

    it('should call onError for 500 server errors', async () => {
      vi.mocked(crypto.secureGet).mockResolvedValue(null)

      const onError = vi.fn()
      initHttp({
        services: { main: { baseURL: 'http://localhost/api' } },
        onError,
        locale: 'en',
      })

      const instance = useHttp('main')
      const mockAdapter = vi.fn().mockRejectedValue(
        new axios.AxiosError('Server Error', '500', undefined, undefined, {
          status: 500,
          data: {},
          headers: {},
          statusText: 'Internal Server Error',
          config: {} as any,
        } as any),
      )
      instance.defaults.adapter = mockAdapter

      await expect(instance.get('/broken')).rejects.toMatchObject({
        status: 500,
        message: 'Terjadi kesalahan di server. Coba lagi nanti.',
      })

      expect(onError).toHaveBeenCalled()
    })
  })

  describe('401 — silent token refresh', () => {
    it('should attempt token refresh on 401 and retry the original request', async () => {
      // First call: secureGet for request interceptor (access token)
      // The refresh flow also calls secureGet for refresh token
      vi.mocked(crypto.secureGet)
        .mockResolvedValueOnce('expired-token') // request interceptor
        .mockResolvedValueOnce('valid-refresh-token') // attemptSilentRefresh reads refresh token

      vi.mocked(crypto.secureSet).mockResolvedValue()

      const onUnauthorized = vi.fn()
      initHttp({
        services: {
          main: { baseURL: 'http://localhost/api' },
          auth: { baseURL: 'http://localhost/api/auth' },
        },
        onUnauthorized,
        locale: 'en',
      })

      // We need to mock axios.post for the refresh call and the instance adapter for requests
      const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
        data: { data: { token: 'new-access-token', refresh_token: 'new-refresh-token' } },
      })

      const instance = useHttp('main')
      let callCount = 0
      const mockAdapter = vi.fn().mockImplementation((config) => {
        callCount++
        if (callCount === 1) {
          // First call: return 401
          return Promise.reject(
            new axios.AxiosError('Unauthorized', '401', config, undefined, {
              status: 401,
              data: { message: 'Token expired' },
              headers: {},
              statusText: 'Unauthorized',
              config,
            } as any),
          )
        }
        // Retry after refresh: return success
        return Promise.resolve({ data: { data: 'success' }, status: 200, headers: {} })
      })
      instance.defaults.adapter = mockAdapter

      const result = await instance.get('/protected')

      expect(result.data).toEqual({ data: 'success' })
      expect(axiosPostSpy).toHaveBeenCalledWith(
        'http://localhost/api/auth/refresh',
        { refresh_token: 'valid-refresh-token' },
        expect.any(Object),
      )
      expect(crypto.secureSet).toHaveBeenCalledWith('auth_token', 'new-access-token')
      expect(crypto.secureSet).toHaveBeenCalledWith('refresh_token', 'new-refresh-token')
      expect(onUnauthorized).not.toHaveBeenCalled()

      axiosPostSpy.mockRestore()
    })

    it('should force logout if refresh token is missing', async () => {
      vi.mocked(crypto.secureGet)
        .mockResolvedValueOnce('expired-token') // request interceptor
        .mockResolvedValueOnce(null) // no refresh token

      const onUnauthorized = vi.fn()
      initHttp({
        services: { main: { baseURL: 'http://localhost/api' } },
        onUnauthorized,
        locale: 'en',
      })

      const instance = useHttp('main')
      const mockAdapter = vi.fn().mockRejectedValue(
        new axios.AxiosError('Unauthorized', '401', { url: '/test' } as any, undefined, {
          status: 401,
          data: { message: 'Token expired' },
          headers: {},
          statusText: 'Unauthorized',
          config: { url: '/test', headers: {} } as any,
        } as any),
      )
      instance.defaults.adapter = mockAdapter

      await expect(instance.get('/test')).rejects.toMatchObject({ status: 401 })
      expect(onUnauthorized).toHaveBeenCalled()
      expect(crypto.secureRemove).toHaveBeenCalledWith('auth_token')
    })
  })

  describe('convenience helpers', () => {
    it('get() should unwrap ApiResponse', async () => {
      vi.mocked(crypto.secureGet).mockResolvedValue(null)

      const instance = useHttp('main')
      const mockAdapter = vi.fn().mockResolvedValue({
        data: { data: [{ id: 1 }], message: 'OK' },
        status: 200,
        headers: {},
      })
      instance.defaults.adapter = mockAdapter

      const result = await get<{ id: number }[]>('/items')
      expect(result).toEqual({ data: [{ id: 1 }], message: 'OK' })
    })
  })
})
