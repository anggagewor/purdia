/**
 * API Service Layer
 *
 * Central barrel export for all API modules.
 * Usage: import { authApi, rolesApi, ... } from '@/lib/api'
 */

export * from './types'
export { authApi } from './auth'
export { rolesApi, permissionsApi } from './roles'
export { tenantsApi, branchesApi } from './tenants'
export { configApi } from './config'
export { filesApi } from './files'
export { lookupsApi, referencesApi } from './lookups'
export { documentsApi } from './documents'
export { partiesApi } from './parties'
export { productsApi, categoriesApi, brandsApi } from './catalog'
export { pricingApi, priceListsApi, discountsApi, promotionsApi } from './pricing'
export { menusApi } from './menus'
