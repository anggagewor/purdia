import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { useApi } from '../src/useApi'
import type { ApiError } from '@purdia/http'

describe('useApi', () => {
  describe('initial state', () => {
    it('should have null data, not loading, no error by default', () => {
      const { data, loading, error } = useApi(() => Promise.resolve({ data: 'test' }))
      expect(data.value).toBeNull()
      expect(loading.value).toBe(false)
      expect(error.value).toBeNull()
    })

    it('should use initialData when provided', () => {
      const { data } = useApi(() => Promise.resolve({ data: [] }), { initialData: ['default'] })
      expect(data.value).toEqual(['default'])
    })
  })

  describe('execute', () => {
    it('should set loading=true during request and false after', async () => {
      let resolve: (v: any) => void
      const promise = new Promise((r) => { resolve = r })

      const { loading, execute } = useApi(() => promise)

      const execPromise = execute()
      expect(loading.value).toBe(true)

      resolve!({ data: 'done' })
      await execPromise

      expect(loading.value).toBe(false)
    })

    it('should unwrap { data: T } response shape', async () => {
      const { data, execute } = useApi(() => Promise.resolve({ data: { id: 1, name: 'Test' } }))
      await execute()
      expect(data.value).toEqual({ id: 1, name: 'Test' })
    })

    it('should handle raw value response (non-wrapped)', async () => {
      const { data, execute } = useApi(() => Promise.resolve('raw-value'))
      await execute()
      expect(data.value).toBe('raw-value')
    })

    it('should return the resolved data from execute()', async () => {
      const { execute } = useApi(() => Promise.resolve({ data: 42 }))
      const result = await execute()
      expect(result).toBe(42)
    })

    it('should forward args to fetcher', async () => {
      const fetcher = vi.fn().mockResolvedValue({ data: 'ok' })
      const { execute } = useApi(fetcher)
      await execute('arg1', 'arg2')
      expect(fetcher).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })

  describe('error handling', () => {
    it('should set error on rejection', async () => {
      const apiError: ApiError = { message: 'Not found', status: 404 }
      const { error, execute } = useApi(() => Promise.reject(apiError))
      await execute()
      expect(error.value).toEqual(apiError)
    })

    it('should return null from execute() on error', async () => {
      const { execute } = useApi(() => Promise.reject({ message: 'fail', status: 500 }))
      const result = await execute()
      expect(result).toBeNull()
    })

    it('should clear previous error on new successful execute', async () => {
      let shouldFail = true
      const { error, execute } = useApi(() => {
        if (shouldFail) return Promise.reject({ message: 'fail', status: 500 })
        return Promise.resolve({ data: 'ok' })
      })

      await execute()
      expect(error.value).not.toBeNull()

      shouldFail = false
      await execute()
      expect(error.value).toBeNull()
    })
  })

  describe('callbacks', () => {
    it('should call onSuccess with resolved data', async () => {
      const onSuccess = vi.fn()
      const { execute } = useApi(() => Promise.resolve({ data: 'hello' }), { onSuccess })
      await execute()
      expect(onSuccess).toHaveBeenCalledWith('hello')
    })

    it('should call onError with ApiError on failure', async () => {
      const onError = vi.fn()
      const apiError: ApiError = { message: 'Oops', status: 500 }
      const { execute } = useApi(() => Promise.reject(apiError), { onError })
      await execute()
      expect(onError).toHaveBeenCalledWith(apiError)
    })
  })

  describe('reset', () => {
    it('should reset state back to initial', async () => {
      const { data, loading, error, execute, reset } = useApi(
        () => Promise.resolve({ data: 'loaded' }),
        { initialData: null },
      )

      await execute()
      expect(data.value).toBe('loaded')

      reset()
      expect(data.value).toBeNull()
      expect(loading.value).toBe(false)
      expect(error.value).toBeNull()
    })
  })

  describe('immediate option', () => {
    it('should auto-execute when immediate=true', async () => {
      const fetcher = vi.fn().mockResolvedValue({ data: 'auto' })
      useApi(fetcher, { immediate: true })

      // immediate calls execute synchronously, but the promise resolves async
      await nextTick()
      expect(fetcher).toHaveBeenCalled()
    })
  })
})
