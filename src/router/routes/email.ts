import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/email',
    name: 'email',
    component: () => import('@/pages/EmailPage.vue'),
  },
]

export default routes
