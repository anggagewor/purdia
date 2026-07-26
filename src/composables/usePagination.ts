import { ref, computed, watch, type Ref, type ComputedRef, type ShallowRef } from 'vue'
import { useApi, type UseApiOptions } from './useApi'
import type { ApiError, ApiResponse, PaginationMeta } from '@purdia/http'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PaginationParams {
  page: number
  per_page: number
  search?: string
  sort_by?: string
  sort_dir?: 'asc' | 'desc'
  [key: string]: unknown
}

export interface UsePaginationReturn<T> {
  /** Reactive list data */
  data: ShallowRef<T[]>
  /** Loading state */
  loading: Ref<boolean>
  /** Error state */
  error: ShallowRef<ApiError | null>
  /** Pagination metadata from server */
  meta: Ref<PaginationMeta>
  /** Current page (v-model compatible) */
  currentPage: Ref<number>
  /** Items per page */
  perPage: Ref<number>
  /** Search query (debounced watch triggers refetch) */
  search: Ref<string>
  /** Sort field */
  sortBy: Ref<string>
  /** Sort direction */
  sortDir: Ref<'asc' | 'desc'>
  /** Total pages (derived from meta) */
  totalPages: ComputedRef<number>
  /** Total items (derived from meta) */
  totalItems: ComputedRef<number>
  /** Fetch current page */
  fetch: () => Promise<void>
  /** Go to specific page and fetch */
  goToPage: (page: number) => Promise<void>
  /** Reset to page 1 and refetch */
  refresh: () => Promise<void>
  /** Extra filters — set and call fetch() */
  filters: Ref<Record<string, unknown>>
}

export interface UsePaginationOptions<T> extends Omit<UseApiOptions<T[]>, 'initialData'> {
  /** Initial page (default 1) */
  initialPage?: number
  /** Items per page (default 10) */
  initialPerPage?: number
  /** Watch search changes and auto-refetch with debounce (ms, default 300) */
  searchDebounce?: number
  /** Auto-fetch on composable creation (default true) */
  immediate?: boolean
}

// ---------------------------------------------------------------------------
// Composable
// ---------------------------------------------------------------------------

/**
 * Composable for paginated API lists with search, sort, and filter support.
 *
 * @example
 * ```ts
 * const {
 *   data: clients,
 *   loading,
 *   meta,
 *   currentPage,
 *   perPage,
 *   search,
 *   totalPages,
 *   fetch,
 * } = usePagination<Client>('/clients')
 *
 * // In template:
 * // <BasePagination v-model:current-page="currentPage" :total-pages="totalPages" ... />
 * ```
 */
export function usePagination<T>(
  endpoint: string | ((params: PaginationParams) => Promise<ApiResponse<T[]>>),
  options: UsePaginationOptions<T> = {},
): UsePaginationReturn<T> {
  const {
    initialPage = 1,
    initialPerPage = 10,
    searchDebounce = 300,
    immediate = true,
    onSuccess,
    onError,
  } = options

  // State
  const currentPage = ref(initialPage)
  const perPage = ref(initialPerPage)
  const search = ref('')
  const sortBy = ref('')
  const sortDir = ref<'asc' | 'desc'>('asc')
  const filters = ref<Record<string, unknown>>({})
  const meta = ref<PaginationMeta>({
    current_page: initialPage,
    last_page: 1,
    per_page: initialPerPage,
    total: 0,
  })

  // Build the fetcher
  function buildParams(): PaginationParams {
    const params: PaginationParams = {
      page: currentPage.value,
      per_page: perPage.value,
    }
    if (search.value) params.search = search.value
    if (sortBy.value) {
      params.sort_by = sortBy.value
      params.sort_dir = sortDir.value
    }
    // Merge extra filters
    Object.assign(params, filters.value)
    return params
  }

  // Internal fetcher using useApi
  const { data, loading, error, execute } = useApi<T[]>(
    async () => {
      if (typeof endpoint === 'function') {
        return endpoint(buildParams())
      }
      // String endpoint — use dynamic import to avoid circular deps
      const { get } = await import('@purdia/http')
      const response = await get<T[]>(endpoint, { params: buildParams() })
      return response
    },
    {
      initialData: [],
      onSuccess: (result) => {
        onSuccess?.(result)
      },
      onError,
    },
  )

  // Intercept the raw response to extract meta
  const originalExecute = execute
  async function fetchWithMeta(): Promise<void> {
    if (typeof endpoint === 'function') {
      const params = buildParams()
      try {
        loading.value = true
        error.value = null
        const response = await endpoint(params)
        data.value = response.data
        if (response.meta) {
          meta.value = response.meta
        }
        onSuccess?.(response.data)
      } catch (err) {
        error.value = err as ApiError
        onError?.(err as ApiError)
      } finally {
        loading.value = false
      }
    } else {
      // String endpoint — need direct access to full response including meta
      try {
        loading.value = true
        error.value = null
        const { get } = await import('@purdia/http')
        const response = await get<T[]>(endpoint, { params: buildParams() })
        data.value = response.data
        if (response.meta) {
          meta.value = response.meta
        }
        onSuccess?.(response.data)
      } catch (err) {
        error.value = err as ApiError
        onError?.(err as ApiError)
      } finally {
        loading.value = false
      }
    }
  }

  async function goToPage(page: number) {
    currentPage.value = page
    await fetchWithMeta()
  }

  async function refresh() {
    currentPage.value = 1
    await fetchWithMeta()
  }

  // Derived
  const totalPages = computed(() => meta.value.last_page)
  const totalItems = computed(() => meta.value.total)

  // Watch page changes
  watch(currentPage, () => {
    fetchWithMeta()
  })

  // Watch perPage — reset to page 1
  watch(perPage, () => {
    currentPage.value = 1
    fetchWithMeta()
  })

  // Debounced search watch
  let searchTimer: ReturnType<typeof setTimeout> | null = null
  watch(search, () => {
    if (searchTimer) clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      currentPage.value = 1
      fetchWithMeta()
    }, searchDebounce)
  })

  // Initial fetch
  if (immediate) {
    fetchWithMeta()
  }

  return {
    data: data as ShallowRef<T[]>,
    loading,
    error,
    meta,
    currentPage,
    perPage,
    search,
    sortBy,
    sortDir,
    totalPages,
    totalItems,
    fetch: fetchWithMeta,
    goToPage,
    refresh,
    filters,
  }
}
