import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { menusApi, type Menu } from '@/lib/api'

export const useMenuStore = defineStore('menu', () => {
  const menus = ref<Menu[]>([])
  const loading = ref(false)
  const loaded = ref(false)

  /** Tenant ID — for now hardcoded to 1, should come from tenant store later */
  const tenantId = ref<number>(1)

  async function fetchMenus() {
    if (loading.value) return
    loading.value = true
    try {
      const response = await menusApi.tree(tenantId.value)
      menus.value = response.data
      loaded.value = true
    } catch {
      // Fallback: keep empty if API fails
      menus.value = []
    } finally {
      loading.value = false
    }
  }

  /** Force refresh menus (e.g. after login or tenant switch) */
  async function refresh() {
    loaded.value = false
    await fetchMenus()
  }

  return { menus, loading, loaded, tenantId, fetchMenus, refresh }
})
