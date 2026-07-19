/**
 * App-level HTTP setup.
 *
 * Re-exports everything from @purdia/http and provides the initHttp call
 * with app-specific handlers (router redirect, toast notifications).
 */

// Re-export all public API from the package
export {
  get,
  post,
  put,
  patch,
  del,
  upload,
  download,
  useHttp,
  initHttp,
  type ApiResponse,
  type ApiError,
  type PaginationMeta,
  type ServiceConfig,
  type HttpClientConfig,
} from '@purdia/http'

// Legacy compat: registerToastHandler is now handled via initHttp's onError
export function registerToastHandler(_handler: (message: string) => void) {
  // no-op — kept for backward compat, wiring is done in main.ts via initHttp
}
