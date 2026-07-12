/**
 * Tenants & Branches API Service
 */
import { get, post } from '@/lib/http'
import type { Tenant, TenantPayload, Branch, BranchPayload } from './types'

export const tenantsApi = {
  list() {
    return get<Tenant[]>('/tenants')
  },

  create(payload: TenantPayload) {
    return post<Tenant>('/tenants', payload)
  },

  detail(id: number) {
    return get<Tenant>(`/tenants/${id}`)
  },
}

export const branchesApi = {
  list(tenantId: number) {
    return get<Branch[]>('/branches', {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  create(tenantId: number, payload: BranchPayload) {
    return post<Branch>('/branches', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  detail(tenantId: number, branchId: number) {
    return get<Branch>(`/branches/${branchId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}
