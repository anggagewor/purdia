/**
 * Roles & Permissions API Service
 */
import { get, post, put, del } from '@/lib/http'
import type { Role, RolePayload, Permission, PermissionPayload } from './types'

export const rolesApi = {
  list() {
    return get<Role[]>('/roles')
  },

  create(payload: RolePayload) {
    return post<Role>('/roles', payload)
  },

  detail(id: number) {
    return get<Role>(`/roles/${id}`)
  },

  update(id: number, payload: RolePayload) {
    return put<Role>(`/roles/${id}`, payload)
  },

  remove(id: number) {
    return del(`/roles/${id}`)
  },

  syncPermissions(roleId: number, permissionIds: number[]) {
    return put(`/roles/${roleId}/permissions`, { permission_ids: permissionIds })
  },
}

export const permissionsApi = {
  list() {
    return get<Permission[]>('/permissions')
  },

  create(payload: PermissionPayload) {
    return post<Permission>('/permissions', payload)
  },

  detail(id: number) {
    return get<Permission>(`/permissions/${id}`)
  },

  update(id: number, payload: PermissionPayload) {
    return put<Permission>(`/permissions/${id}`, payload)
  },

  remove(id: number) {
    return del(`/permissions/${id}`)
  },
}
