/**
 * Menus API Service
 */
import { get, post, put, del } from '@/lib/http'
import type { Menu, MenuPayload, MenuReorderItem } from './types'

export const menusApi = {
  /** List all menus (admin, full tree) */
  list(tenantId: number) {
    return get<Menu[]>('/menus', {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  /** Get permission-filtered menu tree for frontend sidebar */
  tree(tenantId: number) {
    return get<Menu[]>('/menus/tree', {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  create(tenantId: number, payload: MenuPayload) {
    return post<Menu>('/menus', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  detail(tenantId: number, menuId: number) {
    return get<Menu>(`/menus/${menuId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  update(
    tenantId: number,
    menuId: number,
    payload: Partial<MenuPayload> & { is_active?: boolean },
  ) {
    return put<Menu>(`/menus/${menuId}`, payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  remove(tenantId: number, menuId: number) {
    return del(`/menus/${menuId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  reorder(tenantId: number, items: MenuReorderItem[]) {
    return put(
      '/menus/reorder',
      { items },
      {
        headers: { 'X-Tenant-Id': String(tenantId) },
      },
    )
  },
}
