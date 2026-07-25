import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('@/pages/errors/ForbiddenPage.vue'),
    meta: { guest: true, public: true },
  },
  {
    path: '/404-demo',
    name: 'not-found-demo',
    component: () => import('@/pages/errors/NotFoundPage.vue'),
    meta: { guest: true, public: true },
  },
  {
    path: '/500',
    name: 'server-error',
    component: () => import('@/pages/errors/ServerErrorPage.vue'),
    meta: { guest: true, public: true },
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: () => import('@/pages/errors/MaintenancePage.vue'),
    meta: { guest: true, public: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/errors/NotFoundPage.vue'),
    meta: { guest: true, public: true },
  },
]

export default routes
