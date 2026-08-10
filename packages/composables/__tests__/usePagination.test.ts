import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { usePagination } from '../src/usePagination'
import * as http from '@purdia/http'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('@purdia/http', () => ({
  get: vi.fn(),
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mockApiResponse<T>(data: T[], meta?: Partial<http.PaginationMeta>) {
  return {
    data,
    meta: {
      current_page: 1,
      last_page: 3,
      per_page: 10,
      total: 30,
      ...meta,
    },
  }
}

beforeEach(() => {
  vi.clearAllMocks()
})

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('usePagination', () => {
  describe('initial fetch', () => {
    it('should fetch immediately by default', async () => {
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([{ id: 1 }]))

      const { data } = usePagination<{ id: number }>('/items')

      // Wait for the async fetchWithMeta to complete
      await vi.waitFor(() => {
        expect(data.value).toEqual([{ id: 1 }])
      })

      expect(http.get).toHaveBeenCalledWith('/items', {
        params: { page: 1, per_page: 10 },
      })
    })

    it('should not fetch if immediate=false', () => {
      usePagination('/items', { immediate: false })
      expect(http.get).not.toHaveBeenCalled()
    })

    it('should use custom initialPage and initialPerPage', async () => {
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([]))

      usePagination('/items', { initialPage: 3, initialPerPage: 25 })

      await vi.waitFor(() => {
        expect(http.get).toHaveBeenCalledWith('/items', {
          params: { page: 3, per_page: 25 },
        })
      })
    })
  })

  describe('goToPage — no double-fetch', () => {
    it('should fetch exactly once when goToPage is called', async () => {
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([{ id: 1 }]))

      const { goToPage } = usePagination<{ id: number }>('/items', { immediate: false })

      await goToPage(2)

      // Should be called exactly once — NOT twice (the old bug)
      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith('/items', {
        params: { page: 2, per_page: 10 },
      })
    })

    it('should update currentPage value', async () => {
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([]))

      const { currentPage, goToPage } = usePagination('/items', { immediate: false })

      expect(currentPage.value).toBe(1)
      await goToPage(5)
      expect(currentPage.value).toBe(5)
    })
  })

  describe('refresh', () => {
    it('should reset to page 1 and refetch', async () => {
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([]))

      const { currentPage, goToPage, refresh } = usePagination('/items', { immediate: false })

      await goToPage(3)
      expect(currentPage.value).toBe(3)

      vi.mocked(http.get).mockClear()
      await refresh()

      expect(currentPage.value).toBe(1)
      expect(http.get).toHaveBeenCalledWith('/items', {
        params: { page: 1, per_page: 10 },
      })
    })
  })

  describe('perPage watcher', () => {
    it('should refetch when perPage changes and reset to page 1', async () => {
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([]))

      const { perPage, currentPage, goToPage } = usePagination('/items', { immediate: false })

      await goToPage(3)
      vi.mocked(http.get).mockClear()

      perPage.value = 25
      await vi.waitFor(() => {
        expect(http.get).toHaveBeenCalledWith('/items', {
          params: { page: 1, per_page: 25 },
        })
      })

      expect(currentPage.value).toBe(1)
    })
  })

  describe('search — debounced', () => {
    it('should refetch after debounce when search changes', async () => {
      vi.useFakeTimers()
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([]))

      const { search } = usePagination('/items', { immediate: false, searchDebounce: 200 })

      search.value = 'hello'
      await nextTick()

      // Should not have fetched yet (within debounce)
      expect(http.get).not.toHaveBeenCalled()

      // Advance past debounce
      vi.advanceTimersByTime(250)
      await nextTick()

      expect(http.get).toHaveBeenCalledWith('/items', {
        params: { page: 1, per_page: 10, search: 'hello' },
      })

      vi.useRealTimers()
    })

    it('should debounce multiple rapid search changes', async () => {
      vi.useFakeTimers()
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([]))

      const { search } = usePagination('/items', { immediate: false, searchDebounce: 300 })

      search.value = 'a'
      await nextTick()
      vi.advanceTimersByTime(100)

      search.value = 'ab'
      await nextTick()
      vi.advanceTimersByTime(100)

      search.value = 'abc'
      await nextTick()
      vi.advanceTimersByTime(350)
      await nextTick()

      // Only the final value should have triggered a fetch
      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith('/items', {
        params: { page: 1, per_page: 10, search: 'abc' },
      })

      vi.useRealTimers()
    })
  })

  describe('sorting', () => {
    it('should include sort params when sortBy is set', async () => {
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([]))

      const { sortBy, sortDir, fetch: fetchData } = usePagination('/items', { immediate: false })

      sortBy.value = 'name'
      sortDir.value = 'desc'
      await fetchData()

      expect(http.get).toHaveBeenCalledWith('/items', {
        params: { page: 1, per_page: 10, sort_by: 'name', sort_dir: 'desc' },
      })
    })
  })

  describe('filters', () => {
    it('should include extra filters in params', async () => {
      vi.mocked(http.get).mockResolvedValue(mockApiResponse([]))

      const { filters, fetch: fetchData } = usePagination('/items', { immediate: false })

      filters.value = { status: 'active', category_id: 5 }
      await fetchData()

      expect(http.get).toHaveBeenCalledWith('/items', {
        params: { page: 1, per_page: 10, status: 'active', category_id: 5 },
      })
    })
  })

  describe('meta / derived values', () => {
    it('should expose totalPages and totalItems from meta', async () => {
      vi.mocked(http.get).mockResolvedValue(
        mockApiResponse([{ id: 1 }], { last_page: 5, total: 47 }),
      )

      const { totalPages, totalItems } = usePagination<{ id: number }>('/items')

      await vi.waitFor(() => {
        expect(totalPages.value).toBe(5)
        expect(totalItems.value).toBe(47)
      })
    })
  })

  describe('error handling', () => {
    it('should set error state on failed fetch', async () => {
      const apiError = { message: 'Server Error', status: 500 }
      vi.mocked(http.get).mockRejectedValue(apiError)

      const { error, loading } = usePagination('/items')

      await vi.waitFor(() => {
        expect(error.value).toEqual(apiError)
        expect(loading.value).toBe(false)
      })
    })

    it('should call onError callback', async () => {
      const onError = vi.fn()
      const apiError = { message: 'Not Found', status: 404 }
      vi.mocked(http.get).mockRejectedValue(apiError)

      usePagination('/items', { onError })

      await vi.waitFor(() => {
        expect(onError).toHaveBeenCalledWith(apiError)
      })
    })
  })

  describe('custom endpoint function', () => {
    it('should call the function with params instead of http.get', async () => {
      const customFetcher = vi.fn().mockResolvedValue(mockApiResponse([{ id: 99 }]))

      const { data } = usePagination(customFetcher)

      await vi.waitFor(() => {
        expect(data.value).toEqual([{ id: 99 }])
      })

      expect(customFetcher).toHaveBeenCalledWith({ page: 1, per_page: 10 })
      expect(http.get).not.toHaveBeenCalled()
    })
  })
})
