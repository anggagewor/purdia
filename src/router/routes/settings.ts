import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/settings/company',
    name: 'settings-company',
    component: () => import('@/pages/settings/CompanySettings.vue'),
  },
  {
    path: '/settings/branches',
    name: 'settings-branches',
    component: () => import('@/pages/settings/BranchList.vue'),
  },
  {
    path: '/settings/users',
    name: 'settings-users',
    component: () => import('@/pages/settings/UsersRoles.vue'),
  },
  {
    path: '/settings/menus',
    name: 'settings-menus',
    component: () => import('@/pages/settings/MenuManager.vue'),
  },
  {
    path: '/settings/config',
    name: 'settings-config',
    component: () => import('@/pages/settings/ConfigManager.vue'),
  },
]

export default routes
