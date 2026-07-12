/**
 * Users API Service (tenant-scoped)
 */
import { get, post, put, del } from '@/lib/http'
import type { User } from './types'

export interface TenantUser extends User {
  role?: string
  role_slug?: string
  branches?: { id: number; name: string; code: string }[]
}

export interface UserCreatePayload {
  name: string
  email: string
  password: string
  role_id?: number
  branch_ids?: number[]
}

export interface UserUpdatePayload {
  name: string
  email: string
  password?: string | null
  role_id?: number
  branch_ids?: number[]
}

export const usersApi = {
  list(tenantId: number, params?: { search?: string; per_page?: number }) {
    return get<TenantUser[]>('/users', {
      params,
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  detail(tenantId: number, userId: number) {
    return get<TenantUser>(`/users/${userId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  create(tenantId: number, payload: UserCreatePayload) {
    return post<TenantUser>('/users', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  update(tenantId: number, userId: number, payload: UserUpdatePayload) {
    return put<TenantUser>(`/users/${userId}`, payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  remove(tenantId: number, userId: number) {
    return del(`/users/${userId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}
